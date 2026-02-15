const axios = require("axios");
const Transaction = require("../model/paymentModel");
const { generateHmacSha256Hash } = require("../services/helper");

const initiatePayment = async (req, res) => {
  const {
    amount,
    productId,
    paymentGateway,
    customerName,
    customerEmail,
    customerPhone,
    productName,
  } = req.body;

  if (!paymentGateway) {
    return res.status(400).json({ message: "Payment gateway is required" });
  }

  try {
    const customerDetails = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    };

    const transactionData = {
      customerDetails,
      product_name: productName,
      product_id: productId,
      amount,
      payment_gateway: paymentGateway,
    };

    let paymentConfig;
    if (paymentGateway === "esewa") {
      const paymentData = {
        amount,
        failure_url: process.env.FAILURE_URL,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: process.env.ESEWA_MERCHANT_ID,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: productId,
      };

      const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
      const signature = generateHmacSha256Hash(data, process.env.ESEWA_SECRET);
      
      paymentConfig = {
        url: process.env.ESEWA_PAYMENT_URL,
        data: { ...paymentData, signature },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        responseHandler: (response) => response.request?.res?.responseUrl,
      };


    // } else if (paymentGateway === "khalti") {
    //   paymentConfig = {
    //     url: process.env.KHALTI_PAYMENT_URL,
    //     data: {
    //       amount: amount * 100, // Convert to paisa
    //       mobile: customerDetails?.phone,
    //       product_identity: productId,
    //       product_name: productName,
    //       return_url: process.env.SUCCESS_URL,
    //       failure_url: process.env.FAILURE_URL,
    //       public_key: process.env.KHALTI_PUBLIC_KEY,
    //       website_url: "http://localhost:5173",
    //       purchase_order_id: productId,
    //       purchase_order_name: productName,
    //     },
    //     headers: {
    //       Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     responseHandler: (response) => response.data?.payment_url,
    //   };
    } else {
      return res.status(400).json({ message: "Invalid payment gateway" });
    }

    // Make payment request


    const payment = await axios.post(paymentConfig.url, paymentConfig.data, {
      headers: paymentConfig.headers,
    });

    const paymentUrl = paymentConfig.responseHandler(payment);
    if (!paymentUrl) {
      throw new Error("Payment URL is missing in the response");
    }

    // Save transaction record
    const transaction = new Transaction(transactionData);
    await transaction.save();

    return res.send({ 
      url: paymentUrl,
      product_id: productId,
      pidx: payment.data?.pidx || productId,
      status: "PENDING"
    });
  } catch (error) {
    console.error(
      "Error during payment initiation:",
      error.response?.data || error.message
    );
    res.status(500).send({
      message: "Payment initiation failed",
      error: error.response?.data || error.message,
    });
  }
};





const paymentStatus = async (req, res) => {
  const { product_id, pidx, status } = req.body;
  try {
    const transaction = await Transaction.findOne({ product_id });
    if (!transaction) {
      return res.status(400).json({ message: "Transaction not found" });
    }

    const { payment_gateway } = transaction;

    if (status === "FAILED") {
      // Directly update status when failure is reported
      await Transaction.update(
        { product_id },
        { $set: { status: "FAILED", updatedAt: new Date() } }
      );

      return res.status(200).json({
        message: "Transaction status updated to FAILED",
        status: "FAILED",
      });
    }

    let paymentStatusCheck;

    if (payment_gateway === "esewa") {
      const paymentData = {
        product_code: process.env.ESEWA_MERCHANT_ID,
        total_amount: transaction.amount,
        transaction_uuid: transaction.product_id,
      };

      const response = await axios.get(
        process.env.ESEWA_PAYMENT_STATUS_CHECK_URL,
        {
          params: paymentData,
        }
      );

      paymentStatusCheck = response.data;

      if (paymentStatusCheck.status === "COMPLETE") {
        await Transaction.update(
          { product_id },
          { $set: { status: "COMPLETED", updatedAt: new Date() } }
        );

        return res.status(200).json({
          message: "Transaction status updated successfully",
          status: "COMPLETED",
        });
      } else {
        await Transaction.update(
          { product_id },
          { $set: { status: "FAILED", updatedAt: new Date() } }
        );

        return res.status(200).json({
          message: "Transaction status updated to FAILED",
          status: "FAILED",
        });
      }
    }

    // if (payment_gateway === "khalti") {
    //   try {
    //     const response = await axios.post(
    //       process.env.KHALTI_VERIFICATION_URL,
    //       { pidx },
    //       {
    //         headers: {
    //           Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );

    //     paymentStatusCheck = response.data;
    //   } catch (error) {
    //     if (error.response?.status === 400) {
    //       paymentStatusCheck = error.response.data;
    //     } else {
    //       console.error(
    //         "Error verifying Khalti payment:",
    //         error.response?.data || error.message
    //       );
    //       throw error;
    //     }
    //   }

    //   if (paymentStatusCheck.status === "Completed") {
    //     await Transaction.updateOne(
    //       { product_id },
    //       { $set: { status: "COMPLETED", updatedAt: new Date() } }
    //     );

    //     return res.status(200).json({
    //       message: "Transaction status updated successfully",
    //       status: "COMPLETED",
    //     });
    //   } else {
    //     await Transaction.updateOne(
    //       { product_id },
    //       { $set: { status: "FAILED", updatedAt: new Date() } }
    //     );

    //     return res.status(200).json({
    //       message: "Transaction status updated to FAILED",
    //       status: "FAILED",
    //     });
    //   }
    // }

    return res.status(400).json({ message: "Invalid payment gateway" });
  } catch (error) {
    console.error("Error during payment status check:", error);
    res.status(500).send({
      message: "Payment status check failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { initiatePayment, paymentStatus };
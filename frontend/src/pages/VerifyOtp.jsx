import React from 'react'
import { useState } from 'react'
import { apiClient } from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../components/layout/Layout'

const VerifyOtp = () => {

    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        otp: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await apiClient.post('/user/verify-otp', data)
            if (response.status === 200) {
                toast.success(response.data.message || "OTP verified successfully. You can now reset your password.")
                // alert("OTP verified successfully. You can now reset your password.")
                navigate('/reset-password')
            }

        } catch (error) {

            // console.error("Error verifying OTP:", error)
            toast.error(error.response?.data?.message || "Invalid OTP. Please try again.")
        }

    }


    return (
        <Layout>
            <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
                <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                    <h2 className='text-2xl font-bold text-center text-blue-600'>
                        Verify your OTP
                    </h2>
                    <p className='text-center text-gray-500 mt-2'>
                        Enter the OTP sent to your email
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                autoComplete='email'
                                placeholder="you@example.com"
                                className="mt-1
                            w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                OTP
                            </label>
                            <input
                                type="text"
                                name="otp"
                                onChange={handleChange}
                                value={data.otp}
                                autoComplete='one-time-code'
                                placeholder="Enter the OTP sent to your email"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Verify OTP
                        </button>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default VerifyOtp

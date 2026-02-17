import React from 'react'
import { useState } from 'react'
import { apiClient } from '../api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Layout from '../components/layout/Layout'


const ResetPassword = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
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

            const response = await apiClient.post('/user/reset-password', data)

            if (response.status === 200) {
                toast.success(response.data.message || "Password reset successful. You can now log in with your new password.")
                navigate('/')
            }

        } catch (error) {
            // console.error("Error resetting password:", error)
            toast.error(error.response?.data?.message || "Failed to reset password. Please try again.")
        }

    }


    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center text-blue-600">
                        Reset Your Password
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        Enter your new password below
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                autoComplete='email'
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                onChange={handleChange}
                                autoComplete='new-password'
                                placeholder="Create a strong password"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                autoComplete='new-password'
                                placeholder="Confirm password"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ResetPassword

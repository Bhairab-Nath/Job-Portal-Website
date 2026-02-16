import { useState } from 'react'
import { apiClient } from '../api'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: ''
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

        try{
            const response = await apiClient.post('/user/forget-password', data)

            if(response.status === 200) {
                alert("OTP sent to your email. Please check your inbox.")
                navigate('/verify-otp')
            }
            else{
                alert("Failed to send OTP. Please try again.")
            }

        } catch(error){
            console.error("Error sending OTP:", error)
        }

    }


    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
            <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8'>
                <h2 className='text-2xl font-bold text-center text-blue-600'>
                    Reset Your Password
                </h2>
                <p className='text-center text-gray-500 mt-2'>
                    Enter your email to receive a password reset OTP
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
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Send OTP
                    </button>
                </form>
            </div>

        </div>
    )
}

export default ForgetPassword

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, resetStatus } from '../store/authSlice'
import Layout from '../components/layout/Layout'
import STATUSES from '../../globals/status/statuses'
import { toast } from 'react-toastify'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    })

    const {status, error} = useSelector((state)=> state.auth)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(data))
    }


    useEffect(()=>{
        if (status === STATUSES.SUCCESS && error === null){
            toast.success('Registration successful! Please login to continue.')
            navigate('/login/job-seeker')
            dispatch(resetStatus())
        }

        if (error){
            toast.error(error)
            dispatch(resetStatus())
        }
    },[status, error, navigate])
    

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                    {/* Header */}
                    <h2 className="text-2xl font-bold text-center text-blue-600">
                        Job Seeker Registration
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        Create your profile and apply for jobs
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                autoComplete='username'
                                placeholder="Enter your full name"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

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
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
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
                            Register
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login/job-seeker" className="text-blue-600 font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Register

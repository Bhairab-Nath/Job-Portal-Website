import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetStatus } from '../store/authSlice'
import Layout from '../components/layout/Layout'
import STATUSES from '../../globals/status/statuses'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {role} = useParams()

    if(role !== "job-seeker" && role !== "job-provider") {
        navigate('/not-found')
    }

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const {status, error, data: authData} = useSelector((state) => state.auth)

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(data))
    }

    useEffect(() => {
        // if (status === STATUSES.SUCCESS && error === null) {
        //     navigate('/')
        //     dispatch(resetStatus())
        // }

        if(status === STATUSES.SUCCESS && error === null && authData?.role) {
            if(authData.role === "jobseeker") {
                navigate('/') // Redirect to home or job seeker dashboard
            } else if(authData.role === "jobprovider") {
                navigate('/job-provider-dashboard')
            }
        }

    }, [status, error, authData, navigate])

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

               
                    <h2 className="text-2xl font-bold text-center text-blue-600">
                        {role === "job-seeker"? "Job Seeker ": "Job Provider "}Login
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        Login to your account to {role === "job-seeker" ? "apply for jobs" : "post jobs"}
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
                                autoComplete='email'
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                    
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                autoComplete='current-password'
                                placeholder="Enter your password"
                                className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                        >
                            Login
                        </button>
                    </form>

                 
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login

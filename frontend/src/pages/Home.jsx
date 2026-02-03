import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Home = () => {

    const featuredJobs = [
        { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Kathmandu' },
        { id: 2, title: 'Backend Developer', company: 'CodeLabs', location: 'Lalitpur' },
        { id: 3, title: 'UI/UX Designer', company: 'Creative Minds', location: 'Pokhara' },
        { id: 4, title: 'Data Analyst', company: 'DataCorp', location: 'Biratnagar' },
    ]

    const navigate = useNavigate()
    return (
        <>
            <Layout>

                <div className="bg-gray-50 min-h-screen">

                    <section className="bg-blue-800 text-white py-20 px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Your Dream Job with <span className="text-yellow-300">Job Khojau</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8">
                            Explore thousands of job opportunities and kickstart your career today!
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <button
                                onClick={() => navigate("/register")}
                                className="group flex items-center gap-2 px-6 py-3 rounded-md bg-yellow-600 text-white text-lg font-medium hover:bg-yellow-700 transition"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <Link
                                to="/login"
                                className="border border-white text-white px-6 py-3 rounded-md hover:border-orange-300 hover:text-orange-300 transition"
                            >
                                Login
                            </Link>
                        </div>
                    </section>


                    <section className="py-12 px-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Search Jobs</h2>
                        <p className="text-gray-600 mb-6">Quickly find jobs that match your skills</p>
                        <div className="flex justify-center flex-wrap gap-4">
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                            <button className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
                                Search
                            </button>
                        </div>
                    </section>


                    <section className="py-12 px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Featured Jobs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredJobs.map((job) => (
                                <div key={job.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                    <p className="text-gray-600 mb-1">{job.company}</p>
                                    <p className="text-gray-500 text-sm">{job.location}</p>
                                    <button className="group flex items-center gap-2 mt-4 w-full bg-blue-700 text-white justify-center py-2 rounded-md hover:bg-blue-800 transition">
                                        Apply Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>


                    <section className="bg-blue-800 text-white py-12 px-8 text-center rounded-tl-3xl rounded-tr-3xl mt-12">
                        <h2 className="text-3xl font-bold mb-4">Ready to find your perfect job?</h2>
                        <p className="mb-6">Join Job Khojau today and start applying for jobs that match your skills.</p>
                        <Link
                            to="/register"
                            className="bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-yellow-700 transition"
                        >
                            Register Now
                        </Link>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export default Home
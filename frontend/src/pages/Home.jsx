import React, { use, useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Building2, ArrowRight, Briefcase } from "lucide-react";
import { apiClient } from '../api'
import { useSelector } from 'react-redux';

const Home = () => {

    const [jobs, setJobs] = useState([])
    const navigate = useNavigate()

    const { isAuthenticated,token } = useSelector((state) => state.auth);

    const fetchJobs = async () => {
        const response = await apiClient.get('/job/')
        setJobs(response.data.data)

    }

    useEffect(() => {
        fetchJobs()
    }, [])


    return (
        <>
            <Layout>

                <div className="bg-gray-50 min-h-screen">

                    <section className="bg-blue-800 text-white py-20 px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Find Your Dream Job with <span className="text-yellow-500">Job Khojau</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-8">
                            Explore thousands of job opportunities and kickstart your career today!
                        </p>

                        {!token && (
                            <div className="flex justify-center flex-wrap">
                                <button
                                    onClick={() => navigate("/register")}
                                    className="group flex items-center gap-2 px-6 py-3 rounded-md bg-yellow-600 text-white text-lg font-medium hover:bg-yellow-700 transition"
                                >
                                    Get Started
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                {/* <Link
                                to="/login"
                                className="border border-white text-white px-6 py-3 rounded-md hover:border-orange-300 hover:text-orange-300 transition"
                            >
                                Login
                            </Link> */}
                            </div>
                        )}
                    </section>


                    {/* <section className="py-12 px-8 text-center">
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
                    </section> */}


                    {/* <section className="py-12 px-8">
                        <h2 className="text-3xl font-bold text-center mb-8">Featured Jobs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {jobs.length === 0 ? <p>No jobs available at this moment</p> : jobs.map((job) => (
                                <div key={job.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                    <p className="text-gray-600 mb-1 line-clamp-1">{job.description}</p>
                                    <p className="text-gray-600 mb-1">{job.company}</p>
                                    <p className="text-gray-500 text-sm">{job.location}</p>
                                    <button className="group flex items-center gap-2 mt-4 w-full bg-blue-700 text-white justify-center py-2 rounded-md hover:bg-blue-800 transition" onClick={()=>navigate(`/job/${job.id}`)}>
                                        Apply Now
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
 */}

                    <section className="py-14 px-4 sm:px-8 bg-gray-50">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
                            Featured Jobs
                        </h2>

                        <div className="max-w-7xl mx-auto">
                            {jobs.length === 0 ? (
                                <p className="text-center text-gray-500">
                                    No jobs available at this moment
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {jobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col"
                                        >
                                            {/* JOB TITLE */}
                                            <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                                                {job.title}
                                            </h3>

                                            {/* COMPANY */}
                                            <div className="flex items-center gap-2 text-gray-600 mt-2 text-sm">
                                                <Building2 size={16} />
                                                <span className="font-medium">{job.company}</span>
                                            </div>

                                            {/* DESCRIPTION */}
                                            <p className="text-gray-600 mt-3 text-sm line-clamp-2 leading-relaxed">
                                                {job.description}
                                            </p>

                                            {/* META */}
                                            <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-600 px-3 py-1 font-medium">
                                                    <MapPin size={14} />
                                                    {job.location}
                                                </span>

                                                {job.type && (
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-3 py-1 font-medium">
                                                        <Briefcase size={14} />
                                                        {job.type}
                                                    </span>
                                                )}
                                            </div>

                                            {/* CTA */}
                                            <button
                                                onClick={() => navigate(`/job/${job.id}`)}
                                                className="mt-6 group flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700 transition"
                                            >
                                                View Job
                                                <ArrowRight
                                                    size={18}
                                                    className="group-hover:translate-x-1 transition-transform"
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                    <section className="bg-blue-800 text-white py-12 px-8 text-center rounded-tl-3xl rounded-tr-3xl mt-12">
                        <h2 className="text-3xl font-bold mb-4">Ready to find your perfect job?</h2>
                        <p className="mb-6">Join Job Khojau today and start applying for jobs that match your skills.</p>
                        {!token && (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-yellow-700 transition"
                                >
                                    Register Now
                                </Link>
                            </>
                        )}

                    </section>
                </div>
            </Layout>
        </>
    )
}

export default Home
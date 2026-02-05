import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { APIAuthenticatedClient } from '../api';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const navigate = useNavigate()

    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        company: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setJobData({
            ...jobData,
            [name]: value
        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await APIAuthenticatedClient.post('/job/', jobData)
            if (response.status === 201) {
                alert("Job posted successfully!")
                navigate('/job-provider-dashboard')
            }

        } catch (error) {

            console.error("Error posting job:", error)
            alert("Failed to post job. Please try again.")  
        }

        // Reset form
        setJobData({
            title: '',
            description: '',
            location: '',
            salary: '',
            company: '',
        })

    }

    return (
        <Layout>
            <div className='bg-gray-50 pt-6 min-h-screen'>
                <div className="max-w-xl mx-auto bg-white py-3 px-5 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">Post a New Job</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Job Title */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Job Title</label>
                            <input
                                type="text"
                                name="title"
                                value={jobData.title}
                                onChange={handleChange}
                                placeholder="Frontend Developer"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={jobData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Job Description */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Job Description</label>
                            <textarea
                                name="description"
                                value={jobData.description}
                                onChange={handleChange}
                                placeholder="Write a detailed job description..."
                                className="w-full border border-gray-300 rounded-md p-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={jobData.location}
                                onChange={handleChange}
                                placeholder="Kathmandu, Nepal"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Salary</label>
                            <input
                                type="text"
                                name="salary"
                                value={jobData.salary}
                                onChange={handleChange}
                                placeholder="e.g., NPR 30,000"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-1 text-center">
                            <button
                                type="submit"
                                className="bg-blue-600 w-full hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
                            >
                                Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default PostJob;

import React, { useEffect, useState } from 'react'
import { Bell, PlusCircle, ClipboardList, Trash2, Pencil } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { APIAuthenticatedClient } from '../api'

const JobProviderDashboard = () => {
  
    
    const navigate = useNavigate()
    const { data } = useSelector((state) => state.auth)

    const [jobs, setJobs] = useState([])

    const fetchJobs = async () => {
        try {

            const response = await APIAuthenticatedClient.get('/job/')

            if (response.status === 200) {
                setJobs(response.data.data)
            }
        }
        catch (error) {

            console.error('Error fetching jobs:', error)
        }

    }

    const handleDelete = async(id) => {
        try {

            const response = await APIAuthenticatedClient.delete(`/job/${id}`)
            if (response.status === 200) {
                alert("Job deleted successfully!")
                fetchJobs()
            }

        } catch (error) {
            console.error("Error deleting job:", error)
            alert("Failed to delete job. Please try again.")
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    return (
        <Layout>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {data?.name}</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </button>
                        <button onClick={() => navigate('/create-job-post')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition">
                            <PlusCircle className="w-5 h-5" />
                            Post Job
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
                        <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Active Applications</h2>
                        <p className="text-2xl font-bold text-gray-900">25</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Pending Reviews</h2>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                    </div>
                </div>

                {/* Recent Jobs */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" /> Recent Jobs
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Job Title</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Company</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Applicants</th>
                                    {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th> */}
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {jobs?.length !== 0 && jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="px-4 py-2">{job.title}</td>
                                        <td className="px-4 py-2">{job.company}</td>
                                        <td className="px-4 py-2 text-blue-400 hover:underline"><Link to={`/applications/${job.id}`}>view</Link></td>
                                     
                                        <td className="px-4 py-3 ">
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                                <button 
                                                    onClick={() => navigate(`/update-job-post/${job.id}`)}
                                                    className="flex items-center justify-center gap-1 text-green-600 font-medium px-3 py-1.5 rounded bg-green-50 hover:bg-green-100 transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Update
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    className="flex items-center justify-center gap-1 text-red-500 font-medium px-3 py-1.5 rounded bg-red-50 hover:bg-red-100 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default JobProviderDashboard;

import React from 'react'
import { Bell, PlusCircle, ClipboardList } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { useNavigate } from 'react-router-dom'

const JobProviderDashboard = () => {
    const jobs = [
        { id: 1, title: 'Frontend Developer', applicants: 12, status: 'Open' },
        { id: 2, title: 'Backend Developer', applicants: 8, status: 'Closed' },
        { id: 3, title: 'UI/UX Designer', applicants: 5, status: 'Open' },
    ]

    const navigate = useNavigate()

    return (
        <Layout>
            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, Job Provider</h1>
                    <div className="flex items-center gap-4">
                        <button className="relative">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                        </button>
                        <button onClick={()=> navigate('/create-job-post')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition">
                            <PlusCircle className="w-5 h-5" />
                            Post Job
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
                        <p className="text-2xl font-bold text-gray-900">3</p>
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
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Applicants</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="px-4 py-2">{job.title}</td>
                                        <td className="px-4 py-2">{job.applicants}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-white text-xs ${job.status === 'Open' ? 'bg-green-500' : 'bg-gray-400'}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button className="text-blue-600 hover:underline">View</button>
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

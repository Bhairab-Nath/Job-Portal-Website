import React, { useEffect, useState } from "react";
import {
    MapPin,
    Briefcase,
    Calendar,
    Building2,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import { APIAuthenticatedClient, apiClient } from "../api";
import { useParams } from "react-router-dom";

const SingleJob = () => {
    //   const job = {
    //     title: "Frontend Developer",
    //     company: "Tech Innovators Pvt Ltd",
    //     location: "Kathmandu, Nepal",
    //     type: "Full Time",
    //     salary: "Rs. 80,000 – 120,000",
    //     postedDate: "Posted 2 days ago",
    //     description: `
    // We are looking for a passionate Frontend Developer to build modern and responsive web applications.

    // Requirements:
    // • Strong knowledge of React and JavaScript
    // • Experience with Tailwind CSS or modern CSS frameworks
    // • Familiarity with REST APIs
    // • Good problem-solving skills

    // Responsibilities:
    // • Develop reusable and scalable UI components
    // • Collaborate with designers and backend developers
    // • Optimize applications for speed and performance
    // • Ensure cross-browser compatibility
    // `,
    //   };

    const { id } = useParams()
    const [job, setJob] = useState({})

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    const fetchJob = async () => {

        try {
            const response = await apiClient.get(`/job/${id}`)
            if (response.status === 200) {
                console.log("Job data:", response.data.data)
                setJob(response.data.data)
            }

        }
        catch (error) {
            console.error("Error fetching job:", error)
        }
    }


    const applyJob = async (id) => {
        try {

            const response = await APIAuthenticatedClient.post(`/application/apply/${id}`)

            if (response.status === 200) {
                alert("Job applied successfully!")
            }

        }catch (error) {
            console.error("Error applying for job:", error)
        }
        
    }

    useEffect(() => {
        fetchJob()
    }, [id])

    return (
        <Layout >
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* HEADER CARD */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                                {job.title}
                            </h1>

                            <div className="flex items-center gap-2 mt-2 text-gray-600">
                                <Building2 size={18} />
                                <span className="font-medium">{job.company}</span>
                            </div>

                            {/* BADGES */}
                            <div className="flex flex-wrap gap-3 mt-5">
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-600 px-4 py-1.5 text-sm font-medium">
                                    <MapPin size={14} />
                                    {job.location}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 text-green-600 px-4 py-1.5 text-sm font-medium">
                                    <Briefcase size={14} />
                                    full time{/* {job.type} */}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 text-purple-600 px-4 py-1.5 text-sm font-medium">
                                    <span className="font-semibold">Rs.</span>
                                    {job.salary}
                                </span>

                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 px-4 py-1.5 text-sm font-medium">
                                    <Calendar size={14} />
                                    Posted on {formatDate(job.createdAt)}
                                </span>
                            </div>
                        </div>

                        {/* JOB DETAILS */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Job Details
                            </h2>

                            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-700">
                                {job.description}
                            </pre>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">
                        <div className="sticky top-24 bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Ready to Apply?
                            </h3>

                            <p className="mt-2 text-base text-gray-600 leading-relaxed">
                                Take the next step in your career and apply for this role today.
                            </p>

                            <button onClick={() => applyJob(job.id)} className="mt-6 w-full rounded-xl bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition">
                                Apply Now
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleJob

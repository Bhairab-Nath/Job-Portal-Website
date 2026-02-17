import React, { use, useEffect, useState } from "react";
import { Mail, Phone, MapPin, FileText, Briefcase, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { APIAuthenticatedClient } from "../api";

const UserProfile = () => {
  const { data } = useSelector((state) => state.auth);

  const [application, setApplication] = useState([])

  const fetchMyAppliedJobs = async () => {
    try {
      const response = await APIAuthenticatedClient.get("/application/myapplications")

      if (response.status === 200) {
        console.log("Applied Jobs:", response.data.applications)
        setApplication(response.data.applications)
      }

    } catch (error) {
      console.error("Error fetching applied jobs:", error)

    }

  }

  useEffect(() => {
    fetchMyAppliedJobs()
  }, [])

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6">

              {/* Avatar + Basic Info */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold">
                  {data?.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {data?.name}
                  </h2>
                  <p className="text-gray-500 capitalize">
                    {data?.role}
                  </p>
                </div>
              </div>

            </div>

            {/* Contact Info */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">

              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={18} />
                <span>{data?.email}</span>
              </div>


              {/* <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={18} />
              <span>{data?.location || "Not Provided"}</span>
            </div> */}

            </div>

          </div>

          {/* Applied Jobs Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Briefcase size={20} />
              Applied Jobs
            </h3>

            {application?.length > 0 ? (
              <div className="space-y-4">
                {application.map((app) => (
                  <div
                    key={app.id}
                    className="border p-4 rounded-lg hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-gray-800">
                      {app.Job.title}
                    </h4>
                    <p className="text-gray-600 text-sm flex items-center gap-2" >
                      <Building2 size={16} />
                      <span className="font-medium">{app.Job.company}</span>
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Status: {app.status || "Pending"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
            )}
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default UserProfile

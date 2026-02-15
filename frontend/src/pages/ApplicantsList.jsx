import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { APIAuthenticatedClient } from "../api";
import Layout from "../components/layout/Layout";

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([])

  const fetchApplications = async () => {
    try {
      const response = await APIAuthenticatedClient.get(`/application/${jobId}`)
      if (response.status === 200) {
        setApplications(response.data.applications)
        console.log("Applications fetched:", response.data.applications)
      }

    } catch (error) {
      console.error("Error fetching applications:", error)
    }

  }


  useEffect(() => {
    fetchApplications()
  }, [])


  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white shadow-md rounded-2xl p-6">

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Applicants for this Job
            </h2>

            {applications.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg">No applications found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                      <th className="px-6 py-3">User ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Applied At</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-t hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.User?.id}
                        </td>

                        <td className="px-6 py-4 font-medium text-gray-800">
                          {app.User?.name}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {app.User?.email}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${app.status === "Shortlisted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                              }`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center space-x-2">
                          <button className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                            Shortlist
                          </button>

                          <button className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition">
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default ApplicantsList

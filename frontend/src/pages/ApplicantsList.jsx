import { useParams } from "react-router-dom";
import { useEffect } from "react";

const ApplicantsList = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  

//   useEffect(() => {
//     dispatch(fetchApplicationsByJob(jobId));
//   }, [jobId]);

//   if (loading) return <p>Loading applicants...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Applicants for this Job
      </h2>

      {applications.length === 0 ? (
        <p>No applications found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Skills</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-t">
                <td>{app.applicant.name}</td>
                <td>{app.applicant.email}</td>
                <td>{app.applicant.skills?.join(", ")}</td>
                <td>{app.applicant.experience} yrs</td>
                <td>{app.status}</td>
                <td className="space-x-2">
                  <button className="text-green-600">
                    Shortlist
                  </button>
                  <button className="text-red-600">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ApplicantsList

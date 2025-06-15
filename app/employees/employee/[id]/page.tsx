import React from 'react'

async function EmployeeDetails(params: { params: { id: string } }) {
    const { id } = params.params;
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Employee Details for ID: {id}</h1>
        {/* Here you can fetch and display employee details based on the ID */}
        <p>Details for employee with ID: {id} will be displayed here.</p>
        {/* You can use a similar approach to fetch employee data as in the employees page */}
      
    </div>
  )
}

export default EmployeeDetails

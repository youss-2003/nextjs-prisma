import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function EmployeeDetails({ params }: Props) {
  const { id } = params;

  const employee = await prisma.employee.findUnique({
    where: { id: parseInt(id) },
  });

  if (!employee) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-2xl w-full p-6 space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={employee.photoUrl || `https://i.pravatar.cc/150?u=${employee.email}`}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-500">{employee.position}</p>
            <span className={`inline-block px-3 py-1 mt-1 text-sm rounded-full ${
              employee.status === 'active'
                ? 'bg-green-100 text-green-700'
                : employee.status === 'inactive'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {employee.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <div>
            <p className="font-medium text-gray-600">Email</p>
            <p>{employee.email}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Phone</p>
            <p>{employee.phoneNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">ID Card Number</p>
            <p>{employee.idCardNumber}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Department</p>
            <p>{employee.department || 'Not assigned'}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Salary</p>
            <p>${employee.salary.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Hired At</p>
            <p>{new Date(employee.hiredAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Created At</p>
            <p>{new Date(employee.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Last Updated</p>
            <p>{new Date(employee.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {employee.notes && (
          <div className="mt-4">
            <p className="font-medium text-gray-600">Notes</p>
            <p className="text-gray-700">{employee.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

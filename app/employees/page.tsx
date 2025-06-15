import { prisma } from '@/lib/db';
import { Employees } from '../types/types';
import { Eye, Pencil, Trash2 } from 'lucide-react'; // ✅ Import Lucide icons
import React from 'react';
import Link from 'next/link';

export default async function Page() {
  const employees: Employees[] = await prisma.employee.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="overflow-x-auto rounded border border-gray-300 shadow-sm bg-white">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="bg-gray-100 ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">ID</th>
              <th className="px-3 py-2 whitespace-nowrap">First Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Last Name</th>
              <th className="px-3 py-2 whitespace-nowrap">Email</th>
              <th className="px-3 py-2 whitespace-nowrap">ID Card</th>
              <th className="px-3 py-2 whitespace-nowrap">Position</th>
              <th className="px-3 py-2 whitespace-nowrap">Salary</th>
              <th className="px-3 py-2 whitespace-nowrap">Hired At</th>
              <th className="px-3 py-2 whitespace-nowrap">Updated At</th>
              <th className="px-3 py-2 whitespace-nowrap">Actions</th> 
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="*:text-gray-900 *:first:font-medium">
                <td className="px-3 py-2 whitespace-nowrap">{employee.id}</td>
                <td className="px-3 py-2 whitespace-nowrap">{employee.firstName}</td>
                <td className="px-3 py-2 whitespace-nowrap">{employee.lastName}</td>
                <td className="px-3 py-2 whitespace-nowrap">{employee.email}</td>
                <td className="px-3 py-2 whitespace-nowrap">{employee.idCardNumber}</td>
                <td className="px-3 py-2 whitespace-nowrap">{employee.position}</td>
                <td className="px-3 py-2 whitespace-nowrap">${employee.salary.toLocaleString()}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Date(employee.hiredAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Date(employee.updatedAt).toLocaleDateString()} | {new Date(employee.updatedAt).toLocaleTimeString()}
                </td>
                <td className="px-3 py-2 whitespace-nowrap flex gap-2">
                  <Link href={`employees/employee/${employee.id}`} className="text-blue-600 hover:text-blue-800" title="View">
                    <Eye size={18} />
                  </Link>
                  <button className="text-yellow-600 hover:text-yellow-800" title="Edit">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

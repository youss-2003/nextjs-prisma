// app/employees/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Plus, Edit, Eye, LoaderPinwheel } from "lucide-react"
import Link from "next/link"
import { DeleteEmployeeButton } from "@/AppComponents/DeleteEmployee"
import { Employees } from "../types/types"



export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employees[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/employees?query=${encodeURIComponent(searchTerm)}`)
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        console.error("Failed to fetch employees:", error)
      } finally {
        setLoading(false)
      }
    }

    //debounce to prevent too many requests while typing
    const timer = setTimeout(() => {
      fetchEmployees()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-yellow-100 text-yellow-800"
      case "terminated": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Employees</h1>
            <p className="text-sm text-muted-foreground">Manage your team members</p>
          </div>
          <Button asChild>
            <Link href="/employees/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees by name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="flex items-center justify-center h-full p-6">
              <LoaderPinwheel className="text-black animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                {/* Your existing card content */}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {employee.photoUrl ? (
                        <img
                          src={employee.photoUrl}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {employee.firstName[0]}
                          {employee.lastName[0]}
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">
                          {employee.firstName} {employee.lastName}
                        </CardTitle>
                        <CardDescription>{employee.position}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{employee.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="text-sm font-medium">{employee.department || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="text-sm font-medium">${employee.salary?.toLocaleString() || 0}</p>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/employees/employee/${employee.id}`}>
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/employees/employee/${employee.id}/edit`}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteEmployeeButton id={employee.id} employeeName={`${employee.firstName} ${employee.lastName}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && employees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No matching employees found' : 'No employees found'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
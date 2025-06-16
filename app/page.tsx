import { prisma } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, DollarSign, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"


export default async function Dashboard() {
  // Fetch all employees
  const employees = await prisma.employee.findMany({
    orderBy: { hiredAt: "desc" },
    take: 4, // Show latest 4
  })

  // Dashboard stats
  const totalEmployees = await prisma.employee.count()
  const newHires = await prisma.employee.count({
    where: {
      hiredAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), // last 30 days
      },
    },
  })
  const avgSalary = await prisma.employee.aggregate({
    _avg: { salary: true },
  })

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees.toString(),
      change: "+12%", 
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "New Hires",
      value: newHires.toString(),
      change: "+8%", 
      changeType: "positive" as const,
      icon: UserPlus,
    },
    {
      title: "Average Salary",
      value: `$${(avgSalary._avg.salary || 0).toFixed(0)}`,
      change: "+5.2%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Retention Rate",
      value: "94.2%", // Static 
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening.</p>
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
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Employees */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Hires</CardTitle>
            <CardDescription>Latest employees added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{employee.department || "N/A"}</Badge>
                    <Badge variant="outline">{employee.status}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/employees/employee${employee.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/employees">View All Employees</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

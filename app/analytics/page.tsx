import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Construction, Home, BarChart3, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Analytics</h1>
            <p className="text-sm text-muted-foreground">Employee insights and reports</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Illustration */}
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Construction illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Construction className="w-24 h-24 text-orange-500 animate-pulse" />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-orange-300 rounded-full animate-bounce" />
              <div className="absolute top-12 right-12 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100" />
              <div className="absolute bottom-16 left-16 w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200" />
              <div className="absolute bottom-8 right-8 w-5 h-5 bg-yellow-300 rounded-full animate-bounce delay-300" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <BarChart3 className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </div>
            <h2 className="text-xl text-muted-foreground">Under Construction</h2>
            
          </div>

          {/* Features Preview */}
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Coming Soon
              </CardTitle>
              <CardDescription>Features we're working on</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  Employee performance analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Department-wise insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Salary distribution charts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  Hiring trends and forecasts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full" />
                  Custom report generation
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/employees">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View Employees
              </Link>
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Development Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-0 animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">0% Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}
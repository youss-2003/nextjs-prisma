import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Settings, Home, Wrench, Clock, ArrowLeft, Cog } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
        title: "Dashboard Settings"
      }

export default function SettingsPage() {
    
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Settings</h1>
            <p className="text-sm text-muted-foreground">System configuration and preferences</p>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Illustration */}
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Settings illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Settings className="w-20 h-20 text-blue-500 animate-spin" style={{ animationDuration: "8s" }} />
                  <Cog
                    className="w-12 h-12 text-indigo-400 absolute -top-2 -right-2 animate-spin"
                    style={{ animationDuration: "6s", animationDirection: "reverse" }}
                  />
                  <Wrench className="w-8 h-8 text-blue-600 absolute -bottom-1 -left-1 animate-pulse" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-6 left-12 w-3 h-3 bg-blue-300 rounded-full animate-ping" />
              <div className="absolute top-16 right-8 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-100" />
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-blue-400 rounded-full animate-ping delay-200" />
              <div className="absolute bottom-6 right-16 w-2 h-2 bg-indigo-300 rounded-full animate-ping delay-300" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Settings className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Settings Panel</h1>
            </div>
            <h2 className="text-xl text-muted-foreground">Under Construction</h2>
            
          </div>

          {/* Features Preview */}
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                Coming Soon
              </CardTitle>
              <CardDescription>Configuration options we're building</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  User account management
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                  Theme and appearance settings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  Notification preferences
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  Data export configurations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full" />
                  Security and privacy controls
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Integration settings
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
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full w-0 animate-pulse" />
            </div>
            <p className="text-xs text-muted-foreground">0% Complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

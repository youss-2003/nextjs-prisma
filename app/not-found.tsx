import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-xl font-semibold">Employee Not Found</h2>
        <p className="text-muted-foreground">The employee you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/employees">Back to Employees</Link>
        </Button>
      </div>
    </div>
  )
}
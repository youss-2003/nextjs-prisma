"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, LoaderPinwheel, Plus, User, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function NewEmployeePage() {
  const router = useRouter()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    idCardNumber: "",
    position: "",
    department: "",
    salary: "",
    status: "active",
    notes: "",
    photoUrl: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create employee")
      }
  
      toast.success("Employee created successfully!")
      router.push("/employees")
    } catch (err: any) {
      toast.error(err.message || "Failed to create employee")
    } finally {
      setIsLoading(false)
    }
  }
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photoFile: file, photoUrl: "" }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoUrlChange = (url: string) => {
    handleInputChange("photoUrl", url)
    setFormData((prev) => ({ ...prev, photoFile: null }))
    if (url.trim()) {
      setPhotoPreview(url)
    } else {
      setPhotoPreview(null)
    }
  }

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photoUrl: "", photoFile: null }))
    setPhotoPreview(null)
  }
  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/employees">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Employees
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Add New Employee</h1>
              <p className="text-sm text-muted-foreground">
                Create a new employee record
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Upload a profile picture or provide a photo URL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photo Preview */}
                {photoPreview && (
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Photo preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                        onClick={removePhoto}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {!photoPreview && (
                  <div className="flex items-center justify-center w-32 h-32 mx-auto bg-gray-100 rounded-full border-2 border-dashed border-gray-300">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photoFile">Upload Photo</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="photoFile"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG, GIF (Max 5MB)</p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                {/* URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="photoUrl">Photo URL</Label>
                  <Input
                    id="photoUrl"
                    type="url"
                    value={formData.photoUrl}
                    onChange={(e) => handlePhotoUrlChange(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Provide a direct link to an image file</p>
                </div>
              </CardContent>
            </Card>
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Basic employee details</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idCardNumber">ID Card Number</Label>
                  <Input
                    id="idCardNumber"
                    value={formData.idCardNumber}
                    onChange={(e) => handleInputChange("idCardNumber", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Job-related details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleInputChange("department", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="HR">Human Resources</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Notes and comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Internal notes about the employee..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/employees">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <><LoaderPinwheel className="text-white animate-spin " /></>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Employee
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

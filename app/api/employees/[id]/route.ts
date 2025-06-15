import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error) {
    console.error("Failed to fetch employee:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(params.id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber || null,
        idCardNumber: body.idCardNumber,
        position: body.position,
        department: body.department,
        salary: body.salary,
        status: body.status,
        notes: body.notes || null,
      },
    })
    return NextResponse.json(updatedEmployee)
  } catch (error) {
    console.error("Failed to update employee:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}

export async function DELETE(request: Request,{ params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id)
      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
      }
  
      await prisma.employee.delete({
        where: { id },
      })
  
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("[EMPLOYEE_DELETE]", error)
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      )
    }
}

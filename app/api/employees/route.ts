import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { hiredAt: 'desc' },
    })
    return NextResponse.json(employees)
  } catch (error) {
    console.error('Failed to fetch employees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber || null,
        idCardNumber: body.idCardNumber,
        position: body.position,
        department: body.department,
        salary: parseFloat(body.salary),
        status: body.status,
        notes: body.notes || null,
      },
    })
    return NextResponse.json(newEmployee, { status: 201 })
  } catch (error) {
    console.error('Failed to create employee:', error)
    return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
  }
}
// app/api/profile/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst()
    if (!profile) {
      profile = await prisma.profile.create({ data: {} })
    }
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    let profile = await prisma.profile.findFirst()

    if (!profile) {
      profile = await prisma.profile.create({ data: body })
    } else {
      profile = await prisma.profile.update({ where: { id: profile.id }, data: body })
    }

    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}

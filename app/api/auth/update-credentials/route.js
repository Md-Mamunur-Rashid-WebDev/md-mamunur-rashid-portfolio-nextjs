// app/api/auth/update-credentials/route.js
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { type } = body

    // Get current user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (type === 'email') {
      const { newEmail } = body

      if (!newEmail || !newEmail.includes('@')) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
      }

      // Check if email already taken
      const existing = await prisma.user.findUnique({ where: { email: newEmail } })
      if (existing && existing.id !== user.id) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { email: newEmail },
      })

      return NextResponse.json({ message: 'Email updated successfully' })
    }

    if (type === 'password') {
      const { currentPassword, newPassword } = body

      if (!currentPassword || !newPassword) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
      }

      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }

      // Hash new password
      const hashed = await bcrypt.hash(newPassword, 12)

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashed },
      })

      return NextResponse.json({ message: 'Password updated successfully' })
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

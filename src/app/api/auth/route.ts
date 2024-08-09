// src/app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import crypto from 'crypto'

// Create a PostgreSQL connection pool
const pool = new Pool({
    host: '192.168.0.148',
    database: 'insync',
    user: 'web',
    password: 'qey8xUf9',
    port: 5432,
})

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const u = searchParams.get('u')
    const p = searchParams.get('p')
    const action = searchParams.get('action')
    const permission = searchParams.get('permission')

    if (u && p && action === 'checkpermission' && permission) {
        const username = Buffer.from(u, 'base64').toString()
        const password = Buffer.from(p, 'base64').toString()
        const result = await validateUser(username, password)
        if (result && result[permission]) {
            return NextResponse.json({ result: true })
        } else {
            return NextResponse.json({ result: false })
        }
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    if (body.action === 'login') {
        const { username, password } = body
        const result = await validateLogin(username, password)
        if (result) {
            return NextResponse.json({ success: true, permissions: result })
        } else {
            return NextResponse.json({ success: false }, { status: 401 })
        }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

async function validateUser(username: string, password: string) {
    // For now, we'll just call validateLogin
    // In a real application, you might want to implement this differently
    return await validateLogin(username, password)
}

async function validateLogin(username: string, password: string) {
    const client = await pool.connect()
    try {
        const result = await client.query(
            'SELECT u.pass, u.salt FROM users u WHERE u.name=$1 AND EXISTS (SELECT name FROM permissions p WHERE p.user_id=u.id AND name=\'enabled\')',
            [username]
        )

        if (result.rows.length === 0) {
            await logInvalid(username)
            return false
        }

        const { pass, salt } = result.rows[0]
        const hash = crypto.createHash('sha256').update(salt + crypto.createHash('sha256').update(password).digest('hex')).digest('hex')

        if (hash !== pass) {
            await logInvalid(username)
            return false
        }

        return getUserPermissions(username)
    } finally {
        client.release()
    }
}

async function getUserPermissions(username: string) {
    const client = await pool.connect()
    try {
        const result = await client.query(
            'SELECT p.name FROM users u INNER JOIN permissions p ON u.id = p.user_id WHERE u.name=$1',
            [username]
        )

        const permissionsArray: Record<string, boolean> = {}
        result.rows.forEach(row => {
            permissionsArray[row.name] = true
        })

        permissionsArray.username = username

        return permissionsArray
    } finally {
        client.release()
    }
}

async function logInvalid(username: string) {
    const client = await pool.connect()
    try {
        await client.query('DELETE FROM invalid_logins WHERE ctid NOT IN (SELECT ctid FROM invalid_logins ORDER BY timestamp DESC LIMIT 30)')
        await client.query(
            'INSERT INTO invalid_logins (timestamp, user, ip) VALUES (NOW() AT TIME ZONE \'UTC\', $1, $2)',
            [username.substring(0, 40), 'API_REQUEST'] // Replace 'API_REQUEST' with actual IP if available
        )
    } finally {
        client.release()
    }
}
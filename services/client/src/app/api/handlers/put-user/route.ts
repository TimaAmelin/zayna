import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    const { id, username, from } = await req.json()

    try {
        const response = await fetch('http://host.docker.internal:8000/login/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, username, from
            })
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

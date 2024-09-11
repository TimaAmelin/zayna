import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    const { id, username, from, avatar } = await req.json()

    try {
        const response = await fetch('http://web:8000/login/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id, username, from, photo: avatar
            })
        });

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

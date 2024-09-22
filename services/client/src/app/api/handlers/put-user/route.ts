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

        try {
            const res = await response.json();

            console.log('user', res)
            return NextResponse.json({ success: true, response: res })
        } catch (error) {
            return NextResponse.json({ success: true, response: { presents: [] } })
        }
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

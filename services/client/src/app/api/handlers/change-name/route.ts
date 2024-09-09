import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id, name } = await req.json()
    try {
        const response = await fetch(`http://web:8000/change_name/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            body: JSON.stringify({
                id,
                name,
            })
        });

        const res = await response.json();

        return NextResponse.json({ success: true, response: res })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id, task } = await req.json()

    try {
        const response = await fetch(`http://web:8000/network/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                network: task,
            })
        });

        console.log(response)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

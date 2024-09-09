import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    const { id, tokensPerHalfSecond } = await req.json()

    try {
        const response = await fetch('http://web:8000/tokens_batch/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                tokens_count: tokensPerHalfSecond,
            })
        });

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { board, id } = await req.json()

    try {
        const response = await fetch('http://web:8000/tic_tac_toe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                field: board,
                id,
            })
        });

        const res = await response.json();

        console.log('tictactoe', { success: true, response: res });

        return NextResponse.json({ success: true, response: res })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

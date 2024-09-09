import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id, giftId } = await req.json();

    try {
        const response = await fetch(`http://web:8000/present/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            body: JSON.stringify({
                user_id: id,
                present_id: giftId,
            })
        });

        console.log(await response.text())

        const res = await response.json();

        console.log(res);

        return NextResponse.json({ success: true, response: res })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

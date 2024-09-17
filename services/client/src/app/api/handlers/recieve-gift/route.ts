import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { id, giftId } = await req.json();

    console.log('GIFFFFFT', id, giftId);

    try {
        const response = await fetch(`http://web:8000/present/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
            body: JSON.stringify({
                user_id: id,
                present_id: id,
            })
        });

        console.log('GIFFFFFT', response);

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

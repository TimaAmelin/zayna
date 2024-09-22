import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {
        const response = await fetch(`http://web:8000/network/${id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        })

        const res = await response.json();

        console.log('res', res);

        return NextResponse.json({ success: true, response: res })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const { id, projectId, recieverId } = await req.json();

    try {
        const response = await fetch('http://web:8000/present/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender_id: id,
                project_id: projectId,
                receiver_id: recieverId,
            })
        });

        const res = await response.json();

        return NextResponse.json({ success: true, response: res });
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

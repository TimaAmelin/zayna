import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    const { id, projectId } = await req.json();

    try {
        const response = await fetch('http://web:8000/participate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: id,
                project_id: projectId,
            })
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 })
    }
}

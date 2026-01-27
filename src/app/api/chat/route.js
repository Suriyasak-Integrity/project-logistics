export const dynamic = "force-dynamic";

export async function POST(req) {
    const body = await req.json();
    const { message } = body;

    if (!message) {
        return Response.json({ error: "No message" }, { status: 400 });
    }

    // ตัวอย่างตอบกลับแบบ mock (ยังไม่เรียก AI)
    return Response.json({
        reply: `คุณพิมพ์ว่า: ${message}`,
    });
}

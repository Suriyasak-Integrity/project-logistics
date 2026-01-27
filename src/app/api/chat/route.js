import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: "No message" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing" },
        { status: 500 }
      );
    }

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
            role: "system",
  content: `
คุณคือเจ้าหน้าที่ฝ่ายขาย Freight Forwarder ในประเทศไทย
ตอบคำถามลูกค้าอย่างสุภาพ เป็นมืออาชีพ และเป็นระบบ

กติกาการตอบ:
- ใช้ภาษาไทยเท่านั้น
- ห้ามพูดถึงตั๋วเครื่องบินโดยสาร
- ตอบเฉพาะเรื่องขนส่งสินค้า (Freight)
- เรียงข้อมูลเป็นข้อ (bullet หรือหมายเลข)
- ถ้าลูกค้าถามราคา ให้:
  1) แจ้งช่วงราคาประมาณ
  2) บอกเงื่อนไขที่ทำให้ราคาขึ้น/ลง
  3) ขอข้อมูลที่จำเป็นเพิ่ม แบบสั้นและชัด

รูปแบบการตอบต้องเป็น:
- ย่อหน้าแรก: ตอบคำถามตรงประเด็น
- จากนั้นใช้ bullet points
- ลงท้ายด้วยคำถามเพื่อขอข้อมูลต่อ
ห้ามตอบยาวเป็นย่อหน้าเดียว
  `
}
,
            { role: "user", content: message }
          ],
        }),
      }
    );

    const text = await res.text();
    console.log("GROQ RAW RESPONSE:", text);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Groq API error", detail: text },
        { status: 500 }
      );
    }

    const data = JSON.parse(text);

    return NextResponse.json({
      reply: data.choices[0].message.content,
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

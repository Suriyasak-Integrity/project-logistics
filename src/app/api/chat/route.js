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
          You are a logistics and freight forwarding assistant in Thailand.
          You only answer about cargo shipping, air freight, sea freight, land transport,
          customs clearance, and logistics services.
          Do NOT answer about passenger flights or airplane tickets.
          Always ask for cargo details if price is requested.
          Reply in Thai language.
              `
            },
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

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return Response.json({ error: "No message" }, { status: 400 });
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful logistics assistant for a freight forwarder in Thailand. Answer clearly and professionally.",
        },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await res.json();

  return Response.json({
    reply: data.choices?.[0]?.message?.content || "AI ไม่ตอบ",
  });
}

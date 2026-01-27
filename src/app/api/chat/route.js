export const dynamic = "force-dynamic";

export async function POST(req) {
  const { message } = await req.json();

  if (!message) {
    return Response.json({ error: "No message" }, { status: 400 });
  }

  const res = await fetch("https://api.kernel.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.KERNEL_API_KEY}`,
    },
    body: JSON.stringify({
      model: "kernel-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a professional logistics assistant for a freight forwarder in Thailand. Answer clearly and politely.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return Response.json(
      { error: "Kernel API error", detail: err },
      { status: 500 }
    );
  }

  const data = await res.json();

  return Response.json({
    reply: data.choices?.[0]?.message?.content || "AI ไม่ตอบ",
  });
}

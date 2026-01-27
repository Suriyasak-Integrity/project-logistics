"use client";

import { useState } from "react";

export default function ChatbotWidget() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message) return;

    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-lg p-4 border z-50">
      <h3 className="font-bold mb-2">Chat with us</h3>

      <div className="text-sm text-gray-600 mb-2 min-h-[40px]">
        {reply || "พิมพ์ข้อความเพื่อเริ่มคุย"}
      </div>

      <input
        className="w-full border rounded px-2 py-1 mb-2 text-sm"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="พิมพ์ข้อความ..."
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="w-full bg-secondary text-white py-1 rounded text-sm"
      >
        {loading ? "กำลังส่ง..." : "ส่ง"}
      </button>
    </div>
  );
}

export async function GET() {
    return new Response(
        JSON.stringify({
            chatbotId: process.env.NEXT_PUBLIC_CHATBOT_ID,
            hasKernelKey: !!process.env.KERNEL_API_KEY,
        }),
        { headers: { "Content-Type": "application/json" } }
    );
}

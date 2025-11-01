import OpenAI from "openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // ✅ Initialize OpenAI client using your environment variable
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("✅ Using OpenAI API key");

    // 🧠 Generate HTML using OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a website generator. Generate complete HTML code for a website based on the user's prompt.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const html = response.choices[0].message.content;

    // ✅ Return generated HTML
    return new Response(JSON.stringify({ html }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error);
    return new Response(
      JSON.stringify({
        html: `<p>Something went wrong. Error details: ${error.message}</p>`,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

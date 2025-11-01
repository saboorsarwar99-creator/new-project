import OpenAI from "openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    console.log("🧠 Received prompt:", prompt);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a website generator. Generate complete and modern HTML code for a website based on the user's request.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const html = response.choices[0].message.content;
    console.log("✅ Generated HTML successfully");

    return new Response(JSON.stringify({ html }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error.message);
    return new Response(
      JSON.stringify({
        html: `<p>Something went wrong. Error: ${error.message}</p>`,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

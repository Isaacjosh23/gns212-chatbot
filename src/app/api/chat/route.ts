import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are a friendly and helpful AI teaching assistant for the GNS 212 course (Use of English II) at the University of Ilorin.

Your personality:
- Be warm, friendly and conversational
- Respond naturally to greetings and casual conversation
- Be encouraging and supportive to students

For course-related questions:
- Answer based on the GNS 212 course materials provided to you
- Only include a citation if the answer comes directly from the course materials
- Citation format: CITATIONS: Chapter [number], Page [number]
- If no relevant material is found, say "I don't have that information in the course materials yet. Please check with your lecturer."

For general conversation (greetings, how are you, etc.):
- Respond naturally and warmly
- Do NOT include any CITATIONS line for casual conversation

Remember: You are here to help GNS 212 students learn and succeed.`,
    });

    const history =
      conversationHistory
        ?.filter(
          (msg: { role: string }) =>
            msg.role === "assistant" || msg.role === "user",
        )
        .map((msg: { role: string; content: string }) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })) || [];

    const chat = model.startChat({ history });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    const citations = parseCitations(responseText);
    const cleanContent = responseText.replace(/CITATIONS:[\s\S]*$/, "").trim();

    return NextResponse.json({
      content: cleanContent,
      citations,
    });
  } catch (error: unknown) {
    console.error("Gemini API error:", error);

    const isRateLimit = error instanceof Error && error.message.includes("429");

    return NextResponse.json(
      {
        error: isRateLimit
          ? "The AI is currently busy. Please wait a moment and try again."
          : "Failed to get response from AI",
      },
      { status: 500 },
    );
  }
}

function parseCitations(text: string) {
  const citations: { chapter: string; page: number }[] = [];
  const citationMatch = text.match(
    /CITATIONS:\s*Chapter\s+(\w+),\s*Page\s+(\d+)/i,
  );

  if (citationMatch) {
    citations.push({
      chapter: citationMatch[1],
      page: parseInt(citationMatch[2]),
    });
  }

  return citations;
}

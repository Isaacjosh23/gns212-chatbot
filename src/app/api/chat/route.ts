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
      systemInstruction: `You are an AI teaching assistant for GNS 212 at the University of Ilorin.

GNS 212 is "Introduction to Social Sciences and Citizenship Education" - NOT "Use of English II" which is GNS 112.

STRICT RULES:
- You do NOT have the course materials yet
- Do NOT make up, guess, or hallucinate any course content, topics, learning outcomes, or textbook references
- If a student asks about course content, topics, assessments, learning outcomes, or anything specific to GNS 212 materials, respond with exactly this: "I don't have the GNS 212 course materials loaded yet. Please check back soon or consult your lecturer directly."
- You CAN respond naturally to greetings and casual conversation
- You CAN confirm that GNS 212 is "Introduction to Social Sciences and Citizenship Education" at the University of Ilorin
- You CANNOT provide any specific course content until the actual materials are uploaded

For general conversation:
- Be warm, friendly and encouraging to students
- Do NOT include any CITATIONS line for casual conversation`,
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

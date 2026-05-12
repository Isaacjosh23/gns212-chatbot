import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  let message = "";

  try {
    const body = await request.json();
    message = body.message;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `Generate a very short, descriptive title (max 4 words) for a conversation that starts with this message: "${message}". 
      Examples: "Morning greetings", "Exchange pleasantries", "GNS 212 assessment help", "Course learning outcomes".
      Return ONLY the title, nothing else. No punctuation at the end.`,
    );

    const title = result.response.text().trim();

    return NextResponse.json({ title });
  } catch (error) {
    console.error("Title generation error:", error);
    return NextResponse.json(
      { title: message.substring(0, 30) },
      { status: 500 },
    );
  }
}

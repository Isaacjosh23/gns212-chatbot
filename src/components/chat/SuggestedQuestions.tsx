"use client";

import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

export function SuggestedQuestions({
  questions,
  onSelectQuestion,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
      {questions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onSelectQuestion(question)}
          className="text-xl border-[var(--navy)] text-foreground hover:bg-transparent hover:border-white hover:text-white cursor-pointer py-1.5 sm:py-2"
        >
          {question}
        </Button>
      ))}
    </div>
  );
}

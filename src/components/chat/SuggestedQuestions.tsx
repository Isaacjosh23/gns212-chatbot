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
    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
      {questions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onSelectQuestion(question)}
          className="text-xs sm:text-sm md:text-base lg:text-lg border-[var(--navy-mid)] text-[var(--navy-mid)] hover:bg-[var(--gold-light)] hover:border-[var(--gold)] cursor-pointer"
        >
          {question}
        </Button>
      ))}
    </div>
  );
}

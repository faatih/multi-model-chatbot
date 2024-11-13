"use client";

import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ModelResponse } from "@/lib/types";
import { Bot, Sparkles } from "lucide-react";

interface ResponseComparisonProps {
  responses: ModelResponse[];
}

export function ResponseComparison({ responses }: ResponseComparisonProps) {
  if (!responses.length) return null;

  return (
    <Card className="p-4">
      <Tabs defaultValue={responses[0].model}>
        <TabsList className="mb-4">
          {responses.map((response) => (
            <TabsTrigger key={response.model} value={response.model}>
              {response.model}
            </TabsTrigger>
          ))}
        </TabsList>
        {responses.map((response) => (
          <TabsContent key={response.model} value={response.model}>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 p-1">
                  <Bot className="h-full w-full" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">{response.model}</span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{response.content}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Response Quality</span>
                  <span>{Math.round(response.quality * 100)}%</span>
                </div>
                <Progress value={response.quality * 100} />
                <div className="flex items-center justify-between text-sm">
                  <span>Confidence</span>
                  <span>{Math.round(response.confidence * 100)}%</span>
                </div>
                <Progress value={response.confidence * 100} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
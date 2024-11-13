"use client";

import { useChatStore } from "@/lib/store";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function ModelSettings() {
  const { models, toggleModel, updateModelConfig } = useChatStore();

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-lg font-semibold">Model Settings</h2>
      {models.map((model) => (
        <div key={model.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${model.id}-toggle`}>{model.name}</Label>
            <Switch
              id={`${model.id}-toggle`}
              checked={model.enabled}
              onCheckedChange={() => toggleModel(model.id)}
            />
          </div>
          <div className="space-y-2">
            <Label>Temperature: {model.temperature}</Label>
            <Slider
              value={[model.temperature]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]) =>
                updateModelConfig(model.id, { temperature: value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Max Tokens: {model.maxTokens}</Label>
            <Slider
              value={[model.maxTokens]}
              min={100}
              max={4000}
              step={100}
              onValueChange={([value]) =>
                updateModelConfig(model.id, { maxTokens: value })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
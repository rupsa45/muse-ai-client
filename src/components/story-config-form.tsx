"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wand2, Sparkles } from "lucide-react"

interface StoryConfig {
  prompt: string
  userId: string
}

interface StoryConfigFormProps {
  storyConfig: StoryConfig
  setStoryConfig: (config: StoryConfig | ((prev: StoryConfig) => StoryConfig)) => void
  onStartStory: (payload: StoryConfig) => void
  isLoading: boolean
  userId: string
}

export function StoryConfigForm({ storyConfig, setStoryConfig, onStartStory, isLoading, userId }: StoryConfigFormProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Create New Story
        </div>
        <h1 className="text-4xl font-bold mb-4">Begin Your Adventure</h1>
        <p className="text-xl text-muted-foreground">
          Just give the AI a prompt and let it build your story world
        </p>
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle>Story Prompt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Your Prompt</Label>
            <Input
              id="prompt"
              placeholder="e.g., A young hero ventures into a cursed forest..."
              value={storyConfig.prompt}
              onChange={(e) => setStoryConfig((prev) => ({ ...prev, prompt: e.target.value }))}
              className="bg-input border-border focus:border-primary focus:ring-primary/20"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={() => onStartStory({ ...storyConfig, userId })}
              disabled={!storyConfig.prompt || isLoading}
              className="w-full cursor-pointer"
              size="lg"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isLoading ? "Starting Story..." : "Generate Story"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Wand2, Sparkles } from "lucide-react"

interface StoryConfig {
  title: string
  mode: string
  style: string
  userId: string
}

interface StoryConfigFormProps {
  storyConfig: StoryConfig
  setStoryConfig: (config: StoryConfig | ((prev: StoryConfig) => StoryConfig)) => void
  onStartStory: () => void
  isLoading: boolean
}

export function StoryConfigForm({ storyConfig, setStoryConfig, onStartStory, isLoading }: StoryConfigFormProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Create New Story
        </div>
        <h1 className="text-4xl font-bold mb-4 text-balance">Begin Your Adventure</h1>
        <p className="text-xl text-muted-foreground text-balance">
          Configure your story settings and let the AI help you craft an epic tale
        </p>
      </div>

      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Story Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              placeholder="Enter your story title (e.g., The Whispering Forest)"
              value={storyConfig.title}
              onChange={(e) => setStoryConfig((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-input border-border focus:border-primary focus:ring-primary/20"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mode">Story Mode</Label>
              <Select onValueChange={(value) => setStoryConfig((prev) => ({ ...prev, mode: value }))}>
                <SelectTrigger className="bg-input border-border focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Story">Interactive Story</SelectItem>
                  <SelectItem value="Adventure">Choose Your Adventure</SelectItem>
                  <SelectItem value="Collaborative">Collaborative Writing</SelectItem>
                  <SelectItem value="Guided">Guided Narrative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Fantasy Style</Label>
              <Select onValueChange={(value) => setStoryConfig((prev) => ({ ...prev, style: value }))}>
                <SelectTrigger className="bg-input border-border focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fantasy">High Fantasy</SelectItem>
                  <SelectItem value="Urban Fantasy">Urban Fantasy</SelectItem>
                  <SelectItem value="Dark Fantasy">Dark Fantasy</SelectItem>
                  <SelectItem value="Epic Fantasy">Epic Fantasy</SelectItem>
                  <SelectItem value="Fairy Tale">Fairy Tale</SelectItem>
                  <SelectItem value="Mythology">Mythology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={onStartStory}
              disabled={!storyConfig.title || !storyConfig.mode || !storyConfig.style || isLoading}
              className="w-full"
              size="lg"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isLoading ? "Starting Story..." : "Start Crafting Story"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Templates */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-center">Quick Start Templates</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() =>
              setStoryConfig((prev) => ({
                ...prev,
                title: "The Dragon's Quest",
                mode: "Adventure",
                style: "Epic Fantasy",
              }))
            }
          >
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Wand2 className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium">Epic Quest</h4>
              <p className="text-xs text-muted-foreground">Dragons, heroes, magic</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-accent/50 transition-colors"
            onClick={() =>
              setStoryConfig((prev) => ({
                ...prev,
                title: "City of Shadows",
                mode: "Story",
                style: "Urban Fantasy",
              }))
            }
          >
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <h4 className="font-medium">Urban Magic</h4>
              <p className="text-xs text-muted-foreground">Modern world, hidden magic</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() =>
              setStoryConfig((prev) => ({
                ...prev,
                title: "The Enchanted Forest",
                mode: "Collaborative",
                style: "Fairy Tale",
              }))
            }
          >
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium">Fairy Tale</h4>
              <p className="text-xs text-muted-foreground">Classic magical stories</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

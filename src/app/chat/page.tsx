"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Wand2, Send, Plus, BookOpen, Sparkles, User, Bot, Settings, Download, Share } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface StoryConfig {
  title: string
  mode: string
  style: string
  userId: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showNewStory, setShowNewStory] = useState(true)
  const [storyId, setStoryId] = useState<string>("")
  const [storyConfig, setStoryConfig] = useState<StoryConfig>({
    title: "",
    mode: "",
    style: "",
    userId: "c5832535-10ca-4c23-b5f2-a6591d7507e4", // This would come from auth
  })

  const handleStartStory = async () => {
    if (!storyConfig.title || !storyConfig.mode || !storyConfig.style) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/story/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(storyConfig),
      })

      const data = await response.json()

      if (data.success) {
        setStoryId(data.storyId)
        setShowNewStory(false)

        const welcomeMessage: Message = {
          id: Date.now().toString(),
          type: "ai",
          content: data.message,
          timestamp: new Date(),
        }
        setMessages([welcomeMessage])
      } else {
        console.error("Failed to start story:", data.error)
        // You could add toast notification here
      }
    } catch (error) {
      console.error("Error starting story:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !storyId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/story/continue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          storyId: storyId,
          config: storyConfig,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        console.error("Failed to continue story:", data.error)
        // You could add toast notification here
      }
    } catch (error) {
      console.error("Error continuing story:", error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (showNewStory) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">StoryWeaver</span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* New Story Form */}
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
                  onClick={handleStartStory}
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">StoryWeaver</span>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {storyConfig.style}
              </Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-medium">{storyConfig.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowNewStory(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "ai" && (
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[80%] ${message.type === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.type === "user" && (
                  <Avatar className="h-8 w-8 bg-accent/10">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-accent" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">AI is crafting your story...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                placeholder="Continue your story... (Press Enter to send)"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-input border-border focus:border-primary focus:ring-primary/20 min-h-[44px]"
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} size="lg" className="px-4">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{inputMessage.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, UserIcon, BotIcon, History, Plus,ArrowRightToLine } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface StoryConfig {
  prompt: string
  userId: string
}

interface ChatInterfaceProps {
  messages: Message[]
  inputMessage: string
  setInputMessage: (message: string) => void
  onSendMessage: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isLoading: boolean
  storyConfig: StoryConfig
  userName: string
  onShowHistory: () => void
  onShowNewStory: () => void
  onLogout: () => void
}

export function ChatInterface({
  messages,
  inputMessage,
  setInputMessage,
  onSendMessage,
  onKeyPress,
  isLoading,
  storyConfig,
  userName,
  onShowHistory,
  onShowNewStory,
  onLogout,
}: ChatInterfaceProps) {
  const formatStoryContent = (content: string) => {
    // Split content into paragraphs and clean up spacing
    const paragraphs = content
      .split(/\n\s*\n|\. {2,}/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    return paragraphs
  }
  const isStoryContent = (message: Message) => {
    return message.type === "ai" && message.content.length > 200
  }
  return (
     <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <svg
                className="h-6 w-6 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="font-bold text-lg">StoryWeaver</span>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Story Mode
              </Badge>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-medium">
                {storyConfig.prompt
                  ? storyConfig.prompt.slice(0, 50) + (storyConfig.prompt.length > 50 ? "..." : "")
                  : "New Story"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onShowHistory}>
              <History className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onShowNewStory}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <ArrowRightToLine className="h-4 w-4" />
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
                      <BotIcon className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className={`max-w-[85%] ${message.type === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-lg px-4 py-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-card border border-border"
                    }`}
                  >
                    {isStoryContent(message) ? (
                      <div className="prose prose-sm max-w-none">
                        <div className="space-y-4">
                          {formatStoryContent(message.content).map((paragraph, index) => (
                            <p
                              key={index}
                              className="text-base leading-relaxed text-foreground font-serif text-pretty"
                              style={{ textIndent: index > 0 ? "1.5em" : "0" }}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {message.type === "user" && (
                  <Avatar className="h-8 w-8 bg-accent/10">
                    <AvatarFallback>
                      <UserIcon className="h-4 w-4 text-accent" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <Avatar className="h-8 w-8 bg-primary/10">
                  <AvatarFallback>
                    <BotIcon className="h-4 w-4 text-primary" />
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
                onKeyPress={onKeyPress}
                className="bg-input border-border focus:border-primary focus:ring-primary/20 min-h-[44px]"
                disabled={isLoading}
              />
            </div>
            <Button onClick={onSendMessage} disabled={!inputMessage.trim() || isLoading} size="lg" className="px-4">
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

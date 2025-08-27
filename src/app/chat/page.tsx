"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Wand2, SettingsIcon, UserIcon, History, ArrowRightToLine } from "lucide-react"
import { StoryConfigForm } from "@/components/story-config-form"
import { ChatInterface } from "@/components/chat-interface"
import { StoryHistory } from "@/components/story-history"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface StoryConfig {
  prompt: string   // ✅ only prompt now
  userId: string
}


interface AuthenticatedUser {
  id: string
  name: string
  email: string
}

interface StoryDraft {
  id: string
  title: string
  content: string
  mode: string
  style: string
  user: any
  userId: string
  createdAt: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showNewStory, setShowNewStory] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [storyHistory, setStoryHistory] = useState<StoryDraft[]>([])
  const [selectedStory, setSelectedStory] = useState<StoryDraft | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)
  const [storyId, setStoryId] = useState<string>("")
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const router = useRouter()

  const [storyConfig, setStoryConfig] = useState<StoryConfig>({
    prompt: "",
    userId: "",
  })

  const fetchStoryHistory = async () => {
    if (!user?.id) return

    setHistoryLoading(true)
    try {
      const token = localStorage.getItem("authToken")
      // ✅ safer if backend route is changed to /drafts/user/{id}
      const response = await fetch(`http://localhost:8000/drafts/${user.id}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStoryHistory(data)
      } else {
        console.error("Failed to fetch story history")
      }
    } catch (error) {
      console.error("Error fetching story history:", error)
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleDeleteStory = async (storyId: string) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`http://localhost:8000/drafts/draft/${storyId}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (response.ok) {
        setStoryHistory((prev) => prev.filter((story) => story.id !== storyId))
      } else {
        console.error("Failed to delete story")
      }
    } catch (error) {
      console.error("Error deleting story:", error)
    }
  }

  const handleShowHistory = () => {
    setShowHistory(true)
    setShowNewStory(false)
    fetchStoryHistory()
  }

  const handleShowNewStory = () => {
    setShowNewStory(true)
    setShowHistory(false)
    setSelectedStory(null)
  }

  const handleBackToChat = () => {
    setShowHistory(false)
    setSelectedStory(null)
  }

  const handleStartStory = async () => {
    if (!storyConfig.prompt) return   // ✅ only check prompt

    setIsLoading(true)

    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch("http://localhost:8000/stories/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(storyConfig),   // ✅ now only prompt + userId
      })

      const data = await response.json()

      if (response.ok && data.message === "Story generated successfully") {
        setStoryId(data.draft.id)
        setShowNewStory(false)

        const welcomeMessage: Message = {
          id: Date.now().toString(),
          type: "ai",
          content: data.draft.content,
          timestamp: new Date(data.draft.createdAt),
        }
        setMessages([welcomeMessage])
      } else {
        console.error("Failed to start story:", data.detail || data.message)
      }
    } catch (error) {
      console.error("Error starting story:", error)
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
      const token = localStorage.getItem("authToken")
      // ✅ changed to /stories/revise
      const response = await fetch("http://localhost:8000/drafts/revise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          draftId: storyId,      // ✅ backend expects draftId not storyId
          message: currentMessage,
          userId: storyConfig.userId,
        }),
      })

      const data = await response.json()

      if (response.ok && data.message) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: data.draft?.content || data.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        console.error("Failed to revise story:", data.detail || data.error)
      }
    } catch (error) {
      console.error("Error revising story:", error)
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

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("rememberMe")
    router.push("/login")
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken")

      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setStoryConfig((prev) => ({ ...prev, userId: userData.id }))
        } else {
          localStorage.removeItem("authToken")
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      } finally {
        setAuthLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary animate-spin" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    )
  }

  if (showHistory) {
    return (
      <StoryHistory
        storyHistory={storyHistory}
        selectedStory={selectedStory}
        setSelectedStory={setSelectedStory}
        historyLoading={historyLoading}
        userName={user?.name || ""}
        onBack={handleBackToChat}
        onShowNewStory={handleShowNewStory}
        onLogout={handleLogout}
        onDeleteStory={handleDeleteStory}
      />
    )
  }

  if (showNewStory) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">StoryWeaver</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden md:block">Welcome, {user?.name}</span>
              <Button variant="ghost" className="cursor-pointer" size="sm" onClick={handleShowHistory}>
                <History className="h-4 w-4" />
              </Button>
              {/* <Button variant="ghost" size="sm">
                <SettingsIcon className="h-4 w-4" />
              </Button> */}
              <Button variant="ghost" className=" cursor-pointer" size="sm" onClick={handleLogout}>
                {/* <UserIcon className="h-4 w-4" /> */}
                <ArrowRightToLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <StoryConfigForm
          storyConfig={storyConfig}
          setStoryConfig={setStoryConfig}
          onStartStory={handleStartStory}
          isLoading={isLoading}
        />
      </div>
    )
  }

  return (
    <ChatInterface
      messages={messages}
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      onSendMessage={handleSendMessage}
      onKeyPress={handleKeyPress}
      isLoading={isLoading}
      storyConfig={storyConfig}
      userName={user?.name || ""}
      onShowHistory={handleShowHistory}
      onShowNewStory={handleShowNewStory}
      onLogout={handleLogout}
    />
  )
}

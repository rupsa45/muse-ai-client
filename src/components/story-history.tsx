"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Wand2,BotIcon, BookOpen, History, Send, ArrowLeft, Calendar, Plus, ArrowRightToLine, Trash2 } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
interface StoryDraft {
  id: string
  title: string
  content: string
  prompt: string        // ✅ include the user’s original prompt
  userId: string | null
  createdAt: string
}


interface StoryHistoryProps {
  storyHistory: StoryDraft[]
  selectedStory: StoryDraft | null
  setSelectedStory: (story: StoryDraft | null) => void
  historyLoading: boolean
  userName: string
  onShowNewStory: () => void
  onLogout: () => void
  onDeleteStory: (storyId: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  isLoading: boolean
}

export function StoryHistory({
  storyHistory,
  selectedStory,
  setSelectedStory,
  historyLoading,
  userName,
  onShowNewStory,
  onLogout,
  onDeleteStory,
  onSendMessage,
  onKeyPress,
  inputMessage,
  setInputMessage,
  isLoading,
}: StoryHistoryProps) {
  const [deletingStoryId, setDeletingStoryId] = useState<string | null>(null)
  const handleDeleteStory = async (storyId: string) => {
    setDeletingStoryId(storyId)
    try {
      await onDeleteStory(storyId)
      if (selectedStory?.id === storyId) {
        setSelectedStory(null)
      }
    } finally {
      setDeletingStoryId(null)
    }
  }

  const handleLocalSend = () => {
    if (!inputMessage.trim() || isLoading) return
    onSendMessage() // call ChatPage handler
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">StoryWeaver</span>
            </Link>
            <Badge variant="secondary" className="text-xs">
              <History className="h-3 w-3 mr-1" />
              Story History
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:block">Welcome, {userName}</span>
            <Button variant="ghost" className="cursor-pointer" size="sm" onClick={onShowNewStory}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="cursor-pointer" size="sm" onClick={onLogout}>
              <ArrowRightToLine className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {selectedStory ? (
          // Story Detail View
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedStory(null)}
                className="cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to History
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Story
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Story</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{selectedStory.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDeleteStory(selectedStory.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={deletingStoryId === selectedStory.id}
                    >
                      {deletingStoryId === selectedStory.id ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Card className="border-border/50 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedStory.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      {new Date(selectedStory.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardContent>
                  <div className="mb-4 p-3 rounded-md bg-muted text-sm text-muted-foreground">
                    <strong>User Prompt:</strong> {selectedStory.prompt}
                  </div>
                  <ScrollArea className="h-[60vh]">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {selectedStory.content}
                      </pre>
                    </div>
                  </ScrollArea>
                </CardContent>
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
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Continue this story</span>
                  </div>
                  <div className="flex gap-3">
                    <Textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleLocalSend()
                        }
                      }}
                      placeholder="Add to the story..."
                      className="flex-1 min-h-[80px] resize-none"
                      disabled={isLoading}
                    />
                    <Button onClick={handleLocalSend} disabled={!inputMessage.trim() || isLoading} size="lg">
                      <Send className="h-4 w-4" />
                    </Button>

                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
                </div>

              </CardContent>
            </Card>
          </div>
        ) : (
          // History List View
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <History className="h-4 w-4" />
                Your Story Collection
              </div>
              <h1 className="text-4xl font-bold mb-4 text-balance">Story History</h1>
              <p className="text-xl text-muted-foreground text-balance">Revisit your magical tales and adventures</p>
            </div>

            {historyLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-2">
                  <Wand2 className="h-6 w-6 text-primary animate-spin" />
                  <span className="text-lg">Loading your stories...</span>
                </div>
              </div>
            ) : storyHistory.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-6">Start creating your first magical tale!</p>
                <Button onClick={onShowNewStory}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Story
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storyHistory.map((story) => (
                  <Card key={story.id} className="hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{story.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {story.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(story.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent cursor-pointer hover:text-primary"
                          onClick={() => setSelectedStory(story)}
                        >
                          Read Story
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive hover:text-destructive bg-transparent cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle
                                className=" cursor-pointer"
                              >Delete Story
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{story.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteStory(story.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
                                disabled={deletingStoryId === story.id}
                              >
                                {deletingStoryId === story.id ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, ArrowLeft, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const Messages = () => {
  const navigate = useNavigate()
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")

  // Mock chats data - replace with Firestore queries in production
  const mockChats = [
    {
      id: 1,
      username: "Alex Chen",
      lastMessage: "That's an amazing shot!",
      avatar: "A",
      unread: 2,
    },
    {
      id: 2,
      username: "Sophia Rivera",
      lastMessage: "Thanks for the collaboration",
      avatar: "S",
      unread: 0,
    },
  ]

  // Mock messages - replace with Firestore queries in production
  const mockMessages = {
    1: [
      { id: 1, senderId: "other", content: "Great gallery update!", timestamp: new Date(Date.now() - 3600000) },
      { id: 2, senderId: "me", content: "Thanks! Just uploaded new work", timestamp: new Date(Date.now() - 1800000) },
      { id: 3, senderId: "other", content: "That's an amazing shot!", timestamp: new Date(Date.now() - 600000) },
    ],
    2: [
      { id: 1, senderId: "other", content: "Loved working with you", timestamp: new Date(Date.now() - 86400000) },
      { id: 2, senderId: "me", content: "Same! Let's do it again", timestamp: new Date(Date.now() - 82800000) },
    ],
  }

  const currentChat = selectedChatId ? mockChats.find((c) => c.id === selectedChatId) : null
  const currentMessages = selectedChatId ? mockMessages[selectedChatId as keyof typeof mockMessages] || [] : []

  const sendMessage = () => {
    if (!messageInput.trim()) return
    // In production, save to Firestore
    setMessageInput("")
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="hidden sm:flex">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Messages</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
          {/* Chats List */}
          <Card className="lg:col-span-1 border-border/50 glass flex flex-col">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg sm:text-xl">Conversations</CardTitle>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="divide-y divide-border/50">
                {mockChats.length > 0 ? (
                  mockChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChatId(chat.id)}
                      className={`w-full p-3 sm:p-4 flex items-center gap-3 hover:bg-muted transition-colors text-left ${
                        selectedChatId === chat.id ? "bg-muted border-l-2 border-primary" : ""
                      }`}
                    >
                      <Avatar className="flex-shrink-0">
                        <AvatarFallback className="bg-gradient-aurora text-primary-foreground">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm sm:text-base truncate">{chat.username}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No conversations yet</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 border-border/50 glass flex flex-col hidden lg:flex">
            {currentChat ? (
              <>
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="text-lg sm:text-xl">{currentChat.username}</CardTitle>
                </CardHeader>
                <ScrollArea className="flex-1 p-4 sm:p-6">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 sm:p-4 ${
                            message.senderId === "me" ? "bg-gradient-aurora text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm sm:text-base">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1 mt-2">
                            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 sm:p-6 border-t border-border/50 flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="h-10 sm:h-12 text-sm sm:text-base"
                  />
                  <Button onClick={sendMessage} className="h-10 sm:h-12 w-10 sm:w-12 p-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-sm sm:text-base">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>

          {/* Mobile Chat View */}
          {selectedChatId && currentChat && (
            <Card className="lg:hidden col-span-1 border-border/50 glass flex flex-col">
              <CardHeader className="border-b border-border/50 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedChatId(null)}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-base">{currentChat.username}</CardTitle>
                </div>
              </CardHeader>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === "me" ? "bg-gradient-aurora text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-border/50 flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="h-10 text-sm"
                />
                <Button onClick={sendMessage} className="h-10 w-10 p-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

export default Messages

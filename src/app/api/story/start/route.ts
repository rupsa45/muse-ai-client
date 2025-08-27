import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, mode, style, userId } = body

    // Validate required fields
    if (!title || !mode || !style || !userId) {
      return NextResponse.json({ error: "Missing required fields: title, mode, style, userId" }, { status: 400 })
    }

    // Generate initial story response based on the configuration
    const storyPrompts = {
      Fantasy: `Welcome to "${title}"! You find yourself at the edge of an enchanted realm where magic flows through every leaf and stone. The air shimmers with possibility as ancient secrets whisper on the wind. What draws your attention first in this mystical place?`,
      Adventure: `Your journey "${title}" begins now! The path ahead is filled with unknown dangers and incredible discoveries. Your heart races with anticipation as you take your first step into the unknown. What do you choose to do?`,
      Mystery: `The mystery of "${title}" unfolds before you. Shadows dance in the corners of your vision, and every sound seems to hold a clue. Something important happened here, and only you can uncover the truth. Where do you begin your investigation?`,
      Romance: `In the world of "${title}", your heart is about to embark on an unforgettable journey. The air is filled with possibility and the promise of connection. Someone special is about to enter your story. How does your tale of love begin?`,
    }

    const initialMessage = storyPrompts[style as keyof typeof storyPrompts] || storyPrompts.Fantasy

    return NextResponse.json({
      success: true,
      storyId: `story_${Date.now()}_${userId.slice(0, 8)}`,
      message: initialMessage,
      config: { title, mode, style, userId },
    })
  } catch (error) {
    console.error("Error starting story:", error)
    return NextResponse.json({ error: "Failed to start story" }, { status: 500 })
  }
}

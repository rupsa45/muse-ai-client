import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, storyId, config } = body

    if (!message || !storyId || !config) {
      return NextResponse.json({ error: "Missing required fields: message, storyId, config" }, { status: 400 })
    }

    // Simulate AI response based on story style and user input
    const responses = {
      Fantasy: [
        "The magical energies around you respond to your actions, creating shimmering patterns in the air. As you move forward, you notice...",
        "Ancient runes begin to glow softly, revealing a hidden path. The forest spirits seem to approve of your choice...",
        "A gentle breeze carries the scent of mystical flowers, and you hear the distant sound of enchanted music...",
        "The trees part before you, their branches forming an archway of silver light. Beyond lies...",
      ],
      Adventure: [
        "Your bold decision pays off! The path ahead reveals new challenges and opportunities...",
        "Suddenly, you hear footsteps behind you. Turning around, you see...",
        "The ground beneath your feet shifts, and you realize you've discovered something extraordinary...",
        "A distant roar echoes through the landscape, and your adventure takes an unexpected turn...",
      ],
      Mystery: [
        "Your investigation reveals a crucial clue that changes everything you thought you knew...",
        "The evidence points to something far more complex than you initially suspected...",
        "A shadow moves in your peripheral vision, and you realize you're not alone...",
        "The pieces of the puzzle are starting to come together, but the picture they form is disturbing...",
      ],
      Romance: [
        "Your heart skips a beat as you realize the significance of this moment...",
        "A warm feeling spreads through you, and you know that something beautiful is beginning...",
        "The connection you feel is undeniable, like two souls recognizing each other...",
        "Time seems to slow as you find yourself drawn deeper into this enchanting encounter...",
      ],
    }

    const styleResponses = responses[config.style as keyof typeof responses] || responses.Fantasy
    const randomResponse = styleResponses[Math.floor(Math.random() * styleResponses.length)]

    // Add some delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    return NextResponse.json({
      success: true,
      message: randomResponse,
      storyId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error continuing story:", error)
    return NextResponse.json({ error: "Failed to continue story" }, { status: 500 })
  }
}

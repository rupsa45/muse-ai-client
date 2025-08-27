import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, MessageCircle, Sparkles, Users, Wand2, ScrollText } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">StoryWeaver</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#examples" className="text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Fantasy Storytelling
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Craft Epic Tales with AI Magic
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Dive into enchanted worlds where your imagination meets AI creativity. Create immersive fantasy stories
            through intelligent conversation and watch your ideas come to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/signup">
                <BookOpen className="h-5 w-5 mr-2" />
                Start Your Adventure
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Magical Features</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Everything you need to create captivating fantasy stories
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interactive Storytelling</CardTitle>
                <CardDescription>
                  Chat with AI to develop characters, plot twists, and magical worlds in real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Fantasy Themes</CardTitle>
                <CardDescription>
                  Specialized in fantasy genres with rich lore, mythical creatures, and epic adventures
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ScrollText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Story Modes</CardTitle>
                <CardDescription>
                  Choose from different storytelling styles and narrative structures for unique experiences
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Character Development</CardTitle>
                <CardDescription>
                  Build complex characters with backstories, motivations, and evolving relationships
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Magic Systems</CardTitle>
                <CardDescription>
                  Create detailed magic systems, spells, and supernatural elements for your world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Story Export</CardTitle>
                <CardDescription>
                  Save and export your completed stories in various formats for sharing or publishing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">How It Works</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Three simple steps to create your fantasy masterpiece
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Style</h3>
              <p className="text-muted-foreground">
                Select your preferred fantasy style and storytelling mode to set the tone for your adventure
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-accent-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Chatting</h3>
              <p className="text-muted-foreground">
                Begin a conversation with our AI storyteller and watch your ideas transform into epic tales
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Craft & Export</h3>
              <p className="text-muted-foreground">
                Refine your story through interactive dialogue and export your finished masterpiece
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Stories Section */}
      <section id="examples" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-balance">Story Examples</h2>
            <p className="text-xl text-muted-foreground text-balance">See what others have created with StoryWeaver</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">The Whispering Forest</CardTitle>
                <CardDescription>Fantasy Adventure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "In the depths of the Elderwood, where ancient trees whisper secrets of forgotten magic..."
                </p>
                <Badge variant="outline">Epic Fantasy</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">The Crystal Mage</CardTitle>
                <CardDescription>Magic & Mystery</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "Lyra discovered her power over crystal magic on her sixteenth birthday, but with great power..."
                </p>
                <Badge variant="outline">Urban Fantasy</Badge>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Dragons of Aethermoor</CardTitle>
                <CardDescription>Epic Quest</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  "The last dragon rider must unite the scattered clans before the shadow realm consumes..."
                </p>
                <Badge variant="outline">High Fantasy</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Begin Your Quest?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Join thousands of storytellers crafting magical worlds with AI assistance
          </p>
          <Button size="lg" className="text-lg px-8 py-6" asChild>
            <Link href="/signup">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Creating Stories
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4 text-center text-sm">
        <p>&copy; 2025 StoryWeaver. All rights reserved.</p>
      </footer>
    </div>
  )
}

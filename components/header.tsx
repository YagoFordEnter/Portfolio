import { Menu, X, Zap, Shield, Code, Brain } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [analyzerOn, setAnalyzerOn] = useState(false)

  const navigation = [
    { name: "Engenharia", href: "#hero", icon: Code },
    { name: "Projetos", href: "#projects", icon: Brain },
    { name: "Acessibilidade", href: "#accessibility", icon: Shield },
    { name: "Currículo", href: "#resume", icon: Zap },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">Yago Silva</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAnalyzerOn(!analyzerOn)}
            className={cn(
              "hidden sm:flex items-center gap-2",
              analyzerOn && "bg-primary/10 text-primary"
            )}
          >
            <Shield className="h-4 w-4" />
            WCAG Inspector: {analyzerOn ? "On" : "Off"}
          </Button>
          
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <nav className="container px-4 py-4 space-y-3">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </a>
              )
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setAnalyzerOn(!analyzerOn)
                setIsMenuOpen(false)
              }}
              className={cn(
                "w-full justify-start gap-2",
                analyzerOn && "bg-primary/10 text-primary"
              )}
            >
              <Shield className="h-4 w-4" />
              WCAG Inspector: {analyzerOn ? "On" : "Off"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

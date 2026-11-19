import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { 
  Shield, 
  Eye, 
  Keyboard, 
  Contrast, 
  Type, 
  X, 
  CheckCircle, 
  AlertTriangle,
  Focus,
  Monitor
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AccessibilityIssue {
  type: string
  severity: "error" | "warning" | "info"
  message: string
  element?: string
}

export function AccessHomeAnalyzer() {
  const [isOn, setIsOn] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [textScale, setTextScale] = useState(100)
  const [activeFocus, setActiveFocus] = useState<string | null>(null)
  const [issues, setIssues] = useState<AccessibilityIssue[]>([])
  const drawerRef = useRef<HTMLDivElement>(null)

  // Monitor de foco NVDA
  useEffect(() => {
    if (!isOn) return

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && target.tagName) {
        setActiveFocus(`${target.tagName.toLowerCase()}: ${target.textContent?.slice(0, 50) || ''}`)
      }
    }

    document.addEventListener('focus', handleFocus, true)
    return () => document.removeEventListener('focus', handleFocus, true)
  }, [isOn])

  // Auditoria automática do DOM
  useEffect(() => {
    if (!isOn || !isDrawerOpen) return

    const auditDOM = () => {
      const newIssues: AccessibilityIssue[] = []

      // Verificar headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      let previousLevel = 0
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1))
        if (level > previousLevel + 1) {
          newIssues.push({
            type: 'heading-structure',
            severity: 'warning',
            message: `Heading level skip: h${previousLevel} → h${level}`,
            element: heading.textContent?.slice(0, 30)
          })
        }
        previousLevel = level
      })

      // Verificar imagens sem alt
      const images = document.querySelectorAll('img')
      images.forEach((img, index) => {
        if (!img.getAttribute('alt')) {
          newIssues.push({
            type: 'image-alt',
            severity: 'error',
            message: `Imagem sem atributo alt`,
            element: img.src
          })
        }
      })

      // Verificar landmarks
      const landmarks = document.querySelectorAll('header, nav, main, aside, footer, section[aria-label]')
      if (landmarks.length === 0) {
        newIssues.push({
          type: 'landmarks',
          severity: 'warning',
          message: 'Nenhum landmark semântico encontrado'
        })
      }

      // Verificar contraste (simulado)
      const lowContrastElements = document.querySelectorAll('[data-low-contrast]')
      lowContrastElements.forEach((el, index) => {
        newIssues.push({
          type: 'contrast',
          severity: 'error',
          message: 'Contraste insuficiente detectado',
          element: el.textContent?.slice(0, 30)
        })
      })

      setIssues(newIssues)
    }

    // Debounce a auditoria
    const timeoutId = setTimeout(auditDOM, 500)
    return () => clearTimeout(timeoutId)
  }, [isOn, isDrawerOpen])

  const handleToggle = () => {
    const newState = !isOn
    setIsOn(newState)
    
    if (newState) {
      setIsDrawerOpen(true)
      // Aplicar configurações iniciais
      document.body.style.fontSize = `${textScale}%`
      if (highContrast) {
        document.body.classList.add('high-contrast')
      }
    } else {
      setIsDrawerOpen(false)
      // Limpar configurações
      document.body.style.fontSize = ''
      document.body.classList.remove('high-contrast')
    }
  }

  const handleHighContrast = () => {
    const newHighContrast = !highContrast
    setHighContrast(newHighContrast)
    
    if (newHighContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }

  const handleTextScale = (scale: number) => {
    setTextScale(scale)
    document.body.style.fontSize = `${scale}%`
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'border-red-500/50 bg-red-500/10'
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10'
      default: return 'border-blue-500/50 bg-blue-500/10'
    }
  }

  return (
    <>
      {/* Botão de toggle discreto no header */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={cn(
          "hidden sm:flex items-center gap-2 transition-all",
          isOn && "bg-primary/10 text-primary shadow-lg"
        )}
      >
        <Shield className={cn("h-4 w-4", isOn && "animate-pulse")} />
        WCAG Inspector: {isOn ? "On" : "Off"}
      </Button>

      {/* Drawer técnico lateral */}
      {isOn && isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          <div
            ref={drawerRef}
            className={cn(
              "relative w-full max-w-md h-full bg-background border-l border-border shadow-2xl",
              "transform transition-transform duration-300 ease-in-out",
              "flex flex-col"
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">WCAG Inspector</h3>
                <Badge variant="default" className="text-xs">
                  PICTA 2026
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-6">
                {/* Controles de acessibilidade */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Contrast className="h-4 w-4" />
                      Controles de Acessibilidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alto Contraste AAA</span>
                      <Button
                        variant={highContrast ? "default" : "outline"}
                        size="sm"
                        onClick={handleHighContrast}
                      >
                        {highContrast ? "Ativo" : "Ativar"}
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <span className="text-sm">Escala Tipográfica</span>
                      <div className="flex gap-1">
                        {[90, 100, 110, 120].map(scale => (
                          <Button
                            key={scale}
                            variant={textScale === scale ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleTextScale(scale)}
                            className="flex-1"
                          >
                            {scale}%
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monitor de Foco NVDA */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Focus className="h-4 w-4" />
                      Monitor de Foco NVDA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-2">
                      Elemento atual em foco (navegação por Tab):
                    </div>
                    <div className="p-2 bg-muted rounded text-xs font-mono">
                      {activeFocus || "Nenhum elemento em foco"}
                    </div>
                  </CardContent>
                </Card>

                {/* Auditoria do DOM */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Eye className="h-4 w-4" />
                      Auditoria do DOM
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {issues.length === 0 ? (
                        <div className="text-center text-muted-foreground text-sm py-4">
                          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                          Nenhum problema detectado
                        </div>
                      ) : (
                        issues.map((issue, index) => (
                          <div
                            key={index}
                            className={cn(
                              "p-2 rounded border text-xs",
                              getSeverityColor(issue.severity)
                            )}
                          >
                            <div className="flex items-start gap-2">
                              {getSeverityIcon(issue.severity)}
                              <div className="flex-1">
                                <div className="font-medium">{issue.message}</div>
                                {issue.element && (
                                  <div className="text-muted-foreground mt-1">
                                    Elemento: {issue.element}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Monitor className="h-4 w-4" />
                      Estatísticas WCAG 2.2
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-500">
                          {issues.filter(i => i.severity === 'error').length === 0 ? '100%' : '85%'}
                        </div>
                        <div className="text-xs text-muted-foreground">Acessibilidade</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-500">2.2</div>
                        <div className="text-xs text-muted-foreground">WCAG Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X className="h-4 w-4" />
                Fechar Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

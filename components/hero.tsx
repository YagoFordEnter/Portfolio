import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowDown, Zap, Clock, Shield, Code } from "lucide-react"
import { cn } from "@/lib/utils"

export function Hero() {
  const metrics = [
    { icon: Clock, value: "<400ms", label: "Latência IA" },
    { icon: Shield, value: "WCAG 2.2", label: "Acessibilidade" },
    { icon: Zap, value: "2 Anos", label: "SGSO LATAM" },
    { icon: Code, value: "5+", label: "Sistemas em Produção" },
  ]

  return (
    <section id="hero" className="container px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="outline" className="mb-4">
          <Zap className="h-3 w-3 mr-1" />
          Pesquisador PICTA 2026
        </Badge>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="gradient-text">Yago Santos Silva</span>
        </h1>
        
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
          Engenharia de Software focada em Resultados de Negócio
        </p>
        
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Desenvolvedor Full Stack & Especialista em Sistemas de IA em Tempo Real.
          Atualmente curso ADS no Senac e atuo como pesquisador de Qualidade de Software (QA).
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2">
            <ArrowDown className="h-4 w-4" />
            Ver Projetos
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Code className="h-4 w-4" />
            Baixar Currículo
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="glass-effect rounded-lg p-4">
                <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

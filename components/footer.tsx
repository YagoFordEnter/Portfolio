import { Badge } from "@/components/ui/badge";
import { Heart, Code, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Yago Silva</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Engenharia de Software & Inteligência de Dados focada em resultados.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4"> Tecnologias </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">Tailwind</Badge>
              <Badge variant="secondary">Java</Badge>
              <Badge variant="secondary">Spring Boot</Badge>
              <Badge variant="secondary">Angular</Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4"> Acessibilidade </h3>
            <p className="text-muted-foreground text-sm">
              Desenvolvido com práticas WCAG 2.2 e foco em inclusão digital.
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Yago Silva. Feito com <Heart className="inline h-4 w-4 text-red-500" /> e{" "}
            <Code className="inline h-4 w-4" /> usando Next.js 15 & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

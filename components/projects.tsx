import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Filter, ExternalLink, Github, Eye, Code } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "VoiceBridge AI",
    description: "Sistema de IA em tempo real para processamento de voz com latência inferior a 400ms.",
    category: "IA & Tempo Real",
    image: "/assets/solucao-vendas.jpg",
    tech: ["Python", "TensorFlow", "WebRTC"],
    featured: true,
  },
  {
    id: 2,
    title: "AccessHome Analyzer",
    description: "Ferramenta de análise de acessibilidade baseada em WCAG 2.2 para Smart Homes.",
    category: "Acessibilidade & QA",
    image: "/assets/solucao-gestao.jpg",
    tech: ["TypeScript", "React", "ARIA"],
    featured: true,
  },
  {
    id: 3,
    title: "Caçador de Vagas",
    description: "Aplicativo mobile para automação de busca por vagas de emprego.",
    category: "Full-Stack & Mobile",
    image: "/assets/solucao-vendas.jpg",
    tech: ["React Native", "Node.js", "MongoDB"],
    featured: false,
  },
  {
    id: 4,
    title: "App CIC",
    description: "Sistema corporativo para gestão de ciclos de desenvolvimento e QA.",
    category: "Full-Stack & Mobile",
    image: "/assets/solucao-gestao.jpg",
    tech: ["Angular", "Spring Boot", "PostgreSQL"],
    featured: false,
  },
  {
    id: 5,
    title: "Sistema Milhão",
    description: "Plataforma de gestão financeira com processamento em tempo real.",
    category: "IA & Tempo Real",
    image: "/assets/solucao-vendas.jpg",
    tech: ["Java", "Angular", "Kafka"],
    featured: false,
  },
  {
    id: 6,
    title: "Porto House",
    description: "Sistema de gestão portuária com integração de IoT e analytics.",
    category: "Full-Stack & Mobile",
    image: "/assets/solucao-gestao.jpg",
    tech: ["Vue.js", "Python", "InfluxDB"],
    featured: false,
  },
]

const categories = [
  "Todos",
  "IA & Tempo Real",
  "Full-Stack & Mobile",
  "Acessibilidade & QA",
]

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  
  const filteredProjects = selectedCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="projects" className="container px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Code className="h-3 w-3 mr-1" />
            Portfólio Técnico
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projetos em Destaque
          </h2>
          <p className="mt-4 text-muted-foreground">
            Soluções reais que aplicam engenharia de software, IA e acessibilidade.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="gap-2"
            >
              <Filter className="h-3 w-3" />
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <Badge className="absolute top-2 left-2" variant="default">
                    Destaque
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {project.title}
                  {project.featured && <Eye className="h-4 w-4 text-primary" />}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Github className="h-3 w-3" />
                  Código
                </Button>
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Ver Demo
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

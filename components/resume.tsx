import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"
import { Download, Briefcase, GraduationCap, Award, FileText, Code, Shield } from "lucide-react"

const education = [
  {
    institution: "Centro Universitário Senac",
    course: "Análise e Desenvolvimento de Sistemas",
    period: "2024 - 2026",
    description: "Formação focada em Engenharia de Software, QA e Acessibilidade Digital.",
  },
  {
    institution: "Ford Enter SENAI / Rede Cidadã",
    course: "Programa de Iniciação Científica e Tecnológica (PICTA)",
    period: "2026",
    description: "Pesquisa em Acessibilidade em Smart Homes e Web (WCAG 2.2 / eMAG 3.1).",
  },
]

const certifications = [
  {
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    name: "Oracle Database Design & Foundations",
    issuer: "Oracle Academy",
    year: "2024",
  },
  {
    name: "WCAG 2.2 Accessibility Specialist",
    issuer: "IAAP",
    year: "2025",
  },
]

const experience = [
  {
    company: "LATAM Airlines",
    role: "Analista de Qualidade de Software (SGSO)",
    period: "2023 - 2024",
    description: "2 anos de rigor regulatório em sistemas críticos de aviação.",
  },
  {
    company: "PICTA 2026",
    role: "Pesquisador de Qualidade de Software",
    period: "2025 - 2026",
    description: "Pesquisa em acessibilidade digital e QA para Smart Homes.",
  },
]

export function Resume() {
  const [activeTab, setActiveTab] = useState("software")

  return (
    <section id="resume" className="container px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <FileText className="h-3 w-3 mr-1" />
            Currículo Interativo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trajetória Profissional
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore minhas habilidades em duas frentes: Software & IA ou Acessibilidade & QA.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="software" className="gap-2">
              <Code className="h-4 w-4" />
              Software & IA
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Shield className="h-4 w-4" />
              Acessibilidade & QA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="software" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold">{exp.role}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Formação Acadêmica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold">{edu.course}</h4>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                    <p className="text-sm mt-1">{edu.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Especialização em Acessibilidade
                </CardTitle>
                <CardDescription>
                  WCAG 2.2, eMAG 3.1 e práticas NVDA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Atuação como pesquisador no PICTA 2026 focada em acessibilidade 
                  em Smart Homes e aplicações web. Desenvolvimento de ferramentas 
                  de análise automática e diretrizes de design inclusivo.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certificações Relevantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">{cert.name}</h4>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {cert.year}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button size="lg" className="gap-2">
            <Download className="h-4 w-4" />
            Baixar Currículo em PDF
          </Button>
        </div>
      </div>
    </section>
  )
}

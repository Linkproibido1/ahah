"use client"

import { useEffect, useState } from "react"
import { useActionState } from "react"
import { completeRegistration, getTempRegistrationEmail } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react" // Importar ícones para mostrar/esconder senha

export default function CompleteRegistrationPage() {
  const [state, action] = useActionState(completeRegistration, null)
  const [tempEmail, setTempEmail] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false) // Estado para mostrar/esconder senha
  const router = useRouter()

  useEffect(() => {
    const fetchTempEmail = async () => {
      const email = await getTempRegistrationEmail()
      if (!email) {
        // Se não houver email temporário, redireciona de volta para o login
        router.push("/login")
      } else {
        setTempEmail(email)
      }
    }
    fetchTempEmail()
  }, [router])

  if (!tempEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (simplificado para esta página) */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            magalu
          </Link>
          <span className="text-lg">Finalizar Cadastro</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Complete seu Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Falta pouco! Preencha seus dados para finalizar o registro.
              </p>
              <form action={action} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <Input id="email" name="email" type="email" value={tempEmail} disabled className="bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <Input id="name" name="name" placeholder="Seu nome completo" required />
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium mb-2">
                    Data de Nascimento
                  </label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium mb-2">
                    CPF
                  </label>
                  <Input id="cpf" name="cpf" placeholder="Seu CPF (somente números)" maxLength={11} required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie sua senha (mínimo 6 caracteres)"
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Finalizar Cadastro
                </Button>
                {state && (
                  <p className={`text-sm text-center ${state.success ? "text-green-600" : "text-red-600"}`}>
                    {state.message}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer (simplificado para esta página) */}
      <footer className="bg-blue-600 text-white py-4 mt-12 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Magazine Luiza. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Search, ShoppingCart, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"
import { registerUser, loginUser, getUserSession } from "@/app/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [registerState, registerAction] = useActionState(registerUser, null)
  const [loginState, loginAction] = useActionState(loginUser, null)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const user = await getUserSession()
      if (user) {
        router.push("/dashboard") // Redireciona se já estiver logado
      }
    }
    checkSession()
  }, [router])

  // Redireciona após o email ser validado com sucesso
  useEffect(() => {
    if (registerState?.success) {
      router.push("/register-complete")
    }
  }, [registerState, router])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-blue-500 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>Nossas lojas</span>
            <span>Tenha sua loja</span>
            <span>Regulamentos</span>
            <span>Acessibilidade</span>
            <span>Segurança & Privacidade</span>
          </div>
          <div className="flex gap-4">
            <span>Atendimento</span>
            <span>Compre pelo tel: 0800 773 3838</span>
            <span>Meus pedidos</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <Image src="/magalu-logo.png" alt="Magalu" width={120} height={40} className="rounded" />
              <Link href="/" className="text-2xl font-bold">
                magalu
              </Link>
            </div>

            {/* Campo de busca removido */}

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div>Bem-vindo :)</div>
                <div>Entre ou cadastre-se</div>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <div className="text-xs">
                  <div>Ver ofertas para minha</div>
                  <div>região</div>
                </div>
              </div>
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <nav className="flex items-center gap-6 pb-4">
            <span>Todos os departamentos</span>
            <span>Ofertas do Dia</span>
            <span>Celulares</span>
            <span>Móveis</span>
            <span>Eletrodomésticos</span>
            <span>TV e Vídeo</span>
            <span>Informática</span>
            <span>Internacional</span>
            <span>Baixe o SuperApp</span>
            <span>Cartão Magalu</span>
          </nav>
        </div>
      </header>

      {/* Login Form */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Identificação</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Create Account */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Quero criar uma conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form action={registerAction} className="space-y-4">
                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium mb-2">
                      E-mail
                    </label>
                    <Input id="register-email" name="email" placeholder="Digite seu e-mail" type="email" required />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Continuar
                  </Button>
                  {registerState && (
                    <p className={`text-sm text-center ${registerState.success ? "text-green-600" : "text-red-600"}`}>
                      {registerState.message}
                    </p>
                  )}
                </form>

                <div className="text-center">
                  <span className="text-sm text-gray-600">Dúvidas? </span>
                  <Link href="#" className="text-sm text-blue-600 underline">
                    fale conosco
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Login */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Já sou cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form action={loginAction} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium mb-2">
                      E-mail, CPF ou CNPJ
                    </label>
                    <Input id="login-email" name="emailOrDoc" placeholder="Digite seu e-mail, CPF ou CNPJ" required />
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
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
                    Continuar
                  </Button>
                  {loginState && (
                    <p className={`text-sm text-center ${loginState.success ? "text-green-600" : "text-red-600"}`}>
                      {loginState.message}
                    </p>
                  )}
                </form>

                <div className="text-center text-gray-500">ou</div>

                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Entrar sem senha
                </Button>

                <div className="text-center">
                  <Link href="#" className="text-sm text-blue-600 underline">
                    Esqueci minha senha
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">Use sua rede social para se conectar*</p>
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent">
              <span className="mr-2">G</span> Fazer login
            </Button>
          </div>

          {/* Footer Text */}
          <div className="mt-8 text-center text-xs text-gray-500 max-w-2xl mx-auto">
            <p>
              Seus dados pessoais serão respeitados de acordo com a nossa{" "}
              <Link href="#" className="text-blue-600 underline">
                política de privacidade
              </Link>
              . *Serviço válido somente para pessoas físicas. Em caso de dúvidas, acesse nossa central de atendimento.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">Formas de pagamento</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {["Visa", "Mastercard", "Elo", "Diners", "Amex", "Pix"].map((payment) => (
                <div key={payment} className="bg-white text-gray-800 px-3 py-1 rounded text-sm">
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

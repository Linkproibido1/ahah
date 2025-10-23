import { Search, ShoppingCart, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserSession, getMockUserData } from "@/app/auth/actions"

export default async function MyDataPage() {
  const user = await getUserSession()

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700">Fazer Login</Button>
        </Link>
      </div>
    )
  }

  const userData = await getMockUserData(user.email)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar e Header (mantidos do dashboard) */}
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

      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 py-4">
            <div className="flex items-center gap-4">
              <Image src="/magalu-logo.png" alt="Magalu" width={120} height={40} className="rounded" />
              <Link href="/" className="text-2xl font-bold">
                magalu
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input placeholder="Busca no Magalu" className="w-full pr-12 text-black rounded-md" />
                <Button size="icon" className="absolute right-0 top-0 bg-orange-500 hover:bg-orange-600 rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div>Olá, {user.name} :)</div>
                <Link href="/dashboard" className="hover:underline">
                  Minha conta
                </Link>
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

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Meus Dados</h1>

        {userData ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <Input value={userData.name} disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mail</label>
                <Input value={userData.email} disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
                <Input value={userData.dob} disabled className="bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CPF</label>
                <Input value={userData.cpf} disabled className="bg-gray-100" />
              </div>
              {/* Senha não é exibida por segurança, mas poderia ter um botão para "Alterar Senha" */}
            </CardContent>
          </Card>
        ) : (
          <p className="text-lg text-gray-700">
            Não foi possível carregar seus dados. Por favor, faça login novamente.
          </p>
        )}

        <div className="mt-8">
          <Link href="/dashboard">
            <Button variant="outline">Voltar para o Painel</Button>
          </Link>
        </div>
      </main>

      {/* Footer (mantido do dashboard) */}
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

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold text-green-700 mb-4">Pedido Confirmado!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Obrigado pela sua compra. Seu pedido foi processado com sucesso e será enviado em breve.
      </p>
      <div className="space-y-4">
        <Link href="/" passHref>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">Voltar para a Home</Button>
        </Link>
        <Link href="/dashboard" passHref>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
          >
            Ver Meus Pedidos
          </Button>
        </Link>
      </div>
    </div>
  )
}

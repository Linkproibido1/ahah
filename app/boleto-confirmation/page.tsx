"use client"

import { Search, ShoppingCart, Heart, MapPin, Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserSession } from "@/app/auth/actions"
import { useRouter } from "next/navigation"

export default function BoletoConfirmationPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getUserSession()
      setUser(session)
    }
    fetchUser()
  }, [])

  const paymentMethods = [
    { name: "Cartão Luiza", src: "/payment-types/cartao-luiza.svg" },
    { name: "American Express", src: "/payment-types/american-express.svg" },
    { name: "Visa", src: "/payment-types/visa.svg" },
    { name: "Mastercard", src: "/payment-types/mastercard.svg" },
    { name: "Diners", src: "/payment-types/diners.svg" },
    { name: "Hipercard", src: "/payment-types/hipercard.svg" },
    { name: "Elo", src: "/payment-types/elo.svg" },
    { name: "Aura", src: "/payment-types/aura.svg" },
  ]

  const recommendedProducts = [
    {
      id: "smartphone-samsung-galaxy-a06-mais-vendido",
      name: "Smartphone Samsung Galaxy A06 128GB 4GB RAM Azul Escuro 6.7' Câm Dupla + Selfie 8MP",
      price: 648.9,
      originalPrice: 721.0,
      installments: "10x de R$ 72,10 sem juros",
      rating: 5.0,
      reviews: 9384,
      image: "/smartphone-samsung-galaxy-a06-blue.jpg",
      discountPix: "ou R$ 648,90 no Pix",
      cupom: "Cupom R$ 50 OFF",
    },
    {
      id: "smartphone-samsung-galaxy-s24-fe",
      name: "Smartphone Samsung Galaxy S24 FE 128GB Grafite 5G 8GB RAM 6,7'' Câm. Tripla + Selfie 10MP",
      price: 2776.67,
      originalPrice: 4999.0,
      installments: "10x de R$ 277,67 sem juros",
      rating: 4.8,
      reviews: 1200,
      image: "/smartphone-samsung-galaxy-a54.jpg", // Using A54 as placeholder for S24 FE
      discountPix: "ou R$ 2.499,00 no Pix",
    },
    {
      id: "smartphone-samsung-galaxy-a06-white",
      name: "Smartphone Samsung Galaxy A06 128GB 4GB RAM Branco 6.7' Câm. Dupla + Selfie 8MP",
      price: 648.9,
      originalPrice: 721.0,
      installments: "10x de R$ 72,10 sem juros",
      rating: 5.0,
      reviews: 9384,
      image: "/smartphone-samsung-galaxy-a06-white.jpg",
      discountPix: "ou R$ 648,90 no Pix",
      cupom: "Cupom R$ 50 OFF",
    },
    {
      id: "iphone-15",
      name: "Apple iPhone 15 128GB Preto 6,1'' 48MP iOS 5G",
      price: 4299.0,
      originalPrice: 4777.0,
      installments: "10x de R$ 477,70 sem juros",
      rating: 5.0,
      reviews: 133,
      image: "/iphone-15-new.jpg",
      discountPix: "ou R$ 4.299,00 no Pix",
    },
  ]

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
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Image src="/magalu-logo.png" alt="Magalu" width={120} height={40} className="rounded" />
              <Link href="/" className="text-2xl font-bold">
                magalu
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input placeholder="Busca no Magalu" className="w-full pr-12 text-black rounded-md" />
                <Button size="icon" className="absolute right-0 top-0 bg-orange-500 hover:bg-orange-600 rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="text-sm">
                  <div>Olá, {user.name} :)</div>
                  <Link href="/dashboard" className="hover:underline">
                    Minha conta
                  </Link>
                </div>
              ) : (
                <Link href="/login" className="text-sm hover:underline">
                  <div>Bem-vindo :)</div>
                  <div>Entre ou cadastre-se</div>
                </Link>
              )}
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
              <Button variant="ghost" className="text-white hover:bg-blue-700 relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">0</Badge>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 pb-4 border-t border-blue-500 pt-2">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center justify-center gap-2">
            Seu pedido foi finalizado com sucesso <CheckCircle className="h-6 w-6" />
          </h1>
          <p className="text-gray-700 mb-6">
            Obrigado pela compra. Você receberá todos os dados da sua compra no email{" "}
            <span className="font-semibold">{user?.email || "victorkrust157@gmail.com"}</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Order Details */}
            <div>
              <h2 className="text-xl font-bold mb-2">Número do pedido</h2>
              <p className="text-2xl font-bold text-blue-600 mb-4">1454070463154929</p>
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Acompanhar pedido</Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                  Imprimir comprovante
                </Button>
              </div>
            </div>

            {/* Sacola Summary */}
            <div>
              <h2 className="text-xl font-bold mb-2">Sacola (1 item)</h2>
              <p className="text-gray-700">
                Total (produtos + frete): <span className="font-bold">R$ 182,70</span>
              </p>
              <p className="text-gray-700">Entrega por Nocnoc Premium Asia - Receba até terça-feira, 12 de agosto</p>
              <p className="text-gray-700">Pagamento: Boleto bancário (Vencimento: 18/07/2025)</p>
            </div>
          </div>

          {/* Boleto Section */}
          <div className="mt-8 border-t pt-8">
            <p className="text-gray-700 mb-4">Utilize este código de barras e pague o boleto pelo celular :)</p>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T5uPdgJDq8r3Gyap3n8KtRc5dgmMrJ.png" // Barcode image from the provided URL
              alt="Código de Barras Boleto"
              width={400}
              height={100}
              className="mx-auto mb-4 object-contain"
            />
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Imprimir boleto</Button>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            * O prazo de entrega será contado após 1º dia útil da aprovação do pedido. Este procedimento costuma ocorrer
            em até 24 horas, mas tem período máximo para acontecer de até 48 horas (pagamento no cartão). Se o pagamento
            for realizado por boleto bancário, o banco tem o prazo de até três dias úteis para confirmar
          </p>
        </div>

        {/* Feedback Section */}
        <div className="text-center mt-12">
          <Image
            src="/placeholder.svg?height=60&width=400"
            alt="E-bit O que achou dessa compra?"
            width={400}
            height={60}
            className="mx-auto mb-8"
          />
        </div>

        {/* Tem muita gente de olho */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tem muita gente de olho</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>

                      <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="mb-4">
                        {product.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                          </div>
                        )}
                        <div className="text-xl font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</div>
                        {product.installments && <div className="text-sm text-gray-600">{product.installments}</div>}
                        {product.discountPix && <div className="text-sm text-green-600">{product.discountPix}</div>}
                        {product.cupom && <Badge className="bg-green-500 text-xs mt-1">{product.cupom}</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        {/* Formas de pagamento */}
        <div className="py-8">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-lg font-bold mb-4">Formas de pagamento</h3>
            <div className="flex justify-center gap-4 flex-wrap mb-6">
              {paymentMethods.map((payment, index) => (
                <div key={index} className="w-16 h-10 bg-white rounded flex items-center justify-center p-1">
                  <Image
                    src={payment.src || "/placeholder.svg"}
                    alt={payment.name}
                    width={64}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Certificados */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">🔒</div>
                <div className="text-xs">
                  <div>certificados</div>
                  <div>e segurança</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">⭐</div>
                <div className="text-xs">
                  <div>e-bit</div>
                  <div>A FANTÁSTICA</div>
                  <div>MAGAZINE LUIZA</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">🏆</div>
                <div className="text-xs">
                  <div>Google</div>
                  <div>Customer Reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">🌱</div>
                <div className="text-xs">
                  <div>RA 1000</div>
                  <div>ReclameAQUI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="bg-blue-700 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div>
                <h4 className="font-bold mb-4">departamentos</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:underline">
                      casa e construção
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      artesanato
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      áudio
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      automotivo
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      bebês
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      beleza e perfumaria
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      brinquedos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      cama, mesa e banho
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      câmeras e drones
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      casa e construção
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <ul className="space-y-2 text-sm mt-8">
                  <li>
                    <Link href="#" className="hover:underline">
                      informática
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      instrumentos musicais
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      livros
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      mercado
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      móveis
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      papelaria
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      pet shop
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      religioso
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      suplementos e vitaminas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      serviços
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">marketplace</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:underline">
                      seja um lojista
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      proteção de marcas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      lista de produtos proibidos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      central de atendimento
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      atendimento
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      atendimento para vendas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      atendimento ao deficiente
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      meus pedidos
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      trocas e devoluções
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      seja um lojista fabricante
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">serviços</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:underline">
                      cartão magalu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      informática
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      revista magalu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      lista de casamento
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      vale de troca
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      programa magalu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      magalu seguros
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      influenciador magalu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      consórcio magalu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      quero de casamento
                    </Link>
                  </li>
                </ul>

                <h4 className="font-bold mb-4 mt-6">parcerias</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:underline">
                      magalu nosso parceiro
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      nossas lojas
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      blog da lu
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      conecta
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      institucional
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      investidores
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      imprensa
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">compre pelo telefone</h4>
                <div className="text-2xl font-bold mb-2">0800 773 3838</div>
                <p className="text-sm mb-4">
                  segunda a sexta, das 8h às 20h e sábados, das 8h às 18h (horário de Brasília)
                </p>

                <h4 className="font-bold mb-4">compre também pelo chat online</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            <p>&copy; 2024 Magazine Luiza. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

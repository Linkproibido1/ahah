"use client"

import { Search, ShoppingCart, Menu, Heart, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserSession } from "@/app/auth/actions"

// Adicionando as imagens do banner principal
const mainBannerImages = [
  "https://topsortassets.com/asset_01jgz58nj3e4kvak71s2f7p9m3.png",
  "https://topsortassets.com/asset_01k0ag2xv4egc84gvvnw121ttb.png",
  "https://topsortassets.com/asset_01jysq1mddfd69c5fprdjpxgdy.png",
  "https://topsortassets.com/asset_01k0adryzeerkr0dvp2sbj099f.png",
  "https://topsortassets.com/asset_01jzwx89tpefasycnrecaqh5af.png",
  "https://topsortassets.com/asset_01k0a9bkqtenp8kz6d9a7y2p4f.png",
  "https://topsortassets.com/asset_01k0a9mas9f7hrhtd3jk1kwg9n.png"
]

export default function MagaluHome() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getUserSession()
      setUser(session)
    }
    fetchUser()
  }, [])

  // Troca automática do banner a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % mainBannerImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [mainBannerImages.length])

  const categories = [
    "Todos os departamentos",
    "Ofertas do Dia",
    "Celulares",
    "Móveis",
    "Eletrodomésticos",
    "TV e Vídeo",
    "Informática",
    "Internacional",
    "Baixe o SuperApp",
  ]

  const featuredProducts = [
    {
      id: "notebook-acer-aspire-5",
      name: "Notebook Acer Aspire 5 Intel Core i5 12450H 8GB RAM 512GB SSD 15.6' Full HD Windows 11 A515-57-565J",
      price: 3149.0,
      originalPrice: null,
      discount: "Cupom R$ 100 OFF",
      image: "/notebook-acer-aspire-5-i5-12450h.jpg",
      category: "Pode te interessar",
      rating: 4.9,
      reviews: 2415,
    },
    {
      id: "lava-e-seca-samsung-11kg",
      name: "Lava e Seca Samsung 11kg Inverter",
      price: 3324.05,
      originalPrice: null,
      image: "/lava-e-seca-samsung-11kg.jpg",
      rating: 4.5,
      reviews: 737,
      category: "Mais amado da categoria",
    },
    {
      id: "notebook-gamer-acer-nitro-v15",
      name: "Notebook Gamer Acer Nitro V15 Intel Core i5-13420H 8 GB RAM RTX 4050",
      price: 5099.0,
      originalPrice: null,
      image: "/notebook-gamer-acer-nitro-v15.jpeg",
      category: "Sugestão pra você",
      badge: "Retire na Loja",
      rating: 4.3,
      reviews: 89,
    },
    {
      id: "smartphone-samsung-galaxy-a05",
      name: "Smartphone Samsung Galaxy A05 128GB 4GB RAM Bateria 5.7 Câm",
      price: 648.9,
      originalPrice: null,
      discount: "Cupom R$ 50 OFF",
      image: "/smartphone-samsung-galaxy-a06-white.jpg",
      category: "Top vendas na sua região",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "smart-tv-tcl-32-android",
      name: 'Smart TV 32" Full HD LED TCL 32S5400A Android',
      price: 949.05,
      originalPrice: null,
      image: "/smart-tv-tcl-32-full-hd.jpg",
      rating: 4.5,
      reviews: 10674,
      category: "Os mais desejados",
    },
  ]

  const temNoMagalu = [
    { name: "Ofertas do dia", icon: "https://s.mlcdn.com.br/banner/campanhas/0301_promo_hotlink_BFColchoesv1.png?ims=90x90", color: "bg-red-500" },
    { name: "AliExpress", icon: "https://s.mlcdn.com.br/banner/campanhas/icone-mundo-icone-home-_home_aliexpress.png?ims=90x90", color: "bg-orange-500" },
    { name: "Casa", icon: "https://s.mlcdn.com.br/banner/campanhas/homeapp_iconehotlink_mundocasa.png?ims=90x90", color: "bg-yellow-500" },
    { name: "Ferramentas", icon: "https://s.mlcdn.com.br/banner/campanhas/hotlink-ferramentas.png?ims=90x90", color: "bg-gray-500" },
    { name: "Eletroportáteis", icon: "https://s.mlcdn.com.br/banner/campanhas/mundoportateis_iconehomeprincipal_hotlinkv3.png?ims=90x90", color: "bg-blue-500" },
    { name: "Brinquedos", icon: "https://s.mlcdn.com.br/banner/campanhas/hotlink_brinquedos_011223.png?ims=90x90", color: "bg-pink-500" },
    { name: "Automotivo", icon: "https://s.mlcdn.com.br/banner/campanhas/hotlink-automotivo.png?ims=90x90", color: "bg-gray-700" },
    { name: "Utilidades Domésticas", icon: "https://s.mlcdn.com.br/banner/campanhas/hotlink-utilidades.png?ims=90x90", color: "bg-purple-500" },
  ]

  const exploreProducts = [
    {
      id: "kit-4-garrafas-tinta-epson",
      name: "Kit 4 Garrafas de Tinta Epson T664 Original",
      price: 219.59,
      installments: "3x de R$ 73,20 sem juros",
      discount: "10% de desconto no pix",
      image: "/ink-bottles-new.jpeg",
      badge: "FULL",
    },
    {
      id: "monitor-gamer-aoc-24",
      name: "Monitor Gamer AOC 24' Full HD 180Hz Gaming G4 24G2SPE/BK HDMI DisplayPort Base Ajuste",
      price: 899.5,
      installments: "10x de R$ 89,95 sem juros",
      discount: "10% de desconto no pix",
      image: "/monitor-aoc-24-new.jpg",
      badge: "FULL",
    },
    {
      id: "monitor-gamer-aoc-27",
      name: "Monitor Gamer AOC 27' Full HD 180Hz Gaming G4 27G2SPE/BK HDMI DisplayPort Base Ajuste",
      price: 1124.1,
      installments: "10x de R$ 112,41 sem juros",
      discount: "10% de desconto no pix",
      image: "/monitor-aoc-27-new.jpg",
      badge: "FULL",
    },
    {
      id: "monitor-100hz-full-hd-widescreen",
      name: "Monitor 100Hz Full HD Widescreen 2ms AOC Série B05 22B1H/96G 21.5' HDMI",
      price: 619.0,
      installments: "10x de R$ 61,90 sem juros",
      discount: "10% de desconto no pix",
      image: "/monitor-aoc-21-5-new.jpg",
      badge: "FULL",
    },
  ]

  const inspiredProducts = [
    {
      id: "notebook-dell-inspiron-15-i15-1120k-a25p-inspired",
      name: "Notebook Dell Inspiron 15 I15-1120K-A25P Intel Core i5 8GB RAM 512GB SSD 15.6' Full HD Windows 11",
      price: 3486.57,
      originalPrice: 3749.0,
      installments: "10x de R$ 374,90 sem juros",
      discount: "7% de desconto no pix",
      rating: 5.0,
      reviews: 676,
      image: "/notebook-dell-inspiron-15-a25p-new.jpg",
    },
    {
      id: "notebook-acer-aspire-5-a515-45-r3gl",
      name: "Notebook Acer Aspire 5 A515-45-R3GL AMD Ryzen R7 12GB RAM SSD 512 GB 15.6' Full HD Linux NX.A7DAL.00N",
      price: 2999.0,
      originalPrice: 3224.73,
      installments: "10x de R$ 322,47 sem juros",
      discount: "7% de desconto no pix",
      rating: 5.0,
      reviews: 295,
      image: "/notebook-acer-aspire-5-r3gl-new.jpg",
    },
    {
      id: "notebook-lenovo-ideapad-1i",
      name: "Notebook Lenovo IdeaPad 1i Intel Core i5",
      price: 3104.1,
      originalPrice: 3449.0,
      installments: "10x de R$ 344,90 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 1993,
      image: "/notebook-lenovo-ideapad-1i-new.jpg",
    },
    {
      id: "notebook-acer-aspire-5-i5-8gb",
      name: "Notebook Acer Aspire 5 Intel Core i5 8GB RAM 512GB",
      price: 3149.99,
      originalPrice: 3499.99,
      installments: "10x de R$ 350,00 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 18,
      image: "/notebook-acer-aspire-5-i5-8gb-new.jpg",
    },
  ]

  const mostSoldProducts = [
    {
      id: "smartphone-samsung-galaxy-a06-mais-vendido",
      name: "Smartphone Samsung Galaxy A06 128GB 4GB RAM Azul Escuro 6.7' Câm Dupla + Selfie 8MP",
      price: 648.9,
      originalPrice: 721.0,
      installments: "10x de R$ 72,10 sem juros",
      rating: 5.0,
      reviews: 9384,
      image: "/smartphone-samsung-galaxy-a06-blue.jpg",
    },
    {
      id: "sanduicheira-grill-cadence",
      name: "Sanduicheira Grill Cadence Preta 750W Antiaderente Click",
      price: 113.91,
      originalPrice: 119.9,
      installments: "2x de R$ 59,95 sem juros",
      rating: 5.0,
      reviews: 2090,
      image: "/sanduicheira-grill-cadence-new.jpg",
    },
    {
      id: "liquidificador-mondial",
      name: "Liquidificador Mondial Turbo Power L-99 FB Preto com Filtro 3 Velocidades 550W",
      price: 94.91,
      originalPrice: 99.9,
      installments: "2x de R$ 49,95 sem juros",
      rating: 5.0,
      reviews: 15718,
      image: "/liquidificador-mondial-new.jpg",
    },
    {
      id: "mop-giratorio-nyloc",
      name: "Mop Giratório Com Cesto Em Inox Preto - Nyloc",
      price: 54.59,
      originalPrice: null,
      installments: null,
      rating: 4.0,
      reviews: 3919,
      badge: "Retire na Loja",
      image: "/mop-giratorio-nyloc-new.jpeg",
    },
  ]

  const tvVideoProducts = [
    {
      id: "smart-tv-tcl-65-qled",
      name: "Smart TV 65' TCL 4K UHD QLED 65P7K Google TV AIPQ Google Assistente 3 HDMI 1 USB",
      price: 3028.6,
      originalPrice: 3188.0,
      installments: "10x de R$ 318,80 sem juros",
      discount: "5% de desconto no pix",
      rating: 5.0,
      reviews: 165,
      badge: "Receba amanhã",
      image: "/smart-tv-tcl-65-qled-new.jpg",
    },
    {
      id: "smart-tv-aoc-43-dled",
      name: "Smart TV 43' Full HD DLED AOC 43S5135 Wi-Fi 3 HDMI 1 USB",
      price: 1357.55,
      originalPrice: 1429.0,
      installments: "7x de R$ 204,14 sem juros",
      discount: "5% de desconto no pix",
      rating: 5.0,
      reviews: 318,
      badge: "Receba em até 2 dias úteis",
      image: "/smart-tv-aoc-43-dled-new.jpg",
    },
    {
      id: "smart-tv-semp-32-hd",
      name: "Smart TV 32' HD LED Semp 32R6610 Wi-Fi 3 HDMI 1 USB",
      price: 901.55,
      originalPrice: 949.0,
      installments: "5x de R$ 189,80 sem juros",
      discount: "5% de desconto no pix",
      rating: 5.0,
      reviews: 2560,
      image: "/smart-tv-semp-32-hd-new.jpg",
    },
    {
      id: "smart-tv-aoc-50-4k",
      name: "Smart TV 50' AOC 4K DLED 50U7045/78G Roku TV Quad Core 3 HDMI",
      price: 1804.05,
      originalPrice: 1890.0,
      installments: "10x de R$ 189,90 sem juros",
      discount: "5% de desconto no pix",
      rating: 5.0,
      reviews: 159,
      badge: "Receba em até 2 dias úteis",
      image: "/smart-tv-aoc-50-4k-new.jpg",
    },
  ]

  const flashSaleProducts = [
    {
      id: "smart-tv-lg-50-4k",
      name: "Smart TV LG 50' LED 4K UHD Smart Pro 50 UT80 C054 Bivolt",
      price: 2069.0,
      originalPrice: 2298.89,
      installments: "10x de R$ 229,89 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 46,
      timer: "15:08:53",
      image: "/smart-tv-lg-50-4k-new.jpeg",
    },
    {
      id: "fritadeira-air-fryer-philco",
      name: "Fritadeira Air Fryer Oven PFR2000 2 Em 1 11l 1700w Philco 110v",
      price: 748.0,
      originalPrice: 850.66,
      installments: "10x de R$ 74,80 sem juros",
      rating: 5.0,
      reviews: 896,
      timer: "15:08:53",
      image: "/fritadeira-air-fryer-philco-new.jpeg",
    },
    {
      id: "relogio-feminino-curren",
      name: "Relógio Feminino Elegante A Prova D'água De Aço Inoxidável Com Quartzo Curren 9053, Relógio De Pulso",
      price: 68.92,
      originalPrice: 91.82,
      installments: "7x de R$ 9,85 sem juros",
      timer: "15:08:53",
      international: true,
      image: "/relogio-feminino-curren-new.jpeg",
    },
    {
      id: "armario-cozinha-emily",
      name: "Armário de Cozinha Completa com Armário e Balcão 229cm Emily Madesa",
      price: 741.17,
      originalPrice: 823.52,
      installments: "6x de R$ 137,25 sem juros",
      discount: "10% de desconto no pix",
      rating: 4.0,
      reviews: 1006,
      timer: "15:08:53",
      image: "/armario-cozinha-emily-new.jpeg",
    },
  ]

  const internationalProducts = [
    {
      id: "relogio-orient-classic",
      name: "Relógio Orient Classic Masculino - Aço Inoxidável",
      price: 182.7,
      originalPrice: 206.0,
      installments: "2x de R$ 91,35 sem juros",
      rating: 4.0,
      reviews: 12,
      image: "/relogio-orient-classic-new.jpeg",
    },
    {
      id: "fones-bluetooth-e7s",
      name: "Fones de Ouvido Bluetooth E7S TWS Sem Fio Com Cancelamento de Ruído e Microfone",
      price: 49.63,
      originalPrice: null,
      installments: "7x de R$ 7,09 sem juros",
      rating: 4.0,
      reviews: 89,
      image: "/fones-bluetooth-e7s-new.jpeg",
    },
    {
      id: "perfume-lattafa-asad",
      name: "Perfume Lattafa Asad Eau de Parfum 100ml - Unissex",
      price: 360.05,
      originalPrice: 382.6,
      installments: "5x de R$ 72,01 sem juros",
      rating: 5.0,
      reviews: 1024,
      image: "/perfume-lattafa-asad-new.jpeg",
    },
    {
      id: "perfume-fragrance-world",
      name: "Perfume Fragrance World Liquid Brun Eau de Parfum 100ml",
      price: 336.43,
      originalPrice: 399.68,
      installments: "7x de R$ 48,06 sem juros",
      rating: 5.0,
      reviews: 1,
      image: "/perfume-fragrance-world-new.jpeg",
    },
  ]

  const cellphoneProducts = [
    {
      id: "smartphone-samsung-galaxy-a06-cell",
      name: "Smartphone Samsung Galaxy A06 128GB 4GB RAM Azul Escuro 6.7' Câm Dupla + Selfie 8MP",
      price: 648.9,
      originalPrice: 721.0,
      installments: "10x de R$ 72,10 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 9384,
      image: "/smartphone-samsung-galaxy-a06-blue.jpg",
    },
    {
      id: "smartphone-samsung-galaxy-a16-lite",
      name: "Smartphone Samsung Galaxy A16 Lite 128GB 4GB RAM Bateria 5.7 Câm Dupla + Selfie 8MP",
      price: 971.1,
      originalPrice: 1079.0,
      installments: "10x de R$ 107,90 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 123,
      image: "/smartphone-samsung-galaxy-a16.jpg",
    },
    {
      id: "iphone-15",
      name: "Apple iPhone 15 128GB 4G 48MP iOS",
      price: 4299.0,
      originalPrice: 4777.0,
      installments: "10x de R$ 477,70 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 133,
      image: "/iphone-15-new.jpg",
    },
    {
      id: "smartphone-samsung-galaxy-a56",
      name: "Smartphone Samsung Galaxy A56 256GB 8GB RAM Câmera Tripla + Selfie 32MP Dual Chip",
      price: 1799.1,
      originalPrice: 1999.0,
      installments: "10x de R$ 199,90 sem juros",
      discount: "10% de desconto no pix",
      rating: 5.0,
      reviews: 491,
      image: "/smartphone-samsung-galaxy-a54.jpg",
    },
  ]

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
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 py-4 w-full">
            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-start">
              <Image src="/magalu-logo.png" alt="Magalu" width={120} height={40} className="rounded" />
              {/* Texto 'magalu' removido */}
            </div>
            {/* Search Bar */}
            <div className="w-full md:flex-1 max-w-full md:max-w-2xl mx-0 md:mx-4 mt-2 md:mt-0">
              <div className="relative">
                <Input placeholder="Busca no Magalu" className="w-full pr-12 text-black rounded-md" />
                <Button size="icon" className="absolute right-0 top-0 rounded-l-none bg-transparent hover:bg-transparent">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs mt-1 flex flex-wrap gap-2">
                <span>#TenhoMagalu</span>
                <span>Bolsa de banho</span>
                <span>Almofada de pescoço</span>
                <span>Caixa organizadora</span>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end mt-2 md:mt-0">
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
          {/* Navegação removida */}
        </div>
      </header>

      {/* Main Banner */}
      <section className="relative">
        <div className="bg-white py-12 flex justify-center items-center">
          <div className="w-full max-w-7xl mx-auto relative">
            <img
              src={mainBannerImages[currentBanner]}
              alt={`Banner ${currentBanner + 1}`}
              className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg transition-all duration-500"
              style={{ minHeight: '200px', maxHeight: '380px' }}
            />
            {/* Setas */}
            <button
              onClick={() => setCurrentBanner((currentBanner - 1 + mainBannerImages.length) % mainBannerImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
            <button
              onClick={() => setCurrentBanner((currentBanner + 1) % mainBannerImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {mainBannerImages.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full border-2 ${idx === currentBanner ? 'bg-blue-600 border-blue-600' : 'bg-white border-blue-300'}`}
                  onClick={() => setCurrentBanner(idx)}
                  aria-label={`Ir para banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Samsung Banners */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card esquerdo */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-0 overflow-hidden flex items-stretch">
            <img src="https://topsortassets.com/asset_01k0a9bkqtenp8kz6d9a7y2p4f.png" alt="Galaxy S25 Edge" className="w-full h-full object-cover" />
          </div>
          {/* Card central */}
          <div className="bg-black rounded-lg p-0 overflow-hidden flex items-stretch">
            <img src="https://topsortassets.com/asset_01k0a9mas9f7hrhtd3jk1kwg9n.png" alt="Beyond slim" className="w-full h-full object-cover" />
          </div>
          {/* Card direito */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-0 overflow-hidden flex items-stretch">
            <img src="https://topsortassets.com/asset_01k0a9bkqtenp8kz6d9a7y2p4f.png" alt="Galaxy S25 Edge" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="text-center">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">{product.category}</h3>
                <Link href={`/products/${product.id}`}>
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
                        {product.discount && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-xs">{product.discount}</Badge>
                        )}
                        {product.badge && (
                          <Badge className="absolute top-2 right-2 bg-blue-500 text-xs">{product.badge}</Badge>
                        )}
                      </div>

                      <h4 className="text-sm mb-2 line-clamp-3 text-left">{product.name}</h4>

                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.reviews})</span>
                        </div>
                      )}

                      <div className="text-left">
                        <div className="text-xl font-bold text-gray-800">
                          R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tem no Magalu */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Tem no Magalu</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {temNoMagalu.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between bg-blue-500 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="text-xl font-bold">Se conecte com a gente!</h3>
                <p className="text-sm">Cadastre-se e receba as melhores ofertas</p>
                <Link href="#" className="text-xs underline">
                  Leia a Política de Privacidade
                </Link>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Digite seu nome" className="text-black" />
              <Input placeholder="Digite seu e-mail" className="text-black" />
              <Button className="bg-orange-500 hover:bg-orange-600">CADASTRAR</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore e aproveite */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Explore e aproveite</h2>
              <p className="text-gray-600">Patrocinados</p>
            </div>
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
            {exploreProducts.map((product) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                    <div className="mb-4">
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      <div className="text-sm text-green-600">{product.discount}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inspirado no que você viu por aqui */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Inspirado no que você viu por aqui</h2>
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
            {inspiredProducts.map((product, index) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 line-through">
                        R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      <div className="text-sm text-green-600">{product.discount}</div>
                      <Badge className="bg-green-500 text-xs mt-1">Cupom R$ 100 OFF</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Os mais vendidos */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Os mais vendidos</h2>
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
            {mostSoldProducts.map((product, index) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
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
                          R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                        </div>
                      )}
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      {product.installments && <div className="text-sm text-gray-600">{product.installments}</div>}
                      {product.badge && <div className="text-sm text-blue-600">{product.badge}</div>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selecionados para você em TV e Vídeo */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Selecionados para você em TV e Vídeo</h2>
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
            {tvVideoProducts.map((product, index) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
                      {index === 0 && (
                        <Badge className="absolute top-2 right-2 bg-orange-500 text-xs">LANÇAMENTO</Badge>
                      )}
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 line-through">
                        R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      <div className="text-sm text-green-600">{product.discount}</div>
                      {product.badge && <div className="text-sm text-blue-600 mt-1">{product.badge}</div>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Porque você viu Celulares e Smartphones */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Porque você viu Celulares e Smartphones</h2>
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
            {cellphoneProducts.map((product, index) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 line-through">
                        R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      <div className="text-sm text-green-600">{product.discount}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Relâmpago */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Ofertas Relâmpago</h2>
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
            {flashSaleProducts.map((product, index) => (
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
                      <Badge className="absolute top-2 left-2 bg-blue-500">FULL</Badge>
                      <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        ⏰ Oferta termina em {product.timer}
                      </div>
                    </div>

                    <h3 className="text-sm mb-2 line-clamp-3">{product.name}</h3>

                    {product.rating && (
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
                    )}

                    <div className="mb-4">
                      <div className="text-sm text-gray-500 line-through">
                        R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                      </div>
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      {product.discount && <div className="text-sm text-green-600">{product.discount}</div>}
                      {product.international && <div className="text-sm text-blue-600">✈ Compra Internacional</div>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos internacionais */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Produtos internacionais</h2>
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
            {internationalProducts.map((product, index) => (
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
                          R$ {(product.originalPrice * 0.7).toFixed(2).replace(".", ",")}
                        </div>
                      )}
                      <div className="text-xl font-bold">R$ {(product.price * 0.7).toFixed(2).replace(".", ",")}</div>
                      <div className="text-sm text-gray-600">{product.installments}</div>
                      <div className="text-sm text-blue-600">✈ Compra Internacional</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Magalu Empresas Banner */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">magalu</div>
              <div className="text-2xl font-bold text-yellow-400">tudo pra sua empresa</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">📋</div>
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">🏢</div>
                <div className="w-12 h-12 bg-white/20 rounded flex items-center justify-center">💳</div>
              </div>
              <div className="text-sm">
                <div>Descontos exclusivos em</div>
                <div>produtos para o seu CNPJ</div>
              </div>
              <div className="bg-yellow-400 text-black px-4 py-2 rounded font-bold">magaluempresas.com.br</div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Serviços</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
            {[
              { name: "Cliente Ouro", icon: "https://wx.mlcdn.com.br/site/shared/services/cliente-ouro.png", color: "bg-yellow-500" },
              { name: "Consulte sua fatura Cartão Luiza", icon: "https://wx.mlcdn.com.br/site/shared/services/cartao-luiza.png", color: "bg-blue-500" },
              { name: "Magalu Seguros", icon: "https://wx.mlcdn.com.br/ponzi/assets/luiza-seg.svg", color: "bg-green-500" },
              { name: "Consórcio Magalu", icon: "https://wx.mlcdn.com.br/site/shared/services/logo-consorcio-magalu-horizontal.png", color: "bg-purple-500" },
              { name: "Influenciador Magalu", icon: "https://wx.mlcdn.com.br/site/shared/services/influenciador-magalu-logo.png", color: "bg-pink-500" },
              { name: "Lista de Casamento", icon: "https://wx.mlcdn.com.br/site/shared/services/listacasamento.png", color: "bg-red-500" },
              { name: "Garantia Estendida", icon: "https://wx.mlcdn.com.br/site/shared/services/garantia.png", color: "bg-gray-500" },
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                >
                  <img src={service.icon} alt={service.name} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-sm text-gray-600">{service.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lu explica */}
      <section className="py-12 bg-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Image src="/lu-explains-avatar.png" alt="Lu" width={60} height={60} className="rounded-full" />
              <div className="text-3xl font-bold">Lu explica</div>
            </div>
            <div className="flex gap-4">
              <span>Blog da Lu</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">f</div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">i</div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">t</div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">p</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "iPhone 15: conheça as novidades, modelos e acessórios essenciais",
                description: "Veja detalhes sobre esse modelo incrível da Apple que conta com excelentes...",
                category: "iPhone",
                image: "/lu-explica-iphone-15.jpg",
              },
              {
                title: "Games 2025: conheça os 7 melhores lançamentos pra esse ano",
                description: "Títulos de diversos gêneros pra você se divertir em 2025!",
                category: "Principais Jogos",
                image: "/lu-explica-games-2025.jpg",
              },
              {
                title: "Diferença entre Umidificador, Desumidificador e Purificador de ar",
                description: "Conheça as vantagens de cada um e faça a escolha certa!",
                category: "Tratamento de Ar",
                image: "/lu-explica-air-purifier.jpg",
              },
            ].map((article, index) => (
              <Card key={index} className="bg-white text-gray-800">
                <CardContent className="p-0">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t"
                  />
                  <div className="p-4">
                    <Badge className="bg-purple-600 text-white mb-2">{article.category}</Badge>
                    <h3 className="font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Motorola Edge 30 Neo: O que é e quais são seus principais diferenciais?",
                description: "Saiba todos os detalhes desse smartphone incrível",
                category: "Motorola",
                image: "/lu-explica-motorola-edge.jpg",
              },
              {
                title: "Lançamentos de games de 2025: conheça as opções disponíveis",
                description: "Vem ver os novos games que vão bombar este ano!",
                category: "Jogos em Lançamento",
                image: "/lu-explica-games-launch.jpg",
              },
              {
                title: "Quanto gasta um ar-condicionado?",
                description: "Vem ver algumas opções econômicas e como calcular o consumo!",
                category: "Ar-Condicionado",
                image: "/lu-explica-air-conditioner.jpg",
              },
              {
                title: "Redmi Note 13 vs Samsung Galaxy A53: quais as diferenças?",
                description: "Veja as diferenças entre estes smartphones intermediários.",
                category: "Samsung Galaxy",
                image: "/lu-explica-redmi-samsung.jpg",
              },
              {
                title: "GTA 6: tudo o que precisa saber sobre o lançamento do Grand Theft Auto VI",
                description: "Previsto pra 2025, o preço do GTA VI pode chegar a mais de R$600,00!",
                category: "GTA",
                image: "/lu-explica-gta-6.jpg",
              },
              {
                title: "Umidificadores de ar: conheça os tipos diferentes",
                description: "Vem saber como escolher o melhor modelo pra você!",
                category: "Tratamento de Ar",
                image: "/lu-explica-humidifiers.jpg",
              },
            ].map((article, index) => (
              <div key={index} className="flex gap-4">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={150}
                  height={100}
                  className="rounded"
                />
                <div>
                  <Badge className="bg-purple-800 text-white mb-2 text-xs">{article.category}</Badge>
                  <h4 className="font-bold text-sm mb-1">{article.title}</h4>
                  <p className="text-xs text-gray-300">{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links Relacionados */}
      <section className="bg-white py-4 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 text-sm text-blue-600">
            <span className="text-gray-600">Links Relacionados:</span>
            <Link href="#" className="hover:underline">
              Blog da Lu
            </Link>
            <Link href="#" className="hover:underline">
              Geladeira
            </Link>
            <Link href="#" className="hover:underline">
              iPhone 15
            </Link>
            <Link href="#" className="hover:underline">
              Air Fryer
            </Link>
            <Link href="#" className="hover:underline">
              Ar Condicionado
            </Link>
            <Link href="#" className="hover:underline">
              Microondas
            </Link>
            <Link href="#" className="hover:underline">
              Ventilador
            </Link>
            <Link href="#" className="hover:underline">
              Notebook
            </Link>
            <Link href="#" className="hover:underline">
              Fogão 4 Bocas
            </Link>
            <Link href="#" className="hover:underline">
              Guarda Roupa
            </Link>
            <Link href="#" className="hover:underline">
              S25
            </Link>
            <Link href="#" className="hover:underline">
              iPhone 16
            </Link>
          </div>
        </div>
      </section>

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

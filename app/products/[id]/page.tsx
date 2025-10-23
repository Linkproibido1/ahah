"use client"

import {
  Search,
  ShoppingCart,
  Heart,
  MapPin,
  Star,
  Truck,
  Menu,
  Share2,
  HeartIcon,
  PlayCircle,
  Package,
  ShieldCheck,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUserSession, addMockOrder } from "@/app/auth/actions"
import { useRouter } from "next/navigation"

// Mock product data
const mockProducts = {
  "tablet-samsung-galaxy-tab-s10-fe": {
    id: "tablet-samsung-galaxy-tab-s10-fe",
    name: 'Tablet Samsung Galaxy Tab S10 FE com Capa e Caneta S Pen 8GB RAM 128GB 10,9" Android 15 Exynos 1580 Wi-Fi',
    breadcrumbs: ["Informática", "Tablet", "Samsung Galaxy Tab"],
    images: [
      "/tablet-samsung-galaxy-tab-s10-fe.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.9,
    reviews: 227,
    price: 2906.1,
    originalPrice: 4948.9,
    installments: "10x de R$ 322,90 sem juros",
    discountPix: "10% de desconto no Pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba até quinta-feira, 24 de julho",
    shippingCost: "R$ 19,90",
    pickupEstimate: "Retire na loja a partir de amanhã",
    specs: [
      { label: "Armazenamento Interno", value: "128GB" },
      { label: "Memória RAM", value: "8GB" },
      { label: "Tela", value: "10,9 polegadas" },
      { label: "Sistema Operacional", value: "Android 15" },
      { label: "Processador", value: "Exynos 1580" },
      { label: "Conectividade", value: "Wi-Fi" },
    ],
    customerFeedback: [
      { type: "tela incrível", count: 50 },
      { type: "caneta s pen", count: 30 },
      { type: "desempenho rápido", count: 25 },
    ],
    internalStorageOptions: ["128GB", "256GB"],
    colorOptions: [
      { name: "Azul", src: "/tablet-samsung-galaxy-tab-s10-fe-azul.jpeg" },
      { name: "Verde", src: "/tablet-samsung-galaxy-tab-s10-fe-verde.jpeg" },
      { name: "Rosa", src: "/tablet-samsung-galaxy-tab-s10-fe-rosa.jpeg" },
    ],
  },
  "notebook-acer-aspire-5": {
    id: "notebook-acer-aspire-5",
    name: "Notebook Acer Aspire 5 Intel Core i5 12450H 8GB RAM 512GB SSD 15.6' Full HD Windows 11 A515-57-565J",
    breadcrumbs: ["Notebook", "Notebook Acer", "Notebook Acer Aspire 5"],
    images: [
      "/notebook-acer-aspire-5-i5-12450h.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.9,
    reviews: 2415,
    price: 3149.0,
    originalPrice: 3499.99,
    installments: "10x de R$ 349,99 sem juros",
    discountPix: "10% de desconto no Pix",
    cupom: "R$ 100 OFF",
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "Intel Core i5" },
      { label: "Memória RAM", value: "8GB" },
      { label: "SSD", value: "512GB" },
      { label: "Tela", value: "15.6 polegadas" },
      { label: "Sistema Operacional", value: "Windows 11" },
      { label: "Duração da bateria", value: "até 7 horas" },
    ],
    customerFeedback: [
      { type: "processador rápido", count: 12 },
      { type: "bateria durável", count: 8 },
      { type: "som cristalino", count: 5 },
    ],
  },
  "lava-e-seca-samsung-11kg": {
    id: "lava-e-seca-samsung-11kg",
    name: "Lava e Seca Samsung 11kg Inverter",
    breadcrumbs: ["Eletrodomésticos", "Lava e Seca", "Samsung"],
    images: [
      "/lava-e-seca-samsung-11kg.jpg",
      "/lava-e-seca-midea-slim-11kg.jpg",
      "/lava-e-seca-samsung-13kg.jpg",
      "/lava-e-seca-samsung-10kg.jpeg",
    ],
    rating: 4.5,
    reviews: 737,
    price: 2326.84,
    originalPrice: 3500.0,
    installments: "10x de R$ 350,00 sem juros",
    discountPix: "5% de desconto no Pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 3 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Capacidade", value: "11kg" },
      { label: "Tecnologia", value: "Inverter" },
      { label: "Funções", value: "Lava e Seca" },
    ],
    customerFeedback: [
      { type: "silenciosa", count: 15 },
      { type: "lava bem", count: 10 },
    ],
  },
  "notebook-gamer-acer-nitro-v15": {
    id: "notebook-gamer-acer-nitro-v15",
    name: "Notebook Gamer Acer Nitro V15 Intel Core i5-13420H 8 GB RAM RTX 4050",
    breadcrumbs: ["Informática", "Notebook Gamer", "Acer Nitro"],
    images: [
      "/notebook-gamer-acer-nitro-v15.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.3,
    reviews: 89,
    price: 3569.3,
    originalPrice: 5500.0,
    installments: "10x de R$ 550,00 sem juros",
    discountPix: "7% de desconto no Pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Retire na Loja",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "Intel Core i5-13420H" },
      { label: "Memória RAM", value: "8GB" },
      { label: "Placa de Vídeo", value: "RTX 4050" },
      { label: "Armazenamento", value: "512GB SSD" },
    ],
    customerFeedback: [
      { type: "ótimo para jogos", count: 20 },
      { type: "design moderno", count: 8 },
    ],
  },
  "smartphone-samsung-galaxy-a05": {
    id: "smartphone-samsung-galaxy-a05",
    name: "Smartphone Samsung Galaxy A05 128GB 4GB RAM Bateria 5.7 Câm",
    breadcrumbs: ["Celulares", "Smartphones", "Samsung Galaxy"],
    images: [
      "/smartphone-samsung-galaxy-a06-white.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.7,
    reviews: 156,
    price: 454.23,
    originalPrice: 700.0,
    installments: "10x de R$ 70,00 sem juros",
    discountPix: "5% de desconto no Pix",
    cupom: "Cupom R$ 50 OFF",
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Armazenamento", value: "128GB" },
      { label: "Memória RAM", value: "4GB" },
      { label: "Tela", value: "6.7 polegadas" },
      { label: "Câmera", value: "Câmera Dupla + Selfie 8MP" },
    ],
    customerFeedback: [
      { type: "bateria boa", count: 30 },
      { type: "câmera excelente", count: 15 },
    ],
  },
  "smart-tv-tcl-32-android": {
    id: "smart-tv-tcl-32-android",
    name: 'Smart TV 32" Full HD LED TCL 32S5400A Android',
    breadcrumbs: ["TV e Vídeo", "Smart TV", "TCL"],
    images: [
      "/smart-tv-tcl-32-full-hd.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.5,
    reviews: 10674,
    price: 664.34,
    originalPrice: 1000.0,
    installments: "10x de R$ 100,00 sem juros",
    discountPix: "5% de desconto no Pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 3 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "32 polegadas" },
      { label: "Resolução", value: "Full HD" },
      { label: "Sistema Operacional", value: "Android TV" },
      { label: "Conectividade", value: "Wi-Fi, HDMI, USB" },
    ],
    customerFeedback: [
      { type: "imagem nítida", count: 50 },
      { type: "fácil de usar", count: 40 },
    ],
  },
  "notebook-dell-inspiron-15-i15-1120k-a25p-inspired": {
    id: "notebook-dell-inspiron-15-i15-1120k-a25p-inspired",
    name: "Notebook Dell Inspiron 15 I15-1120K-A25P Intel Core i5 8GB RAM 512GB SSD 15.6' Full HD Windows 11",
    breadcrumbs: ["Notebook", "Notebook Dell", "Inspiron"],
    images: [
      "/notebook-dell-inspiron-15-a25p-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 676,
    price: 2440.6,
    originalPrice: 3749.0,
    installments: "10x de R$ 374,90 sem juros",
    discountPix: "7% de desconto no pix",
    cupom: "Cupom R$ 100 OFF",
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "Intel Core i5" },
      { label: "Memória RAM", value: "8GB" },
      { label: "SSD", value: "512GB" },
      { label: "Tela", value: "15.6 polegadas" },
      { label: "Sistema Operacional", value: "Windows 11" },
    ],
    customerFeedback: [
      { type: "desempenho rápido", count: 25 },
      { type: "tela de qualidade", count: 18 },
    ],
  },
  "notebook-acer-aspire-5-a515-45-r3gl": {
    id: "notebook-acer-aspire-5-a515-45-r3gl",
    name: "Notebook Acer Aspire 5 A515-45-R3GL AMD Ryzen R7 12GB RAM SSD 512 GB 15.6' Full HD Linux NX.A7DAL.00N",
    breadcrumbs: ["Notebook", "Notebook Acer", "Aspire"],
    images: [
      "/notebook-acer-aspire-5-r3gl-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 295,
    price: 2099.3,
    originalPrice: 3224.73,
    installments: "10x de R$ 322,47 sem juros",
    discountPix: "7% de desconto no pix",
    cupom: "Cupom R$ 100 OFF",
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 3 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "AMD Ryzen R7" },
      { label: "Memória RAM", value: "12GB" },
      { label: "SSD", value: "512GB" },
      { label: "Tela", value: "15.6 polegadas" },
      { label: "Sistema Operacional", value: "Linux" },
    ],
    customerFeedback: [
      { type: "processador rápido", count: 20 },
      { type: "design moderno", count: 15 },
    ],
  },
  "notebook-lenovo-ideapad-1i": {
    id: "notebook-lenovo-ideapad-1i",
    name: "Notebook Lenovo IdeaPad 1i Intel Core i5",
    breadcrumbs: ["Notebook", "Notebook Lenovo", "IdeaPad"],
    images: [
      "/notebook-lenovo-ideapad-1i-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 1993,
    price: 2172.87,
    originalPrice: 3449.0,
    installments: "10x de R$ 344,90 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "Intel Core i5" },
      { label: "Memória RAM", value: "8GB" },
      { label: "Armazenamento", value: "256GB SSD" },
      { label: "Tela", value: "14 polegadas" },
    ],
    customerFeedback: [
      { type: "leve e portátil", count: 18 },
      { type: "bom para estudo", count: 12 },
    ],
  },
  "notebook-acer-aspire-5-i5-8gb": {
    id: "notebook-acer-aspire-5-i5-8gb",
    name: "Notebook Acer Aspire 5 Intel Core i5 8GB RAM 512GB",
    breadcrumbs: ["Notebook", "Notebook Acer", "Aspire"],
    images: [
      "/notebook-acer-aspire-5-i5-8gb-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 18,
    price: 2204.99,
    originalPrice: 3499.99,
    installments: "10x de R$ 350,00 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Processador", value: "Intel Core i5" },
      { label: "Memória RAM", value: "8GB" },
      { label: "SSD", value: "512GB" },
      { label: "Tela", value: "15.6 polegadas" },
    ],
    customerFeedback: [
      { type: "custo-benefício", count: 10 },
      { type: "rápido", count: 7 },
    ],
  },
  "kit-4-garrafas-tinta-epson": {
    id: "kit-4-garrafas-tinta-epson",
    name: "Kit 4 Garrafas de Tinta Epson T664 Original",
    breadcrumbs: ["Informática", "Impressoras", "Tinta"],
    images: ["/ink-bottles-new.jpeg", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    rating: 4.8,
    reviews: 500,
    price: 153.71,
    originalPrice: 240.0,
    installments: "3x de R$ 73,20 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tipo", value: "Tinta Original" },
      { label: "Cor", value: "CMYK" },
      { label: "Compatibilidade", value: "Epson L Series" },
    ],
    customerFeedback: [
      { type: "qualidade de impressão", count: 30 },
      { type: "fácil de instalar", count: 20 },
    ],
  },
  "monitor-gamer-aoc-24": {
    id: "monitor-gamer-aoc-24",
    name: "Monitor Gamer AOC 24' Full HD 180Hz Gaming G4 24G2SPE/BK HDMI DisplayPort Base Ajuste",
    breadcrumbs: ["Informática", "Monitores", "Monitor Gamer"],
    images: [
      "/monitor-aoc-24-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.9,
    reviews: 899,
    price: 629.65,
    originalPrice: 950.0,
    installments: "10x de R$ 89,95 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 3 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho", value: "24 polegadas" },
      { label: "Resolução", value: "Full HD" },
      { label: "Taxa de Atualização", value: "180Hz" },
      { label: "Conectividade", value: "HDMI, DisplayPort" },
    ],
    customerFeedback: [
      { type: "excelente para jogos", count: 40 },
      { type: "cores vibrantes", count: 25 },
    ],
  },
  "monitor-gamer-aoc-27": {
    id: "monitor-gamer-aoc-27",
    name: "Monitor Gamer AOC 27' Full HD 180Hz Gaming G4 27G2SPE/BK HDMI DisplayPort Base Ajuste",
    breadcrumbs: ["Informática", "Monitores", "Monitor Gamer"],
    images: [
      "/monitor-aoc-27-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.7,
    reviews: 700,
    price: 786.87,
    originalPrice: 1200.0,
    installments: "10x de R$ 112,41 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 3 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho", value: "27 polegadas" },
      { label: "Resolução", value: "Full HD" },
      { label: "Taxa de Atualização", value: "180Hz" },
      { label: "Conectividade", value: "HDMI, DisplayPort" },
    ],
    customerFeedback: [
      { type: "tela grande", count: 35 },
      { type: "ótima performance", count: 28 },
    ],
  },
  "monitor-100hz-full-hd-widescreen": {
    id: "monitor-100hz-full-hd-widescreen",
    name: "Monitor 100Hz Full HD Widescreen 2ms AOC Série B05 22B1H/96G 21.5' HDMI",
    breadcrumbs: ["Informática", "Monitores", "Monitor AOC"],
    images: [
      "/monitor-aoc-21-5-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.6,
    reviews: 450,
    price: 619.0,
    originalPrice: 650.0,
    installments: "10x de R$ 61,90 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho", value: "21.5 polegadas" },
      { label: "Resolução", value: "Full HD" },
      { label: "Taxa de Atualização", value: "100Hz" },
      { label: "Tempo de Resposta", value: "2ms" },
    ],
    customerFeedback: [
      { type: "bom para trabalho", count: 20 },
      { type: "preço acessível", count: 15 },
    ],
  },
  "smartphone-samsung-galaxy-a06-mais-vendido": {
    id: "smartphone-samsung-galaxy-a06-mais-vendido",
    name: "Smartphone Samsung Galaxy A06 128GB 4GB RAM Azul Escuro 6.7' Câm Dupla + Selfie 8MP",
    breadcrumbs: ["Celulares", "Smartphones", "Samsung Galaxy"],
    images: [
      "/smartphone-samsung-galaxy-a06-blue.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 9384,
    price: 648.9,
    originalPrice: 721.0,
    installments: "10x de R$ 72,10 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Armazenamento", value: "128GB" },
      { label: "Memória RAM", value: "4GB" },
      { label: "Tela", value: "6.7 polegadas" },
      { label: "Câmera", value: "Câmera Dupla + Selfie 8MP" },
    ],
    customerFeedback: [
      { type: "bateria boa", count: 30 },
      { type: "câmera excelente", count: 15 },
    ],
  },
  "sanduicheira-grill-cadence": {
    id: "sanduicheira-grill-cadence",
    name: "Sanduicheira Grill Cadence Preta 750W Antiaderente Click",
    breadcrumbs: ["Eletroportáteis", "Cozinha", "Sanduicheira"],
    images: [
      "/sanduicheira-grill-cadence-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 2090,
    price: 113.91,
    originalPrice: 119.9,
    installments: "2x de R$ 59,95 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 1 dia útil",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Potência", value: "750W" },
      { label: "Revestimento", value: "Antiaderente" },
      { label: "Cor", value: "Preta" },
    ],
    customerFeedback: [
      { type: "esquenta rápido", count: 10 },
      { type: "fácil de limpar", count: 8 },
    ],
  },
  "liquidificador-mondial": {
    id: "liquidificador-mondial",
    name: "Liquidificador Mondial Turbo Power L-99 FB Preto com Filtro 3 Velocidades 550W",
    breadcrumbs: ["Eletroportáteis", "Cozinha", "Liquidificador"],
    images: [
      "/liquidificador-mondial-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 15718,
    price: 94.91,
    originalPrice: 99.9,
    installments: "2x de R$ 49,95 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 1 dia útil",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Potência", value: "550W" },
      { label: "Velocidades", value: "3" },
      { label: "Recursos", value: "Filtro" },
    ],
    customerFeedback: [
      { type: "potente", count: 50 },
      { type: "bom para sucos", count: 30 },
    ],
  },
  "mop-giratorio-nyloc": {
    id: "mop-giratorio-nyloc",
    name: "Mop Giratório Com Cesto Em Inox Preto - Nyloc",
    breadcrumbs: ["Casa e Limpeza", "Limpeza", "Mop"],
    images: [
      "/mop-giratorio-nyloc-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.0,
    reviews: 3919,
    price: 54.59,
    originalPrice: 60.0,
    installments: null,
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Retire na Loja",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Material do Cesto", value: "Inox" },
      { label: "Cor", value: "Preto" },
      { label: "Marca", value: "Nyloc" },
    ],
    customerFeedback: [
      { type: "prático", count: 20 },
      { type: "limpa bem", count: 15 },
    ],
  },
  "smart-tv-tcl-65-qled": {
    id: "smart-tv-tcl-65-qled",
    name: "Smart TV 65' TCL 4K UHD QLED 65P7K Google TV AIPQ Google Assistente 3 HDMI 1 USB",
    breadcrumbs: ["TV e Vídeo", "Smart TV", "TCL"],
    images: [
      "/smart-tv-tcl-65-qled-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 165,
    price: 3028.6,
    originalPrice: 3188.0,
    installments: "10x de R$ 318,80 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba amanhã",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "65 polegadas" },
      { label: "Resolução", value: "4K UHD" },
      { label: "Tecnologia", value: "QLED" },
      { label: "Sistema Operacional", value: "Google TV" },
    ],
    customerFeedback: [
      { type: "imagem incrível", count: 50 },
      { type: "som de qualidade", count: 30 },
    ],
  },
  "smart-tv-aoc-43-dled": {
    id: "smart-tv-aoc-43-dled",
    name: "Smart TV 43' Full HD DLED AOC 43S5135 Wi-Fi 3 HDMI 1 USB",
    breadcrumbs: ["TV e Vídeo", "Smart TV", "AOC"],
    images: [
      "/smart-tv-aoc-43-dled-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 318,
    price: 1357.55,
    originalPrice: 1429.0,
    installments: "7x de R$ 204,14 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "43 polegadas" },
      { label: "Resolução", value: "Full HD" },
      { label: "Tecnologia", value: "DLED" },
      { label: "Conectividade", value: "Wi-Fi, HDMI, USB" },
    ],
    customerFeedback: [
      { type: "boa imagem", count: 25 },
      { type: "fácil de configurar", count: 18 },
    ],
  },
  "smart-tv-semp-32-hd": {
    id: "smart-tv-semp-32-hd",
    name: "Smart TV 32' HD LED Semp 32R6610 Wi-Fi 3 HDMI 1 USB",
    breadcrumbs: ["TV e Vídeo", "Smart TV", "Semp"],
    images: [
      "/smart-tv-semp-32-hd-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 2560,
    price: 901.55,
    originalPrice: 949.0,
    installments: "5x de R$ 189,80 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "32 polegadas" },
      { label: "Resolução", value: "HD" },
      { label: "Tecnologia", value: "LED" },
      { label: "Conectividade", value: "Wi-Fi, HDMI, USB" },
    ],
    customerFeedback: [
      { type: "compacta", count: 15 },
      { type: "bom som", count: 10 },
    ],
  },
  "smart-tv-aoc-50-4k": {
    id: "smart-tv-aoc-50-4k",
    name: "Smart TV 50' AOC 4K DLED 50U7045/78G Roku TV Quad Core 3 HDMI",
    breadcrumbs: ["TV e Vídeo", "Smart TV", "AOC"],
    images: [
      "/smart-tv-aoc-50-4k-new.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 159,
    price: 1804.05,
    originalPrice: 1890.0,
    installments: "10x de R$ 189,90 sem juros",
    discountPix: "5% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "50 polegadas" },
      { label: "Resolução", value: "4K" },
      { label: "Sistema Operacional", value: "Roku TV" },
      { label: "Processador", value: "Quad Core" },
    ],
    customerFeedback: [
      { type: "ótima imagem 4K", count: 30 },
      { type: "interface intuitiva", count: 20 },
    ],
  },
  "smartphone-samsung-galaxy-a16-lite": {
    id: "smartphone-samsung-galaxy-a16-lite",
    name: "Smartphone Samsung Galaxy A16 Lite 128GB 4GB RAM Bateria 5.7 Câm Dupla + Selfie 8MP",
    breadcrumbs: ["Celulares", "Smartphones", "Samsung Galaxy"],
    images: [
      "/smartphone-samsung-galaxy-a16.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 123,
    price: 971.1,
    originalPrice: 1079.0,
    installments: "10x de R$ 107,90 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Armazenamento", value: "128GB" },
      { label: "Memória RAM", value: "4GB" },
      { label: "Tela", value: "6.7 polegadas" },
      { label: "Câmera", value: "Câmera Dupla + Selfie 8MP" },
    ],
    customerFeedback: [
      { type: "bom desempenho", count: 10 },
      { type: "design bonito", count: 8 },
    ],
  },
  "iphone-15": {
    id: "iphone-15",
    name: "Apple iPhone 15 128GB 4G 48MP iOS",
    breadcrumbs: ["Celulares", "Smartphones", "iPhone"],
    images: ["/iphone-15-new.jpg", "/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    rating: 5.0,
    reviews: 133,
    price: 4299.0,
    originalPrice: 4777.0,
    installments: "10x de R$ 477,70 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 1 dia útil",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Armazenamento", value: "128GB" },
      { label: "Conectividade", value: "4G" },
      { label: "Câmera Principal", value: "48MP" },
      { label: "Sistema Operacional", value: "iOS" },
    ],
    customerFeedback: [
      { type: "câmera excelente", count: 25 },
      { type: "rápido e fluido", count: 20 },
    ],
  },
  "smartphone-samsung-galaxy-a56": {
    id: "smartphone-samsung-galaxy-a56",
    name: "Smartphone Samsung Galaxy A56 256GB 8GB RAM Câmera Tripla + Selfie 32MP Dual Chip",
    breadcrumbs: ["Celulares", "Smartphones", "Samsung Galaxy"],
    images: [
      "/smartphone-samsung-galaxy-a54.jpg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 491,
    price: 1799.1,
    originalPrice: 1999.0,
    installments: "10x de R$ 199,90 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Armazenamento", value: "256GB" },
      { label: "Memória RAM", value: "8GB" },
      { label: "Câmera", value: "Câmera Tripla + Selfie 32MP" },
      { label: "Chip", value: "Dual Chip" },
    ],
    customerFeedback: [
      { type: "ótima câmera", count: 40 },
      { type: "bateria de longa duração", count: 30 },
    ],
  },
  "smart-tv-lg-50-4k": {
    id: "smart-tv-lg-50-4k",
    name: "Smart TV LG 50' LED 4K UHD Smart Pro 50 UT80 C054 Bivolt",
    breadcrumbs: ["TV e Vídeo", "Smart TV", "LG"],
    images: [
      "/smart-tv-lg-50-4k-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 46,
    price: 2069.0,
    originalPrice: 2298.89,
    installments: "10x de R$ 229,89 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tamanho da Tela", value: "50 polegadas" },
      { label: "Resolução", value: "4K UHD" },
      { label: "Tecnologia", value: "LED" },
      { label: "Recursos", value: "Smart Pro" },
    ],
    customerFeedback: [
      { type: "imagem excelente", count: 15 },
      { type: "fácil de usar", count: 10 },
    ],
  },
  "fritadeira-air-fryer-philco": {
    id: "fritadeira-air-fryer-philco",
    name: "Fritadeira Air Fryer Oven PFR2000 2 Em 1 11l 1700w Philco 110v",
    breadcrumbs: ["Eletroportáteis", "Cozinha", "Air Fryer"],
    images: [
      "/fritadeira-air-fryer-philco-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 896,
    price: 748.0,
    originalPrice: 850.66,
    installments: "10x de R$ 74,80 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 2 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Capacidade", value: "11L" },
      { label: "Potência", value: "1700W" },
      { label: "Funções", value: "Fritadeira e Forno" },
    ],
    customerFeedback: [
      { type: "muito versátil", count: 30 },
      { type: "cozinha rápido", count: 25 },
    ],
  },
  "relogio-feminino-curren": {
    id: "relogio-feminino-curren",
    name: "Relógio Feminino Elegante A Prova D'água De Aço Inoxidável Com Quartzo Curren 9053, Relógio De Pulso",
    breadcrumbs: ["Acessórios", "Relógios", "Feminino"],
    images: [
      "/relogio-feminino-curren-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.0,
    reviews: 100,
    price: 68.92,
    originalPrice: 91.82,
    installments: "7x de R$ 9,85 sem juros",
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 15 dias úteis (Internacional)",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Material", value: "Aço Inoxidável" },
      { label: "Movimento", value: "Quartzo" },
      { label: "Resistência à Água", value: "Sim" },
    ],
    customerFeedback: [
      { type: "bonito", count: 10 },
      { type: "elegante", count: 8 },
    ],
  },
  "armario-cozinha-emily": {
    id: "armario-cozinha-emily",
    name: "Armário de Cozinha Completa com Armário e Balcão 229cm Emily Madesa",
    breadcrumbs: ["Móveis", "Cozinha", "Armário de Cozinha"],
    images: [
      "/armario-cozinha-emily-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.0,
    reviews: 1006,
    price: 741.17,
    originalPrice: 823.52,
    installments: "6x de R$ 137,25 sem juros",
    discountPix: "10% de desconto no pix",
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 7 dias úteis",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Tipo", value: "Cozinha Completa" },
      { label: "Marca", value: "Madesa" },
      { label: "Dimensões", value: "229cm" },
    ],
    customerFeedback: [
      { type: "espaçoso", count: 50 },
      { type: "bom material", count: 30 },
    ],
  },
  "relogio-orient-classic": {
    id: "relogio-orient-classic",
    name: "Relógio Orient Classic Masculino - Aço Inoxidável",
    breadcrumbs: ["Acessórios", "Relógios", "Masculino"],
    images: [
      "/relogio-orient-classic-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.0,
    reviews: 12,
    price: 182.7,
    originalPrice: 206.0,
    installments: "2x de R$ 91,35 sem juros",
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 15 dias úteis (Internacional)",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Material", value: "Aço Inoxidável" },
      { label: "Estilo", value: "Classic" },
      { label: "Gênero", value: "Masculino" },
    ],
    customerFeedback: [
      { type: "elegante", count: 5 },
      { type: "boa qualidade", count: 4 },
    ],
  },
  "fones-bluetooth-e7s": {
    id: "fones-bluetooth-e7s",
    name: "Fones de Ouvido Bluetooth E7S TWS Sem Fio Com Cancelamento de Ruído e Microfone",
    breadcrumbs: ["Eletrônicos", "Áudio", "Fones de Ouvido"],
    images: [
      "/fones-bluetooth-e7s-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 4.0,
    reviews: 89,
    price: 49.63,
    originalPrice: null,
    installments: "7x de R$ 7,09 sem juros",
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 15 dias úteis (Internacional)",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Conectividade", value: "Bluetooth" },
      { label: "Recursos", value: "Cancelamento de Ruído, Microfone" },
      { label: "Tipo", value: "TWS Sem Fio" },
    ],
    customerFeedback: [
      { type: "bom som", count: 10 },
      { type: "confortável", count: 8 },
    ],
  },
  "perfume-lattafa-asad": {
    id: "perfume-lattafa-asad",
    name: "Perfume Lattafa Asad Eau de Parfum 100ml - Unissex",
    breadcrumbs: ["Beleza e Perfumaria", "Perfumes", "Unissex"],
    images: [
      "/perfume-lattafa-asad-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 1024,
    price: 360.05,
    originalPrice: 382.6,
    installments: "5x de R$ 72,01 sem juros",
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 15 dias úteis (Internacional)",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Volume", value: "100ml" },
      { label: "Tipo", value: "Eau de Parfum" },
      { label: "Gênero", value: "Unissex" },
    ],
    customerFeedback: [
      { type: "fragrância duradoura", count: 50 },
      { type: "cheiro agradável", count: 40 },
    ],
  },
  "perfume-fragrance-world": {
    id: "perfume-fragrance-world",
    name: "Perfume Fragrance World Liquid Brun Eau de Parfum 100ml",
    breadcrumbs: ["Beleza e Perfumaria", "Perfumes", "Masculino"],
    images: [
      "/perfume-fragrance-world-new.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    rating: 5.0,
    reviews: 1,
    price: 336.43,
    originalPrice: 399.68,
    installments: "7x de R$ 48,06 sem juros",
    discountPix: null,
    cupom: null,
    deliveryInfo: "Vendido e entregue por Magalu",
    deliveryEstimate: "Receba em até 15 dias úteis (Internacional)",
    shippingCost: "Frete Grátis",
    pickupEstimate: "Retire na Loja",
    specs: [
      { label: "Volume", value: "100ml" },
      { label: "Tipo", value: "Eau de Parfum" },
      { label: "Marca", value: "Fragrance World" },
    ],
    customerFeedback: [{ type: "ótimo custo-benefício", count: 1 }],
  },
}

interface ProductPageProps {
  params: any;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = mockProducts[(id as string) as keyof typeof mockProducts]
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "/placeholder.svg")
  const [selectedStorage, setSelectedStorage] = useState((product as any)?.internalStorageOptions?.[0] || null)
  const [selectedColor, setSelectedColor] = useState((product as any)?.colorOptions?.[0]?.name || null)
  const [cep, setCep] = useState("");
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getUserSession()
      setUser(session)
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (product?.colorOptions && selectedColor) {
      const colorImage = product.colorOptions.find((color) => color.name === selectedColor)?.src
      if (colorImage) {
        setMainImage(colorImage)
      }
    } else if (product?.images) {
      setMainImage(product.images[0])
    }
  }, [selectedColor, product])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
        <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">Voltar para a Home</Button>
        </Link>
      </div>
    )
  }

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

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/login")
      return
    }
    // Adicionar produto ao localStorage para o checkout
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      seller: "magalu",
      image: product.images[0],
      deliveryOptions: [
        {
          type: "receive",
          label: "Receber em casa",
          cost: 0,
          free: true,
          selected: true
        },
        {
          type: "pickup",
          label: "Retirar na loja",
          cost: 0,
          free: true,
          selected: false
        }
      ]
    }
    
    // Salvar no localStorage
    localStorage.setItem('cartItems', JSON.stringify([cartItem]))
    
    // Simulate adding to cart and then redirecting to checkout
    await addMockOrder(user.email, product.name, product.price)
    router.push("/checkout")
  }

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/login")
      return
    }
    
    // Adicionar produto ao localStorage
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      seller: "magalu",
      image: product.images[0],
      deliveryOptions: [
        {
          type: "receive",
          label: "Receber em casa",
          cost: 0,
          free: true,
          selected: true
        },
        {
          type: "pickup",
          label: "Retirar na loja",
          cost: 0,
          free: true,
          selected: false
        }
      ]
    }
    
    // Obter itens existentes do localStorage
    const existingItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    
    // Verificar se o produto já existe no carrinho
    const existingItemIndex = existingItems.findIndex((item: any) => item.id === product.id)
    
    if (existingItemIndex >= 0) {
      // Se já existe, incrementar quantidade
      existingItems[existingItemIndex].quantity += 1
    } else {
      // Se não existe, adicionar novo item
      existingItems.push(cartItem)
    }
    
    // Salvar no localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingItems))
    
    // Simulate adding to cart
    await addMockOrder(user.email, product.name, product.price)
    alert("Produto adicionado ao carrinho!")
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
              {/* Texto 'magalu' removido */}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Input placeholder="Busca no Magalu" className="w-full pr-12 text-black rounded-md" />
                <Button size="icon" className="absolute right-0 top-0 bg-orange-500 hover:bg-orange-600 rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs mt-1 flex gap-2">
                <span>#TenhoMagalu</span>
                <span>Bolsa de banho</span>
                <span>Almofada de pescoço</span>
                <span>Caixa organizadora</span>
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
            <Button variant="ghost" className="text-white hover:bg-blue-700 flex items-center gap-2">
              <Menu className="h-4 w-4" />
              Todos os departamentos
            </Button>
            {categories.slice(1).map((category) => (
              <Link key={category} href="#" className="hover:underline text-sm whitespace-nowrap">
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-4">
          {product.breadcrumbs.map((crumb: any, index: number) => (
            <span key={index}>
              <Link href="#" className="hover:underline">
                {crumb}
              </Link>
              {index < product.breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="relative mb-4">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-contain rounded-lg border"
              />
              <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Package className="h-3 w-3" /> Full
              </Badge>
              <Button variant="ghost" size="icon" className="absolute bottom-2 left-2 text-white">
                <PlayCircle className="h-8 w-8 fill-current" />
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((img: any, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={product.name}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${mainImage === img ? "border-blue-600" : "border-transparent"}`}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
              {product.images.length > 4 && (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md border border-gray-200 text-gray-600 text-sm font-semibold">
                  +{product.images.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                  <HeartIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews})
              </span>
              <Link href="#" className="text-sm text-blue-600 underline ml-2">
                Avaliar produto
              </Link>
            </div>

            {(product as any).internalStorageOptions?.length > 0 && (
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">Armazenamento interno: </span>
                <span className="font-semibold">{selectedStorage}</span>
                <div className="flex gap-2 mt-2">
                  {(product as any).internalStorageOptions.map((storage: any) => (
                    <Button
                      key={storage}
                      variant={selectedStorage === storage ? "default" : "outline"}
                      className="rounded-full px-4 py-2"
                      onClick={() => setSelectedStorage(storage)}
                    >
                      {storage}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {(product as any).colorOptions?.length > 0 && (
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-700">Cor: </span>
                <span className="font-semibold">{selectedColor}</span>
                <div className="flex gap-2 mt-2">
                  {(product as any).colorOptions.map((color: any) => (
                    <Button
                      key={color.name}
                      variant={selectedColor === color.name ? "default" : "outline"}
                      className="rounded-full px-4 py-2"
                      onClick={() => setSelectedColor(color.name)}
                    >
                      {color.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-600 mb-2">
              Vendido e entregue por{" "}
              <Link href="#" className="text-blue-600 font-semibold">
                magalu
              </Link>
            </div>
            {product.originalPrice && (
              <div className="text-lg text-gray-500 line-through mb-1">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </div>
            )}
            <div className="text-3xl font-bold text-blue-600 mb-1">R$ {product.price.toFixed(2).replace(".", ",")}</div>
            {product.discountPix && (
              <div className="text-sm text-green-600 font-semibold mb-4">({product.discountPix})</div>
            )}

            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
              <div>
                <div className="text-sm text-gray-700">Cartão de crédito</div>
                <div className="text-xs text-gray-500">sem juros</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">R$ {product.price.toFixed(2).replace('.', ',')}</div>
                <div className="text-xs text-gray-600">10x de R$ {(product.price / 10).toFixed(2).replace('.', ',')} sem juros</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" onClick={handleBuyNow}>
                <ShoppingCart className="h-5 w-5 mr-2" /> Comprar Agora
              </Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg bg-transparent"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Adicionar à Sacola
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg bg-transparent"
              >
                Retire na Loja!
              </Button>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4" />
                <input
                  type="text"
                  value={cep}
                  onChange={e => setCep(e.target.value.replace(/[^0-9-]/g, "").slice(0, 9))}
                  placeholder="Digite seu CEP"
                  className="border border-gray-300 rounded px-2 py-1 w-28 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="text-blue-600 underline cursor-pointer" onClick={() => setCep("")}>limpar</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <div>
                  <div>
                    {product.deliveryEstimate}
                    <span className="font-semibold ml-1">{product.shippingCost}</span>
                  </div>
                  <div className="text-xs text-gray-500">Para pagamentos confirmados hoje</div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Package className="h-4 w-4" />
                <div>
                  <div>{product.pickupEstimate}</div>
                  <div className="text-xs text-green-600">Frete Grátis</div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Os prazos de entrega começam a contar a partir da confirmação do pagamento e podem variar para mais de uma
              unidade de um mesmo produto.
            </p>
          </div>
        </div>

        {/* Service Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Entrega Full</h3>
              <p className="text-sm text-gray-600">É entrega rápida, frete barato e mais segurança pra você.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <ShieldCheck className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Magalu Garante</h3>
              <p className="text-sm text-gray-600">A sua compra, do pedido à entrega.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <RefreshCw className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-bold text-lg mb-1">Devolução Gratuita</h3>
              <p className="text-sm text-gray-600">em até 7 dias depois de receber o produto.</p>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <Card className="mt-12 mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Ficha Técnica</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex justify-between border-b pb-1">
                  <span className="font-medium text-gray-700">{spec.label}:</span>
                  <span className="text-gray-600">{spec.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Customer Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">O que os clientes mais falam</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {product.customerFeedback.map((feedback, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                {feedback.type} ({feedback.count})
              </Badge>
            ))}
          </CardContent>
        </Card>
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

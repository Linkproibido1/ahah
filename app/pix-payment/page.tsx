"use client"

import { Search, ShoppingCart, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useRouter } from "next/navigation"

const PIX_KEY = "0f6aefa1-8836-4b6f-85d1-255f173a28a8";
const PIX_PAYLOAD = PIX_KEY; // Aqui pode ser ajustado para payload completo se necessário

export default function PixPaymentPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getUserSession()
      setUser(session)
    }
    fetchUser()
    // Gerar QR Code como data URL
    QRCode.toDataURL(PIX_PAYLOAD, { width: 220 }, (err, url) => {
      if (!err && url) setQrCodeUrl(url)
    })
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

  const handleSimulatePixPayment = async () => {
    if (user?.email) {
      // Simula a adição de um pedido para um item genérico
      await addMockOrder(user.email, "Produto do Pedido Pix", 307.9) // Usando o valor total da imagem
    }
    router.push("/order-confirmation")
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, marginTop: 40 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Pagamento via Pix</h1>
      <p>Escaneie o QR Code abaixo com o app do seu banco ou copie a chave Pix para realizar o pagamento.</p>
      <img src="/pix-qrcode.png" alt="QR Code Pix" width={220} height={220} />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <strong>Chave Pix:</strong>
        <div style={{ marginTop: 8, fontSize: 18, wordBreak: 'break-all', background: '#f3f3f3', padding: 8, borderRadius: 8 }}>
          {PIX_KEY}
        </div>
        <button
          style={{ marginTop: 12, padding: '8px 16px', borderRadius: 6, border: 'none', background: '#007aff', color: '#fff', cursor: 'pointer' }}
          onClick={() => navigator.clipboard.writeText(PIX_KEY)}
        >
          Copiar chave Pix
        </button>
      </div>
    </div>
  );
}

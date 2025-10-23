import { getUserSession } from "@/app/auth/actions"
import CheckoutClient from "./checkout-client"

export default async function CheckoutPage() {
  // Server-side: lê o cookie e obtém a sessão
  const user = await getUserSession()

  // Renderiza o componente client-side passando o usuário como prop
  return <CheckoutClient user={user} />
}

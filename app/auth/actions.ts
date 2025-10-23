"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const MOCK_DB_KEY = "magalu_mock_db"

interface UserData {
  email: string
  name: string
  dob: string
  cpf: string
  passwordHash: string // Em um app real, seria um hash
}

interface OrderData {
  id: string
  userEmail: string
  productName: string
  price: number
  date: string
  status: string
}

interface MockDB {
  users: UserData[]
  orders: OrderData[]
}

function getMockDB(): MockDB {
  const dbCookie = cookies().get(MOCK_DB_KEY)?.value
  try {
    const db = dbCookie ? JSON.parse(dbCookie) : { users: [], orders: [] }
    // Garante que as propriedades existem
    if (!db.users) db.users = []
    if (!db.orders) db.orders = []
    return db
  } catch (e) {
    console.error("Erro ao parsear mock DB cookie:", e)
    return { users: [], orders: [] }
  }
}

function setMockDB(db: MockDB) {
  cookies().set(MOCK_DB_KEY, JSON.stringify(db), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 dias de persistência para o mock DB
    path: "/",
  })
}

export async function registerUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  if (!email || !email.includes("@") || email.length < 5) {
    return { success: false, message: "E-mail inválido para registro." }
  }

  const db = getMockDB()
  if (db.users.some((user) => user.email === email)) {
    return { success: false, message: "Este e-mail já está cadastrado." }
  }

  cookies().set("temp_registration_email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10, // 10 minutos para completar o cadastro
    path: "/",
  })

  return { success: true, message: "Email validado. Prossiga para completar o cadastro." }
}

export async function completeRegistration(prevState: any, formData: FormData) {
  const tempEmail = cookies().get("temp_registration_email")?.value

  if (!tempEmail) {
    return { success: false, message: "Sessão de registro expirada ou inválida. Por favor, comece novamente." }
  }

  const name = formData.get("name") as string
  const dob = formData.get("dob") as string // Date of Birth
  const cpf = formData.get("cpf") as string // CPF
  const password = formData.get("password") as string // Novo campo de senha

  if (!name || !dob || !cpf || cpf.length !== 11 || !password || password.length < 6) {
    return {
      success: false,
      message: "Por favor, preencha todos os campos corretamente e a senha deve ter no mínimo 6 caracteres.",
    }
  }

  const db = getMockDB()
  const newUser: UserData = {
    email: tempEmail,
    name: name,
    dob: dob,
    cpf: cpf,
    passwordHash: password, // Em um app real, seria um hash da senha
  }
  db.users.push(newUser)
  setMockDB(db)

  cookies().delete("temp_registration_email")
  cookies().set("user_session", JSON.stringify({ email: newUser.email, name: newUser.name }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/dashboard")
}

export async function loginUser(prevState: any, formData: FormData) {
  const emailOrDoc = formData.get("emailOrDoc") as string
  const password = formData.get("password") as string

  const db = getMockDB()
  const foundUser = db.users.find((user) => user.email === emailOrDoc && user.passwordHash === password)

  if (foundUser) {
    cookies().set("user_session", JSON.stringify({ email: foundUser.email, name: foundUser.name }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    redirect("/dashboard")
  } else if (emailOrDoc === "test@example.com" && password === "password123") {
    // Fallback para o usuário de teste fixo
    cookies().set("user_session", JSON.stringify({ email: emailOrDoc, name: "Usuário Teste" }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    redirect("/dashboard")
  } else {
    return { success: false, message: "Credenciais inválidas. Tente novamente." }
  }
}

export async function logoutUser() {
  cookies().delete("user_session")
  redirect("/")
}

export async function getUserSession() {
  const session = cookies().get("user_session")?.value
  return session ? JSON.parse(session) : null
}

export async function getTempRegistrationEmail() {
  const tempEmail = cookies().get("temp_registration_email")?.value
  return tempEmail || null
}

export async function addMockOrder(userEmail: string, productName: string, price: number) {
  const db = getMockDB()
  const newOrder: OrderData = {
    id: `order_${Date.now()}`,
    userEmail: userEmail,
    productName: productName,
    price: price,
    date: new Date().toLocaleDateString("pt-BR"),
    status: "Processando",
  }
  db.orders.push(newOrder)
  setMockDB(db)
  return newOrder
}

export async function getMockOrders(userEmail: string): Promise<OrderData[]> {
  const db = getMockDB()
  return db.orders.filter((order) => order.userEmail === userEmail)
}

export async function getMockUserData(userEmail: string): Promise<UserData | null> {
  const db = getMockDB()
  return db.users.find((user) => user.email === userEmail) || null
}

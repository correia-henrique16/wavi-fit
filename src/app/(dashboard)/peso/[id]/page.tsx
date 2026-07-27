import EditarPesoClient from "@/components/peso/editar/EditarPesoClient"
import { cookies } from "next/headers"

interface ChildProps {
    params: Promise<{id?: string}>,
}

export default async function EditarPesoPage({params}: ChildProps) {
    const {id} = await params
    const cookieStore = await cookies()
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/peso/${id}`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        })
        
        if (!response.ok) {
            const erro = await response.json()
            console.error(erro)
            throw new Error(JSON.stringify(erro))
        }
        
        const dados = await response.json()

        return (
            <EditarPesoClient peso={dados[0]}/>
        )
    } catch (error: any) {
        console.error(error)
        throw error
    }
}
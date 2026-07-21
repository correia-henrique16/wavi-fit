import EditarRefeicaoClient from "@/components/refeicoes/editar/EditarRefeicaoClient"
import { cookies } from "next/headers"

interface ChildProps {
    params: Promise<{id?: string}>,
    searchParams: Promise<{modal?: string}>
}

export default async function EditarRefeicaoPage({params, searchParams}: ChildProps) {
    const {id} = await params
    const {modal} = await searchParams
    const cookieStore = await cookies()
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/refeicoes/${id}`, {
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
            <EditarRefeicaoClient refeicao={dados[0]} modal={modal}/>
        )
    } catch (error: any) {
        console.error(error)
        throw error
    }
}
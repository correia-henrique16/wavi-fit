import { delRefeicao } from "@/lib/db/refeicoes"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params

    const intId = parseInt(id)

    try {
        const deleted = await delRefeicao(intId)
        return NextResponse.json(deleted, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Erro ao apagar refeição'}, {status: 500})
    }

}
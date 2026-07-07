import { delAlimento, editAlimento } from "@/lib/db/alimentos"
import { AlimentoSchema } from "@/models/input/Alimento";
import { NextResponse } from "next/server"

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params

    const intId = parseInt(id)

    try {
        const deleted = await delAlimento(intId)
        return NextResponse.json(deleted, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Erro ao apagar alimento'}, {status: 500})
    }

}

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
    const data = await request.json()

    const validacao = AlimentoSchema.safeParse(data)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const novosDados = validacao.data
    
    const {id} = await params

    const idInt = parseInt(id)

    try {
        const editado = await editAlimento(idInt, novosDados)
        return NextResponse.json(editado, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Erro ao editar'}, {status: 500})
    }
}
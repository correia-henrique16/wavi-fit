import { delRefeicao, editRefeicao, getRefeicaoId } from "@/lib/db/refeicoes"
import { RefeicaoSchema } from "@/models/input/Refeicao";
import { NextResponse } from "next/server"

export async function GET(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params

    const intId = parseInt(id)

    try {
        const dados = await getRefeicaoId(intId)
        return NextResponse.json(dados)
    } catch (error) {
        return NextResponse.json({error: 'Erro ao buscar refeição por id'}, {status: 500})
    }
}

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

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
    const data = await request.json()

    const validacao = RefeicaoSchema.safeParse(data)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const novosDados = validacao.data
    
    const {id} = await params

    const idInt = parseInt(id)

    try {
        const editado = await editRefeicao(idInt, novosDados)
        return NextResponse.json(editado, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Erro ao editar'}, {status: 500})
    }
}
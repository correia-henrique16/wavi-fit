import { NextResponse } from "next/server";
import { getRefeicoesUser, addRefeicao } from "@/lib/db/refeicoes";
import { RefeicaoSchema } from "@/models/input/Refeicao";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const dataParams = searchParams.get('date')

        const dados = await getRefeicoesUser(dataParams)
        return NextResponse.json(dados)
    } catch (error) {
        return NextResponse.json({error: 'Erro ao buscar refeições'}, {status: 500})
    }
}

export async function POST(request: Request) {
    const dados = await request.json()

    const validacao = RefeicaoSchema.safeParse(dados)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const dadosProntos = {
        ...validacao.data
    }

    try{
        const novaRefeicao = await addRefeicao(dadosProntos)
        return NextResponse.json(novaRefeicao, {status: 201})
    } catch(error) {
        return NextResponse.json({error: 'Erro ao adicionar refeição'}, {status: 500})
    }
}
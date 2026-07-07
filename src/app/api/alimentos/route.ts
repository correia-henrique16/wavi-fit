import { NextResponse } from "next/server";
import {getAlimentos, addAlimento} from "@/lib/db/alimentos";
import { AlimentoSchema } from "@/models/input/Alimento";

export async function GET() {
    try {
        const dados = await getAlimentos()
        return NextResponse.json(dados)
    } catch (error) {
        return NextResponse.json({error: 'Erro ao buscar alimentos'}, {status: 500})
    }
    
}

export async function POST(request: Request) {
    const data = await request.json()

    const validacao = AlimentoSchema.safeParse(data)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const dadosProntos = {
        ...validacao.data
    }


    try {
        const novoAlimento = await addAlimento(dadosProntos)
        return NextResponse.json(novoAlimento, {status: 201})
    } catch (error: any) {
        return NextResponse.json({error: 'Erro ao inserir alimento: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
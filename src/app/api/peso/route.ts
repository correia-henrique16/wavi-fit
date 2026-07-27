import { PesoSchema } from "@/models/input/Peso"
import { NextResponse } from "next/server"
import { addPeso } from "@/lib/db/peso"

export async function POST(request: Request) {
    const data = await request.json()

    const validacao = PesoSchema.safeParse(data)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const dadosProntos = {
        ...validacao.data
    }


    try {
        const novoPeso = await addPeso(dadosProntos)
        return NextResponse.json(novoPeso, {status: 201})
    } catch (error: any) {
        return NextResponse.json({error: 'Erro ao inserir peso: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
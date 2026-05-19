import { NextResponse } from "next/server";
import { getRefeicoesUser } from "@/lib/db/refeicoes";
import { RefeicaoSchema } from "@/models/Refeicao";

export async function GET() {
    try {
        const dados = await getRefeicoesUser()
        return NextResponse.json(dados)
    } catch (error) {
        return NextResponse.json({error: 'Erro ao buscar refeições'}, {status: 500})
    }
}
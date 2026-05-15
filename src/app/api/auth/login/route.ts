import { NextResponse } from "next/server";
import { LoginSchema } from "@/models/User";
import { login } from "@/lib/auth/auth";


export async function POST(request: Request) {
    const data = await request.json()
    
    const validacao = LoginSchema.safeParse(data)

    if(!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const dadosProntos = {
        ...validacao.data
    }

    try {
        const user = await login(dadosProntos)
        return NextResponse.json({message: 'User Logado!'}, {status: 201}) 
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: 'Erro ao Logar user: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
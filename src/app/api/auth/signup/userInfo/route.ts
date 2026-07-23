import { NextResponse } from "next/server";
import { UserInfoRegisterSchema } from "@/models/input/User";
import { userInfoRegister } from "@/lib/auth/auth";

export async function POST(request: Request) {
    const data = await request.json()
    
    const validacao = UserInfoRegisterSchema.safeParse(data)

    if(!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const dadosProntos = {
        ...validacao.data
    }

    try {
        const user = await userInfoRegister(dadosProntos)
        return NextResponse.json({message: 'Data atualizada!'}, {status: 201}) 
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: 'Erro ao Registar user: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
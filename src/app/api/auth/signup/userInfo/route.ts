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
        await userInfoRegister(dadosProntos)
        return NextResponse.json({message: 'Dados registados!'}, {status: 201}) 
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: 'Erro ao Registar dados: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
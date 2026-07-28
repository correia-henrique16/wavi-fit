import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/db/userInfo";
import { UserInfoSchema } from "@/models/input/User";
import { editUserInfo } from "@/lib/db/userInfo";

export async function GET() {
    try{
        const data = await getUserInfo()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}

export async function PUT(request: Request) {
    const data = await request.json()
    
    const validacao = UserInfoSchema.safeParse(data)

    if (!validacao.success) {
        return NextResponse.json({erros: validacao.error.format()}, {status: 400})
    }

    const novosDados = validacao.data

    try {
        const editado = await editUserInfo(novosDados)
        return NextResponse.json(editado, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Erro ao editar'}, {status: 500})
    }
}
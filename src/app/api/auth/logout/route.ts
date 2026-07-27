import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth/auth";


export async function GET() {
    try {
        await signOut()
        return NextResponse.json({message: 'User deslogado!'}, {status: 201}) 
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: 'Erro ao deslogar user: ',
            detalhes: error.message || error
        }, {status: 400})
    }
}
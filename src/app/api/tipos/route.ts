import { NextResponse } from "next/server";
import { getTiposRefeicao } from "@/lib/db/tipos";

export async function GET() {
    try{
        const data = await getTiposRefeicao()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
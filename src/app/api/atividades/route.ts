import { NextResponse } from "next/server";
import { getNiveisAtividades } from "@/lib/db/atividades";

export async function GET() {
    try{
        const data = await getNiveisAtividades()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
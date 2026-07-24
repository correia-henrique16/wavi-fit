import { NextResponse } from "next/server";
import { getPesoAtual } from "@/lib/db/peso";

export async function GET() {
    try{
        const data = await getPesoAtual()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
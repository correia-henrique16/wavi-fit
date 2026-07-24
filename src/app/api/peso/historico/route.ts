import { NextResponse } from "next/server";
import { getHistoricoPeso } from "@/lib/db/peso";

export async function GET() {
    try{
        const data = await getHistoricoPeso()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
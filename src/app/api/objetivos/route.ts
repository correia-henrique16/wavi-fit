import { NextResponse } from "next/server";
import { getObjetivos } from "@/lib/db/objetivos";

export async function GET() {
    try{
        const data = await getObjetivos()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
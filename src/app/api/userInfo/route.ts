import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/db/userInfo";

export async function GET() {
    try{
        const data = await getUserInfo()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({'error': error})
    }
}
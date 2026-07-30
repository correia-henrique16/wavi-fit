import Link from "next/link";
import { getRequiredUser } from "@/lib/supabase/user";
import InfoForm from "@/components/auth/InfoForm";

export const dynamic = 'force-dynamic'

export default async function InfoPage() {
    const user = await getRequiredUser()
    const userName = user.user_metadata.full_name
    return(
        <main className="min-h-screen flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-6">
                
                <h1 className="text-3xl font-bold text-bordeaux text-center">Bem-vindo {userName}</h1>
                <p>Antes de começares, precisamos apenas de perceber os teus objetivos</p>

                <InfoForm />

            </div>
            
        </main>
    )
}
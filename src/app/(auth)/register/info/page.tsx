import { getRequiredUser } from "@/lib/supabase/user"
import InfoForm from "@/components/auth/InfoForm"

export const dynamic = 'force-dynamic'

export default async function InfoPage() {
    const user = await getRequiredUser()
    const userName = user.user_metadata.full_name

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-bg">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-bordeaux/15 shadow-xl flex flex-col gap-6">
                
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-bordeaux tracking-tight">
                        Bem-vindo, {userName}!
                    </h1>
                    <p className="text-sm font-medium text-castanho/80">
                        Antes de começares, precisamos de ajustar os teus objetivos.
                    </p>
                </div>

                <InfoForm />

            </div>
        </main>
    )
}
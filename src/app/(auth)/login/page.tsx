import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return(
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-6">
                
                <h1 className="text-3xl font-bold text-bordeaux text-center">Login</h1>
            
                <LoginForm />

                <p className="text-sm font-medium text-castanho text-center flex items-center justify-center gap-1.5">
                    Ainda não tens conta?
                    <Link href="/register"
                     className="text-bordeaux font-bold underline hover:opacity-80 transition-all">
                        Criar nova conta
                    </Link>
                </p>
            </div>
        </main>
    )
}
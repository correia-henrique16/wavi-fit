import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function RegisterPage() {
    return(
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-6">
                
                <h1 className="text-3xl font-bold text-bordeaux text-center">Register</h1>
                <SignUpForm />

                <p className="text-sm font-medium text-castanho text-center flex items-center justify-center gap-1.5">
                    Já tens conta?
                    <Link href="/login"
                     className="text-bordeaux font-bold underline hover:opacity-80 transition-all">
                        Faz login
                    </Link>
                </p>

            </div>
            
        </main>
    )
}
import SignUpForm from "@/components/auth/SignUpForm";

export default function RegisterPage() {
    return(
        <main className="centrada flex-col">
            <h1>Register</h1>
            <SignUpForm />

            <p>
                Já tens conta?
                <a href="/login">Faz login</a>
            </p>
        </main>
    )
}
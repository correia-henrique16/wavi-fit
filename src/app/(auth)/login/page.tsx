import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return(
        <main className="centrada flex-col">
            <h1>Login</h1>
            
            <LoginForm />

            <p>
                Ainda não tens conta?
                <a href="/register">Criar nova conta</a>
            </p>
        </main>
    )
}
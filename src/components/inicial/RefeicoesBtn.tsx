'use client'

import Link from "next/link"

export default function RefeicoesBtn() {
    return(
        <Link href="/refeicoes" className="w-12 hover:opacity-60 active:opacity-70 transition-all">
            <img src="/inicial/caderno.png" alt="Ver Refeições"/>
        </Link>
    )
}
'use client'

import Link from "next/link"

export default function RefeicoesBtn() {
    return(
        <Link href="/refeicoes" className="w-12 hover:opacity-60">
            <img src="/inicial/caderno.png" alt="Ver Refeições"/>
        </Link>
    )
}
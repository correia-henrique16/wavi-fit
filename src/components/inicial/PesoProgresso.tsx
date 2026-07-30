'use client'

import useBuscarHistoricoPeso from "@/hooks/peso/useHistoricoPeso"
import Link from "next/link"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, LabelList, CartesianGrid } from 'recharts'

export default function PesoProgresso() {
    const {historicoPeso, loadingPesoHistorico} = useBuscarHistoricoPeso()

    if (loadingPesoHistorico) {
        return <p>Loading...</p>
    }

    if (!historicoPeso || historicoPeso.length === 0) {
        return null
    }

    const ultimasPesagens = historicoPeso.slice(0, 7)

    const dadosFormatados = [...ultimasPesagens].reverse().map(item => {
        const d = new Date(item.data_peso)
        const dia = String(d.getDate()).padStart(2, '0')
        const mes = String(d.getMonth() + 1).padStart(2, '0')
        
        return {
            ...item,
            dataFormatada: `${dia}/${mes}`
        }
    })

    const valoresPeso = dadosFormatados.map(d => d.peso)
    const minPeso = Math.min(...valoresPeso)
    const maxPeso = Math.max(...valoresPeso)

    return(
        <Link 
            href={'/peso'} 
            className="bg-white/50 backdrop-blur-sm pt-5 px-5 pb-0 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-3 mx-5 my-4 transition-all duration-200 active:scale-[0.98] cursor-pointer overflow-hidden group"
        >
            <div className="flex justify-between items-center">
                <span className="text-base font-bold text-castanho">
                    Evolução do Peso
                </span>
                <span className="text-xs font-bold text-bordeaux bg-bordeaux/10 px-3 py-1.5 rounded-full flex items-center gap-1 group-hover:bg-bordeaux group-hover:text-white transition-colors">
                    Histórico
                </span>
            </div>

            <div className="w-full h-52 mt-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosFormatados} margin={{ top: 25, right: 24, left: 24, bottom: 10 }}>
                        <CartesianGrid 
                            strokeDasharray="3 3" 
                            vertical={true} 
                            horizontal={false} 
                            stroke="#8C6A5D" 
                            strokeOpacity={0.25}
                        />

                        <XAxis 
                            dataKey="dataFormatada" 
                            stroke="#8C6A5D" 
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                            padding={{ left: 0, right: 0 }}
                        />

                        <YAxis 
                            hide={true} 
                            domain={[minPeso, maxPeso]} 
                        />

                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#FFF', 
                                borderRadius: '12px', 
                                borderColor: 'rgba(140, 106, 93, 0.2)',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}
                            formatter={(value: any) => [`${value} Kg`, 'Peso']}
                        />

                        <Line 
                            type="linear" 
                            dataKey="peso" 
                            stroke="#581C28" 
                            strokeWidth={3}
                            dot={{ fill: '#581C28', r: 5 }}
                            activeDot={{ r: 7 }}
                        >
                            <LabelList 
                                dataKey="peso" 
                                position="top" 
                                offset={10}
                                style={{ fill: '#581C28', fontSize: '11px', fontWeight: 'bold' }} 
                                formatter={(val: any) => `${val}`}
                            />
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="-mx-5 mt-1 bg-castanho/5 border-t border-castanho/10 py-3 px-5 text-center flex justify-center items-center gap-2 text-sm font-semibold text-castanho/80 group-hover:text-bordeaux transition-colors">
                <span>Ver histórico completo</span>
            </div>
        </Link>
    )
}
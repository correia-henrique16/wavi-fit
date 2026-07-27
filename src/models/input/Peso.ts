import { date, z } from "zod";

export const PesoSchema = z.object({
  data_peso: z.string().date()
    .min(1, "A data é obrigatória.")
    .refine((val) => {
        const dataInserida = new Date(val)
        const hoje = new Date()
        return dataInserida <= hoje
    }, {
        message: "A data não pode ser no futuro!",
    }),

  peso: z.coerce.number()
    .min(2.0, "O peso mínimo é 2kg")
    .max(500.0, "O peso máximo é 500kg")
    .transform((val) => Number(val.toFixed(1))),
})


export type TypePeso = z.infer<typeof PesoSchema>;
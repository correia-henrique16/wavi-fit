import {z} from 'zod';

export const AlimentoSchema = z.object({
    name: z.string()
        .min(2, 'O nome deve ter no minimo 2 letras')
        .max(20, 'O nome não pode ter mais que 20 carateres'),

    kcal: z.coerce.number()
        .min(0, "As calorias não podem ser negativas")
        .max(5000, 'As calorias têm o máximo de 5000'),

    protein: z.coerce.number()
        .min(0, "A proteina não pode ser negativa")
        .max(5000, 'A proteia tem o máximo de 5000'),

    carbohydrates: z.coerce.number()
        .min(0, "Os hidratos não podem ser negativos")
        .max(5000, 'Os hidratos têm o máximo de 5000'),

    fat: z.coerce.number()
        .min(0, "A gordura não pode ser negativa")
        .max(5000, 'As gorduras têm o máximo de 5000'),
})

//para autocomplete do vscode e detetar erros
export type TypeAlimento = z.infer<typeof AlimentoSchema>;
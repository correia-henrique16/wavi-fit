import { date, z } from "zod";


export const LoginSchema = z.object({
  email: z.string().email("E-mail inválido").transform(e => e.toLowerCase()),
  password: z.string().min(1, 'A password é obrigatória')
});


export const SignupSchema = LoginSchema.extend({
    name: z.string()
        .min(2, "Minimo de 2 caratéres no nome"),

    password: z.string()
        .min(8, "A password deve ter pelo menos 8 caracteres")
        .refine((value) => /[A-Z]/.test(value), {
        message: "A password deve conter pelo menos uma letra maiúscula",
        })
        .refine((value) => /[a-z]/.test(value), {
        message: "A password deve conter pelo menos uma letra minúscula",
        })
        .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "A password deve conter pelo menos um carater especial (!@#$...)",
        }),

    confirmPassword: z.string().min(1, "Confirme a sua password"),

})
.refine((dados) => dados.password === dados.confirmPassword, {
  message: "As passwords não coincidem",
  path: ["confirmPassword"], // Isto diz ao Zod para "atirar" o erro para o campo confirmPassword
});

export const UserInfoRegisterSchema = z.object({
  sexo: z.enum(['M', 'F']),

  peso: z.coerce.number()
    .min(2.0, "O peso mínimo é 2kg")
    .max(500.0, "O peso máximo é 500kg")
    .transform((val) => Number(val.toFixed(1))),

  altura: z.coerce.number()
    .int("A altura deve ser um número inteiro (em cm)")
    .min(100, "A altura mínimo é 100cm")
    .max(280, "A altura máxima é 280cm"),
  
  peso_objetivo: z.coerce.number()
    .min(30.0, "O peso mínimo é 30kg")
    .max(300.0, "O peso máximo é 300kg")
    .transform((val) => Number(val.toFixed(1))),

  objetivo_id: z.coerce.number().int()
    .min(1, 'Tem que escolher um objetivos')
    .max(9, 'Tem que escolher um objetivos'),

  atividade_id: z.coerce.number().int()
    .min(1, 'Tem que escolher uma das atividades')
    .max(4, 'Tem que escolher uma das atividades'),
})



export type TypeLogin = z.infer<typeof LoginSchema>;
export type TypeSignUp = z.infer<typeof SignupSchema>;
export type TypeUserInfoRegister = z.infer<typeof UserInfoRegisterSchema>;
import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().nonempty("Nome é  obrigatório"),
    email: z
      .string()
      .nonempty("Email é  obrigatório")
      .email("Forneça um email válido"),
    password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(8, "São necessários pelo menos oito caracteres")
    .regex(/[A-Z]+/, "É necessário conter pelo menos uma letra maiúscula")
    .regex(/[a-z]+/, "É necessário conter pelo menos uma letra minúscula")
    .regex(/[0-9]+/, "É necessário pelo menos um número")
    .regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/, "É necessário pelo menos um caracter especial."),
    confirmPassword: z.string().nonempty("Confirmar a senha é  obrigatória"),
    telefone: z.string().nonempty("Este campo é  obrigatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

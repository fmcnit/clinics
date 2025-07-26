import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phoneNumber: z.string().trim().min(1, {
    message: "Número de telefone é obrigatório.",
  }),
  sex: z.enum(["male", "female"],{
    error: "Valor não Autorizado"
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;

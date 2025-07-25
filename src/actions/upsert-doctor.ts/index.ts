"use server";

import { db } from "@/db";
import { upsertDoctorSchema } from "./schema";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-actions";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session?.user) {
        throw new Error("Acesso Não Autorizado");
      }

      if (!session.user?.clinic.id) {
        throw new Error("Clínica Não Encontrada");
      }
        
      await db
        .insert(doctorsTable)
        .values({
          ...parsedInput,
          id: parsedInput.id,
          clinicId: session.user?.clinic.id,
          
        })
        .onConflictDoUpdate({
          target: [doctorsTable.id],
          set: {
            ...parsedInput,
          },
        });

  });

"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";


import { upsertPatientSchema } from "./schema";
import { protectedWithClinicActionClient } from "@/lib/next-safe-actions";

export const upsertPatient = protectedWithClinicActionClient
  .schema(upsertPatientSchema)
  .action(async ({ parsedInput, ctx }) => {
    await db
      .insert(patientsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        clinicId: ctx.user.clinic.id,
      })
      .onConflictDoUpdate({
        target: [patientsTable.id],
        set: {
          ...parsedInput,
        },
      });
    revalidatePath("/patients");
  });

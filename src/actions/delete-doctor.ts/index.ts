"use server"

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

export const deleteDoctor = actionClient
.schema(
    z.object({
        id: z.string().uuid()
    })
)
.action( async({ parsedInput }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    if(!session?.user){
        throw new Error("Não Autorizado")
    }
    const doctor = await db.query.doctorsTable.findFirst({
        where: eq(doctorsTable.id, parsedInput.id)
    })
    if(!doctor) {
        throw new Error("Médico não encontrado")
    }
    if (doctor.clinicId !== session.user.clinic?.id) {
      throw new Error("Não Autorizado");
    }

    await db.delete(doctorsTable).where(eq(doctorsTable.id, parsedInput.id))
    revalidatePath("/doctors")
})


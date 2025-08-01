"use server";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { appointmentsTable, doctorsTable } from "@/db/schema";
import { generateTimeSlots } from "@/helpers/time";
import { protectedWithClinicActionClient } from "@/lib/next-safe-actions";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAvailableTimes = protectedWithClinicActionClient
  .schema(
    z.object({
      doctorId: z.string(),
      date: z.string().date(), // YYYY-MM-DD,
    }),
  )
  .action(async ({ parsedInput }) => {
    const doctor = await db.query.doctorsTable.findFirst({
      where: eq(doctorsTable.id, parsedInput.doctorId),
    });
    if (!doctor) {
      throw new Error("Médico não encontrado");
    }

    const selectedDayOfWeek = dayjs(parsedInput.date).day();
    const doctorIsAvailable =
      selectedDayOfWeek >= doctor.availableFromWeekDay &&
      selectedDayOfWeek <= doctor.availableToWeekDay;
    
      if (!doctorIsAvailable) {
      return [];
      }
    const appointments = await db.query.appointmentsTable.findMany({
      where: eq(appointmentsTable.doctorId, parsedInput.doctorId),
    });
    const appointmentsOnSelectedDate = appointments
      .filter((appointment) => {
        return dayjs(appointment.date).isSame(parsedInput.date, "day");
      })
      .map((appointment) => dayjs(appointment.date).format("HH:mm:ss"));
    
      const timeSlots = generateTimeSlots();

      const doctorAvailableFrom = dayjs()
        .utc()
        .set("hour", Number(doctor.availableFromTime.split(":")[0]))
        .set("minute", Number(doctor.availableFromTime.split(":")[1]))
        .set("second", 0)
        .local();
      const doctorAvailableTo = dayjs()
        .utc()
        .set("hour", Number(doctor.availableToTime.split(":")[0]))
        .set("minute", Number(doctor.availableToTime.split(":")[1]))
        .set("second", 0)
        .local();
      const doctorTimeSlots = timeSlots.filter((time) => {
        const date = dayjs()
          .utc()
          .set("hour", Number(time.split(":")[0]))
          .set("minute", Number(time.split(":")[1]))
          .set("second", 0);

      return (
        date.format("HH:mm:ss") >= doctorAvailableFrom.format("HH:mm:ss") &&
        date.format("HH:mm:ss") <= doctorAvailableTo.format("HH:mm:ss")
      );
    });
    return doctorTimeSlots.map((time) => {
      return {
        value: time,
        available: !appointmentsOnSelectedDate.includes(time),
        label: time.substring(0, 5),
      };
    });
  });

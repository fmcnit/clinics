import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  user: {
    modelName: "usersTable",
    // additionalFields: {
    //   stripeCustomerId: {
    //     type: "string",
    //     fieldName: "stripeCustomerId",
    //     required: false,
    //   },
    //   stripeSubscriptionId: {
    //     type: "string",
    //     fieldName: "stripeSubscriptionId",
    //     required: false,
    //   },
    //   plan: {
    //     type: "string",
    //     fieldName: "plan",
    //     required: false,
    //   },
  },
  session: {
    // cookieCache: {
    //   enabled: true,
    //   maxAge: FIVE_MINUTES,
    // },
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});

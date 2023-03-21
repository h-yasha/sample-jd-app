import type { Adapter } from "@auth/core/adapters";
import Discord from "@auth/core/providers/discord";
import type { DefaultSession } from "@auth/core/types";
import { type SolidAuthConfig } from "@auth/solid-start";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { serverEnv } from "~/env/server";
import { prisma } from "~/server/db/client";

declare module "@auth/core/types" {
	export interface Session {
		user?: {
			id?: string;
		} & DefaultSession["user"];
	}
}

export const authConfig: SolidAuthConfig = {
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		// @ts-expect-error Types Issue
		Discord({
			clientId: serverEnv.DISCORD_ID,
			clientSecret: serverEnv.DISCORD_SECRET,
		}),
	],
	debug: false,
};

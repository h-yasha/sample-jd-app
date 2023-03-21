import { PrismaClient } from "@prisma/client";
import { serverEnv } from "~/env/server";

declare global {
	// rome-ignore lint/nursery/noVar: <explanation>
	var prisma: PrismaClient | undefined;
}

export const prisma =
	global.prisma ||
	new PrismaClient({
		log:
			serverEnv.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	});

if (serverEnv.NODE_ENV !== "production") {
	global.prisma = prisma;
}

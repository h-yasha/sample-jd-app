import { PrismaClient } from "@prisma/client";
import { serverEnv } from "~/env/server";

declare global {
	// rome-ignore lint/style/noVar: <explanation>
	var prisma: PrismaClient | undefined;
}

// rome-ignore lint/nursery/noRedeclare: <explanation>
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

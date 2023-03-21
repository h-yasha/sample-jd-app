import type { inferAsyncReturnType } from "@trpc/server";
import type { createSolidAPIHandlerContext } from "solid-start-trpc";
import { prisma } from "~/server/db/client";
import { getSession } from "@auth/solid-start";
import { authConfig } from "~/server/auth";

export const createContextInner = async (
	opts: createSolidAPIHandlerContext,
) => {
	const session = await getSession(opts.req, authConfig);
	return {
		...opts,
		prisma,
		session,
	};
};

export const createContext = async (opts: createSolidAPIHandlerContext) => {
	return await createContextInner(opts);
};
export type IContext = inferAsyncReturnType<typeof createContext>;

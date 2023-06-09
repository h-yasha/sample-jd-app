import { procedure, protectedProcedure, router } from "../utils";
import { z } from "zod";

export default router({
	hello: procedure.input(z.object({ name: z.string() })).query(({ input }) => {
		return `Hello ${input.name}`;
	}),
	random: procedure
		.input(z.object({ num: z.number() }))
		.mutation(({ input }) => {
			return Math.floor(Math.random() * 100) / input.num;
		}),
	secret: protectedProcedure.query(({ ctx }) => {
		return `This is top secret - ${ctx.session.user.name}`;
	}),
});

import { SolidAuth } from "@auth/solid-start";
import { authConfig } from "~/server/auth";

export const { GET, POST } = SolidAuth(authConfig);

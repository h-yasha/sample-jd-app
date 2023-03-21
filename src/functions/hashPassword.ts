import crypto from "node:crypto";

export const hashPassword = (password: string) => {
	return crypto.createHash("SHA2-512").update(password).digest("base64");
};

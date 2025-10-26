import { z } from "zod";

export const userSchema = z.object({
	name: z
		.string()
		.nonempty({ message: "Nama tidak boleh kosong" })
		.min(4, { message: "Nama harus memiliki minimal 4 karakter" }),
	email: z
		.string()
		.nonempty({ message: "Email tidak boleh kosong" })
		.email({ message: "Email tidak valid" }),
	password: z
		.string()
		.nonempty({ message: "Password tidak boleh kosong" })
		.min(4, { message: "Password harus memiliki minimal 4 karakter" }),
	passport: z.string().nonempty({ message: "Passport tidak boleh kosong" }),
});

import { z } from "zod";

export const formSchema = z.object({
  // Gunakan .nonempty() untuk pesan 'harus diisi'
  email: z
    .string()
    .nonempty({ message: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),

  // .min(5) sudah secara otomatis menangani kasus string kosong,
  // jadi pesannya sudah sesuai.
  password: z
    .string()
    .min(5, { message: "Password harus memiliki minimal 5 karakter" }),
});
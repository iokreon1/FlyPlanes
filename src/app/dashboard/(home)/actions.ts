// di file actions Anda

"use server";

import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// 1. Tambahkan parameter (formData: FormData)
// 2. Hapus tipe pengembalian Promise<ActionResult>
export async function logout(formData: FormData) {
    const { session } = await getUser();

    if (!session) {
        // Jika karena suatu alasan tidak ada sesi,
        // cukup redirect ke halaman signin.
        // Tidak perlu mengembalikan error.
        return redirect("/dashboard/signin");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    // 3. Panggil redirect sebagai aksi terakhir, tidak perlu di-"return"
    redirect("/dashboard/signin");
}
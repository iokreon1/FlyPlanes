import { z } from "zod";

export const formFlightSchema = z.object({
	planeId: z.string().min(1, { message: "Pesawat tidak boleh kosong" }),
	price: z.string().min(1, { message: "Harga tiket tidak boleh kosong" }),
	departureCity: z.string().min(1, { message: "Kota keberangkatan tidak boleh kosong" }),
	departureDate: z.date(),
	departureCityCode: z
		.string()
		.min(3, {
			message:
				"Kode kota keberangkatan harus memiliki panjang minimal 3 karakter",
		})
		.max(3, {
			message:
				"Kode kota keberangkatan harus memiliki panjang maksimal 3 karakter",
		}),
	destinationCity: z.string().min(1, { message: "Kota tujuan tidak boleh kosong" }),
	arrivalDate: z.date(),
	destinationCityCode: z
		.string()
		.min(3, {
			message:
				"Kode kota tujuan harus memiliki panjang minimal 3 karakter",
		})
		.max(3, {
			message:
				"Kode kota tujuan harus memiliki panjang maksimal 3 karakter",
		}),
});

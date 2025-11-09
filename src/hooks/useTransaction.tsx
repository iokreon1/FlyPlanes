import type { User } from "lucia";
import useCheckoutData from "./useCheckoutData";
import { useMemo, useState } from "react";
import { SEAT_VALUES, type SeatValuesType } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
	user: User | null;
};

const useTransaction = ({ user }: Props) => {
	const { data } = useCheckoutData();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const selectedSeat = useMemo(() => {
		return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
	}, [data?.seat]);

type TransactionResponse = {
	midtrans: {
		token: string;
	};
};

const transactionMutate = useMutation<TransactionResponse, unknown, any>({
	mutationFn: async (data) => {
		const res = await axios.post<TransactionResponse>("/api/transactions/create", data);
		return res.data;
	},
});


	const payTransaction = async () => {
		if (!data && !user) {
			return null;
		}

		const totalPrice = Number(
			data?.flightDetail?.price ?? 0 + selectedSeat.additionalPrice
		);

		const bodyData = {
			bookingDate: new Date(),
			customerId: user?.id,
			flightId: data?.flightDetail?.id,
			price: totalPrice,
			seatId: data?.seatDetail?.id,
			departureCityCode: data?.flightDetail?.departureCityCode,
			destinationCityCode: data?.flightDetail?.destinationCityCode,
		};

		try {
			setIsLoading(true);
			const transaction = await transactionMutate.mutateAsync(bodyData);

			// ⚠️ CEK apakah token ada
    if (!transaction?.midtrans?.token) {
      throw new Error("Token Midtrans tidak ditemukan");
    }

    // ⚠️ CEK apakah window.snap sudah ready
    if (!window.snap) {
      throw new Error("Midtrans Snap belum ter-load. Refresh halaman.");
    }

			// handle midtrans
			window.snap.pay(transaction.midtrans.token, {
				onSuccess: (result: unknown) => {
					console.log(result);
					router.push("/success-checkout");
				},
				onPending: (result: unknown) => {
					console.log(result);
					router.push("/success-checkout");
				},
				onError: (result: unknown) => {
					console.log(result);
					alert("Transaksi gagal silahkan cobalagi");
				},
				onClose: (result: unknown) => {
					console.log(result);
					alert("Transaksi gagal silahkan cobalagi");
				},
			});

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	return {
		payTransaction,
		isLoading,
	};
};

export default useTransaction;

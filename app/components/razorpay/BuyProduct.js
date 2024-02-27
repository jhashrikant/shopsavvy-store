"use client";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { useRouter } from 'next/navigation';
import Loading from "@/app/loading";


const BuyProduct = ({ handleBuyNow, isLoading }) => {

	return (
		<>
			<Suspense fallback={<Loading />}>
				<Buy handleBuyNow={handleBuyNow} isLoading={isLoading} />
			</Suspense>
		</>
	);
};

export default BuyProduct;

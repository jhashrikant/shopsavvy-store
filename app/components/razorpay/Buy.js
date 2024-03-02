// "use client"
// import React, { useState } from "react";

const Buy = ({ handleBuyNow, isLoading }) => {

    return (
        <div className="">
            <button type="button"
                onClick={() => {
                    handleBuyNow();//send the productid here of the product intended to purchase
                }}
                disabled={isLoading}
                className={`mt-4 mb-8 w-full rounded-md bg-indigo-500 hover:bg-indigo-600 px-6 py-3 font-medium text-white  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? 'Please wait...' : 'Buy Now'}
            </button>
        </div>
    );
};

export default Buy;

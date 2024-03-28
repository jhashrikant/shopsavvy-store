import React from 'react'

const Shippingpolicy = () => {
  return (
    <div className="w-full py-12 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Shipping Policy
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Shipping made simple
            </h1>
            <p className="max-w-3xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              We want to make sure your order arrives safely and on time. Heres
              everything you need to know about our shipping process and policies.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl items-start gap-8 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Shipping Methods</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              We offer standard shipping for domestic orders, which usually takes
              5-7 business days. If you need your items faster, we also provide
              expedited shipping options.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Delivery Timeframes</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              The delivery timeframe depends on your location and the shipping
              method you choose. After your order is processed, you will receive a
              tracking number to monitor the status of your shipment.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Shipping Costs</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Shipping costs are calculated based on the weight of your package and
              your location. You can view the shipping fees during the checkout
              process before making a payment.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">International Shipping</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Yes, we offer international shipping to select countries. Please note
              that international orders may be subject to customs duties and taxes,
              which are the responsibility of the recipient.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Returns and Exchanges</h2>
            <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              If you need to return or exchange an item, please refer to our Returns
              and Exchanges policy page for detailed instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shippingpolicy

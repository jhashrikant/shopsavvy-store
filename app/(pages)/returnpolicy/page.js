import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center py-12 space-y-6 lg:py-24">
      <div className="prose prose-gray max-w-none w-full px-4 md:px-6 lg:px-12 dark:prose-invert">
        <h1 className="font-bold text-3xl tracking-tight md:text-5xl md:leading-tight">Return Policy</h1>
        <p>
          We want you to be completely satisfied with your purchase. If you have any questions or concerns about your
          order, please contact our customer service team at
          <Link className="underline" href="#">
            support@example.com
          </Link>
          .
        </p>
        <h2 className="font-bold text-2xl tracking-tight md:text-4xl md:leading-tight mt-10">Return Process</h2>
        <p>
          To initiate a return, please follow these steps:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            Contact our customer service team within 7 days of receiving your order to request a return
            authorization.
          </li>
          <li>Once your return request has been approved, carefully package the items you wish to return.</li>
          <li>
            Ship the items back to us using a trackable shipping method. You are responsible for the cost of return
            shipping.
          </li>
          <li>
            Once we receive your return, our team will inspect the items to ensure they are in their original
            condition.
          </li>
          <li>
            If your return is approved, we will process a refund to your original payment method within 7-10 business
            days.
          </li>
        </ol>

        <h2 className="font-bold text-2xl tracking-tight md:text-4xl md:leading-tight mt-10">Time Frame for Returns</h2>
        <p>
          You may return most items within 30 days of delivery for a full refund. Items returned after 30 days may be
          eligible for store credit at our discretion. Some products are not eligible for return or exchange, including:
        </p>
        <ul className="list-disc list-outside ml-4">
          <li>Items that have been used or damaged</li>
          <li>Perishable goods, such as food or flowers</li>
          <li>Personalized or custom-made items</li>
        </ul>
        <h2 className="font-bold text-2xl tracking-tight md:text-4xl md:leading-tight mt-10">Refunds and Exchanges</h2>
        <p>
          If you are not completely satisfied with your purchase, you may return it for a refund or exchange. Refunds
          will be issued to the original payment method, while exchanges will be processed once we receive your returned
          items.
        </p>
        <h2 className="font-bold text-2xl tracking-tight md:text-4xl md:leading-tight mt-10">Contact Us</h2>
        <p>
          If you have any questions about our return policy or need assistance with a return, please contact our
          customer service team at
          9561902867
          . We are here to help!
        </p>
      </div>
    </div>
  )
}

export default page

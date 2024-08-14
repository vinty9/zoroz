"use client";

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Address {
  name: string;
  room: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
  email: string;
}

interface PaymentDetails {
  total: number;
  discount: number;
  coupon: string;
  paymentMethod: string;
}

interface ProductWithDetails {
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  address: Address;
  paymentDetails: PaymentDetails;
}

const CancelPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [productData, setProductData] = useState<ProductWithDetails | null>(null);

  useMemo(() => {
    const product = searchParams.get('product');
    if (product) {
      setProductData(JSON.parse(product));
    }
  }, [searchParams]);

  const handleGoBack = () => {
    router.push('/profile'); // Adjust this route as necessary
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mt-8">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Order Cancelled</h1>

        {/* Product Details */}
        {productData ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-6">
                <div>
                  <Image
                    className="object-cover rounded-md"
                    src={productData.image}
                    alt={productData.name}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-gray-700">{productData.name}</h4>
                  <p className="text-sm text-gray-600">{productData.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">₹ {productData.price}</span>
                    <span className="text-sm font-medium text-gray-600">({productData.quantity} qty)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Address Details</h2>
              <div className="space-y-2">
                <p className="text-md font-semibold text-gray-700">Name: {productData.address.name}</p>
                <p className="text-md text-gray-600">Room: {productData.address.room}</p>
                <p className="text-md text-gray-600">Address: {productData.address.address}</p>
                <p className="text-md text-gray-600">City: {productData.address.city}</p>
                <p className="text-md text-gray-600">State: {productData.address.state}</p>
                <p className="text-md text-gray-600">Country: {productData.address.country}</p>
                <p className="text-md text-gray-600">PIN: {productData.address.pin}</p>
                <p className="text-md text-gray-600">Mobile: {productData.address.phone}</p>
                <p className="text-md text-gray-600">Email: {productData.address.email}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-gray-700 font-medium">Total:</span>
                  <span className="text-gray-900 font-semibold">₹ {productData.paymentDetails.total}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-gray-700 font-medium">Discount:</span>
                  <span className="text-gray-900 font-semibold">₹ {productData.paymentDetails.discount}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-gray-700 font-medium">Coupon:</span>
                  <span className="text-gray-900 font-semibold">{productData.paymentDetails.coupon}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-gray-700 font-medium">Payment Method:</span>
                  <span className="text-gray-900 font-semibold">{productData.paymentDetails.paymentMethod}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-600">No product data available.</p>
        )}

        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Go Back to Order List
        </button>
      </div>
    </div>
  );
};

export default CancelPage;

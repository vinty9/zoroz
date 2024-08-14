// "use client" 

// import React, { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import Link from 'next/link';
// import Image from 'next/image';

// interface Address {
//   _id?: string;
//   name: string;
//   email: string;
//   room: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   pin: string;
//   phone: string;
// }

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
//   rating: number;
//   reviewCount: number;
//   description: string;
//   brand: string;
//   originalPrice: number;
//   discountPercentage: number;
//   quantity: number;
//   category?: string;
//   stock?: number;
// }

// interface ProgressStage {
//   status: string;
//   date?: string;
// }

// interface OrderDetails {
//   products?: Product[];
//   addresses?: Address[];
//   progress?: ProgressStage[];
//   total?: number;
//   paymentMethod?: string;
//   _id?: string;
// }

// const OrderStatusContent = () => {
//   const searchParams = useSearchParams();
//   const [orderId, setOrderId] = useState<string | null>(null);
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

//   useEffect(() => {
//     const id = searchParams.get("orderId");
//     setOrderId(id);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       if (!orderId) {
//         console.error("Order ID is missing");
//         return;
//       }

//       try {
//         const response = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/api/orders/${orderId}`);
//         setOrderDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       }
//     };

//     if (orderId) {
//       fetchOrderDetails();
//     }
//   }, [orderId]);

//   if (!orderDetails) {
//     return <div>Loading...</div>;
//   }

//   const { products = [], addresses = [], progress = [], total, paymentMethod, _id } = orderDetails;

//   return (
//     <div className="w-full flex flex-col items-center px-4 mt-6">
//       <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col gap-4 bg-secondary p-4 mt-4">
//         <div className="w-full flex flex-col lg:flex-row bg-white p-4 rounded-[5px]">
//           <div className="lg:w-1/3 flex justify-center items-center">
//             <Image 
//               src="/assets/images/orderPlaced.png" 
//               alt="Order Placed"
//               width={300}  
//               height={300} 
//               className="rounded"
//             />
//           </div>
//           <div className="lg:w-2/3 text-center lg:text-left lg:ml-4">
//             <h1 className="text-2xl font-semibold">Hi {addresses.length > 0 ? addresses[0].name : "User"},</h1>
//             <p className="mt-2 text-lg">Thank you for your order. We will send you a confirmation when your order ships.</p>
//             <div className="mt-4">
//               <h2 className="text-xl font-semibold">Order Details</h2>
//               <p className="mt-2 text-md">Order ID: {_id}</p>
//               <p className="text-md">Total: ₹ {total}</p>
//               <p className="text-md">Payment Method: {paymentMethod}</p>
//             </div>
//             <div className="w-full flex justify-center lg:justify-start mt-6">
//               <div className="w-[200px] h-[100px] flex flex-col gap-4 items-center">
//                 <Link href="/profile" className="bg-blue-500 text-white px-4 py-2 rounded text-center w-full">
//                   View Order
//                 </Link>
//                 <Link href="/AllProducts" className="bg-green-500 text-white px-4 py-2 rounded text-center w-full">
//                   Shop More
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const OrderstatusComponent = () => {
//   return (
//     <Suspense fallback={<div>Loading order status...</div>}>
//       <OrderStatusContent />
//     </Suspense>
//   );
// };

// export default OrderstatusComponent;




"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import Image from 'next/image';

interface Address {
  _id?: string;
  name: string;
  email: string;
  room: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  brand: string;
  originalPrice: number;
  discountPercentage: number;
  quantity: number;
  category?: string;
  stock?: number;
}

interface ProgressStage {
  status: string;
  date?: string;
}

interface OrderDetails {
  products?: Product[];
  addresses?: Address[];
  progress?: ProgressStage[];
  total?: number;
  paymentMethod?: string;
  _id?: string;
}

const OrderStatusContent = () => {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const id = searchParams.get("orderId");
    setOrderId(id);
  }, [searchParams]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        console.error("Order ID is missing");
        return;
      }

      try {
        const response = await axios.get(`https://zoroz-ecommerce-backend.onrender.com/api/orders/${orderId}`);
        setOrderDetails(response.data);

        const cart = localStorage.getItem("cart");
        if (cart) {
          const cartItems = JSON.parse(cart);
          const purchasedItems = response.data.products || [];
          const updatedCart = cartItems.filter((item: Product) =>
            !purchasedItems.some((purchasedItem: Product) => purchasedItem._id === item._id)
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const { products = [], addresses = [], progress = [], total, paymentMethod, _id } = orderDetails;

  return (
    <div className="w-full flex flex-col items-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col gap-4 bg-secondary p-4 mt-4">
        <div className="w-full flex flex-col lg:flex-row bg-white p-4 rounded-[5px]">
          <div className="lg:w-1/3 flex justify-center items-center">
            <Image 
              src="/assets/images/orderPlaced.png" 
              alt="Order Placed"
              width={300}  
              height={300} 
              className="rounded"
            />
          </div>
          <div className="lg:w-2/3 text-center lg:text-left lg:ml-4">
            <h1 className="text-2xl font-semibold">Hi {addresses.length > 0 ? addresses[0].name : "User"},</h1>
            <p className="mt-2 text-lg">Thank you for your order. We will send you a confirmation when your order ships.</p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <p className="mt-2 text-md">Order ID: {_id}</p>
              <p className="text-md">Total: ₹ {total}</p>
              <p className="text-md">Payment Method: {paymentMethod}</p>
            </div>
            <div className="w-full flex justify-center lg:justify-start mt-6">
              <div className="w-[200px] h-[100px] flex flex-col gap-4 items-center">
                <Link href="/profile#orders" className="bg-blue-500 text-white px-4 py-2 rounded text-center w-full">
                  View Order
                </Link>
                <Link href="/AllProducts" className="bg-green-500 text-white px-4 py-2 rounded text-center w-full">
                  Shop More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderstatusComponent = () => {
  return (
    <React.Suspense fallback={<div>Loading order status...</div>}>
      <OrderStatusContent />
    </React.Suspense>
  );
};

export default OrderstatusComponent;

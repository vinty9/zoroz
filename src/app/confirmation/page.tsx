// "use client";

// import React, { useState, useEffect,Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";

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

// interface Address {
//   name: string;
//   room: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   pin: string;
//   phone: string;
//   email: string;
// }

// interface OrderData {
//   cart: Product[];
//   addresses: Address[];
//   discount: number;
//   total: number;
//   coupon: string;
// }
  
// const Payment = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
//   const [orderData, setOrderData] = useState<any>(null);

//   // useEffect(() => {
//   //   const data = searchParams.get("data");
//   //   if (data) {
//   //     const parsedData = JSON.parse(decodeURIComponent(data));
//   //     parsedData.cart = JSON.parse(parsedData.cart);
//   //     parsedData.addresses = JSON.parse(parsedData.addresses);
//   //     setOrderData(parsedData);

      
//   //   }
//   // }, [searchParams]);



//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Get URL parameters
//       const searchParams = new URLSearchParams(window.location.search);
//       const data = searchParams.get("data");
  
//       if (data) {
//         try {
//           const parsedData = JSON.parse(decodeURIComponent(data));
//           parsedData.cart = JSON.parse(parsedData.cart);
//           parsedData.addresses = JSON.parse(parsedData.addresses);
//           setOrderData(parsedData);
//         } catch (error) {
//           console.error("Error parsing data:", error);
//         }
//       }
//     }
//   }, []);
  
  

 

//   const handlePaymentMethodChange = (method: string) => {
//     setPaymentMethod(method);
//     if (method === "Cash on Delivery") {
//       setShowConfirmModal(true);
//     }
//   };

  
//   const handleConfirmOrder = async () => {
//     if (!orderData || !Array.isArray(orderData.cart)) {
//       console.error("Invalid orderData or cart is not an array:", orderData);
//       return;
//     }
  
//     try {
//       const formData = new FormData();
  
//       formData.append('products', JSON.stringify(orderData.cart));
//       formData.append('addresses', JSON.stringify(orderData.addresses));
//       formData.append('discount', orderData.discount.toString());
//       formData.append('total', orderData.total.toString());
//       formData.append('coupon', orderData.coupon);
//       formData.append('paymentMethod', paymentMethod);
  
//       for (const item of orderData.cart) {
//         if (item.image) {
//           const imageBlob = await fetch(item.image).then(res => res.blob());
//           formData.append('images[]', imageBlob, `${item.name}.jpg`);
//         }
//       }
  
//       const response = await axios.post("https://zoroz-ecommerce-backend.onrender.com/api/orders", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });
  
//       const orderId = response.data.orderId;
//       if (orderId) {
//         router.push(`/orderstatus?orderId=${orderId}`);
//       } else {
//         console.error("Order ID not found in response");
//       }
  
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };
  

  
//   if (!orderData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Suspense fallback={<div>Loading...</div>}>

//     <div className="p-4 bg-gray-100 rounded-lg shadow-md">
//     <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Your Order</h1>
    
//     <div className="flex justify-around mb-4">
//       <label className="flex items-center space-x-2">
//         <input
//           type="radio"
//           value="Cash on Delivery"
//           checked={paymentMethod === "Cash on Delivery"}
//           onChange={() => handlePaymentMethodChange("Cash on Delivery")}
//           className="form-radio h-5 w-5 text-green-600"
//         />
//         <span className="text-gray-700 font-medium">Cash on Delivery</span>
//       </label>
      
//       <label className="flex items-center space-x-2">
//         <input
//           type="radio"
//           value="UPI"
//           checked={paymentMethod === "UPI"}
//           onChange={() => setPaymentMethod("UPI")}
//           className="form-radio h-5 w-5 text-green-600"
//         />
//         <span className="text-gray-700 font-medium">UPI</span>
//       </label>
//     </div>
  
//     {showConfirmModal && (
//       <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-auto mt-10 mb-10">
//           <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Confirm Order</h2>
//           <p className="text-gray-700 mb-6 text-center">Are you sure you want to place the order with Cash on Delivery?</p>
//           <div className="flex justify-around">
//             <button 
//               onClick={handleConfirmOrder} 
//               className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
//             >
//               Confirm
//             </button>
//             <button 
//               onClick={() => setShowConfirmModal(false)} 
//               className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
//   </Suspense>


//   );
// };

// export default Payment;


"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

interface OrderData {
  cart: Product[];
  addresses: Address[];
  discount: number;
  total: number;
  coupon: string;
}

const Payment = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const data = searchParams.get("data");

      if (data) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(data));
          parsedData.cart = JSON.parse(parsedData.cart);
          parsedData.addresses = JSON.parse(parsedData.addresses);
          setOrderData(parsedData);
        } catch (error) {
          console.error("Error parsing data:", error);
        }
      }
    }
  }, []);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === "Cash on Delivery") {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmOrder = async () => {
    if (!orderData || !Array.isArray(orderData.cart)) {
      console.error("Invalid orderData or cart is not an array:", orderData);
      return;
    }

    try {
      const formData = new FormData();

      formData.append('products', JSON.stringify(orderData.cart));
      formData.append('addresses', JSON.stringify(orderData.addresses));
      formData.append('discount', orderData.discount.toString());
      formData.append('total', orderData.total.toString());
      formData.append('coupon', orderData.coupon);
      formData.append('paymentMethod', paymentMethod);

      for (const item of orderData.cart) {
        if (item.image) {
          const imageBlob = await fetch(item.image).then(res => res.blob());
          formData.append('images[]', imageBlob, `${item.name}.jpg`);
        }
      }

      const response = await axios.post("https://zoroz-ecommerce-backend.onrender.com/api/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const orderId = response.data.orderId;
      if (orderId) {
        router.push(`/orderstatus?orderId=${orderId}`);
      } else {
        console.error("Order ID not found in response");
      }

    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Confirm Your Order</h1>
      
      <div className="flex justify-around mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={() => handlePaymentMethodChange("Cash on Delivery")}
            className="form-radio h-5 w-5 text-green-600"
          />
          <span className="text-gray-700 font-medium">Cash on Delivery</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
            className="form-radio h-5 w-5 text-green-600"
          />
          <span className="text-gray-700 font-medium">UPI</span>
        </label>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-auto mt-10 mb-10">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Confirm Order</h2>
            <p className="text-gray-700 mb-6 text-center">Are you sure you want to place the order with Cash on Delivery?</p>
            <div className="flex justify-around">
              <button 
                onClick={handleConfirmOrder} 
                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Confirm
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)} 
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;

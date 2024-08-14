
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from 'next/image';


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
//   email: string;
//   room: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   pin: string;
//   phone: string;
// }

// interface ProgressStage {
//   status: string;
//   date?: string;
// }

// interface OrderDetails {
//   products: Product[];
//   addresses: Address[];
//   progress: ProgressStage[];
// }

// interface Order {
//   _id: string;
//   products: any[];
//   addresses: any[];
//   discount: number;
//   total: number;
//   coupon: string;
//   paymentMethod: string;
//   images: string[];
//   createdAt: string;
// }

// const OrderList = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
//   const toggleDetails = (orderId: string) => {
//     setShowDetails((prevDetails) => ({
//       ...prevDetails,
//       [orderId]: !prevDetails[orderId]
//     }));
//   };
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/orders");
//         console.log("Orders:", response.data);
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (

//     <div className="w-full flex justify-center px-4 mt-8">
//       <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order._id} className="bg-white rounded-lg shadow-md mb-6">
//               <div className="p-6 border-b border-gray-200">
//                 <div className="flex flex-col">
//                   <h3 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h3>
//                   <span className="text-sm text-gray-500 mt-1">
//                     Placed on: {new Date(order.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 {/* Summary View */}
//                 <div className="mt-6">
//                   {order.products.length > 0 && (
//                     <div className="flex items-center space-x-4">
//                       {/* Product Image */}
// <Image
//   className="h-24 w-24 object-cover rounded-md"
//   src={order.products[0].image}
//   alt={order.products[0].name}
//   width={96}  // Specify the width of the image in pixels (24 * 4 = 96)
//   height={96} // Specify the height of the image in pixels (24 * 4 = 96)
// />
//                       {/* Product Description and Pricing */}
//                       <div className="flex-grow">
//                         <h4 className="text-lg font-semibold text-gray-700">{order.products[0].name}</h4>
//                         <p className="text-sm text-gray-600">{order.products[0].description}</p>
//                         <div className="mt-2 flex items-center gap-2">
//                           <span className="text-lg font-bold text-gray-800">
//                             ₹ {order.products[0].price}
//                           </span>
//                           {order.products.length === 1 && (
//                             <span className="text-sm font-medium text-gray-600">({order.products[0].quantity} qty)</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Toggle Details */}
//                 <div className="mt-6">
//                   <button
//                     className="text-blue-500 hover:underline focus:outline-none"
//                     onClick={() => toggleDetails(order._id)}
//                   >
//                     {showDetails[order._id] ? 'Hide Details' : 'View Details'}
//                   </button>
//                 </div>

//                 {/* Detailed View (Initially Hidden) */}
//                 {showDetails[order._id] && (
//                   <div className="mt-6 border-t border-gray-200 pt-4">
//                     <div className="space-y-4">
//                       <div className="flex flex-col space-y-2">
//                         {order.products.map((product, index) => (
//                           <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                             <Image className="h-24 w-24 object-cover rounded-md" src={product.image} alt={product.name} />
//                             <div className="flex flex-col flex-grow">
//                               <span className="text-lg font-medium text-gray-700">{product.name}</span>
//                               <span className="text-md font-medium text-gray-600">{product.description}</span>
//                               <div className="mt-2 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Rating:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
//                               </div>
//                               <div className="mt-1 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Reviews:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.reviewCount}</span>
//                               </div>
//                               <div className="mt-1 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Brand:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.brand}</span>
//                               </div>
//                               <div className="mt-2 flex items-center gap-2">
//                                 <span className="text-lg font-bold text-gray-800">
//                                   <span className="text-sm font-normal line-through text-gray-500">₹ {product.originalPrice}</span> ₹ {product.price}
//                                 </span>
//                                 <span className="text-sm font-medium text-green-600">{product.discountPercentage}% off</span>
//                               </div>
//                               <div className="mt-1 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Quantity:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.quantity}</span>
//                               </div>
//                               <div className="mt-1 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Category:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.category}</span>
//                               </div>
//                               <div className="mt-1 flex items-center gap-2">
//                                 <span className="text-sm text-gray-500">Stock:</span>
//                                 <span className="text-sm font-semibold text-gray-700">{product.stock}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Pricing Details */}
//                       <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
//                         <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Pricing & Payment Details</h4>
//                         <div className="space-y-2">
//                           <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
//                             <span className="text-md font-semibold text-gray-800">Discount:</span>
//                             <span className="text-md font-semibold text-gray-700">₹ {order.discount}</span>
//                           </div>
//                           <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
//                             <span className="text-md font-semibold text-gray-800">Total:</span>
//                             <span className="text-md font-semibold text-gray-700">₹ {order.total}</span>
//                           </div>
//                           <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
//                             <span className="text-md font-semibold text-gray-800">Coupon:</span>
//                             <span className="text-md font-semibold text-gray-700">{order.coupon}</span>
//                           </div>
//                           <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
//                             <span className="text-md font-semibold text-gray-800">Payment Method:</span>
//                             <span className="text-md font-semibold text-gray-700">{order.paymentMethod}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Address Information */}
//                       <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
//                         {order.addresses.length > 0 ? (
//                           <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
//                             <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Address</h4>
//                             <p className="text-md font-semibold text-gray-700">Name: {order.addresses[0].name}</p>
//                             <p className="text-md text-gray-600">Room: {order.addresses[0].room}</p>
//                             <p className="text-md text-gray-600">Address: {order.addresses[0].address}</p>
//                             <p className="text-md text-gray-600">City: {order.addresses[0].city}</p>
//                             <p className="text-md text-gray-600">State: {order.addresses[0].state}</p>
//                             <p className="text-md text-gray-600">Country: {order.addresses[0].country}</p>
//                             <p className="text-md text-gray-600">PIN: {order.addresses[0].pin}</p>
//                             <p className="text-md text-gray-600">Mobile: {order.addresses[0].mobile}</p>
//                             <p className="text-md text-gray-600">Email: {order.addresses[0].email}</p>
//                           </div>
//                         ) : (
//                           <p className="text-md text-gray-600">No address details available</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-lg text-gray-700">No orders found</p>
//         )}
//       </div>
//     </div>


//   );
// };

// export default OrderList;









"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import noOrdersImage from '../../../public/assets/images/noOrders.png';
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaLocationArrow,
  FaMinus,
  FaStar,
  FaCartPlus,
  FaHeart,
} from "react-icons/fa";

const stages = ["Accepted", "Processing", "Packed", "Shipped", "Estimate Delivery"];

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
  email: string;
  room: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin: string;
  phone: string;
}

interface Order {
  _id: string;
  products: Product[];
  addresses: Address[];
  discount: number;
  total: number;
  coupon: string;
  paymentMethod: string;
  images: string[];
  createdAt: string;
  status: string;
}


const backendUrl = "http://localhost:8080";


const reasons = [
  "Wrong item received",
  "Item damaged",
  "Changed mind",
  "Ordered by mistake",
  "Better price available",
  "Not as described",
  "No longer needed",
  "Other",
];

const OrderList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [comment, setComment] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleDetails = (orderId: string) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [orderId]: !prevDetails[orderId],
    }));
  };


  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: Product) => item._id === product._id
    );

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/product?product=${productQueryString}`);
  };

  const handleAddToWishlist = (product: Product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingProductIndex = wishlist.findIndex((item: Product) => item._id === product._id);

    if (existingProductIndex > -1) {
      wishlist[existingProductIndex].quantity += 1;
      alert("Product already exists in the wishlist. Quantity updated!");
    } else {
      wishlist.push({ ...product, quantity: 1 });
      alert("Product added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };


  const handleCancel = (order: Order) => {
    setSelectedOrder(order);
    setShowCancelForm(true);
  };

  const handleConfirmCancel = () => {
    if (selectedOrder) {
      // Hide the cancel form and show confirmation dialog
      setShowCancelForm(false);
      setShowConfirmationDialog(true);
    }
  };

  // const handleCancelConfirmation = () => {
  //   if (selectedOrder) {
  //     // Update order status to 'Cancelled'
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order._id === selectedOrder._id
  //           ? { ...order, status: "Cancelled" }
  //           : order
  //       )
  //     );
  //     setShowConfirmationDialog(false);
  //     setShowConfirmationMessage(true);
  //   }
  // };

  // const handleGoBack = () => {
  //   router.push('/'); // Adjust this route as necessary
  // };




  // const handleCancelConfirmation = () => {
  //   // Assuming you want to use the first product in the order for the cancellation page
  //   const product = selectedOrder?.products[0];

  //   if (product) {
  //     const params = new URLSearchParams({
  //       product: JSON.stringify({
  //         image: product.image,
  //         name: product.name,
  //         description: product.description,
  //         price: product.price,
  //         quantity: product.quantity,
  //       }),
  //     }).toString();

  //     router.push(`/CancelPage?${params}`);
  //   }

  //   setShowConfirmationDialog(false);
  //   setShowConfirmationMessage(true);
  // };

  const handleCancelConfirmation = () => {
    const product = selectedOrder?.products[0];
    const address = selectedOrder?.addresses[0];
    const paymentDetails = {
      total: selectedOrder?.total || 0,
      discount: selectedOrder?.discount || 0,
      coupon: selectedOrder?.coupon || '',
      paymentMethod: selectedOrder?.paymentMethod || '',
    };

    if (product && address && paymentDetails) {
      const productData = {
        image: product.image,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        address,
        paymentDetails,
      };

      const params = new URLSearchParams({
        product: JSON.stringify(productData),
      }).toString();

      router.push(`/CancelPage?${params}`);
    }

    setShowConfirmationDialog(false);
    setShowConfirmationMessage(true);
  };



  const handleGoBack = () => {
    router.push('/'); // Adjust this route as necessary
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/products`);
        console.log("Fetched products:", response.data);

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center px-4 mt-8">
        <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start space-x-6">
                    <div>
                      <Image
                        className="object-cover rounded-md"
                        src={order.products[0].image}
                        alt={order.products[0].name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-700">{order.products[0].name}</h4>
                      <p className="text-sm text-gray-600">{order.products[0].description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-800">₹ {order.products[0].price}</span>
                        <span className="text-sm font-medium text-gray-600">({order.products[0].quantity} qty)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      className="text-blue-500 hover:underline focus:outline-none"
                      onClick={() => toggleDetails(order._id)}
                    >
                      {showDetails[order._id] ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>

                  {showDetails[order._id] && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex space-x-6">
                          <div>
                            <Image
                              className="object-cover rounded-md"
                              src={order.products[0].image}
                              alt={order.products[0].name}
                              width={150}
                              height={150}
                            />
                          </div>

                          <div className="flex-grow">
                            <h4 className="text-lg font-semibold text-gray-700">{order.products[0].name}</h4>
                            <p className="text-sm text-gray-600">{order.products[0].description}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-lg font-bold text-gray-800">₹ {order.products[0].price}</span>
                              <span className="text-sm font-medium text-gray-600">({order.products[0].quantity} qty)</span>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => handleCancel(order)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                              Cancel Item
                            </button>
                          </div>
                        </div>

                        <div className="flex space-x-6">
                          <div className="w-1/2 p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Address</h4>
                            {order.addresses.length > 0 ? (
                              <>
                                <p className="text-md font-semibold text-gray-700">Name: {order.addresses[0].name}</p>
                                <p className="text-md text-gray-600">Room: {order.addresses[0].room}</p>
                                <p className="text-md text-gray-600">Address: {order.addresses[0].address}</p>
                                <p className="text-md text-gray-600">City: {order.addresses[0].city}</p>
                                <p className="text-md text-gray-600">State: {order.addresses[0].state}</p>
                                <p className="text-md text-gray-600">Country: {order.addresses[0].country}</p>
                                <p className="text-md text-gray-600">PIN: {order.addresses[0].pin}</p>
                                <p className="text-md text-gray-600">Mobile: {order.addresses[0].phone}</p>
                                <p className="text-md text-gray-600">Email: {order.addresses[0].email}</p>
                              </>
                            ) : (
                              <p className="text-md text-gray-600">No address details available</p>
                            )}
                          </div>

                          <div className="w-1/2 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
                            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Pricing & Payment Details</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Total:</span>
                                <span className="text-gray-900 font-semibold">₹ {order.total}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Discount:</span>
                                <span className="text-gray-900 font-semibold">₹ {order.discount}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Coupon:</span>
                                <span className="text-gray-900 font-semibold">{order.coupon}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Payment Method:</span>
                                <span className="text-gray-900 font-semibold">{order.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Order Date:</span>
                                <span className="text-gray-900 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 border border-gray-200 rounded-md">
                                <span className="text-gray-700 font-medium">Status:</span>
                                <span className={`text-gray-900 font-semibold ${order.status === 'Cancelled' ? 'text-red-600' : ''}`}>{order.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-lg font-semibold text-gray-800 mb-2">Order Status</div>
                          <div className="relative">
                            <div className="absolute left-0 top-0 h-1 bg-blue-500" style={{ width: `${(stages.indexOf(order.status) / (stages.length - 1)) * 100}%` }}></div>
                            <div className="flex justify-between">
                              {stages.map((stage, index) => (
                                <div
                                  key={index}
                                  className={`text-center text-xs font-medium ${index <= stages.indexOf(order.status) ? 'text-blue-600' : 'text-gray-400'}`}
                                >
                                  {stage}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            // <p>No orders available.</p>
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium text-gray-700 mb-4">No orders available.</p>
              <Image
                src={noOrdersImage}
                alt="No Orders"
                width={300}
                height={300}
              />


            </div>
          )}

          {showCancelForm && selectedOrder && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Request Cancellation</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Cancellation</label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Comment (Optional)</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="form-textarea block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleConfirmCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setShowCancelForm(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showConfirmationDialog && (
            <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                  <h3 className="text-xl font-semibold mb-4">Are you sure you want to cancel?</h3>
                  <div className="flex justify-between">
                    <button
                      onClick={handleCancelConfirmation}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setShowConfirmationDialog(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          )}

          {showConfirmationMessage && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                <h3 className="text-xl font-semibold mb-4">Cancellation Confirmed</h3>
                <div className="mb-4">
                  <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_135_12642)">
                      <g clipPath="url(#clip1_135_12642)">
                        <g clipPath="url(#clip2_135_12642)">
                          <path d="M72.9954 133.588C61.0462 133.588 49.3653 130.044 39.4299 123.406C29.4945 116.767 21.7508 107.331 17.178 96.2915C12.6053 85.2519 11.4088 73.1042 13.74 61.3846C16.0712 49.665 21.8253 38.8998 30.2747 30.4504C38.724 22.0011 49.4892 16.247 61.2088 13.9158C72.9284 11.5846 85.0761 12.7811 96.1157 17.3538C107.155 21.9266 116.591 29.6703 123.23 39.6057C129.868 49.5411 133.412 61.222 133.412 73.1712C133.412 81.1052 131.849 88.9616 128.813 96.2917C125.777 103.622 121.327 110.282 115.717 115.892C110.106 121.503 103.446 125.953 96.1159 128.989C88.7858 132.025 80.9295 133.588 72.9954 133.588ZM66.9719 97.3375L109.687 54.617L101.144 46.0738L66.9719 80.25L49.8799 63.1591L41.3367 71.7023L66.9719 97.3375Z" fill="#458D00" />
                        </g>
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_135_12642">
                        <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)" />
                      </clipPath>
                      <clipPath id="clip1_135_12642">
                        <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)" />
                      </clipPath>
                      <clipPath id="clip2_135_12642">
                        <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-700">Your cancellation request has been confirmed.</p>
                <button
                  onClick={handleGoBack}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}



        </div>
      </div>

      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              BEST SELLERS
            </span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className=" p-4 rounded shadow-md flex flex-col items-center justify-center relative"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                  <span className="text-[13px] text-black/70">
                    ({product.reviewCount} Reviews)
                  </span>
                  <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                    {product.rating} <FaStar className="text-[10px]" />
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-10 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10"
                  >
                    <FaHeart className="text-red-500 text-lg" />
                  </button>

                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  <span className="text-2xl font-bold text-black">
                    ₹ {product.price.toLocaleString()}
                  </span>

                  <span className="text-[14px] font-semibold text-black/50">
                    By: {product.brand}
                  </span>
                  <span className="text-[14px] font-semibold text-black/50 line-through">
                    ₹ {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[16px] font-bold text-green">
                    {product.discountPercentage}% OFF
                  </span>
                  <div className="flex justify-between mt-3 gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="py-3 px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
                    >
                      <FaCartPlus />
                    </button>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>

  );
};

export default OrderList;


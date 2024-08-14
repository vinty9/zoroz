
// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import axios from "axios";
// import { FaStar } from "react-icons/fa";

// interface Address {
//     _id?: string;
//     name: string;
//     email: string,
//     room: string;
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     pin: string;
//     phone: string;
// }

// interface Product {
//     _id: string;
//     name: string;
//     price: number;
//     image: string;
//     rating: number;
//     reviewCount: number;
//     description: string;
//     brand: string;
//     originalPrice: number;
//     discountPercentage: number;
//     quantity: number;
//     category?: string;
//     stock?: number;
// }

// const Buynowhomepage = () => {
//     const router = useRouter();
//     const [requestGST, setRequestGST] = useState(false);

//     const [selectedSize, setSelectedSize] = useState<string>('');
//     const [selectedColor, setSelectedColor] = useState<string>('');
//     const [orderData, setOrderData] = useState<any>(null);

//     const [addresses, setAddresses] = useState<Address[]>([]);
//     const [product, setProduct] = useState<Product | null>(null);
//     const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
//     const [quantity, setQuantity] = useState<number>(1);
//     const [coupon, setCoupon] = useState<string>("");
//     const [discount, setDiscount] = useState<number>(0);
//     const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [newAddress, setNewAddress] = useState<Address>({
//         name: "",
//         email: '',
//         room: "",
//         address: "",
//         city: "",
//         state: "",
//         country: "",
//         pin: "",
//         phone: "",
//     });





//     useEffect(() => {
//         const fetchAddresses = async () => {
//             try {
//                 const response = await axios.get('https://zoroz-backend.onrender.com/address');
//                 setAddresses(response.data);
//                 if (response.data.length > 0) {
//                     setSelectedAddress(response.data[0]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching addresses:', error);
//             }
//         };

//         fetchAddresses();
//     }, []);



//     const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const selected = addresses.find((address) => address._id === event.target.value);
//         setSelectedAddress(selected || null);
//     };



//     // useEffect(() => {
//     //     const query = new URLSearchParams(window.location.search);
//     //     const productData = query.get('product');
//     //     if (productData) {
//     //         setProduct(JSON.parse(decodeURIComponent(productData)));
//     //     }
//     // }, []);


//         // Selecting size and color
// const selectProductSize = (size: string) => {
//     setSelectedSize(size);
//     console.log('Selected Size:', size);
// };

// const selectProductColor = (color: string) => {
//     setSelectedColor(color);
//     console.log('Selected Color:', color);
// };


// useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const productData = query.get('product');

//     if (productData) {
//         try {
//             const parsedProduct = JSON.parse(decodeURIComponent(productData));
//             setProduct(parsedProduct);
//             setSelectedSize(parsedProduct.selectedSize || '');  
//             setSelectedColor(parsedProduct.selectedColor || ''); 
//             console.log('Parsed Product:', parsedProduct);
//         } catch (error) {
//             console.error('Error parsing product data:', error);
//         }
//     }
// }, []);



//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     const handleQuantityChange = (newQuantity: number) => {
//         setQuantity(newQuantity);
//     };

//     const handleRemoveProduct = () => {
//         setProduct(null);
//     };

//     const coupons: { [key: string]: number } = {
//         "DISCOUNT100": 100,
//         "DISCOUNT150": 150,
//     };

//     const handleApplyCoupon = () => {
//         if (coupons[coupon]) {
//             setDiscount(coupons[coupon]);
//         } else {
//             alert("Invalid coupon code");
//             setDiscount(0);
//         }
//     };

//     const handleAddressFormSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (isEditing) {
//             const response = await axios.put(`https://zoroz-backend.onrender.com/address/${newAddress._id}`, newAddress);
//             setAddresses(addresses.map(addr => addr._id === response.data._id ? response.data : addr));
//         } else {
//             const response = await axios.post("https://zoroz-backend.onrender.com/address", newAddress);
//             setAddresses([...addresses, response.data]);
//         }
//         setShowAddressForm(false);
//         setIsEditing(false);
//         setNewAddress({
//             name: "",
//             email: '',
//             room: "",
//             address: "",
//             city: "",
//             state: "",
//             country: "",
//             pin: "",
//             phone: "",
//         });
//     };

//     const handleEditAddress = (address: Address) => {
//         setNewAddress(address);
//         setShowAddressForm(true);
//         setIsEditing(true);
//     };

//     const totalPrice = (product.price * quantity) - discount;
//     const gst = totalPrice * 0.18;
//     const shipping = 50;
//     const finalPrice = totalPrice + gst + shipping;
//     const totalWithDiscount = totalPrice - discount;

//     // const handlePlaceOrder = () => {
//     //     if (selectedAddress) {
//     //         console.log('Proceeding with address:', selectedAddress);
//     //         const orderData = {
//     //             cart: [product],
//     //             addresses: [selectedAddress],
//     //             discount,
//     //             total: finalPrice,
//     //             coupon
//     //         };

//     //         const encodedData = encodeURIComponent(JSON.stringify(orderData));
//     //         router.push(`/BUYNOWconfirmation?data=${encodedData}`);
//     //     } else {
//     //         console.log('No address selected.');
//     //     }
//     // };


//     const handlePlaceOrder = () => {
//         if (selectedAddress && product) {
//             console.log('Proceeding with address:', selectedAddress);
//             console.log('Selected Size:', selectedSize);
//         console.log('Selected Color:', selectedColor);
//             const orderData = {
//                 cart: [{
//                     ...product,
//                     selectedSize,
//                     selectedColor,
//                     quantity
//                 }],
//                 addresses: [selectedAddress],
//                 discount,
//                 total: finalPrice,
//                 coupon
//             };
//             console.log('Order data:', orderData);

//             const encodedData = encodeURIComponent(JSON.stringify(orderData));
//             router.push(`/BUYNOWconfirmation?data=${encodedData}`);
//         } else {
//             console.log('No address selected or product not found.');
//         }
//     };



//     return (
//         <div className="w-full flex justify-center px-4 mt-6 bg-gray-100">
//             <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col gap-4 relative bg-white-100 p-4 rounded-[5px]">
//                 <div className="mt-4">
//                     <div className="w-full bg-white h-[70px] rounded-[10px] flex items-center gap-2 mt-4">
//                         <input
//                             type="checkbox"
//                             id="requestGST"
//                             checked={requestGST}
//                             onChange={() => setRequestGST(!requestGST)}
//                             className="ml-5 cursor-pointer"
//                         />
//                         <label htmlFor="requestGST" className="text-md font-medium">
//                             Get GST Invoice
//                         </label>
//                     </div>
//                     <h2 className="text-lg font-bold mb-4 mt-5">Delivery Address</h2>


//                     <div className="bg-white p-4 rounded-[10px] shadow-md max-h-60 overflow-y-auto">
//                         <div className="flex flex-col gap-2">
//                             {addresses.map((address) => (
//                                 <div
//                                     key={address._id}
//                                     className={`mb-4 p-4 rounded-[10px] border border-gray-200 ${selectedAddress?._id === address._id ? 'bg-gray-100' : ''}`}
//                                 >
//                                     <div className="mb-2">
//                                         <span className="font-semibold">{address.name}</span>
//                                     </div>
//                                     <div className="mb-2">
//                                         <span>{address.room} | {address.address}</span>
//                                     </div>
//                                     <div className="mb-2">
//                                         <span>{address.city}, {address.state}, {address.country} - {address.pin}</span>
//                                     </div>
//                                     <div className="mb-2">
//                                         <span>Mobile Number: {address.phone}</span>
//                                     </div>
//                                     <div className="mb-2">
//                                         <span>Email Id: {address.email}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center mt-2">
//                                         <button
//                                             onClick={() => handleEditAddress(address)}
//                                             className="py-2 px-3 rounded-[5px] bg-red-200 font-semibold text-red-500"
//                                         >
//                                             CHANGE DELIVERY ADDRESS
//                                         </button>
//                                         <button
//                                             onClick={() => setSelectedAddress(address)}
//                                             className="py-2 px-3 rounded-[5px] bg-blue-500 text-white font-semibold"
//                                         >
//                                             Select
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="flex justify-end mt-4">
//                             <button
//                                 onClick={() => { setShowAddressForm(true); setIsEditing(false); }}
//                                 className="py-3 px-5 rounded-[10px] bg-red-200 font-semibold text-red-500 transition ease-in duration-200"
//                             >
//                                 <i className="fa fa-plus mr-2"></i>
//                                 ADD NEW DELIVERY ADDRESS
//                             </button>
//                         </div>
//                     </div>





//                     {showAddressForm && (
//                         <form onSubmit={handleAddressFormSubmit} className="w-full">
//                             <div className="grid grid-cols-2 gap-4 w-full mt-4 p-4 rounded-[5px]">
//                                 <input
//                                     type="text"
//                                     placeholder="Name"
//                                     value={newAddress.name}
//                                     onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Email Id"
//                                     value={newAddress.email}
//                                     onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Room"
//                                     value={newAddress.room}
//                                     onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Address"
//                                     value={newAddress.address}
//                                     onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="City"
//                                     value={newAddress.city}
//                                     onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="State"
//                                     value={newAddress.state}
//                                     onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Country"
//                                     value={newAddress.country}
//                                     onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="PIN"
//                                     value={newAddress.pin}
//                                     onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                                 <input
//                                     type="text"
//                                     placeholder="Phone"
//                                     value={newAddress.phone}
//                                     onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
//                                     required
//                                     className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
//                                 />
//                             </div>
//                             <div className="flex justify-end mt-4 p-4 gap-2">
//                                 <button type="submit" className="py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
//                                     {isEditing ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
//                                 </button>
//                                 <button onClick={() => setShowAddressForm(false)} type="button" className="py-3 px-5 rounded-[10px] bg-gray-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
//                                     DISCARD
//                                 </button>
//                             </div>
//                         </form>
//                     )}

//                     <h2 className="mt-5 text-lg font-semibold">Product Summary</h2>


//                     <div className="mt-5 bg-white flex flex-col md:flex-row items-center gap-4 rounded-[7px]">
//                         {/* Left Column: Product Image and Details */}
//                         <div className="mx-5 flex md:w-1/3 items-center">
//                             <div className="flex-shrink-0">
//                                 <Image src={product.image} alt={product.name} width={150} height={150} />
//                             </div>
//                             <div className="ml-4">
//                             <p className="text-gray-500 mt-1">{product.description}</p>

//                                 <h2 className="text-lg font-semibold">{product.name}</h2>
//                                 <p className="text-gray-500 mt-1">₹ {product.price.toLocaleString()}</p>
//                             </div>
//                         </div>

//                         {/* Center Column: Quantity Buttons */}
//                         <div className="flex flex-col items-center md:w-1/3">
//                             <div className="flex items-center">
//                                 <button
//                                     className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
//                                     onClick={() => handleQuantityChange(quantity - 1)}
//                                     disabled={quantity <= 1}
//                                 >
//                                     -
//                                 </button>
//                                 <span className="mx-2 bg-white w-[70px] border border-black h-8 flex items-center justify-center rounded">
//                                     {quantity}
//                                 </span>
//                                 <button
//                                     className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
//                                     onClick={() => handleQuantityChange(quantity + 1)}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Right Column: Price Details */}
//                         <div className="flex flex-col items-center md:w-1/3">
//                             <div className="flex flex-col items-end">
//                                 <p className="text-gray-500 line-through">₹ {product.originalPrice.toLocaleString()}</p>
//                                 <p className="text-gray-500 font-semibold mt-1">₹ {product.price.toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>






//                 </div>

//                 <div className="flex w-full h-[70px] rounded-[10px] bg-white justify-end">
//                     <button
//                         onClick={handlePlaceOrder}
//                         className="bg-blue-500 text-white mt-4 py-2 px-4 h-[40px] rounded-md w-half mr-2 max-w-xs"
//                     >
//                         Place Order ₹ {totalWithDiscount.toLocaleString()}
//                     </button>
//                 </div>

//             </div>



//             <div className="h-max lg:w-96 md:w-96 w-full flex-none flex flex-col mt-3 bg-gray-100 rounded-[5px] z-40">

//                 <div className="border-[1px] border-primary/30 rounded-[10px] bg-white">
//                     <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
//                         <span className="font-semibold text-md">Payment Summary</span>
//                     </div>
//                     <div className="flex flex-col py-4 border-b-[1px] border-primary/30">

//                         <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
//                             <span>Subtotal</span>
//                             <span>₹ {totalPrice.toLocaleString()}</span>
//                         </div>

//                         <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
//                             <span>GST (18%)</span>
//                             <span>₹ {gst.toLocaleString()}</span>
//                         </div>
//                         <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
//                             <span>Shipping</span>
//                             <span>₹ {shipping.toLocaleString()}</span>
//                         </div>
//                         {discount > 0 && (
//                             <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
//                                 <span>Discount</span>
//                                 <span>-₹ {discount.toLocaleString()}</span>
//                             </div>
//                         )}
//                         <div className="flex justify-between text-md font-semibold px-2 py-3">
//                             <span>Total</span>
//                             <span>₹ {finalPrice.toLocaleString()}</span>
//                         </div>
//                     </div>

//                     {/* <div className="border-[1px] border-primary/30 bg-white mt-6">
//                         <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
//                             <span className="font-semibold text-md">Apply Coupon</span>
//                         </div>
//                         <div className="flex flex-col py-4 px-3 border-b-[1px] border-primary/30">
//                             <div className="flex lg:flex-row md:flex-row flex-col gap-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Coupon Code"
//                                     value={coupon}
//                                     onChange={(e) => setCoupon(e.target.value)}
//                                     className="p-2 border-[1px] border-black/30 rounded-[5px] text-green-500"
//                                 />
//                                 <button
//                                     onClick={handleApplyCoupon}
//                                     className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
//                                 >
//                                     Apply
//                                 </button>
//                             </div>

//                             <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
//                                 <i className="fa fa-money-bill text-lg text-green"></i>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-md">DISCOUNT100</span>
//                                     <span className="font-normal text-sm">Flat Rs. 100 Off</span>
//                                 </div>
//                             </div>
//                             <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
//                                 <i className="fa fa-money-bill text-lg text-green"></i>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-md">DISCOUNT150</span>
//                                     <span className="font-normal text-sm">Flat Rs. 150 Off</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}

//                     <div className="rounded-[10px] bg-white mt-6">
//                         <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
//                             <span className="font-semibold text-md">2 More exciting offers are waiting for you</span>
//                         </div>
//                         <div className="flex flex-col py-4 px-3">
//                             <div className="flex lg:flex-row md:flex-row flex-col gap-2">
//                                 <div className="relative w-full">
//                                     <label
//                                         htmlFor="coupon"
//                                         className={`absolute left-2 -top-2 px-2 bg-white text-gray-500 transition-all ${coupon ? 'text-green-500' : 'text-gray-500'
//                                             }`}
//                                     >
//                                         Enter Coupon Code
//                                     </label>
//                                     <input
//                                         id="coupon"
//                                         type="text"
//                                         value={coupon}
//                                         onChange={(e) => setCoupon(e.target.value)}
//                                         className="w-full h-[50px] py-2 px-2 border-[1px] border-black/30 rounded-[5px] focus:outline-none"
//                                     />
//                                 </div>
//                                 <button
//                                     onClick={handleApplyCoupon}
//                                     className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
//                                 >
//                                     Apply
//                                 </button>
//                             </div>


//                             <div className="border-[2px] p-8 mt-2 border-green-500 border-dashed rounded-[10px] flex gap-2">
//                                 <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M11.7764 20.8698C11.7764 20.4948 11.6436 20.1745 11.3779 19.9088C11.1123 19.6432 10.792 19.5104 10.417 19.5104C10.042 19.5104 9.72168 19.6432 9.45605 19.9088C9.19043 20.1745 9.05762 20.4948 9.05762 20.8698H4.55762C4.30762 20.8698 4.09668 20.7799 3.9248 20.6003C3.75293 20.4206 3.66699 20.2057 3.66699 19.9557V5.56509C3.66699 5.31509 3.75293 5.10416 3.9248 4.93228C4.09668 4.76041 4.30762 4.67447 4.55762 4.67447H9.05762C9.05762 5.04947 9.19043 5.36588 9.45605 5.62369C9.72168 5.8815 10.042 6.01041 10.417 6.01041C10.792 6.01041 11.1123 5.8815 11.3779 5.62369C11.6436 5.36588 11.7764 5.04947 11.7764 4.67447H20.7764C21.0264 4.67447 21.2373 4.76041 21.4092 4.93228C21.5811 5.10416 21.667 5.31509 21.667 5.56509V10.5104C21.042 10.5104 20.5107 10.7292 20.0732 11.1667C19.6357 11.6042 19.417 12.1354 19.417 12.7604C19.417 13.3854 19.6357 13.9167 20.0732 14.3542C20.5107 14.7917 21.042 15.0104 21.667 15.0104V19.9557C21.667 20.2057 21.5811 20.4206 21.4092 20.6003C21.2373 20.7799 21.0264 20.8698 20.7764 20.8698H11.7764ZM10.417 11.4245C10.792 11.4245 11.1123 11.2917 11.3779 11.026C11.6436 10.7604 11.7764 10.4401 11.7764 10.0651C11.7764 9.69009 11.6436 9.36978 11.3779 9.10416C11.1123 8.83853 10.792 8.70572 10.417 8.70572C10.042 8.70572 9.72168 8.83853 9.45605 9.10416C9.19043 9.36978 9.05762 9.69009 9.05762 10.0651C9.05762 10.4401 9.19043 10.7604 9.45605 11.026C9.72168 11.2917 10.042 11.4245 10.417 11.4245ZM10.417 16.8151C10.792 16.8151 11.1123 16.6823 11.3779 16.4167C11.6436 16.151 11.7764 15.8307 11.7764 15.4557C11.7764 15.0963 11.6436 14.7838 11.3779 14.5182C11.1123 14.2526 10.792 14.1198 10.417 14.1198C10.042 14.1198 9.72168 14.2526 9.45605 14.5182C9.19043 14.7838 9.05762 15.0963 9.05762 15.4557C9.05762 15.8307 9.19043 16.151 9.45605 16.4167C9.72168 16.6823 10.042 16.8151 10.417 16.8151Z" fill="#0A7205" />
//                                 </svg>

//                                 <div className="flex flex-col mb-4 gap-1">
//                                     <span className="font-semibold text-md">DISCOUNT100</span>
//                                     <span className="font-normal text-sm">Flat Rs. 100 Off</span>
//                                 </div>
//                             </div>


//                             <div className="border-[2px] p-8 mt-2 border-green-500 border-dashed rounded-[10px] flex gap-2">
//                                 <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M11.7764 20.8698C11.7764 20.4948 11.6436 20.1745 11.3779 19.9088C11.1123 19.6432 10.792 19.5104 10.417 19.5104C10.042 19.5104 9.72168 19.6432 9.45605 19.9088C9.19043 20.1745 9.05762 20.4948 9.05762 20.8698H4.55762C4.30762 20.8698 4.09668 20.7799 3.9248 20.6003C3.75293 20.4206 3.66699 20.2057 3.66699 19.9557V5.56509C3.66699 5.31509 3.75293 5.10416 3.9248 4.93228C4.09668 4.76041 4.30762 4.67447 4.55762 4.67447H9.05762C9.05762 5.04947 9.19043 5.36588 9.45605 5.62369C9.72168 5.8815 10.042 6.01041 10.417 6.01041C10.792 6.01041 11.1123 5.8815 11.3779 5.62369C11.6436 5.36588 11.7764 5.04947 11.7764 4.67447H20.7764C21.0264 4.67447 21.2373 4.76041 21.4092 4.93228C21.5811 5.10416 21.667 5.31509 21.667 5.56509V10.5104C21.042 10.5104 20.5107 10.7292 20.0732 11.1667C19.6357 11.6042 19.417 12.1354 19.417 12.7604C19.417 13.3854 19.6357 13.9167 20.0732 14.3542C20.5107 14.7917 21.042 15.0104 21.667 15.0104V19.9557C21.667 20.2057 21.5811 20.4206 21.4092 20.6003C21.2373 20.7799 21.0264 20.8698 20.7764 20.8698H11.7764ZM10.417 11.4245C10.792 11.4245 11.1123 11.2917 11.3779 11.026C11.6436 10.7604 11.7764 10.4401 11.7764 10.0651C11.7764 9.69009 11.6436 9.36978 11.3779 9.10416C11.1123 8.83853 10.792 8.70572 10.417 8.70572C10.042 8.70572 9.72168 8.83853 9.45605 9.10416C9.19043 9.36978 9.05762 9.69009 9.05762 10.0651C9.05762 10.4401 9.19043 10.7604 9.45605 11.026C9.72168 11.2917 10.042 11.4245 10.417 11.4245ZM10.417 16.8151C10.792 16.8151 11.1123 16.6823 11.3779 16.4167C11.6436 16.151 11.7764 15.8307 11.7764 15.4557C11.7764 15.0963 11.6436 14.7838 11.3779 14.5182C11.1123 14.2526 10.792 14.1198 10.417 14.1198C10.042 14.1198 9.72168 14.2526 9.45605 14.5182C9.19043 14.7838 9.05762 15.0963 9.05762 15.4557C9.05762 15.8307 9.19043 16.151 9.45605 16.4167C9.72168 16.6823 10.042 16.8151 10.417 16.8151Z" fill="#0A7205" />
//                                 </svg>

//                                 <div className="flex flex-col mb-4 gap-1">
//                                     <span className="font-semibold text-md">DISCOUNT150</span>
//                                     <span className="font-normal text-sm">Flat Rs. 150 Off</span>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>

//                 </div>

//             </div>
//         </div>
//     );
// };
// export default Buynowhomepage;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface Address {
    _id?: string;
    name: string;
    email: string,
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


interface Coupon {
    _id: string;
    code: string;
    discount_text: string;
    discount: number;
}


const Buynowhomepage = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [coupon, setCoupon] = useState<string>("");

    const router = useRouter();
    const [requestGST, setRequestGST] = useState(false);

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [orderData, setOrderData] = useState<any>(null);

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [discount, setDiscount] = useState<number>(0);
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newAddress, setNewAddress] = useState<Address>({
        name: "",
        email: '',
        room: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pin: "",
        phone: "",
    });





    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('https://zoroz-backend.onrender.com/address');
                setAddresses(response.data);
                if (response.data.length > 0) {
                    setSelectedAddress(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    useEffect(() => {
        axios.get('https://zoroz-backend.onrender.com/getCoupons')
            .then(response => {
                console.log("Fetched Coupons:", response.data);

                // Assuming response.data is an object with a data property containing the coupons
                const couponsData = response.data.data || response.data;

                if (Array.isArray(couponsData)) {
                    setCoupons(couponsData);
                } else {
                    console.error("Data fetched is not an array:", couponsData);
                }
            })
            .catch((error) => {
                console.error("Error fetching coupons:", error);
            });
    }, []);





    const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = addresses.find((address) => address._id === event.target.value);
        setSelectedAddress(selected || null);
    };



    // useEffect(() => {
    //     const query = new URLSearchParams(window.location.search);
    //     const productData = query.get('product');
    //     if (productData) {
    //         setProduct(JSON.parse(decodeURIComponent(productData)));
    //     }
    // }, []);


    // Selecting size and color
    const selectProductSize = (size: string) => {
        setSelectedSize(size);
        console.log('Selected Size:', size);
    };

    const selectProductColor = (color: string) => {
        setSelectedColor(color);
        console.log('Selected Color:', color);
    };


    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const productData = query.get('product');

        if (productData) {
            try {
                const parsedProduct = JSON.parse(decodeURIComponent(productData));
                setProduct(parsedProduct);
                setSelectedSize(parsedProduct.selectedSize || '');
                setSelectedColor(parsedProduct.selectedColor || '');
                console.log('Parsed Product:', parsedProduct);
            } catch (error) {
                console.error('Error parsing product data:', error);
            }
        }
    }, []);



    if (!product) {
        return <div>Loading...</div>;
    }

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    const handleRemoveProduct = () => {
        setProduct(null);
    };

    // const coupons: { [key: string]: number } = {
    //     "DISCOUNT100": 100,
    //     "DISCOUNT150": 150,
    // };

    // const handleApplyCoupon = () => {
    //     if (coupons[coupon]) {
    //         setDiscount(coupons[coupon]);
    //     } else {
    //         alert("Invalid coupon code");
    //         setDiscount(0);
    //     }
    // };


    // const handleApplyCoupon = () => {
    //     const foundCoupon = coupons.find(c => c.code === coupon);
    //     if (foundCoupon) {
    //         alert(`Coupon applied: ${foundCoupon.discount_text}`);
    //     } else {
    //         alert("Invalid coupon code");
    //     }
    // };


    const handleApplyCoupon = () => {
        if (coupons.length === 0) {
            alert("No coupons available.");
            return;
        }

        const enteredCouponCode = coupon.trim();
        const selectedCoupon = coupons.find(coupon => coupon.code === enteredCouponCode);

        if (!selectedCoupon) {
            alert("Invalid coupon code.");
            return;
        }

        const discount = selectedCoupon.discount;
        alert(`Coupon applied: ${selectedCoupon.discount_text}. Discount: ₹${discount}`);
        setDiscount(discount);
    };

    const handleAddressFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            const response = await axios.put(`https://zoroz-backend.onrender.com/address/${newAddress._id}`, newAddress);
            setAddresses(addresses.map(addr => addr._id === response.data._id ? response.data : addr));
        } else {
            const response = await axios.post("https://zoroz-backend.onrender.com/address", newAddress);
            setAddresses([...addresses, response.data]);
        }
        setShowAddressForm(false);
        setIsEditing(false);
        setNewAddress({
            name: "",
            email: '',
            room: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pin: "",
            phone: "",
        });
    };

    const handleEditAddress = (address: Address) => {
        setNewAddress(address);
        setShowAddressForm(true);
        setIsEditing(true);
    };

    const totalPrice = (product.price * quantity) - discount;
    const gst = totalPrice * 0.18;
    const shipping = 50;
    const finalPrice = totalPrice + gst + shipping;
    const totalWithDiscount = totalPrice - discount;

    // const handlePlaceOrder = () => {
    //     if (selectedAddress) {
    //         console.log('Proceeding with address:', selectedAddress);
    //         const orderData = {
    //             cart: [product],
    //             addresses: [selectedAddress],
    //             discount,
    //             total: finalPrice,
    //             coupon
    //         };

    //         const encodedData = encodeURIComponent(JSON.stringify(orderData));
    //         router.push(`/BUYNOWconfirmation?data=${encodedData}`);
    //     } else {
    //         console.log('No address selected.');
    //     }
    // };




    const handlePlaceOrder = () => {
        if (selectedAddress && product) {
            console.log('Proceeding with address:', selectedAddress);
            console.log('Selected Size:', selectedSize);
            console.log('Selected Color:', selectedColor);
            const orderData = {
                cart: [{
                    ...product,
                    selectedSize,
                    selectedColor,
                    quantity
                }],
                addresses: [selectedAddress],
                discount,
                total: finalPrice,
                coupon
            };
            console.log('Order data:', orderData);

            const encodedData = encodeURIComponent(JSON.stringify(orderData));
            router.push(`/BUYNOWconfirmation?data=${encodedData}`);
        } else {
            console.log('No address selected or product not found.');
        }
    };



    return (
        <div className="w-full flex justify-center px-4 mt-6 bg-gray-100">
            <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col gap-4 relative bg-white-100 p-4 rounded-[5px]">
                <div className="mt-4">
                    <div className="w-full bg-white h-[70px] rounded-[10px] flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            id="requestGST"
                            checked={requestGST}
                            onChange={() => setRequestGST(!requestGST)}
                            className="ml-5 cursor-pointer"
                        />
                        <label htmlFor="requestGST" className="text-md font-medium">
                            Get GST Invoice
                        </label>
                    </div>
                    <h2 className="text-lg font-bold mb-4 mt-5">Delivery Address</h2>


                    <div className="bg-white p-4 rounded-[10px] shadow-md max-h-60 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`mb-4 p-4 rounded-[10px] border border-gray-200 ${selectedAddress?._id === address._id ? 'bg-gray-100' : ''}`}
                                >
                                    <div className="mb-2">
                                        <span className="font-semibold">{address.name}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>{address.room} | {address.address}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>{address.city}, {address.state}, {address.country} - {address.pin}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>Mobile Number: {address.phone}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span>Email Id: {address.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <button
                                            onClick={() => handleEditAddress(address)}
                                            className="py-2 px-3 rounded-[5px] bg-red-200 font-semibold text-red-500"
                                        >
                                            CHANGE DELIVERY ADDRESS
                                        </button>
                                        <button
                                            onClick={() => setSelectedAddress(address)}
                                            className="py-2 px-3 rounded-[5px] bg-blue-500 text-white font-semibold"
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => { setShowAddressForm(true); setIsEditing(false); }}
                                className="py-3 px-5 rounded-[10px] bg-red-200 font-semibold text-red-500 transition ease-in duration-200"
                            >
                                <i className="fa fa-plus mr-2"></i>
                                ADD NEW DELIVERY ADDRESS
                            </button>
                        </div>
                    </div>





                    {showAddressForm && (
                        <form onSubmit={handleAddressFormSubmit} className="w-full">
                            <div className="grid grid-cols-2 gap-4 w-full mt-4 p-4 rounded-[5px]">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Email Id"
                                    value={newAddress.email}
                                    onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Room"
                                    value={newAddress.room}
                                    onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    value={newAddress.country}
                                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="PIN"
                                    value={newAddress.pin}
                                    onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                    required
                                    className="rounded-[5px] focus:outline-none border-[1px] border-primary/30 w-full py-2 px-4 text-primary"
                                />
                            </div>
                            <div className="flex justify-end mt-4 p-4 gap-2">
                                <button type="submit" className="py-3 px-5 rounded-[10px] bg-blue-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
                                    {isEditing ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
                                </button>
                                <button onClick={() => setShowAddressForm(false)} type="button" className="py-3 px-5 rounded-[10px] bg-gray-500 font-semibold text-white border-[1px] border-primary hover:text-primary transition ease-in duration-2000">
                                    DISCARD
                                </button>
                            </div>
                        </form>
                    )}

                    <h2 className="mt-5 text-lg font-semibold">Product Summary</h2>


                    <div className="mt-5 bg-white flex flex-col md:flex-row items-center gap-4 rounded-[7px]">
                        {/* Left Column: Product Image and Details */}
                        <div className="mx-5 flex md:w-1/3 items-center">
                            <div className="flex-shrink-0">
                                <Image src={product.image} alt={product.name} width={150} height={150} />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-500 mt-1">{product.description}</p>

                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-500 mt-1">₹ {product.price.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Center Column: Quantity Buttons */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <div className="flex items-center">
                                <button
                                    className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="mx-2 bg-white w-[70px] border border-black h-8 flex items-center justify-center rounded">
                                    {quantity}
                                </span>
                                <button
                                    className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded"
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Price Details */}
                        <div className="flex flex-col items-center md:w-1/3">
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500 line-through">₹ {product.originalPrice.toLocaleString()}</p>
                                <p className="text-gray-500 font-semibold mt-1">₹ {product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>






                </div>

                <div className="flex w-full h-[70px] rounded-[10px] bg-white justify-end">
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-500 text-white mt-4 py-2 px-4 h-[40px] rounded-md w-half mr-2 max-w-xs"
                    >
                        Place Order ₹ {totalWithDiscount.toLocaleString()}
                    </button>
                </div>

            </div>



            <div className="h-max lg:w-96 md:w-96 w-full flex-none flex flex-col mt-3 bg-gray-100 rounded-[5px] z-40">

                <div className="border-[1px] border-primary/30 rounded-[10px] bg-white">
                    <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                        <span className="font-semibold text-md">Payment Summary</span>
                    </div>
                    <div className="flex flex-col py-4 border-b-[1px] border-primary/30">

                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>Subtotal</span>
                            <span>₹ {totalPrice.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>GST (18%)</span>
                            <span>₹ {gst.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                            <span>Shipping</span>
                            <span>₹ {shipping.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                                <span>Discount</span>
                                <span>-₹ {discount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-md font-semibold px-2 py-3">
                            <span>Total</span>
                            <span>₹ {finalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-md font-semibold px-2 py-3">
                            <span>Total</span>
                            <span>₹ {totalWithDiscount.toLocaleString()}</span>
                        </div>
                    </div>
                    
                    {/* <div className="border-[1px] border-primary/30 bg-white mt-6">
                        <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                            <span className="font-semibold text-md">Apply Coupon</span>
                        </div>
                        <div className="flex flex-col py-4 px-3 border-b-[1px] border-primary/30">
                            <div className="flex lg:flex-row md:flex-row flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter Coupon Code"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="p-2 border-[1px] border-black/30 rounded-[5px] text-green-500"
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
                                >
                                    Apply
                                </button>
                            </div>

                            <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
                                <i className="fa fa-money-bill text-lg text-green"></i>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-md">DISCOUNT100</span>
                                    <span className="font-normal text-sm">Flat Rs. 100 Off</span>
                                </div>
                            </div>
                            <div className="border-[2px] p-8 mt-2 border-green border-dashed rounded-[10px] flex gap-2">
                                <i className="fa fa-money-bill text-lg text-green"></i>
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-md">DISCOUNT150</span>
                                    <span className="font-normal text-sm">Flat Rs. 150 Off</span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="rounded-[10px] bg-white mt-6">
                        <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                            <span className="font-semibold text-md">2 More exciting offers are waiting for you</span>
                        </div>
                        <div className="flex flex-col py-4 px-3">
                            <div className="flex lg:flex-row md:flex-row flex-col gap-2">
                                <div className="relative w-full">
                                    <label
                                        htmlFor="coupon"
                                        className={`absolute left-2 -top-2 px-2 bg-white text-gray-500 transition-all ${coupon ? 'text-green-500' : 'text-gray-500'
                                            }`}
                                    >
                                        Enter Coupon Code
                                    </label>
                                    <input
                                        id="coupon"
                                        type="text"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        className="w-full h-[50px] py-2 px-2 border-[1px] border-black/30 rounded-[5px] focus:outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
                                >
                                    Apply
                                </button>
                            </div>


                            <div className="border-[2px] p-8 mt-2 border-green-500 border-dashed rounded-[10px] flex gap-2">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7764 20.8698C11.7764 20.4948 11.6436 20.1745 11.3779 19.9088C11.1123 19.6432 10.792 19.5104 10.417 19.5104C10.042 19.5104 9.72168 19.6432 9.45605 19.9088C9.19043 20.1745 9.05762 20.4948 9.05762 20.8698H4.55762C4.30762 20.8698 4.09668 20.7799 3.9248 20.6003C3.75293 20.4206 3.66699 20.2057 3.66699 19.9557V5.56509C3.66699 5.31509 3.75293 5.10416 3.9248 4.93228C4.09668 4.76041 4.30762 4.67447 4.55762 4.67447H9.05762C9.05762 5.04947 9.19043 5.36588 9.45605 5.62369C9.72168 5.8815 10.042 6.01041 10.417 6.01041C10.792 6.01041 11.1123 5.8815 11.3779 5.62369C11.6436 5.36588 11.7764 5.04947 11.7764 4.67447H20.7764C21.0264 4.67447 21.2373 4.76041 21.4092 4.93228C21.5811 5.10416 21.667 5.31509 21.667 5.56509V10.5104C21.042 10.5104 20.5107 10.7292 20.0732 11.1667C19.6357 11.6042 19.417 12.1354 19.417 12.7604C19.417 13.3854 19.6357 13.9167 20.0732 14.3542C20.5107 14.7917 21.042 15.0104 21.667 15.0104V19.9557C21.667 20.2057 21.5811 20.4206 21.4092 20.6003C21.2373 20.7799 21.0264 20.8698 20.7764 20.8698H11.7764ZM10.417 11.4245C10.792 11.4245 11.1123 11.2917 11.3779 11.026C11.6436 10.7604 11.7764 10.4401 11.7764 10.0651C11.7764 9.69009 11.6436 9.36978 11.3779 9.10416C11.1123 8.83853 10.792 8.70572 10.417 8.70572C10.042 8.70572 9.72168 8.83853 9.45605 9.10416C9.19043 9.36978 9.05762 9.69009 9.05762 10.0651C9.05762 10.4401 9.19043 10.7604 9.45605 11.026C9.72168 11.2917 10.042 11.4245 10.417 11.4245ZM10.417 16.8151C10.792 16.8151 11.1123 16.6823 11.3779 16.4167C11.6436 16.151 11.7764 15.8307 11.7764 15.4557C11.7764 15.0963 11.6436 14.7838 11.3779 14.5182C11.1123 14.2526 10.792 14.1198 10.417 14.1198C10.042 14.1198 9.72168 14.2526 9.45605 14.5182C9.19043 14.7838 9.05762 15.0963 9.05762 15.4557C9.05762 15.8307 9.19043 16.151 9.45605 16.4167C9.72168 16.6823 10.042 16.8151 10.417 16.8151Z" fill="#0A7205" />
                                </svg>

                                <div className="flex flex-col mb-4 gap-1">
                                    <span className="font-semibold text-md">DISCOUNT100</span>
                                    <span className="font-normal text-sm">Flat Rs. 100 Off</span>
                                </div>
                            </div>


                            <div className="border-[2px] p-8 mt-2 border-green-500 border-dashed rounded-[10px] flex gap-2">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7764 20.8698C11.7764 20.4948 11.6436 20.1745 11.3779 19.9088C11.1123 19.6432 10.792 19.5104 10.417 19.5104C10.042 19.5104 9.72168 19.6432 9.45605 19.9088C9.19043 20.1745 9.05762 20.4948 9.05762 20.8698H4.55762C4.30762 20.8698 4.09668 20.7799 3.9248 20.6003C3.75293 20.4206 3.66699 20.2057 3.66699 19.9557V5.56509C3.66699 5.31509 3.75293 5.10416 3.9248 4.93228C4.09668 4.76041 4.30762 4.67447 4.55762 4.67447H9.05762C9.05762 5.04947 9.19043 5.36588 9.45605 5.62369C9.72168 5.8815 10.042 6.01041 10.417 6.01041C10.792 6.01041 11.1123 5.8815 11.3779 5.62369C11.6436 5.36588 11.7764 5.04947 11.7764 4.67447H20.7764C21.0264 4.67447 21.2373 4.76041 21.4092 4.93228C21.5811 5.10416 21.667 5.31509 21.667 5.56509V10.5104C21.042 10.5104 20.5107 10.7292 20.0732 11.1667C19.6357 11.6042 19.417 12.1354 19.417 12.7604C19.417 13.3854 19.6357 13.9167 20.0732 14.3542C20.5107 14.7917 21.042 15.0104 21.667 15.0104V19.9557C21.667 20.2057 21.5811 20.4206 21.4092 20.6003C21.2373 20.7799 21.0264 20.8698 20.7764 20.8698H11.7764ZM10.417 11.4245C10.792 11.4245 11.1123 11.2917 11.3779 11.026C11.6436 10.7604 11.7764 10.4401 11.7764 10.0651C11.7764 9.69009 11.6436 9.36978 11.3779 9.10416C11.1123 8.83853 10.792 8.70572 10.417 8.70572C10.042 8.70572 9.72168 8.83853 9.45605 9.10416C9.19043 9.36978 9.05762 9.69009 9.05762 10.0651C9.05762 10.4401 9.19043 10.7604 9.45605 11.026C9.72168 11.2917 10.042 11.4245 10.417 11.4245ZM10.417 16.8151C10.792 16.8151 11.1123 16.6823 11.3779 16.4167C11.6436 16.151 11.7764 15.8307 11.7764 15.4557C11.7764 15.0963 11.6436 14.7838 11.3779 14.5182C11.1123 14.2526 10.792 14.1198 10.417 14.1198C10.042 14.1198 9.72168 14.2526 9.45605 14.5182C9.19043 14.7838 9.05762 15.0963 9.05762 15.4557C9.05762 15.8307 9.19043 16.151 9.45605 16.4167C9.72168 16.6823 10.042 16.8151 10.417 16.8151Z" fill="#0A7205" />
                                </svg>

                                <div className="flex flex-col mb-4 gap-1">
                                    <span className="font-semibold text-md">DISCOUNT150</span>
                                    <span className="font-normal text-sm">Flat Rs. 150 Off</span>
                                </div>
                            </div>

                        </div>
                    </div> */}

<div>
    <div className="rounded-[10px] bg-white mt-6">
        <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
            <span className="font-semibold text-md">2 More exciting offers are waiting for you</span>
        </div>
        <div className="flex flex-col py-4 px-3">
            <div className="flex lg:flex-row md:flex-row flex-col gap-2">
                <div className="relative w-full">
                    <label
                        htmlFor="coupon"
                        className={`absolute left-2 -top-2 px-2 bg-white text-gray-500 transition-all`}
                    >
                        Enter Coupon Code
                    </label>
                    <input
                        id="coupon"
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="w-full h-[50px] py-2 px-2 border-[1px] border-black/30 rounded-[5px] focus:outline-none"
                    />
                </div>
                <button
                    onClick={handleApplyCoupon}
                    className="py-2 px-4 rounded-[5px] bg-green-500 text-white font-semibold text-sm"
                >
                    Apply
                </button>
            </div>

            {coupons.length === 0 ? (
                <div>No coupons available.</div>
            ) : (
                coupons.map((coupon) => (
                    <div key={coupon._id} className="border-[2px] p-8 mt-2 border-green-500 border-dashed rounded-[10px] flex gap-2">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7764 20.8698C11.7764 20.4948 11.6436 20.1745 11.3779 19.9088C11.1123 19.6432 10.792 19.5104 10.417 19.5104C10.042 19.5104 9.72168 19.6432 9.45605 19.9088C9.19043 20.1745 9.05762 20.4948 9.05762 20.8698H4.55762C4.30762 20.8698 4.09668 20.7799 3.9248 20.6003C3.75293 20.4206 3.66699 20.2057 3.66699 19.9557V5.56509C3.66699 5.31509 3.75293 5.10416 3.9248 4.93228C4.09668 4.76041 4.30762 4.67447 4.55762 4.67447H9.05762C9.05762 5.04947 9.19043 5.36588 9.45605 5.62369C9.72168 5.8815 10.042 6.01041 10.417 6.01041C10.792 6.01041 11.1123 5.8815 11.3779 5.62369C11.6436 5.36588 11.7764 5.04947 11.7764 4.67447H20.7764C21.0264 4.67447 21.2373 4.76041 21.4092 4.93228C21.5811 5.10416 21.667 5.31509 21.667 5.56509V10.5104C21.042 10.5104 20.5107 10.7292 20.0732 11.1667C19.6357 11.6042 19.417 12.1354 19.417 12.7604C19.417 13.3854 19.6357 13.9167 20.0732 14.3542C20.5107 14.7917 21.042 15.0104 21.667 15.0104V19.9557C21.667 20.2057 21.5811 20.4206 21.4092 20.6003C21.2373 20.7799 21.0264 20.8698 20.7764 20.8698H11.7764ZM10.417 11.4245C10.792 11.4245 11.1123 11.2917 11.3779 11.026C11.6436 10.7604 11.7764 10.4401 11.7764 10.0651C11.7764 9.69009 11.6436 9.36978 11.3779 9.10416C11.1123 8.83853 10.792 8.70572 10.417 8.70572C10.042 8.70572 9.72168 8.83853 9.45605 9.10416C9.19043 9.36978 9.05762 9.69009 9.05762 10.0651C9.05762 10.4401 9.19043 10.7604 9.45605 11.026C9.72168 11.2917 10.042 11.4245 10.417 11.4245ZM10.417 16.8151C10.792 16.8151 11.1123 16.6823 11.3779 16.4167C11.6436 16.151 11.7764 15.8307 11.7764 15.4557C11.7764 15.0963 11.6436 14.7838 11.3779 14.5182C11.1123 14.2526 10.792 14.1198 10.417 14.1198C10.042 14.1198 9.72168 14.2526 9.45605 14.5182C9.19043 14.7838 9.05762 15.0963 9.05762 15.4557C9.05762 15.8307 9.19043 16.151 9.45605 16.4167C9.72168 16.6823 10.042 16.8151 10.417 16.8151Z" fill="#0A7205" />
                        </svg>
                        <div className="flex flex-col mb-4 gap-1">
                            <span className="font-semibold text-md">{coupon.code}</span>
                            <span className="font-normal text-sm">{coupon.discount_text}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
</div>

                </div>

            </div>
        </div>
    );
};
export default Buynowhomepage;


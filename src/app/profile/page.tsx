// "use client";

// import React, { useState } from "react";

// import {
//   FaStar,
//   FaCartPlus,
//   FaUserCircle,
//   FaFile,
//   FaShoppingBag,
//   FaHeart,
//   FaPlus,
//   FaChevronRight
// } from "react-icons/fa";

// import { FiMapPin } from "react-icons/fi";
// import Image from "next/image";
// import OrderList from "../Orderlist/page";
// import CartPage from "../CartPage";
// import MyWishlist from "../Mywishlist/page";
// import axios from "axios";
// import BusinessDetailsForm from "../BusinessDetailsForm/page";
// import AddressForm from "../AddressForm/page";

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

// const Profile: React.FC = () => {
//   const [activeSection, setActiveSection] = useState<string>("profile");
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [breadcrumb, setBreadcrumb] = useState<string>("Profile");
//   const [showForm, setShowForm] = useState(false);

//   const [newAddress, setNewAddress] = useState<Address>({
//     name: "",
//     email: "",
//     room: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     pin: "",
//     phone: "",
//   });
//   const handleSectionClick = (section: string, breadcrumbText: string) => {
//     setActiveSection(section);
//     setBreadcrumb(`Profile > ${breadcrumbText}`);
//   };

//   const handleButtonClick = () => {
//     setShowForm(!showForm);
//   };


//   const handleAddressFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isEditing) {
//       const response = await axios.put(
//         `http://localhost:8080/address/${newAddress._id}`,
//         newAddress
//       );
//       setAddresses(
//         addresses.map((addr) =>
//           addr._id === response.data._id ? response.data : addr
//         )
//       );
//     } else {
//       const response = await axios.post(
//         "http://localhost:8080/address",
//         newAddress
//       );
//       setAddresses([...addresses, response.data]);
//     }
//     setIsEditing(false);
//     setNewAddress({
//       name: "",
//       email: "",
//       room: "",
//       address: "",
//       city: "",
//       state: "",
//       country: "",
//       pin: "",
//       phone: "",
//     });
//   };

//   const handleEditAddress = (address: Address) => {
//     setNewAddress(address);
//     setIsEditing(true);
//   };

//   const [formData, setFormData] = useState({
//     gstNumber: "",
//     businessName: "",
//     businessPhone: "",
//     businessEmail: "",
//     address: "",
//     pinCode: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleBusinessDetailsFormSubmit: React.FormEventHandler<
//     HTMLFormElement
//   > = (e) => {
//     e.preventDefault();
//   };

//   const handleBreadcrumbClick = (part: string) => {
//     switch (part) {
//       case 'Profile':
//         setActiveSection('profile');
//         setBreadcrumb('Profile');
//         break;
//       case 'My Address':
//         setActiveSection('address');
//         setBreadcrumb('Profile > My Address');
//         break;
//       case 'My Orders':
//         setActiveSection('orders');
//         setBreadcrumb('Profile > My Orders');
//         break;
//       case 'My Business Details':
//         setActiveSection('business');
//         setBreadcrumb('Profile > My Business Details');
//         break;
//       case 'My Wishlist':
//         setActiveSection('wishlist');
//         setBreadcrumb('Profile > My Wishlist');
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="w-full bg-gray-100 flex justify-center px-4 mt-6">
//       <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative mt-9 mb-9">
//         {/* Sidebar Section */}
//         <div className="h-max lg:w-64 md:w-64 w-full flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
//           {/* Breadcrumb */}
//           <div className="w-full px-4 bg-gray-100 rounded-[10px] overflow-hidden">

//             <span className="text-md hover:text-red-400 font-medium flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
//               {breadcrumb.split(" > ").map((part, index, array) => (
//                 <React.Fragment key={index}>
//                   <span
//                     className={`cursor-pointer ${index === array.length - 1 ? 'font-semibold' : 'text-red-600'}`}
//                     onClick={() => handleBreadcrumbClick(part)}
//                   >
//                     {part}
//                   </span>

//                   {index < array.length - 1 && (
//                     <FaChevronRight className="mx-1 text-gray-400" />
//                   )}
//                 </React.Fragment>
//               ))}
//             </span>
//           </div>
//           {/* User Info Section */}

//           <div className="w-full p-4 bg-red-600 text-white flex gap-4 items-center rounded-[10px]">
//             <FaUserCircle className="text-4xl" />
//             <div className="flex flex-col">
//               <span className="text-xs">Name</span>
//               <button
//                 onClick={() => handleSectionClick("profile", "Profile")}
//                 className={`w-full py-4 ${activeSection === "profile" ? "text-red-200" : "text-black"
//                   } hover:text-red-200 flex items-center gap-4 transition ease-in duration-2000`}
//               >
//                 <span className="text-md text-white font-semibold">
//                   User Name
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Menu Items Section */}
//           <div className="w-full px-4 bg-white rounded-[10px]">
//             <button
//               onClick={() => handleSectionClick("address", "My Address")}
//               className={`w-full py-4 border-b-[1px] ${activeSection === "address" ? "text-red-500" : "text-black"
//                 } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
//             >
//               <FiMapPin className="text-2xl" />
//               <span className="text-md font-medium">My Address</span>
//             </button>
//             <button
//               onClick={() => handleSectionClick("orders", "My Orders")}
//               className={`w-full py-4 border-b-[1px] ${activeSection === "orders" ? "text-red-500" : "text-black"
//                 } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
//             >
//               <FaFile className="text-2xl" />
//               <span className="text-md font-medium">My Orders</span>
//             </button>
//             <button
//               onClick={() =>
//                 handleSectionClick("business", "My Business Details")
//               }
//               className={`w-full py-4 border-b-[1px] ${activeSection === "business" ? "text-red-500" : "text-black"
//                 } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
//             >
//               <FaShoppingBag className="text-2xl" />
//               <span className="text-md font-medium">My Business Details</span>
//             </button>
//             <button
//               onClick={() => handleSectionClick("wishlist", "My Wishlist")}
//               className={`w-full py-4 ${activeSection === "wishlist" ? "text-red-500" : "text-black"
//                 } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
//             >
//               <FaHeart className="text-2xl" />
//               <span className="text-md font-medium">My Wishlist</span>
//             </button>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="w-full mt-9 grow">
//           {activeSection === "profile" && (
//             <div className="w-full bg-white p-4 rounded-[10px]">
//               <div className="flex flex-col gap-4">
//                 <span className="text-xl font-semibold">My Profile</span>
//                 <div className="flex gap-4 items-center">
//                   <input
//                     type="tel"
//                     placeholder="Mobile Number"
//                     value={newAddress.phone}
//                     disabled
//                     className="border border-gray-300 p-2 rounded w-half bg-gray-100 text-gray-500 cursor-not-allowed"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-4 mt-4">
//                   {/* Delivery Address Section */}
//                   <div className="flex justify-between items-center">
//                     <span className="text-md font-medium">
//                       Delivery Address
//                     </span>
//                     <button
//                       onClick={handleButtonClick}
//                       className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1"
//                     >
//                       <FaPlus />
//                       <span>Add New Delivery Address</span>
//                     </button>
//                   </div>

//                   {/* Billing Address Section */}
//                   <div className="flex justify-between items-center">
//                     <span className="text-md font-medium">Billing Address</span>
//                     <button onClick={handleButtonClick} className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1">
//                       <FaPlus />
//                       <span>Add New Billing Address</span>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     onClick={() => alert("Logged Out")}
//                     className="bg-red-600 text-white py-2 px-4 rounded"
//                   >
//                     Logout
//                   </button>
//                 </div>
//                 {showForm && (
//                   <AddressForm
//                     newAddress={newAddress}
//                     setNewAddress={setNewAddress}
//                     handleAddressFormSubmit={handleAddressFormSubmit}
//                     isEditing={isEditing}
//                     handleCancel={() => setShowForm(false)}
//                   />
//                 )}
//               </div>
//             </div>
//           )}

//           {activeSection === "wishlist" && (
//             <div className="w-full bg-white p-4 rounded-[10px]">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-md">My Wishlist</span>
//               </div>
//               <MyWishlist />
//             </div>
//           )}

//           {activeSection === "orders" && (
//             <div className="w-full bg-white p-4 rounded-[10px]">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-md">My Orders</span>
//               </div>
//               <OrderList />
//             </div>
//           )}

//           {activeSection === "address" && (
//             <div className="w-full bg-white p-4 rounded-[10px]">
//               <div className="flex justify-between items-center">
//                 <span className="font-semibold text-md">My Address</span>
//               </div>
//               <AddressForm
//                 newAddress={newAddress}
//                 setNewAddress={setNewAddress}
//                 handleAddressFormSubmit={handleAddressFormSubmit}
//                 isEditing={isEditing}
//                 handleCancel={() => setShowForm(false)}
//               />
//             </div>
//           )}

//           {activeSection === "business" && (
//             <div className="w-full bg-white p-4 rounded-[10px] shadow-md">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="font-semibold text-md">
//                   My Business Details
//                 </span>
//               </div>
//               <BusinessDetailsForm
//                 formData={formData}
//                 handleChange={handleChange}
//                 handleBusinessDetailsFormSubmit={handleBusinessDetailsFormSubmit}
//               />
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  FaStar,
  FaCartPlus,
  FaUserCircle,
  FaFile,
  FaShoppingBag,
  FaHeart,
  FaPlus,
  FaChevronRight
} from "react-icons/fa";

import { FiMapPin } from "react-icons/fi";
import Image from "next/image";
import OrderList from "../Orderlist/page";
import CartPage from "../CartPage";
import MyWishlist from "../Mywishlist/page";
import axios from "axios";

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

const Profile: React.FC = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<string>("profile");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [breadcrumb, setBreadcrumb] = useState<string>("Profile");
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState<Address>({
    name: "",
    email: "",
    room: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    phone: "",
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    
    if (hash) {
      setActiveSection(hash);
      setBreadcrumb(`Profile > ${hash === "orders" ? "My Orders" : hash}`);
    }
  }, []);

  const handleSectionClick = (section: string, breadcrumbText: string) => {
    setActiveSection(section);
    window.history.replaceState(null, '', `?section=#${section}`);
    setBreadcrumb(`Profile > ${breadcrumbText}`);
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleAddressFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const response = await axios.put(
        `http://localhost:8080/address/${newAddress._id}`,
        newAddress
      );
      setAddresses(
        addresses.map((addr) =>
          addr._id === response.data._id ? response.data : addr
        )
      );
    } else {
      const response = await axios.post(
        "http://localhost:8080/address",
        newAddress
      );
      setAddresses([...addresses, response.data]);
    }
    setIsEditing(false);
    setNewAddress({
      name: "",
      email: "",
      room: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin: "",
      phone: "",
    });
    setShowForm(false); 
  };

  const handleEditAddress = (address: Address) => {
    setNewAddress(address);
    setIsEditing(true);
    setShowForm(true); 
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewAddress({
      name: "",
      email: "",
      room: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pin: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const [formData, setFormData] = useState({
    gstNumber: "",
    businessName: "",
    businessPhone: "",
    businessEmail: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessDetailsFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Handle business details submission
  };

  const handleBreadcrumbClick = (part: string) => {
    switch (part) {
      case 'Profile':
        setActiveSection('profile');
        setBreadcrumb('Profile');
        break;
      case 'My Address':
        setActiveSection('address');
        setBreadcrumb('Profile > My Address');
        break;
      case 'My Orders':
        setActiveSection('orders');
        setBreadcrumb('Profile > My Orders');
        break;
      case 'My Business Details':
        setActiveSection('business');
        setBreadcrumb('Profile > My Business Details');
        break;
      case 'My Wishlist':
        setActiveSection('wishlist');
        setBreadcrumb('Profile > My Wishlist');
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative mt-9 mb-9">
        {/* Sidebar Section */}
        <div className="h-max lg:w-64 md:w-64 w-full flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">
          {/* Breadcrumb */}
          <div className="w-full px-4 bg-gray-100 rounded-[10px] overflow-hidden">
            <span className="text-md hover:text-red-400 font-medium flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
              {breadcrumb.split(" > ").map((part, index, array) => (
                <React.Fragment key={index}>
                  <span
                    className={`cursor-pointer ${index === array.length - 1 ? 'font-semibold' : 'text-red-600'}`}
                    onClick={() => handleBreadcrumbClick(part)}
                  >
                    {part}
                  </span>
                  {index < array.length - 1 && (
                    <FaChevronRight className="mx-1 text-gray-400" />
                  )}
                </React.Fragment>
              ))}
            </span>
          </div>
          {/* User Info Section */}
          <div className="w-full p-4 bg-red-600 text-white flex gap-4 items-center rounded-[10px]">
            <FaUserCircle className="text-4xl" />
            <div className="flex flex-col">
              <span className="text-xs">Name</span>
              <button
                onClick={() => handleSectionClick("profile", "Profile")}
                className={`w-full py-4 ${activeSection === "profile" ? "text-red-200" : "text-black"
                  } hover:text-red-200 flex items-center gap-4 transition ease-in duration-2000`}
              >
                <span className="text-md text-white font-semibold">
                  User Name
                </span>
              </button>
            </div>
          </div>
          {/* Menu Items Section */}
          <div className="w-full px-4 bg-white rounded-[10px]">
            <button
              onClick={() => handleSectionClick("address", "My Address")}
              className={`w-full py-4 border-b-[1px] ${activeSection === "address" ? "text-red-500" : "text-black"
                } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FiMapPin className="text-2xl" />
              <span className="text-md font-medium">My Address</span>
            </button>
            <button
              onClick={() => handleSectionClick("orders", "My Orders")}
              className={`w-full py-4 border-b-[1px] ${activeSection === "orders" ? "text-red-500" : "text-black"
                } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaFile className="text-2xl" />
              <span className="text-md font-medium">My Orders</span>
            </button>
            <button
              onClick={() =>
                handleSectionClick("business", "My Business Details")
              }
              className={`w-full py-4 border-b-[1px] ${activeSection === "business" ? "text-red-500" : "text-black"
                } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaShoppingBag className="text-2xl" />
              <span className="text-md font-medium">My Business Details</span>
            </button>
            <button
              onClick={() => handleSectionClick("wishlist", "My Wishlist")}
              className={`w-full py-4 ${activeSection === "wishlist" ? "text-red-500" : "text-black"
                } hover:text-red-500 flex items-center gap-4 transition ease-in duration-2000`}
            >
              <FaHeart className="text-2xl" />
              <span className="text-md font-medium">My Wishlist</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full mt-9 grow">
          {activeSection === "profile" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex flex-col gap-4">
                <span className="text-xl font-semibold">My Profile</span>
                <div className="flex gap-4 items-center">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={newAddress.phone}
                    disabled
                    className="border border-gray-300 p-2 rounded w-half bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  {/* Delivery Address Section */}
                  <div className="flex justify-between items-center">
                    <span className="text-md font-medium">Delivery Address</span>
                    <button
                      onClick={handleButtonClick}
                      className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1"
                    >
                      <FaPlus />
                      <span>Add New Delivery Address</span>
                    </button>
                  </div>
                  {/* Billing Address Section */}
                  <div className="flex justify-between items-center">
                    <span className="text-md font-medium">Billing Address</span>
                    <button
                      onClick={handleButtonClick}
                      className="bg-red-200 text-red-600 py-1 px-2 rounded flex items-center gap-1"
                    >
                      <FaPlus />
                      <span>Add New Billing Address</span>
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => alert("Logged Out")}
                    className="bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </div>
                {showForm && (
                  <form
                    onSubmit={handleAddressFormSubmit}
                    className="bg-white p-4 rounded shadow-md"
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      {isEditing ? "Edit Address" : "Add Address"}
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newAddress.email}
                        onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                        required
                      />
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                        required
                      />
                      <input
                        type="text"
                        name="room"
                        placeholder="Room"
                        value={newAddress.room}
                        onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <input
                        type="text"
                        name="pin"
                        placeholder="Pin Code"
                        value={newAddress.pin}
                        onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
                        className="border border-gray-300 p-2 rounded"
                      />
                    </div>
                    <div className="mt-4 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-4 rounded"
                      >
                        {isEditing ? "Update Address" : "Add Address"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeSection === "wishlist" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Wishlist</span>
              </div>
              <MyWishlist />
            </div>
          )}

          {activeSection === "orders" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Orders</span>
              </div>
              <OrderList />
            </div>
          )}

          {activeSection === "address" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-md">My Address</span>
              </div>
              <form
                onSubmit={handleAddressFormSubmit}
                className="bg-white p-4 rounded shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {isEditing ? "Edit Address" : "Add Address"}
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newAddress.email}
                    onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="room"
                    placeholder="Room"
                    value={newAddress.room}
                    onChange={(e) => setNewAddress({ ...newAddress, room: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="text"
                    name="pin"
                    placeholder="Pin Code"
                    value={newAddress.pin}
                    onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white py-2 px-4 rounded"
                  >
                    {isEditing ? "Update Address" : "Add Address"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* {activeSection === "business" && (
            <div className="w-full bg-white p-4 rounded-[10px] shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-md">My Business Details</span>
              </div>
              <BusinessDetailsForm
                formData={formData}
                handleChange={handleChange}
                handleBusinessDetailsFormSubmit={handleBusinessDetailsFormSubmit}
              />
            </div>
          )} */}

{activeSection === "business" && (
            <div className="w-full bg-white p-4 rounded-[10px]">
              <span className="text-xl font-semibold">My Business Details</span>
              <form onSubmit={handleBusinessDetailsFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Enter GST No.</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      placeholder="GST Number"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Business Name"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Business Phone</label>
                    <input
                      type="tel"
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleChange}
                      placeholder="Business Phone"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Business Email ID</label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      placeholder="Business Email ID"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">Pin Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      placeholder="Pin Code"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium">City/District/Town</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City/District/Town"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative flex flex-col">
                    <label className="text-sm font-medium">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                  <div className="relative flex flex-col">
                    <label className="text-sm font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="border border-gray-300 p-2 rounded"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Profile;

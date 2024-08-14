// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import {
//   FaBars,
//   FaSearch,
//   FaTruck,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaUser,
//   FaArrowDown,
//   FaChevronDown
// } from 'react-icons/fa';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

// const Header: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const pathname = usePathname();
//   const isHomepage = pathname === '/';
//   const handleMouseEnter = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <header className="w-full bg-white flex justify-center px-4 shadow-lg shadow-black/10">
//       <div className="lg:w-[90%] md:w-[90%] w-full bg-white flex justify-between py-4 relative">
//         <div
//           id="modalCategories"
//           className={`fixed top-16 left-0 w-80 bg-white shadow-lg rounded-lg transition-transform transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
//           style={{ maxHeight: '80vh', overflowY: 'auto' }}
//         >
//           <div className="p-4">
//             <Link
//               href="#"
//               className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//             >
//               <Image
//                 className="h-12 w-12"
//                 src="/assets/images/mobile.png"
//                 alt="Mobile Display Screens"
//                 width={48}
//                 height={48}
//               />
//               <span className="text-lg font-bold">Mobile Display Screens</span>
//             </Link>
//             <Link
//               href="#"
//               className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//             >
//               <Image
//                 className="h-12 w-12"
//                 src="/assets/images/mobilea.png"
//                 alt="Mobile Accessories"
//                 width={48}
//                 height={48}
//               />
//               <span className="text-lg font-bold">Mobile Accessories</span>
//             </Link>
//             <Link
//               href="#"
//               className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//             >
//               <Image
//                 className="h-12 w-12"
//                 src="/assets/images/mobiles.png"
//                 alt="Mobile Spare Parts"
//                 width={48}
//                 height={48}
//               />
//               <span className="text-lg font-bold">Mobile Spare Parts</span>
//             </Link>
//             <Link
//               href="#"
//               className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000"
//             >
//               <Image
//                 className="h-12 w-12"
//                 src="/assets/images/mobilet.png"
//                 alt="Mobile Tool Kits"
//                 width={48}
//                 height={48}
//               />
//               <span className="text-lg font-bold">Mobile Tool Kits</span>
//             </Link>
//             <Link
//               href="/category"
//               className="flex gap-2 items-center text-red-400 transition ease-in duration-2000"
//             >
//               <Image
//                 className="h-12 w-12"
//                 src="/assets/images/mobilea.png"
//                 alt="View All Categories"
//                 width={48}
//                 height={48}
//               />
//               <span className="text-lg font-semibold">View All Categories</span>
//             </Link>
//           </div>
//         </div>

//         <div className="h-full flex items-center gap-4 lg:w-[60%]">
//           <div className="relative group" onClick={handleMouseEnter}>
//             {!isHomepage && (
//               <div className="text-2xl cursor-pointer hover:scale-110">
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M3 4.00781H21V6H3V4.00781ZM3 10.9922H15V13.0078H3V10.9922ZM3 18H21V19.9922H3V18Z"
//                     fill="#D9232D"
//                   />
//                 </svg>
//               </div>
//             )}
//           </div>
//           <img
//             className="lg:w-36 md:w-36 sm:w-36 w-32 h-auto"
//             src="/assets/images/zlogo.png"
//             alt=""
//           />
//           <div className="h-full w-full lg:flex hidden lg:w-[600px] ml-6">
//             <input
//               type="text"
//               className="w-full h-full border-[1px] border-primary rounded-l-md px-4 py-2 focus:outline-none text-primary text-sm"
//               placeholder="Search Product, Category, Brands....."
//             />
//             <button className="bg-gray-500 text-white h-full px-4 rounded-r-md border-[1px] border-primary flex items-center justify-center">
//               <FaSearch className="text-white text-lg" />
//             </button>
//           </div>
//         </div>

//         <div className="h-full flex items-center lg:gap-8 md:gap-8">
//           <a href="">
//             <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaUser className="text-lg text-primary" />
//               <span className="text-sm font-medium">Login</span>
//               <FaChevronDown className="text-md text-primary" />
//             </div>
//           </a>

//           <a href="/profile?section=orders">
//             <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaTruck className="text-lg text-primary" />
//               <span className="text-sm font-medium">Track Orders</span>
//             </div>
//           </a>
//           <a href="/cart">
//             <div className="flex items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
//               <FaShoppingCart className="text-lg text-primary" />
//               <span className="text-sm font-medium">Cart</span>
//             </div>
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;




'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  FaBars,
  FaSearch,
  FaTruck,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaChevronDown
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const handleMouseEnter = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="w-full bg-white flex justify-center px-4 shadow-lg shadow-black/10">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-white flex justify-between py-4 relative">
        <div
          id="modalCategories"
          className={`fixed top-16 left-0 w-80 bg-white shadow-lg rounded-lg transition-transform transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
          style={{ maxHeight: '80vh', overflowY: 'auto' }}
        >
          <div className="p-4">
            <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
              <Image className="h-12 w-12" src="/assets/images/mobile.png" alt="Mobile Display Screens" width={48} height={48} />
              <span className="text-lg font-bold">Mobile Display Screens</span>
            </Link>
            <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
              <Image className="h-12 w-12" src="/assets/images/mobilea.png" alt="Mobile Accessories" width={48} height={48} />
              <span className="text-lg font-bold">Mobile Accessories</span>
            </Link>
            <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
              <Image className="h-12 w-12" src="/assets/images/mobiles.png" alt="Mobile Spare Parts" width={48} height={48} />
              <span className="text-lg font-bold">Mobile Spare Parts</span>
            </Link>
            <Link href="#" className="flex gap-2 items-center hover:text-primary transition ease-in duration-2000">
              <Image className="h-12 w-12" src="/assets/images/mobilet.png" alt="Mobile Tool Kits" width={48} height={48} />
              <span className="text-lg font-bold">Mobile Tool Kits</span>
            </Link>
            <Link href="/category" className="flex gap-2 items-center text-red-400 transition ease-in duration-2000">
              <Image className="h-12 w-12" src="/assets/images/mobilea.png" alt="View All Categories" width={48} height={48} />
              <span className="text-lg font-semibold">View All Categories</span>
            </Link>
          </div>
        </div>

        <div className="h-full flex items-center gap-4 lg:w-[60%]">
          <div className="relative group" onClick={handleMouseEnter}>
            {!isHomepage && (
              <div className="text-2xl cursor-pointer hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.00781H21V6H3V4.00781ZM3 10.9922H15V13.0078H3V10.9922ZM3 18H21V19.9922H3V18Z" fill="#D9232D" />
                </svg>
              </div>
            )}
          </div>
          <img className="lg:w-36 md:w-36 sm:w-36 w-32 h-auto" src="/assets/images/zlogo.png" alt="" />
          <div className="hidden lg:flex lg:w-[600px] ml-6">
            <input type="text" className="w-full h-full border-[1px] border-primary rounded-l-md px-4 py-2 focus:outline-none text-primary text-sm" placeholder="Search Product, Category, Brands....." />
            <button className="bg-gray-500 text-white h-full px-4 rounded-r-md border-[1px] border-primary flex items-center justify-center">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>

        <div className="h-full flex items-center lg:gap-8 md:gap-8">
          <div
            className="relative flex items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000"
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <FaUser className="text-lg text-primary" />
            <span className="text-sm font-medium">Login</span>
            <FaChevronDown className="text-md text-primary" />
            {isDropdownOpen && (
              <div className="absolute right-[100px] mt-[200px] w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                <Link href="/profile#address" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Address</Link>
                <Link href="/profile#orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                <Link href="/profile#business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Business Details</Link>
                <Link href="/profile#wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Wishlist</Link>
                <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</Link>
              </div>
            )}
          </div>
          
          <a href="/profile#orders">
            <div className="lg:flex md:flex hidden items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
              <FaTruck className="text-lg text-primary" />
              <span className="text-sm font-medium">Track Orders</span>
            </div>
          </a>
          <a href="/cart">
            <div className="flex items-center gap-2 border-b-[1px] border-white hover:border-primary transition ease-in duration-2000">
              <FaShoppingCart className="text-lg text-primary" />
              <span className="text-sm font-medium">Cart</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

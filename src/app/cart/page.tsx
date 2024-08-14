"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";


import {
  FaTrash,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaFile,
  FaCreditCard,
  FaHeadphones,
  FaQuestionCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaThumbsDown,
  FaPlus,
  FaMinus,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import { useRouter } from "next/navigation";
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rating: number;
  reviewCount: number;
  description: string;
  brand: string;
  originalPrice: number;
  discountPercentage: number;
  category?: string;
  stock?: number;
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
}

interface NewReview {
  name: string;
  rating: number;
  comment: string;
}
const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [showSizes, setShowSizes] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<{ [productId: string]: Review[] }>({});
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    rating: 0,
    comment: "",
  });
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const router = useRouter();

  const coupons: { [key: string]: number } = {
    DISCOUNT100: 100,
    DISCOUNT150: 150,
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Calculate shipping cost based on cart
    const getTotalPriceWithoutExtras = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const totalPrice = getTotalPriceWithoutExtras();
    setShipping(totalPrice * 0.02);
  }, [cart]);

  const handleQuantityChange = (productId: string, action: "increase" | "decrease") => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        return {
          ...item,
          quantity: action === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleApplyCoupon = () => {
    if (coupons[coupon]) {
      setDiscount(coupons[coupon]);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const getTotalPrice = () => {
    const getTotalPriceWithoutExtras = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const totalPrice = getTotalPriceWithoutExtras();
    const gstRate = 0.18;
    const gstAmount = totalPrice * gstRate;
    const totalWithGst = totalPrice + gstAmount;
    const totalWithShipping = totalWithGst + shipping;
    const totalWithDiscount = totalWithShipping - discount;
    return {
      totalPrice,
      gstAmount,
      totalWithGst,
      totalWithShipping,
      totalWithDiscount,
    };
  };

  const handleSelectSizeClick = () => setShowSizes(!showSizes);
  const handleSelectColorClick = () => setShowColors(!showColors);
  const handleSelectSavingsClick = () => setShowSavings(!showSavings);
  const handleReviewsClick = () => setShowReviews(!showReviews);
  const handleBenefitsClick = () => setShowBenefits(!showBenefits);
  const handlePolicyClick = () => setShowPolicy(!showPolicy);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} className="text-yellow-500" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />);
    }

    return stars;
  };

  useEffect(() => {
    const fetchReviews = async (productId: string) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reviews/${productId}`);
        setReviews((prev) => ({ ...prev, [productId]: response.data }));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    cart.forEach((item) => fetchReviews(item._id));
  }, [cart]);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentProductId) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/reviews/${currentProductId}`,
          newReview
        );
        setReviews((prev) => ({
          ...prev,
          [currentProductId]: [
            ...(prev[currentProductId] || []),
            response.data,
          ],
        }));
        setNewReview({ name: "", rating: 0, comment: "" });
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleTogglePriceDetails = () => {
    setShowPriceDetails(!showPriceDetails);
  };

  const {
    totalPrice,
    gstAmount,
    totalWithGst,
    totalWithShipping,
    totalWithDiscount,
  } = getTotalPrice();

  const handleProductClick = (product: Product) => {
    const productString = JSON.stringify(product);
    const encodedProduct = encodeURIComponent(productString);
    const couponQuery = coupon ? `&coupon=${coupon}` : "";
    router.push(`/cartproductdetailspage?product=${encodedProduct}${couponQuery}`);
  };

  const handleCheckout = () => {
    const cartString = JSON.stringify(cart);
    const encodedCart = encodeURIComponent(cartString);
    console.log("Encoded Cart: ", encodedCart);
    const couponQuery = coupon ? `&coupon=${coupon}` : "";
    router.push(`/checkout?cart=${encodedCart}${couponQuery}`);
  };


  const handleCheckoutComplete = (purchasedItems: Product[]) => {
    // Remove purchased items from the cart
    const remainingItems = cart.filter(item => !purchasedItems.some(purchasedItem => purchasedItem._id === item._id));
    setCart(remainingItems);
    localStorage.setItem("cart", JSON.stringify(remainingItems));
  };

  return (
    <div className="w-full flex bg-gray-100 justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row mb-7 md:flex-row flex-col gap-4 relative">
        {cart.length === 0 ? (
          <div className="w-full mt-5 p-4 rounded-[10px] flex flex-col items-center">
            <Image
              src="/assets/images/ecart.png"
              alt="Empty Cart"
              width={240}  
              height={240} 
              className="h-[240px] w-[240px] mb-4"
            />
            <p>Your cart is currently empty.</p>
            <p>Add products and proceed.</p>
            <Link href="/category">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full mt-5 p-4 rounded-[10px] flex flex-col">
              <div className="flex flex-col justify-between h-[80px] mr-5 border border-green-500 rounded-[7px] bg-white mb-4 p-4">
                <span className="font-semibold text-md text-green-600">
                  <span className="mr-1 ml-6">₹</span>WOW! You got EXTRA ₹150.00 OFF
                </span>
                <span className="ml-6 font-semibold text-md mt-2">
                  By paying online via UPI, EMI, Credit/Debit Card, Net Banking, Wallets
                </span>
              </div>
              <div className="flex justify-between h-[40px] mr-5 rounded-[7px] bg-white mb-4 items-center">
                <span className="ml-4 font-semibold text-md">My Cart</span>
              </div>
              <div className="flex justify-between h-[40px] mr-5 rounded-[7px] bg-white mb-4 items-center">
                <span className="ml-4 font-semibold text-md">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
                </span>
              </div>
              <div className="relative flex flex-col space-y-4 mr-5">
                {cart.map((item) => (
                  <div key={item._id} className="flex bg-white p-4 rounded-[5px]">
                    <div onClick={() => handleProductClick(item)} className="cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-auto h-auto object-cover rounded-[5px]"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm text-black mt-2">
                        {item.description || "No Description"}
                      </p>
                      <h2 className="text-lg font-semibold text-black">
                        {item.name}
                      </h2>

                      <div className="flex">
                        <p className="text-gray-500">
                          ₹ {item.price != null ? Number(item.price).toLocaleString() : '0'}
                        </p>
                        <p className="text-xs mt-1 ml-2 text-black/50 line-through">
                          ₹ {item.originalPrice ? item.originalPrice.toLocaleString() : "N/A"}
                        </p>
                        {/* <button
                      onClick={() => handleShowReviews(item._id)}
                      className="ml-3 border-[1px] border-primary/80 text-primary bg-primary/20 w-[200px] h-[20px] flex items-center justify-center rounded-[5px] font-semibold text-md mt-2"
                    >
                      {showReviews && selectedProductId === item._id ? "Hide Reviews" : "Show Reviews"}
                    </button> */}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="mt-3 bg-red-500 text-white p-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="mr-[170px] space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, "decrease")}
                        className="bg-gray-200 p-2 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, "increase")}
                        className="bg-gray-200 p-2 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="flex justify-between text-md font-semibold px-2 py-3">
                      <span className="flex flex-col">
                        ₹ {item.price != null ? Number(item.price).toLocaleString() : '0'}
                        <span className="text-sm font-normal">Price Details</span>
                      </span>
                      <span className="flex items-center mt-[-60px] cursor-pointer" onClick={handleTogglePriceDetails}>
                        {showPriceDetails ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </div>
                    {showPriceDetails && (
                      <div className="pl-4 text-sm text-gray-600">
                        <div>Base Price: ₹ {item.price}</div>
                        <div>GST (18%): ₹ {(item.price * 0.18).toLocaleString()}</div>
                        <div>Shipping: ₹ {100}</div>
                        <div>Total: ₹ {(item.price * 1.18 + 100).toLocaleString()}</div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 bg-white flex justify-end items-center rounded-[7px] h-[90px]">
                  <button
                    className="bg-red-600 mr-4 text-white py-2 px-4 rounded-[10px]"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <h2 className="flex justify-start text-lg font-semibold">
                      ₹ {totalWithDiscount.toLocaleString()}
                    </h2>
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full mt-9 lg:w-96 md:w-96 flex-none flex flex-col mb-6 rounded-[10px] z-40">
              <div className="border-[1px] border-primary/30 rounded-[10px] bg-white">
                <div className="bg-green-100 rounded-[10px] text-green-500 p-2">
                  <span className="font-semibold text-sm">
                    Save instantly ₹ 150.00 with online payment
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                  <span className="font-semibold text-md">Payment Summary</span>
                </div>
                <div className="flex flex-col py-4 border-b-[1px] border-primary/30">
                  <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                    <span>Total Amount </span>
                    <span>₹ {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                    <span>Total GST(18%)</span>
                    <span>₹ {gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                    <span>Total Shipping (2%)</span>
                    <span>₹ {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-md font-normal text-lightText px-2 py-0.5">
                    <span>Total Coupon Discount</span>
                    <span>₹ {discount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex justify-between text-md font-semibold px-2 py-3">
                  <span>Amount Payable</span>
                  <span>₹ {totalWithDiscount.toLocaleString()}</span>
                </div>
              </div>
              <div className="border-[1px] border-primary/30 bg-white rounded-[10px] mt-6">
                <div className="flex justify-between items-center py-4 px-2 border-b-[1px] border-primary/30">
                  <span className="font-semibold text-md">Apply Coupon</span>
                </div>
                <div className="flex flex-col py-4 px-3 border-b-[1px] border-gray-300">
                  <div className="flex border-gray-300 lg:flex-row md:flex-row flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="p-2 border-[1px] border-gray-400 rounded-[5px] text-primary"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="py-2 px-4 rounded-[5px] bg-black/10 text-black font-semibold text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  <div className="mt-9 border-[2px] p-8 mt-2 border-green-600 border-dashed rounded-[10px] flex gap-2">
                    <i className="fa fa-money-bill text-lg text-green"></i>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-md">DISCOUNT100</span>
                      <span className="font-normal text-sm">Flat Rs. 100 Off</span>
                    </div>
                  </div>
                  <div className="border-[2px] p-8 mt-2 border-green-600 border-dashed rounded-[10px] flex gap-2">
                    <i className="fa fa-money-bill text-lg text-green"></i>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-md">DISCOUNT50</span>
                      <span className="font-normal text-sm">Flat Rs. 50 Off</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-md font-semibold px-2 py-3">
                  <span>You saved </span>
                  <span className="text-green-600">
                    ₹ {discount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>

  );
};

export default CartPage;


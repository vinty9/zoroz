"use client";
import { useRef } from "react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronRight,
  FaLocationArrow,
  FaMinus,
  FaStar,
  FaCartPlus,
  FaHeart,
} from "react-icons/fa";
import "./globals.css";
import { useRouter } from "next/navigation";
import axios from "axios";

const backendUrl = "https://zoroz-backend.onrender.com";

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

interface SubCategory {
  name: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
  sub_categories: SubCategory[];
}


type Brand = {
  _id: string;
  name: string;
  image: string;
};


const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]); // Corrected type for brands

  const slides = [
    "/assets/images/banner.png",
    "/assets/images/banner.png",
    "/assets/images/banner.png",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://zoroz-backend.onrender.com/categories/getCategories');
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setCategories(result.data);
        } else {
          console.error("Fetched data is not an array:", result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     try {
  //       const response = await axios.get('https://zoroz-backend.onrender.com/categories/getBrands');
  //       const fetchedBrands = response.data.data; // Extract the brands array from the data property
  
  //       // Check if fetchedBrands is an array before setting it
  //       if (Array.isArray(fetchedBrands)) {
  //         setBrands(fetchedBrands);
  //       } else {
  //         console.error('Fetched brands data is not an array:', fetchedBrands);
  //         setBrands([]);  // Set to an empty array to avoid errors
  //       }
  //     } catch (error) {
  //       console.error('Error fetching brands:', error);
  //       setBrands([]);  // Set to an empty array to avoid errors
  //     }
  //   };
  
  //   fetchBrands();
  // }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://zoroz-backend.onrender.com/categories/getBrands'); // Adjust this URL based on your actual API route
        const result = await response.json();
  
        if (result.success) {
          setBrands(result.data);
        } else {
          console.error('Failed to fetch brands:', result.msg);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching brands:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };
  
    fetchBrands();
  }, []);
  
  


  const handleCategoryClick = async (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSubCategories([]);
      return;
    }

    try {
      const encodedCategoryName = encodeURIComponent(categoryName);
      const response = await fetch(`https://zoroz-backend.onrender.com/categories/getSubCategories/${encodedCategoryName}`);

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setSubCategories(result.data);
          setSelectedCategory(categoryName);
        } else {
          console.error("Error fetching subcategories:", result.msg);
        }
      } else {
        console.error("Error fetching subcategories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };


  const handleSubCategoryClick = (subCategoryName: string) => {
    // setSelectedSubCategory(subCategoryName);
    // router.push(`/category/${subCategoryName}`); // Navigate to product page based on subcategory
  };


  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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

  // const handleBuyNow = (product: Product) => {
  //   const productQueryString = encodeURIComponent(JSON.stringify(product));
  //   router.push(`/Buynowhomepage?product=${productQueryString}`);
  // };

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/product?product=${productQueryString}`);
  };

  // const handleAddToWishlist = (product: Product) => {
  //   const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  //   if (!wishlist.find((item: Product) => item._id === product._id)) {
  //     wishlist.push(product);
  //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
  //     alert("Product added to wishlist!");
  //   }
  // };


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



  return (
    <div className="w-full justify-center px-4 mt-6">
      <div className="ml-[60px] lg:w-[90%] md:w-[90%] w-full flex flex-col lg:flex-row gap-4 relative">



        <div
          id="sideCategories"
          className="h-max shadow-lg w-80 bg-white flex-none lg:static absolute top-0 left-0 flex-col lg:gap-4 md:gap-4 gap-2 lg:py-12 md:py-12 py-4 px-4 lg:rounded-[20px] md:rounded-[20px] rounded-[5px] z-40 lg:flex md:flex hidden"
        >
          {categories.map((category) => (
            <div key={category._id}>
              <div
                onClick={() => handleCategoryClick(category.name)}
                className={`flex gap-2 items-center cursor-pointer hover:text-primary transition ease-in duration-2000 ${selectedCategory === category.name ? 'text-primary' : ''}`}
              >
                <img
                  className="h-12 w-12"
                  src={category.sub_categories[0]?.image || '/default-image.png'}
                  alt={category.name}
                  width={48}
                  height={48}
                />
                <span className="text-lg font-bold">{category.name}</span>
              </div>

              {selectedCategory === category.name && (
                <div className="pl-4">
                  {subCategories.map((subCategory) => (
                    <div
                      key={subCategory.name}
                      onClick={() => handleSubCategoryClick(subCategory.name)}
                      className="flex gap-2 items-center cursor-pointer hover:text-primary transition ease-in duration-2000"
                    >
                      <img
                        className="h-12 w-12"
                        src={subCategory.image}
                        alt={subCategory.name}
                        width={48}
                        height={48}
                      />
                      <span className="text-lg font-bold">{subCategory.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>



        <div className="w-full grow relative">
          <div className="slider-container overflow-hidden relative">
            <div
              className="slider-wrapper flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((src, index) => (
                <div className="slider-slide w-full flex-shrink-0" key={index}>
                  <Image
                    className="w-full lg:h-80 md:h-80 sm:h-64 h-40 lg:rounded-t-[20px] md:rounded-t-[20px] rounded-[5px]"
                    src={src}
                    alt={`Banner ${index + 1}`}
                    width={800}
                    height={320}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={goToPrevSlide}
            >
              <FaChevronRight className="text-gray-600" />
            </button>
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
              onClick={goToNextSlide}
            >
              <FaChevronRight className="text-gray-600 rotate-180" />
            </button>
          </div>

          <div className="hidden lg:grid md:grid grid-cols-5 gap-2 bg-white mt-4">
            <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-primary">SINGHAL</span>
              <span className="text-xs">Up to 20% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-b-[2px] border-primary h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-primary">KORES</span>
              <span className="text-xs">Up to 60% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">CANDES</span>
              <span className="text-xs">Up to 65% OFF</span>
            </div>
            <div className="w-full border-r-[1px] border-black h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">VINSPIRE</span>
              <span className="text-xs">Up to 60% OFF</span>
            </div>
            <div className="w-full h-20 flex flex-col items-center justify-center">
              <span className="text-md font-bold text-black">SMARTEN</span>
              <span className="text-xs">Up to 500 OFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="relative lg:w-[90%] md:w-[90%] h-28 px-2 md:px-4 flex items-center w-full gap-4 bg-white overflow-hidden rounded-[5px]">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &lt;
          </button>

          <div
            className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-4 py-2"
            ref={sliderRef}
          >
            {[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="inline-block bg-white px-4 py-9 rounded-[5px] w-full max-w-xs"
              >
                <div className="h-24 w-24 rounded-full border-[1px] border-black/20 text-black shadow-lg shadow-black/10 mt-6 inline-block">
                  <Image
                    className="h-24 w-24 rounded-full"
                    src={`/assets/images/image${index}.png`}
                    alt={`Image ${index}`}
                    width={96}
                    height={96}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div> */}

      <div className="w-full flex justify-center px-2 md:px-4 mt-9">
        <div className="relative lg:w-[90%] md:w-[90%] h-28 px-2 md:px-4 flex items-center w-full gap-4 bg-white overflow-hidden rounded-[5px]">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &lt;
          </button>

          <div
            className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-4 py-2"
            ref={sliderRef}
          >
            {Array.isArray(brands) && brands.length > 0 ? (
              brands.map((brand) => (
                <div
                  key={brand._id}
                  className="inline-block bg-white px-4 py-9 rounded-[5px] w-full max-w-xs"
                >
                  <div className="h-24 w-24 rounded-full border-[1px] border-black/20 text-black shadow-lg shadow-black/10 mt-6 inline-block">
                    <Image
                      className="h-24 w-24 rounded-full"
                      src={brand.image}
                      alt={brand.name}
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No brands available</p>
            )}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            &gt;
          </button>
        </div>
      </div>


      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              BEST SELLERS
            </span>
            <Link href="/category" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
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
                    ₹ {product.originalPrice ? product.originalPrice.toLocaleString() : "N/A"}
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


      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              MOBILE DISPLAY SCREENS
            </span>
            <Link href="/category" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
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



      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              MOBILE ACCESSORIES
            </span>
            <Link href="/category" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
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


      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              MOBILE SPARE PARTS
            </span>
            <Link href="/category" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
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





      <div className="w-full flex justify-center px-2 md:px-4 mt-9 ">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col bg-white p-4 rounded-[5px] gap-4 relative">
          <div className="w-full flex items-center justify-between">
            <span className="text-md font-semibold text-primary">
              MOBILE TOOL KITS
            </span>
            <Link href="/category" className="text-sm flex gap-2 items-center">
              View All <FaChevronRight />
            </Link>
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


      <div className="w-full flex justify-center px-4 mt-4">
        <div className="lg:w-[90%] md:w-[90%] w-full flex flex-col shadow-lg bg-white p-4 rounded-[5px] relative">
          <h3 className="font-bold text-lg text-black/80">
            ZOROZ - Your Trusted B2B Partner for Mobile Products.
          </h3>
          <p className="font-medium text-sm text-black/80 mt-1">
            ZOROZ is committed to streamlining the procurement of industrial products, ensuring a hassle-free online buying experience. Our platform aims to help you save on supplies, enhance inventory management efficiency, and sustain growth. We make B2B and B2C procurement smooth and time-saving.
          </p>
          <h3 className="font-bold text-lg text-black/80 mt-3">
            Shop from Our Wide Range of Products.
          </h3>
          <p className="font-medium text-sm text-black/80 mt-3">
            ZOROZ offers over 20,000 SKUs across four main categories:
          </p>
          <ol className="mt-4 flex flex-col gap-2 list-disc">
            <li className="flex items-center">
              <span className="font-bold text-lg text-black/80">
                Mobile Accessories:
                <span className="font-medium text-sm text-black/80 mt-3">
                  From chargers to cases, find all essential mobile accessories to keep your devices running smoothly.
                </span>
              </span>
            </li>
            <li className="flex items-center">
              <span className="font-bold text-lg text-black/80">
                Mobile Tool Kits:
                <span className="font-medium text-sm text-black/80 mt-3">
                  Equip yourself with comprehensive tool kits designed specifically for mobile device repair and servicing.
                </span>
              </span>
            </li>
            <li className="flex items-center">
              <span className="font-bold text-lg text-black/80">
                Mobile Spare Parts:
                <span className="font-medium text-sm text-black/80 mt-3">
                  Source high-quality spare parts for mobile phones to ensure seamless repairs and maintenance.
                </span>
              </span>
            </li>
            <li className="flex items-center">
              <span className="font-bold text-lg text-black/80">
                Solar Lighting and Essentials:
                <span className="font-medium text-sm text-black/80 mt-3">
                  Explore a variety of solar products, lighting solutions, and essential utilities for both personal and business use.
                </span>
              </span>
            </li>
          </ol>

          <h3 className="font-bold text-lg text-black/80 mt-6">
            Purchase Online with Confidence
          </h3>
          <p className="font-medium text-sm text-black/80 mt-1">
            Navigate our user-friendly site to find detailed information on our products. We ensure timely delivery across over 25,000 pin codes in India through our reliable logistics partners. All products undergo rigorous quality checks and comply with ISI standards. Experience seamless and efficient online procurement with ZOROZ. Choose from our extensive product range and find the perfect solutions for your needs.
          </p>

          <h3 className="font-bold text-lg text-black/80 mt-6">
            Popular searches on Zoroz
          </h3>
          <div className="mt-4 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
            <div className="w-full flex flex-col gap-2">
              <div className="bg-black/10 py-0.5 px-2 w-max rounded-[5px]">
                <span className="font-semibold text-sm">Mobile Display Screens</span>
              </div>
              <div className="w-full flex flex-wrap gap-1">
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Display Screens</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Touch Screen</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">LCD</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="bg-black/10 py-0.5 px-2 w-max rounded-[5px]">
                <span className="font-semibold text-sm">Mobile Accessories</span>
              </div>
              <div className="w-full flex flex-wrap gap-1">
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Battery</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Charger</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Case & Covers</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Tempered Glass</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Power Bank</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Selfie Stick</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">IP Camera</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Data Card</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8">
            <div className="w-full flex flex-col gap-2">
              <div className="bg-black/10 py-0.5 px-2 w-max rounded-[5px]">
                <span className="font-semibold text-sm">Mobile Tool Kit</span>
              </div>
              <div className="w-full flex flex-wrap gap-1">
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Tape</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Opening Tool Set</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Sim Cutter</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">BGA Kit</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Glue</span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="bg-black/10 py-0.5 px-2 w-max rounded-[5px]">
                <span className="font-semibold text-sm">Solar Lighting and Essentials</span>
              </div>
              <div className="w-full flex flex-wrap gap-1">
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Face Mask</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Indoor LED Lighting</span>
                <span className="font-normal text-xs border-r-[1px] border-black pr-2">Solar Panels</span>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg text-black/80 mt-6">
            Popular brands on Zoroz
          </h3>
          <div className="w-full flex flex-wrap gap-4 mt-2">
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Samsung</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Realme</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">LAVA</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">I Ball</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Huawai</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">ITEL</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">ACER</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">LG</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Apple</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Vivo</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Google</span>
            </div>
            <div className="bg-black/10 py-1 px-8 w-max rounded-[5px]">
              <span className="font-semibold text-sm">Oppo</span>
            </div>
          </div>
        </div>
      </div>






    </div>
  );
};

export default Homepage;

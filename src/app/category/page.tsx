"use client"
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaChevronRight, FaLocationArrow, FaMinus, FaStar, FaCartPlus } from "react-icons/fa";
import axios from "axios";
import { useRouter } from 'next/navigation';


interface Product {
  _id?: number;
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

interface Brand {
  _id: string;
  name: string;
  categories: string[];
  sub_categories: string[];
  image: string;
  total_products: number;
}


type PriceRange = [number, number];


const CategoryComponent = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showInStock, setShowInStock] = useState<boolean>(false);
  const [searchBrand, setSearchBrand] = useState<string>("");
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        console.log('Fetched products:', response.data);

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex((item: Product) => item._id === product._id);

    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const handleBuyNow = (product: Product) => {
    const productQueryString = encodeURIComponent(JSON.stringify(product));
    router.push(`/product?product=${productQueryString}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };



  const handlePriceChange = (range: PriceRange) => {
    if (selectedPriceRanges.some(r => r[0] === range[0] && r[1] === range[1])) {
      setSelectedPriceRanges(prevRanges => prevRanges.filter(r => !(r[0] === range[0] && r[1] === range[1])));
    } else {
      setSelectedPriceRanges(prevRanges => [...prevRanges, range]);
    }
  };

  const priceRanges: PriceRange[] = [
    [0, 500],
    [500, 1000],
    [1000, 2500],
    [2500, 5000],
    [5000, 10000],
    [10000, Infinity]
  ];


  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };


  const handleSearchBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBrand(event.target.value);
  };

  const handleInStockChange = () => {
    setShowInStock(!showInStock);
  };



  const filteredProducts = products.filter(product => {
    let isValid = true;

    if (selectedCategory && product.category !== selectedCategory) {
      isValid = false;
    }

    if (selectedPriceRanges.length > 0) {
      const inRange = selectedPriceRanges.some(([min, max]) => product.price >= min && product.price <= max);
      if (!inRange) {
        isValid = false;
      }
    }

    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      isValid = false;
    }

    if (selectedRating && product.rating < selectedRating) {
      isValid = false;
    }

    if (showInStock && product.stock === 0) {
      isValid = false;
    }

    return isValid;
  });

  const handleAddToWishlist = (product: Product) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingProduct = wishlist.find(
      (item: Product) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      alert("Product already exists in wishlist. Quantity updated!");
    } else {
      wishlist.push({ ...product, quantity: 1 });
      alert("Product added to wishlist!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories/getCategories');
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

  useEffect(() => {
    // Fetch brands from the backend API
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories/getBrands');
        console.log('brand fetched');
        if (response.data.success) {
          setBrands(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
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
      const response = await fetch(`http://localhost:8080/categories/getSubCategories/${encodedCategoryName}`);

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

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div className="lg:w-[90%] md:w-[90%] w-full flex lg:flex-row md:flex-row flex-col gap-4 relative">
        <div className="h-max lg:w-80 md:w-80 w-full bg-white flex-none flex flex-col lg:gap-4 md:gap-4 gap-2 rounded-[5px] z-40">


          {/* Category Filter */}
          {/* <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Category</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center" onClick={() => handleCategoryChange("Mobile Tool Kits")}>
                  <FaChevronRight className="mr-2" />
                  <span className="font-medium text-md">Mobile Tool Kits</span>
                </Link>
                <span className="font-medium text-md">(1)</span>
              </div>
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center" onClick={() => handleCategoryChange("Mobile Display Screens")}>
                  <FaChevronRight className="mr-2" />
                  <span className="font-medium text-md">Mobile Display Screens</span>
                </Link>
                <span className="font-medium text-md">(1)</span>
              </div>
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center" onClick={() => handleCategoryChange("Mobile Spare Parts")}>
                  <FaChevronRight className="mr-2" />
                  <span className="font-medium text-md">Mobile Spare Parts</span>
                </Link>
                <span className="font-medium text-md">(1)</span>
              </div>
              <div className="flex justify-between items-center">
                <Link href="#" className="flex items-center" onClick={() => handleCategoryChange("Accessories")}>
                  <FaChevronRight className="mr-2" />
                  <span className="font-medium text-md">Accessories</span>
                </Link>
                <span className="font-medium text-md">(1)</span>
              </div>
            </div>
          </div> */}

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
                  {/* No image, so removed the img tag */}
                  <FaChevronRight className="mr-2" />

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
                        {/* No image, so removed the img tag */}
                        <span className="text-lg font-bold">{subCategory.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>



          {/* Price Filter */}
          {/* <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Price</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {[
                [0, 500],
                [500, 1000],
                [1000, 2500],
                [2500, 5000],
                [5000, 10000],
                [10000, Infinity]
              ].map(range => (
                <div className="flex justify-between items-center" key={range[1]}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handlePriceChange(range)}
                      checked={selectedPriceRanges.some(r => r[0] === range[0] && r[1] === range[1])}
                    />
                    <span className="font-medium text-md">
                      ₹{range[0]} - ₹{range[1] === Infinity ? "10000+" : range[1]}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Price</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {priceRanges.map((range: PriceRange) => (
                <div className="flex justify-between items-center" key={range[1]}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handlePriceChange(range)}
                      checked={selectedPriceRanges.some(r => r[0] === range[0] && r[1] === range[1])}
                    />
                    <span className="font-medium text-md">
                      ₹{range[0]} - ₹{range[1] === Infinity ? "10000+" : range[1]}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>


          {/* Brands Filter */}
          {/* <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Brands</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                className="w-full rounded-[5px] border-[1px] border-primary/30 px-4 py-2"
                placeholder="Search....."
                value={searchBrand}
                onChange={handleSearchBrandChange}
              />
              {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'].filter(brand => brand.toLowerCase().includes(searchBrand.toLowerCase())).map(brand => (
                <div className="flex justify-between items-center" key={brand}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleBrandChange(brand)}
                      checked={selectedBrands.includes(brand)}
                    />
                    <span className="font-medium text-md">{brand}</span>
                  </label>
                </div>
              ))}
            </div>
          </div> */}

          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Brands</span>
              {/* Add an icon here if needed */}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                className="w-full rounded-[5px] border-[1px] border-primary/30 px-4 py-2"
                placeholder="Search....."
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
              />
              {brands.filter(brand => brand.name.toLowerCase().includes(searchBrand.toLowerCase())).map((brand: Brand) => (
                <div className="flex justify-between items-center" key={brand.name}>
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={() => handleBrandChange(brand.name)}
                      checked={selectedBrands.includes(brand.name)}
                    />
                    <span className="font-medium text-md">{brand.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Rating</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {[1, 2, 3, 4, 5].map(rating => (
                <div className="flex justify-between items-center" key={rating}>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      className="mr-2"
                      onChange={() => handleRatingChange(rating)}
                      checked={selectedRating === rating}
                    />
                    <span className="font-medium text-md">
                      {rating} <FaStar className="inline text-[10px]" />
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="w-full flex flex-col gap-2 border-b-[1px] border-primary/30 py-6 px-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-md">Availability</span>
              <FaMinus className="text-md" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={handleInStockChange}
                    checked={showInStock}
                  />
                  <span className="font-medium text-md">Show in stock only</span>
                </label>
              </div>
            </div>
          </div>



        </div>

        {/* Main Content */}
        <div className="w-full grow">
          <div className="w-full flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">RECENTLY VIEWED</span>
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-2 justify-between lg:items-center">
            <span className="text-sm font-normal">Showing 40 out of 273 Products</span>
            <div className="flex lg:flex-row md:flex-row flex-col gap-4">
              <div className="bg-white flex items-center gap-2 w-max">
                <FaLocationArrow />
                <span className="text-sm font-semibold">Delivering to - 700086</span>
                <span className="text-sm font-bold text-primary">Change</span>
              </div>
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-black/60">Sort By: </span>
                <select
                  name=""
                  id=""
                  className="px-6 py-1 rounded-[5px] border-[1px] border-secondary shadow-md shadow-black/5"
                >
                  <option value="">Popularity</option>
                </select>
              </div>
            </div>
          </div>




          {/* Product Grid */}
          <div className="w-full bg-secondary rounded-[5px] p-4 border border-gray-700">
            <div className="relative flex overflow-x-auto space-x-4 pb-2">
              <ul className="flex space-x-4">
                {filteredProducts.map((product) => (
                  <li key={product._id} className="inline-block bg-white px-4 py-8 rounded-[5px] w-full max-w-xs">
                    <div className="flex justify-start">
                      <a href="#">
                        <Image
                          className="w-auto h-40 object-cover"
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={160}
                        />
                      </a>
                    </div>
                    <div className="flex mt-2 gap-2">
                      <button className="bg-green-500 text-white font-bold text-xs px-1 rounded-[3px] flex items-center gap-1">
                        {product.rating} <FaStar className="text-[10px]" />
                      </button>
                      <span className="text-[13px] text-black/70">({product.reviewCount} Reviews)</span>
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="top-10 right-0 h-8 w-8 border-[1px] flex justify-center items-center border-primary/30 shadow-lg shadow-black/10"

                      >
                        <FaHeart className="text-red-500 text-lg" />
                      </button>
                    </div>
                    <div className="flex mt-2 gap-2">
                      <a href="#">
                        <span className="text-[17px] font-medium text-black/70">
                          {product.name}
                        </span>
                      </a>
                    </div>
                    <div className="flex mt-1 gap-2">
                      <span className="text-[14px] font-semibold text-black/50">By: {product.brand}</span>
                    </div>
                    <div className="flex mt-3 gap-2">
                      <span className="text-2xl font-bold text-black">₹ {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-black/50 line-through">
                        ₹ {product.originalPrice ? product.originalPrice.toLocaleString() : 'N/A'}
                      </span>
                      <span className="text-[16px] font-bold text-green">{product.discountPercentage}% OFF</span>
                    </div>
                    <div className="flex justify-between mt-3 gap-2">
                      <button
                        className="py-3 px-5 rounded-[10px] bg-blue-500 text-white border-[1px] border-blue-500 hover:bg-white hover:text-blue-500 transition ease-in duration-2000"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaCartPlus className="text-[25px]" />
                      </button>

                      <button onClick={() => handleBuyNow(product)} className="py-3 px-5 rounded-[10px] bg-red-500 font-semibold text-white border-[1px] border-red-500 hover:bg-white hover:text-red-500 transition ease-in duration-2000">
                        BUY NOW
                      </button>

                    </div>
                  </li>
                ))}
              </ul>
              <button type="button" className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &lt;
              </button>
              <button type="button" className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &gt;
              </button>
            </div>
          </div>


        </div>


      </div>
    </div>
  );
};

export default CategoryComponent;











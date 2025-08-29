import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  };

  const sortProducts = (items) => {
    let sorted = [...items];
    if (sortOption === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const applyFilter = () => {
    if (!products) return;

    let productsCopy = [...products];
    if (showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    productsCopy = sortProducts(productsCopy);
    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    if (products) {
      setFilterProducts(products);
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortOption,search,showSearch]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter option */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Men" onChange={toggleCategory} />Men
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Women" onChange={toggleCategory} />Women
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Kids" onChange={toggleCategory} />Kids
            </label>
          </div>
        </div>

        {/* Subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Topwear" onChange={toggleSubCategory} />Topwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />Bottomwear
            </label>
            <label className='flex gap-2'>
              <input className='w-3' type="checkbox" value="Winterwear" onChange={toggleSubCategory} />Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* product sort */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevant">sort by: Relevant</option>
            <option value="low-high">sort by: Low to High</option>
            <option value="high-low">sort by: High to Low</option>
          </select>
        </div>

        {/* Product grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from '../App'
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // preview states
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("Men");
  const [subCategory, setsubCategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      // reset form
      setName('');
      setDescription('');
      setprice('');
      setcategory("Men");
      setsubCategory("Topwear");
      setSizes([]);
      setbestseller(false);

      // reset images + previews
      setImage1(null); setPreview1(null);
      setImage2(null); setPreview2(null);
      setImage3(null); setPreview3(null);
      setImage4(null); setPreview4(null);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error uploading product:", error);
    toast.error("Upload failed. Please try again.");
  }
};

  // helper for image preview
  const handleImageChange = (file, setImage, setPreview) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {/* Image 1 */}
          <label htmlFor="image1">
            <img className="w-20"src={!preview1 ? assets.upload_area : preview1}alt=""/>
            <input onChange={(e) => handleImageChange(e.target.files[0], setImage1, setPreview1)  } type="file" id="image1"  hidden />
          </label>

          {/* Image 2 */}
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!preview2 ? assets.upload_area : preview2}
              alt=""
            />
            <input
              onChange={(e) =>
                handleImageChange(e.target.files[0], setImage2, setPreview2)
              }
              type="file"
              id="image2"
              hidden
            />
          </label>

          {/* Image 3 */}
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!preview3 ? assets.upload_area : preview3}
              alt=""
            />
            <input
              onChange={(e) =>
                handleImageChange(e.target.files[0], setImage3, setPreview3)
              }
              type="file"
              id="image3"
              hidden
            />
          </label>

          {/* Image 4 */}
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!preview4 ? assets.upload_area : preview4}
              alt=""
            />
            <input
              onChange={(e) =>
                handleImageChange(e.target.files[0], setImage4, setPreview4)
              }
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type Here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            value={subCategory}
            onChange={(e) => setsubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              className={`px-3 py-1 cursor-pointer rounded ${
                sizes.includes(size) ? "bg-pink-400 text-white" : "bg-slate-200"
              }`}
              onClick={() => {
                if (sizes.includes(size)) {
                  setSizes(sizes.filter((s) => s !== size));
                } else {
                  setSizes([...sizes, size]);
                }
              }}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setbestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;

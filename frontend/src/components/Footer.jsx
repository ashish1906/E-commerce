import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='my-10 mt-40 text-sm'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est sapiente quia cupiditate rem. Officia perferendis deserunt nisi assumenda sint enim?
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91-620-590-0838</li>
            <li>ashishydv7345@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className='my-5' />
      <p className='text-sm text-center'>
        © 2025 forever.com — All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;

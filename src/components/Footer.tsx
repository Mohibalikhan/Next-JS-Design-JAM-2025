import Link from 'next/link';
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { RiLinkedinLine } from "react-icons/ri";

function Footer() {
  return (
    
    <div className="bg-black text-white ">
      {/* Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between px-5 lg:px-20 py-8 lg:py-16 gap-12">
        {/* Find a Store Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl lg:text-2xl font-bold">FIND A STORE</h3>
          <Link className="text-base lg:text-sm" href={''}>BECOME A MEMBER</Link>
          <Link className="text-base lg:text-sm" href={''}>SIGN UP FOR EMAIL</Link>
          <Link className="text-base lg:text-sm" href={''}>Send Us Feedback</Link>
          <Link className="text-base lg:text-sm" href={''}>STUDENT DISCOUNTS</Link>
        </div>

        {/* Help Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg lg:text-xl font-bold">GET HELP</h3>
          <Link className="text-base lg:text-sm" href={''}>Order Status</Link>
          <Link className="text-base lg:text-sm" href={''}>Delivery</Link>
          <Link className="text-base lg:text-sm" href={''}>Payment Options</Link>
          <Link className="text-base lg:text-sm" href={''}>Contact Us On Nike.com Inquires</Link>
          
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg lg:text-xl font-bold">ABOUT ME</h3>
          <Link className="text-base lg:text-sm" href={''}>News</Link>
          <Link className="text-base lg:text-sm" href={''}>Careers</Link>
          <Link className="text-base lg:text-sm" href={''}>Investors</Link>
          <Link className="text-base lg:text-sm" href={''}>Sustainability</Link>
        </div>

        {/* Social Media Links */}
        <ul className="flex items-end gap-4 mt-9">
          <li className="w-8 h-8 text-2xl">
            <Link href={''}>
              <FaFacebookF />
            </Link>
          </li>
          <li className="w-8 h-8 text-2xl">
            <Link href={''}>
              <FaInstagram />
            </Link>
          </li>
          <li className="w-8 h-8 text-2xl">
            <Link href={''}>
              <FiTwitter />
            </Link>
          </li>
          <li className="w-8 h-8 text-2xl">
            <Link href={''}>
              <RiLinkedinLine />
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between border-t border-gray-700 py-4 px-6 lg:px-20">
        <p className="text-[#cac2c2] opacity-90 text-base mt-2">
          Mohib Ali Khan | 2024 All rights reserved
        </p>
        <div className='flex flex-col lg:flex-row justify-end gap-4 mt-2 text-[#cac2c2] opacity-90'>
          <Link className="text-base lg:text-sm" href={''}>Guides</Link>
          <Link className="text-base lg:text-sm" href={''}>Terms of Sale</Link>
          <Link className="text-base lg:text-sm" href={''}>Terms of Use</Link>
          <Link className="text-base lg:text-sm" href={''}>Nike Privacy Policy</Link>
        </div>
      </div>
    </div>
    
  );
}

export default Footer;
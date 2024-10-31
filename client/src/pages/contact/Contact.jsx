import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
                <title>Contact Us</title>
            </Helmet>
      <Toaster />
      <h2 className="text-center text-4xl font-bold mb-4">You can ask us questions</h2>
      <p className="text-center text-lg mb-8">
        Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Office Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Offices</h3>
          <div className="mb-6">
            <p className="font-bold mb-1">United States Office</p>
            <p>205 Middle Road, 2nd Floor, New York</p>
            <p>+02 1234 567 88</p>
            <p>info@example.com</p>
          </div>
          <div className="mb-6">
            <p className="font-bold mb-1">Munich States Office</p>
            <p>205 Middle Road, 2nd Floor, New York</p>
            <p>+5 456 123 22</p>
            <p>contact@example.com</p>
          </div>
          
          <p className="text-lg font-semibold mt-8">Follow us:</p>
          <div className="flex space-x-4 mt-2">
            <FaFacebook className="text-blue-600 text-2xl" />
            <FaTwitter className="text-blue-400 text-2xl" />
            <FaInstagram className="text-pink-600 text-2xl" />
            <FaLinkedin className="text-blue-800 text-2xl" />
            <FaEnvelope className="text-red-500 text-2xl" />
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Your Name*</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Your Email*</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Subject*</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Your Message</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        <div className="flex flex-col items-center">
          <img src={img1} alt="Payment" className="h-16 mb-2" />
          <p className="font-bold">Payment only online</p>
          <p>Mobile checkout available.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={img2} alt="Stocks and Sales" className="h-16 mb-2" />
          <p className="font-bold">New stocks and sales</p>
          <p>Mobile checkout available.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={img3} alt="Quality Assurance" className="h-16 mb-2" />
          <p className="font-bold">Quality assurance</p>
          <p>Mobile checkout available.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={img4} alt="Delivery from 1 hour" className="h-16 mb-2" />
          <p className="font-bold">Delivery from 1 hour</p>
          <p>Mobile checkout available.</p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../hooks/Loading';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Modal from 'react-modal';
import { Helmet } from 'react-helmet-async';

Modal.setAppElement('#root'); // Accessibility setup for modal

export default function Blog() {
  const axiosPublic = useAxiosPublic();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch blogs with react-query and pagination
  const { data: blogs = [], isLoading, isError } = useQuery({
    queryKey: ['blog', page],
    queryFn: async () => {
      try {
        const res = await axiosPublic(`/blog?page=${page}`);
        return res.data;
      } catch (err) {
        console.error('Error Here:', err);
      }
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p>Failed to load blogs.</p>;

  // Modal control functions
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side: Blog List */}
      <Helmet>
                <title>Blog</title>
            </Helmet>
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

        {blogs.map((blog) => (
          <div key={blog._id} className="mb-8 border-b pb-4">
            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-gray-500">{blog.date} • {blog.category}</p>
            <p className="text-gray-700">{blog.location} - {blog.storeName}</p>
            <p className="text-gray-700">{blog.description.split(" ").slice(0, 20).join(" ")}...</p> {/* Truncated description */}
            <button
              onClick={() => openModal(blog)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Read More
            </button>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-100"
          >
            Previous
          </button>
          <button 
            onClick={() => setPage(page + 1)} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Side: Sidebar */}
      <div className="col-span-1">
        {/* Categories */}
        

        {/* Recent Posts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <ul className="space-y-4">
            {blogs.slice(0, 3).map((blog) => (
              <li key={blog._id} className="flex items-center space-x-4">
                <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{blog.title}</p>
                  <p className="text-gray-500 text-sm">{blog.date}</p>
                  <p className="text-gray-500 text-sm">{blog.description.split(" ").slice(0, 20).join(" ")}...</p> {/* Truncated description */}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={32} className="text-blue-600" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={32} className="text-blue-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={32} className="text-blue-700" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={32} className="text-pink-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal for Blog Details */}
      {selectedBlog && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Blog Details">
          <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
          <p className="text-gray-500 mb-4">{selectedBlog.date}</p>
          <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover mb-4" />
          <p>{selectedBlog.storeName} - {selectedBlog.location}</p>
          <p className="mt-4">{selectedBlog.description}</p> {/* Full description */}
          <div className="flex space-x-4 mt-4">
            <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} className="text-blue-600" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="text-blue-400" />
            </a>
            <a href={`https://linkedin.com/shareArticle?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} className="text-blue-700" />
            </a>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

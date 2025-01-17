"use client"
import React, { useState } from 'react';

const Store = () => {
  const stores = [
    {
      name: "Nike NYC - House of Innovation 000",
      address: "650 5th Ave, New York, NY, 10019, US",
      status: "Closed",
      openTime: "Opens at 10:00 am",
    },
    {
      name: "Nike By East Side",
      address: "1131 3rd Ave, New York, NY, 10065, US",
      status: "Closed",
      openTime: "Opens at 11:00 am",
    },
    {
      name: "Nike By Flatiron",
      address: "156 Fifth Ave, New York, NY, 10010, US",
      status: "Closed",
      openTime: "Opens at 12:00 am",
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 xl:w-1/4 bg-white p-5 lg:mx-8 border-r">
        <h1 className="text-xl font-bold mb-4">Find a Nike Store</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring focus:outline-none"
          />
        </div>
        <div className="w-full h-[1px] bg-[#111111] my-4"></div>
        <ul>
          {filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <li key={index} className="mb-6 text-sm lg:text-base">
                <h2 className="font-semibold">{store.name}</h2>
                <p className="text-gray-500">{store.address}</p>
                <p className="text-red-500">{store.status}</p>
                <p className="text-gray-700">{store.openTime}</p>
                <div className="w-full h-[1px] bg-[#111111] my-4"></div>
              </li>
            ))
          ) : (
            <p>No stores found for this search.</p>
          )}
        </ul>
        <a href="#" className="text-[#111111] hover:underline block mt-4">
          View All Stores
        </a>
      </aside>

      {/* Map */}
      <div className="flex-1 ">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24139.88219928233!2d-74.0060152!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3162b3a5f5%3A0x9ad2ff5e5b911bd3!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1638958297891!5m2!1sen!2sus"
          className="w-full h-96 lg:h-full"
          loading="lazy"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
}
export default Store;
import React from 'react';
import { FaShoppingCart, FaRegComment, FaClipboardList } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Orders', 'Reviews', 'Bookings', 'Payments'],
  datasets: [
    {
      label: 'Activity',
      data: [6, 2, 1, 3],
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) return null;

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 99, 132, 0.8)');
        return gradient;
      },
      borderRadius: 10,
      borderSkipped: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow flexible resizing for responsiveness
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleFont: { size: 16 },
      bodyFont: { size: 14 },
      borderColor: 'rgba(255,255,255,0.6)',
      borderWidth: 1,
      caretSize: 8,
      cornerRadius: 6,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.3)',
      },
      beginAtZero: true,
    },
  },
};

export default function UserHome() {
  return (
    <div className="p-4 sm:p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-purple-200 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
          <FaShoppingCart className="text-3xl sm:text-5xl text-purple-600 mb-2 sm:mb-3" />
          <p className="text-2xl sm:text-3xl font-bold text-purple-800">205</p>
          <p className="text-md sm:text-lg text-purple-700">Menu</p>
        </div>
        <div className="bg-yellow-200 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
          <FaClipboardList className="text-3xl sm:text-5xl text-yellow-600 mb-2 sm:mb-3" />
          <p className="text-2xl sm:text-3xl font-bold text-yellow-800">103</p>
          <p className="text-md sm:text-lg text-yellow-700">Shop</p>
        </div>
        <div className="bg-pink-200 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
          <FaRegComment className="text-3xl sm:text-5xl text-pink-600 mb-2 sm:mb-3" />
          <p className="text-2xl sm:text-3xl font-bold text-pink-800">03</p>
          <p className="text-md sm:text-lg text-pink-700">Contact</p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="mt-6 sm:mt-10 bg-yellow-100 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-yellow-900">Your Activities</h2>
        <ul className="space-y-2 sm:space-y-4 text-md sm:text-lg">
          <li>Orders: <span className="text-blue-600 font-semibold">6</span></li>
          <li>Reviews: <span className="text-green-600 font-semibold">2</span></li>
          <li>Bookings: <span className="text-yellow-600 font-semibold">1</span></li>
          <li>Payments: <span className="text-red-600 font-semibold">3</span></li>
        </ul>

        {/* Responsive Chart Section */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-4 text-yellow-900">Activity Chart</h2>
          <div className="w-full max-w-full sm:max-w-4xl mx-auto">
            {/* Responsive container for the chart */}
            <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

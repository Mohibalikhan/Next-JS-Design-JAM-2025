import React from 'react';

const Help = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mt-0">GET HELP</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 py-7">
        What Payment Options Can I Use On Nike Orders?
      </h2>
      <p className="text-black mb-4 font-bold text-lg">
        We want to make buying your favourite Nike shoes and gear online fast and
        easy, and we accept the following payment options:
      </p>
      <ul className="flex flex-col md:flex-row gap-4 md:gap-7 list-disc pl-6 text-gray-600 mb-4">
        <li>Visa</li>
        <li>Mastercard</li>
        <li>Diners Club</li>
        <li>American Express</li>
        <li>Visa Electron</li>
      </ul>
      <p className="text-gray-600 mb-4">
        If you enter your PAN information at checkout, you'll be able to pay for your
        order with PayTM or a local credit or debit card.
      </p>
      <p className="text-gray-600 mb-4">Apple Pay</p>
      <p className="text-gray-600 mb-4">
        Nike Members can store multiple debit or credit cards in their profile for
        faster checkout. If you're not already a Member, join us today.
      </p>
      <div className="flex flex-col md:flex-row justify-start mb-8">
        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 md:mb-0 md:mr-4">
          Join Us
        </button>
        <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Shop Nike
        </button>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">FAQs</h3>
      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold text-black">1. Does my card need international purchases enabled?</h4>
        <p className="text-gray-600">Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled.</p>
      </div>
      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold text-black">2. Can I use multiple payment methods?</h4>
        <p className="text-gray-600">Currently, we only accept one payment method per order.</p>
      </div>
      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold text-black">3. Is it safe to enter my credit card information?</h4>
        <p className="text-gray-600">Yes, we use secure encryption to protect your payment information.</p>
      </div>
      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold text-black">4. What payment method is accepted for SNKRS orders?</h4>
        <p className="text-gray-600">You can use any accepted credit card to pay for your SNKRS order.</p>
      </div>
      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold text-black">5. Why don't I see Apple Pay as an option?</h4>
        <p className="text-gray-600">To see Apple Pay as an option in the Nike App or on Nike.com, you'll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account and have a supported card in your Wallet. Additionally, you'll need to use Safari to use Apple Pay on Nike.com.</p>
      </div>
    </div>
  );
};

export default Help;
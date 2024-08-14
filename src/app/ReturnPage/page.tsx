"use client";

const ReturnedPage = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 mt-8">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Return Confirmed</h1>
        <p className="text-gray-700">Your return request has been successfully submitted.</p>
      </div>
    </div>
  );
};

export default ReturnedPage;

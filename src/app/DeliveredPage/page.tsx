"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const returnReasons = [
  "Damaged item",
  "Wrong item received",
  "Not as described",
  "Too expensive",
  "Changed mind",
  "Better price elsewhere",
  "Found a defect",
  "Other",
];

const DeliveredPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showReturnConfirmed, setShowReturnConfirmed] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleReturnClick = () => {
    setShowForm(true);
  };

  const handleSubmitRequest = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowReturnConfirmed(true);

    setTimeout(() => {
      setShowReturnConfirmed(false);
      router.push('/ReturnPage');
    }, 3000); 
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 mt-8">
      <div className="lg:w-[90%] md:w-[90%] w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Delivered Page</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleReturnClick}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Return
          </button>
          <button
            onClick={() => router.push('/need-help')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Need Help
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Request Return</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="return-reason" className="block text-gray-700 mb-2">Reason for Return:</label>
                <select
                  id="return-reason"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="">Select reason</option>
                  {returnReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 mb-2">Add Comment (optional):</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Refund Status:</label>
                <p className="text-gray-600">Pending</p>
              </div>
              <button
                type="button"
                onClick={handleSubmitRequest}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Are you sure you want to return?</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showReturnConfirmed && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="mb-4">
                <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_135_12642)">
                    <g clipPath="url(#clip1_135_12642)">
                      <g clipPath="url(#clip2_135_12642)">
                        <path d="M72.9954 133.588C61.0462 133.588 49.3653 130.044 39.4299 123.406C29.4945 116.767 21.7508 107.331 17.178 96.2915C12.6053 85.2519 11.4088 73.1042 13.74 61.3846C16.0712 49.665 21.8253 38.8998 30.2747 30.4504C38.724 22.0011 49.4892 16.247 61.2088 13.9158C72.9284 11.5846 85.0761 12.7811 96.1157 17.3538C107.155 21.9266 116.591 29.6703 123.23 39.6057C129.868 49.5411 133.412 61.222 133.412 73.1712C133.412 81.1052 131.849 88.9616 128.813 96.2917C125.777 103.622 121.327 110.282 115.717 115.892C110.106 121.503 103.446 125.953 96.1159 128.989C88.7858 132.025 80.9295 133.588 72.9954 133.588ZM66.9719 97.3375L109.687 54.617L101.144 46.0738L66.9719 80.25L49.8799 63.1591L41.3367 71.7023L66.9719 97.3375Z" fill="#458D00"/>
                      </g>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_135_12642">
                      <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)"/>
                    </clipPath>
                    <clipPath id="clip1_135_12642">
                      <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)"/>
                    </clipPath>
                    <clipPath id="clip2_135_12642">
                      <rect width="145" height="145" fill="white" transform="translate(0.495117 0.669922)"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700">Return Confirmed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveredPage;

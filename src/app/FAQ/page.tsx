// import { useState } from 'react';

// const FaqSection = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [question, setQuestion] = useState('');

//   const handleAskNowClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleSubmit = () => {
//     setIsModalOpen(false);
//     setIsSuccessModalOpen(true);
//   };

//   const handleBackToProductClick = () => {
//     setIsSuccessModalOpen(false);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', position: 'relative' }}>
//       <div style={{ width: '60%' }}>
//         <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           <li style={{ marginBottom: '0.5rem' }}>What is your return policy?</li>
//           <li style={{ marginBottom: '0.5rem' }}>How do I track my order?</li>
//           <li>Do you ship internationally?</li>
//           {/* Add more FAQs as needed */}
//         </ul>
//       </div>
//       <div style={{ width: '30%', textAlign: 'right' }}>
//         <button
//           onClick={handleAskNowClick}
//           style={{
//             padding: '10px 20px',
//             cursor: 'pointer',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '1rem'
//           }}
//         >
//           Ask Now
//         </button>
//       </div>

//       {/* Ask Now Modal */}
//       {isModalOpen && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
//             <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Ask Your Question</h2>
//             <input
//               type="text"
//               placeholder="Type your question..."
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1rem' }}
//             />
//             <p style={{ fontSize: '0.875rem', color: '#666' }}>Be specific, ask questions about the product, not about price, delivery, service, etc.</p>
//             <p style={{ fontSize: '0.875rem', color: '#666' }}>Ask for information that isn't captured in the product specifications.</p>
//             <button
//               onClick={handleSubmit}
//               style={{
//                 padding: '10px 20px',
//                 cursor: 'pointer',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 fontSize: '1rem',
//                 marginTop: '10px'
//               }}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Success Modal */}
//       {isSuccessModalOpen && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
//             <svg width="130" height="131" viewBox="0 0 130 131" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '15px' }}>
//               <g clipPath="url(#clip0_266_973)">
//                 <g clipPath="url(#clip1_266_973)">
//                   <g clipPath="url(#clip2_266_973)">
//                     <path d="M64.9906 119.667C54.2775 119.667 43.805 116.49 34.8974 110.538C25.9898 104.587 19.0471 96.127 14.9474 86.2294C10.8477 76.3318 9.77501 65.4407 11.865 54.9335C13.9551 44.4263 19.1139 34.7747 26.6892 27.1994C34.2645 19.6242 43.916 14.4653 54.4233 12.3753C64.9305 10.2853 75.8215 11.3579 85.7191 15.4577C95.6167 19.5574 104.076 26.5 110.028 35.4076C115.98 44.3152 119.157 54.7877 119.157 65.5008C119.157 72.6141 117.756 79.6577 115.034 86.2295C112.312 92.8014 108.322 98.7727 103.292 103.803C98.2624 108.832 92.2911 112.822 85.7193 115.544C79.1475 118.266 72.1038 119.667 64.9906 119.667ZM59.5902 87.1672L97.8864 48.866L90.2269 41.2066L59.5902 71.8473L44.2663 56.5245L36.6069 64.1839L59.5902 87.1672Z" fill="#458D00"/>
//                   </g>
//                 </g>
//               </g>
//               <defs>
//                 <clipPath id="clip0_266_973">
//                   <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
//                 </clipPath>
//                 <clipPath id="clip1_266_973">
//                   <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
//                 </clipPath>
//                 <clipPath id="clip2_266_973">
//                   <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
//                 </clipPath>
//               </defs>
//             </svg>
//             <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Question Posted Successfully!</h2>
//             <p style={{ fontSize: '1rem', color: '#666' }}>We will notify you when someone answers your question</p>
//             <button
//               onClick={handleBackToProductClick}
//               style={{
//                 padding: '10px 20px',
//                 cursor: 'pointer',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 fontSize: '1rem',
//                 marginTop: '10px'
//               }}
//             >
//               Back to Product
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaqSection;


import { useState } from 'react';

const FaqSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [question, setQuestion] = useState('');

  const handleAskNowClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleBackToProductClick = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="flex justify-between p-5 relative">
      <div className="w-3/5">
        <h2 className="text-2xl mb-4">Frequently Asked Questions</h2>
        <ul className="list-none p-0">
          <li className="mb-2">What is your return policy?</li>
          <li className="mb-2">How do I track my order?</li>
          <li>Do you ship internationally?</li>
          {/* Add more FAQs as needed */}
        </ul>
      </div>
      <div className="w-2/5 text-right">
        <button
          onClick={handleAskNowClick}
          className="py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer"
        >
          Ask Now
        </button>
      </div>

      {/* Ask Now Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl mb-4">Ask Your Question</h2>
            <input
              type="text"
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 mb-3 border rounded-md border-gray-300 text-gray-900"
            />
            <p className="text-sm text-gray-600 mb-2">Be specific, ask questions about the product, not about price, delivery, service, etc.</p>
            <p className="text-sm text-gray-600 mb-4">Ask for information that isn't captured in the product specifications.</p>
            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 text-center shadow-lg">
            <svg width="130" height="131" viewBox="0 0 130 131" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
              <g clipPath="url(#clip0_266_973)">
                <g clipPath="url(#clip1_266_973)">
                  <g clipPath="url(#clip2_266_973)">
                    <path d="M64.9906 119.667C54.2775 119.667 43.805 116.49 34.8974 110.538C25.9898 104.587 19.0471 96.127 14.9474 86.2294C10.8477 76.3318 9.77501 65.4407 11.865 54.9335C13.9551 44.4263 19.1139 34.7747 26.6892 27.1994C34.2645 19.6242 43.916 14.4653 54.4233 12.3753C64.9305 10.2853 75.8215 11.3579 85.7191 15.4577C95.6167 19.5574 104.076 26.5 110.028 35.4076C115.98 44.3152 119.157 54.7877 119.157 65.5008C119.157 72.6141 117.756 79.6577 115.034 86.2295C112.312 92.8014 108.322 98.7727 103.292 103.803C98.2624 108.832 92.2911 112.822 85.7193 115.544C79.1475 118.266 72.1038 119.667 64.9906 119.667ZM59.5902 87.1672L97.8864 48.866L90.2269 41.2066L59.5902 71.8473L44.2663 56.5245L36.6069 64.1839L59.5902 87.1672Z" fill="#458D00"/>
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_266_973">
                  <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
                </clipPath>
                <clipPath id="clip1_266_973">
                  <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
                </clipPath>
                <clipPath id="clip2_266_973">
                  <rect width="130" height="130" fill="white" transform="translate(-0.00976562 0.5)"/>
                </clipPath>
              </defs>
            </svg>
            <h2 className="text-xl mb-4">Question Posted Successfully!</h2>
            <p className="text-gray-600 mb-4">We will notify you when someone answers your question</p>
            <button
              onClick={handleBackToProductClick}
              className="py-2 px-4 bg-red-500 text-white rounded-lg cursor-pointer"
            >
              Back to Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqSection;

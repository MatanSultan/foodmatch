// const ReviewSection = ({ reviews }) => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-4">Reviews</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {reviews.map((review) => (
//           <div key={review.id} className="bg-white rounded-lg shadow-lg">
//             <div className="p-4">
//               <h3 className="text-lg font-bold mb-2">
//                 {review.restaurantName}
//               </h3>
//               <p className="text-gray-600">{review.comment}</p>
//               <div className="flex items-center mt-4">
//                 <div className="mr-2">
//                   <StarRating rating={review.rating} />
//                 </div>
//                 <p className="text-gray-600">
//                   {review.reviewerName}, {review.reviewerLocation}
//                 </p>
//               </div>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition duration-300 ease-in-out">
//                 View Restaurant
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;

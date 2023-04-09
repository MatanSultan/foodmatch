const ReviewSection = ({ reviews }) => {
  return (
    <section className="bg-gray-900 py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-12">
          Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  {review.restaurant}
                </h3>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {review.reviewer}
                  </span>
                </div>
                <p className="text-gray-300 text-base">{review.comment}</p>
                <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-gray-600 transition duration-300 ease-in-out">
                  View Restaurant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;

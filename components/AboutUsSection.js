import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            FoodMatch
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            FoodMatch is a social networking platform for food lovers around the
            world. Our platform allows users to create profiles, share recipes,
            review restaurants, and connect with other foodies in their area.
          </p>
        </div>
        <div className="mt-10">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
            <li className="col-span-1 flex flex-col text-center">
              <div className="w-24 mx-auto">
                <Image
                  src="/images/about-us-1.jpg"
                  alt="FoodMatch community"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-6 text-gray-900 text-sm font-medium">
                Build Community
              </h3>
              <p className="mt-2 text-gray-600 text-xs">
                Join our community of foodies from around the world to share
                your passion for food, discover new flavors, and connect with
                like-minded individuals.
              </p>
            </li>

            <li className="col-span-1 flex flex-col text-center">
              <div className="w-24 mx-auto">
                <Image
                  src="/images/ShareRecipes.png"
                  alt="FoodMatch recipes"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-6 text-gray-900 text-sm font-medium">
                Share Recipes
              </h3>
              <p className="mt-2 text-gray-600 text-xs">
                Share your favorite recipes and discover new ones from other
                foodies. Our platform features a recommendation engine that
                suggests dishes based on your preferences and previous activity.
              </p>
            </li>

            <li className="col-span-1 flex flex-col text-center">
              <div className="w-24 mx-auto">
                <Image
                  src="/images/AttendEvents.png"
                  alt="FoodMatch events"
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-6 text-gray-900 text-sm font-medium">
                Attend Events
              </h3>
              <p className="mt-2 text-gray-600 text-xs">
                Join our virtual cooking classes and food-related events to
                learn new skills and connect with other foodies. Our events are
                led by expert chefs and food bloggers from around the world.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;

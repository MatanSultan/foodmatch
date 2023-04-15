import Link from "next/link";
import { useRouter } from "next/router";

// router path to components/RegisterForm

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="bg-blue-900 py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="md:flex md:flex-col md:justify-center md:items-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 md:mb-8 text-center md:text-left">
            Discover New Flavors <br className="hidden md:block" />
            and Connect with Foodies
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center md:text-left">
            FoodMatch is the social networking platform for food lovers. Join
            our community of passionate foodies and explore new cuisines, share
            recipes, and connect with other food lovers from around the world.
          </p>
          <button className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:bg-gray-600  ">
            <Link href="/register   ">get started</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

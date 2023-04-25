import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="bg-blue-900 py-8 md:py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="md:flex md:flex-col md:justify-center md:items-center">
          <div className="md:w-1/2 md:pr-10 lg:pr-16">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 md:mb-8 text-center md:text-left">
              Discover New Flavors <br className="hidden md:block" />
              and Connect with Foodies
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 text-center md:text-left">
              FoodMatch is the social networking platform for food lovers. Join
              our community of passionate foodies and explore new cuisines,
              share recipes, and connect with other food lovers from around the
              world.
            </p>
            <button className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:bg-gray-600">
              <Link href="/register">Get Started</Link>
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative w-96 h-72 md:w-auto md:h-auto">
              <Image
                src="/images/foodies.gif"
                alt="A group of people enjoying food together."
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

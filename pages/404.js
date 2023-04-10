import Link from "next/link";
import Nav from "../components/Nav";

const Custom404 = () => {
  return (
    <>
      <div>
        <Nav />
      </div>

      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8">
          We couldn &apos;t find the page you were looking for.
        </p>
        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
            Go back home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Custom404;

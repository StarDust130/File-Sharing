import { description } from "../_utils/Constant";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl ">
              <span className="text-primary">Upload, Save</span> and{" "}
              <span className="text-primary inline-block mb-2 border-b-8 border-b-primary transition-transform transform hover:translate-x-2 hover:border-b-primary">
                Share
              </span>
              your files in one place
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">{description}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {/* Buttons */}

              <Link
                className="group   relative inline-block focus:outline-none focus:ring"
                href="/upload"
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Get Started
                </span>
              </Link>

              <Link
                className="block    rounded px-12 py-3 text-sm  text-primary shadow-lg hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500  sm:w-auto  border-black font-bold hover:shadow-2xl transition duration-300 ease-in-out hover:shadow-black  border-2"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroBanner;

import { FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="bg-[#FFF8F3] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-[30px] p-10 md:p-16 text-white shadow-2xl">

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Never Miss a Recipe!
              </h2>

              <p className="mt-5 text-orange-100 text-lg leading-8">
                Subscribe to our newsletter and receive delicious recipes,
                cooking tips, and food inspiration delivered straight to your
                inbox every week.
              </p>
            </div>

            {/* Right Content */}
            <div>

              <div className="bg-white rounded-full p-2 flex items-center shadow-lg">

                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 px-6 py-4 rounded-full outline-none text-gray-700"
                />

                <button className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-7 py-4 rounded-full flex items-center gap-2 font-semibold">

                  Subscribe

                  <FaPaperPlane />

                </button>

              </div>

              <p className="text-sm text-orange-100 mt-4">
                📧 No spam. Only delicious recipes and cooking inspiration.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Newsletter;
import { Link } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaUserTie, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Perfect Freelancer for Your Project
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            SkillSwap connects businesses with talented freelancers. Post a project or browse through profiles to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register?role=client"
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
            >
              Hire a Freelancer
            </Link>
            <Link
              to="/register?role=freelancer"
              className="btn bg-primary-700 text-white hover:bg-primary-800 px-6 py-3 rounded-md font-medium border border-white"
            >
              Find Work
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-center mb-6">
                Find Skilled Freelancers
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="form-input pl-10"
                      placeholder="Search for skills, services, or freelancers"
                    />
                  </div>
                </div>
                <button className="btn btn-primary">Search</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Web Development
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Mobile Apps
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  UI/UX Design
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Content Writing
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Digital Marketing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SkillSwap Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
                <FaBriefcase className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Post a Project</h3>
              <p className="text-gray-600">
                Create a detailed project listing with your requirements, budget, and timeline.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
                <FaUserTie className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Find Talent</h3>
              <p className="text-gray-600">
                Review proposals from freelancers or search for specific skills and expertise.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full p-4 inline-block mb-4">
                <FaShieldAlt className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work Securely</h3>
              <p className="text-gray-600">
                Communicate, share files, and manage projects through our secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'Web Development',
              'Mobile Development',
              'UI/UX Design',
              'Graphic Design',
              'Content Writing',
              'Digital Marketing',
              'Video Editing',
              'Data Entry',
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <p className="text-gray-600 mb-4">
                  Find expert freelancers in {category.toLowerCase()}
                </p>
                <Link
                  to={`/freelancers?category=${category}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Browse Freelancers →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of clients and freelancers who are already using SkillSwap to connect and collaborate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="btn bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
            >
              Sign Up Now
            </Link>
            <Link
              to="/about"
              className="btn bg-transparent text-white hover:bg-primary-800 px-6 py-3 rounded-md font-medium border border-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

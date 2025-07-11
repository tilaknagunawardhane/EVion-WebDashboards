import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { COLORS, FONTS } from "../../constants";
import { 
  DevicePhoneMobileIcon,
  BuildingOfficeIcon,
  MapIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  UsersIcon,
  TrophyIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <Layout fullWidth={true}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
          
           
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1
                className="font-bold mb-4 leading-tight"
                style={{
                  fontSize: FONTS.sizes["5xl"],
                  color: "white",
                }}
              >
                Powering the Future of EV Travel in Sri Lanka
              </h1>
              <p
                className="text-2xl mb-6 font-medium"
                style={{
                  color: COLORS.primary,
                  fontSize: FONTS.sizes["2xl"],
                }}
              >
                Find. Charge. Connect.
              </p>
              <p
                className="max-w-xl mb-10 text-gray-300"
                style={{
                  fontSize: FONTS.sizes.xl,
                  lineHeight: "1.6",
                }}
              >
                Discover charging stations across Sri Lanka, book your slots,
                and connect with a growing community of EV enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  className="group relative inline-flex items-center justify-center rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  style={{
                    padding: "1.25rem 2.5rem",
                    backgroundColor: COLORS.primary,
                    color: "white",
                    fontSize: FONTS.sizes.lg,
                    fontWeight: FONTS.weights.bold,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center gap-3">
                    <DevicePhoneMobileIcon className="w-6 h-6 animate-bounce" />
                    <span>Download Mobile App</span>
                  </span>
                </button>
                <Link
                  to="/auth?mode=signup"
                  className="group inline-flex items-center justify-center rounded-xl shadow-xl border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  style={{
                    padding: "1.25rem 2.5rem",
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: FONTS.sizes.lg,
                    fontWeight: FONTS.weights.bold,
                  }}
                >
                  <span className="flex items-center gap-3">
                    <BuildingOfficeIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>Become a Charging Partner</span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern electric car charging station in Sri Lanka"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center font-bold mb-16"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* EV Users */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                  </div>
                </div>
                <h3
                  className="font-bold mb-4"
                  style={{
                    fontSize: FONTS.sizes["2xl"],
                    color: COLORS.mainTextColor,
                  }}
                >
                  For EV Users
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Search Stations</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Find nearby charging stations on our interactive map
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Book Slots</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Reserve your charging slot in advance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Get Trip Plans</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Plan your route with charging stops
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Charge & Pay</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Seamlessly charge and pay through the app
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Station Owners */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <BuildingOfficeIcon className="w-10 h-10 text-orange-600" />
                  </div>
                </div>
                <h3
                  className="font-bold mb-4"
                  style={{
                    fontSize: FONTS.sizes["2xl"],
                    color: COLORS.mainTextColor,
                  }}
                >
                  For Station Owners
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.HighlightText }}
                  >
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Register Station</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Add your charging station to our network
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.HighlightText }}
                  >
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Manage Chargers</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Monitor and control your charging points
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.HighlightText }}
                  >
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track Bookings</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      View real-time booking analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: COLORS.HighlightText }}
                  >
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Earn Revenue</h4>
                    <p
                      style={{
                        color: COLORS.secondaryText,
                        fontSize: FONTS.sizes.sm,
                      }}
                    >
                      Automated payments and revenue tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <MapIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Smart Route Planning
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                AI-powered route optimization with charging stops planned along
                your journey.
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                  <BoltIcon className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Real-time Availability
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Live updates on charger availability and status across Sri
                Lanka.
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <CalendarDaysIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Slot Booking & Payments
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Reserve charging slots and pay securely through multiple payment
                methods.
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <ChartBarIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Station Owner Dashboard
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Comprehensive analytics and management tools for station
                operators.
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Community & Support
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Connect with other EV users and get 24/7 customer support.
              </p>
            </div>
            <div
              className="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: COLORS.background }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrophyIcon className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-3"
                style={{
                  fontSize: FONTS.sizes.xl,
                  color: COLORS.mainTextColor,
                }}
              >
                Rewards Program
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Earn points for reviews, reporting issues, and frequent usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: COLORS.bgGreen }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center font-bold mb-16"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            Benefits for Everyone
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* EV Users Benefits */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3
                className="font-bold mb-6 text-center"
                style={{ fontSize: FONTS.sizes["2xl"], color: COLORS.primary }}
              >
                For EV Users
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      No More Range Anxiety
                    </h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Plan trips confidently with our comprehensive charging
                      network
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Real-time Availability & Bookings
                    </h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Never wait in line - book your slot in advance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Earn Rewards</h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Get points for reporting issues, writing reviews, and
                      frequent usage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Station Owners Benefits */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3
                className="font-bold mb-6 text-center"
                style={{
                  fontSize: FONTS.sizes["2xl"],
                  color: COLORS.HighlightText,
                }}
              >
                For Station Owners
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Increased Visibility</h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Reach thousands of EV users across Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Automated Revenue Tracking
                    </h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Real-time booking management and payment processing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <BoltIcon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Hassle-free Management
                    </h4>
                    <p style={{ color: COLORS.secondaryText }}>
                      Monitor and manage your stations from anywhere
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots/UI Demo Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            See EVION in Action
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontSize: FONTS.sizes["2xl"],
                  color: COLORS.mainTextColor,
                }}
              >
                Mobile App Experience
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    ✓
                  </div>
                  <span>Intuitive charging station finder</span>
                </li>
                <li className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    ✓
                  </div>
                  <span>One-tap booking and payments</span>
                </li>
                <li className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    ✓
                  </div>
                  <span>Trip planning with charging stops</span>
                </li>
                <li className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    ✓
                  </div>
                  <span>Real-time charging status</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                alt="EVION mobile app interface"
                className="w-full max-w-lg mx-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            What Our Community Says
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex mb-1">
                    <span style={{ color: COLORS.star }}>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p
                    style={{
                      color: COLORS.secondaryText,
                      fontSize: FONTS.sizes.sm,
                    }}
                  >
                    Nissan Leaf Owner, Colombo
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: FONTS.sizes.base,
                  color: COLORS.mainTextColor,
                }}
              >
                "EVION has transformed my daily commute. I can now plan my
                routes with confidence knowing charging stations are available!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex mb-1">
                    <span style={{ color: COLORS.star }}>⭐⭐⭐⭐⭐</span>
                  </div>
                  <p
                    style={{
                      color: COLORS.secondaryText,
                      fontSize: FONTS.sizes.sm,
                    }}
                  >
                    Hotel Owner, Kandy
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: FONTS.sizes.base,
                  color: COLORS.mainTextColor,
                }}
              >
                "Since joining EVION as a charging partner, our hotel has seen
                increased bookings from EV travelers. Great revenue stream!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="User profile"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="flex mb-1 gap-1">
                    <StarIcon className="w-4 h-4 fill-current" style={{ color: COLORS.star }} />
                    <StarIcon className="w-4 h-4 fill-current" style={{ color: COLORS.star }} />
                    <StarIcon className="w-4 h-4 fill-current" style={{ color: COLORS.star }} />
                    <StarIcon className="w-4 h-4 fill-current" style={{ color: COLORS.star }} />
                    <StarIcon className="w-4 h-4 fill-current" style={{ color: COLORS.star }} />
                  </div>
                  <p
                    style={{
                      color: COLORS.secondaryText,
                      fontSize: FONTS.sizes.sm,
                    }}
                  >
                    Tesla Owner, Galle
                  </p>
                </div>
              </div>
              <p
                style={{
                  fontSize: FONTS.sizes.base,
                  color: COLORS.mainTextColor,
                }}
              >
                "The booking system is brilliant! No more waiting in queues. I
                can reserve my slot and arrive exactly when I need to charge."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: FONTS.sizes["4xl"],
              color: COLORS.mainTextColor,
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div
              className="border rounded-lg p-6"
              style={{ borderColor: COLORS.border }}
            >
              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: FONTS.sizes.lg,
                  color: COLORS.mainTextColor,
                }}
              >
                How do I book a charging slot?
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Simply open the EVION app, find a nearby charging station,
                select your preferred time slot, and confirm your booking.
                You'll receive a confirmation with directions.
              </p>
            </div>
            <div
              className="border rounded-lg p-6"
              style={{ borderColor: COLORS.border }}
            >
              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: FONTS.sizes.lg,
                  color: COLORS.mainTextColor,
                }}
              >
                What payment methods do you accept?
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                We accept all major credit/debit cards, mobile wallets, and
                digital banking. Payments are processed securely through our
                encrypted platform.
              </p>
            </div>
            <div
              className="border rounded-lg p-6"
              style={{ borderColor: COLORS.border }}
            >
              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: FONTS.sizes.lg,
                  color: COLORS.mainTextColor,
                }}
              >
                How can I become a charging partner?
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Click "Become a Charging Partner" and fill out our partnership
                form. Our team will guide you through the setup process and help
                you get listed on our platform.
              </p>
            </div>
            <div
              className="border rounded-lg p-6"
              style={{ borderColor: COLORS.border }}
            >
              <h3
                className="font-semibold mb-2"
                style={{
                  fontSize: FONTS.sizes.lg,
                  color: COLORS.mainTextColor,
                }}
              >
                Is my personal data secure?
              </h3>
              <p style={{ color: COLORS.secondaryText }}>
                Yes, we use bank-level encryption and comply with international
                data protection standards. Your privacy and security are our top
                priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started CTA Section */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bold mb-6 text-white"
            style={{
              fontSize: FONTS.sizes["4xl"],
            }}
          >
            Start Charging Smarter Today
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Join thousands of EV users and station owners across Sri Lanka
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="inline-flex items-center justify-center rounded-lg font-semibold transform hover:scale-105 transition-transform"
              style={{
                padding: "1rem 2rem",
                backgroundColor: "white",
                color: COLORS.primary,
                fontSize: FONTS.sizes.lg,
              }}
            >
              📱 Download App
            </button>
            <Link
              to="/auth?mode=signup"
              className="inline-flex items-center justify-center rounded-lg font-semibold border-2 border-white hover:bg-white transition-colors"
              style={{
                padding: "1rem 2rem",
                backgroundColor: "transparent",
                color: "white",
                fontSize: FONTS.sizes.lg,
              }}
            >
              🏢 Join as Station Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Contact/Support Section */}
      <section
        className="py-16 px-6"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center font-bold mb-12"
            style={{
              fontSize: FONTS.sizes["3xl"],
              color: COLORS.mainTextColor,
            }}
          >
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: COLORS.mainTextColor }}
              >
                Email Support
              </h3>
              <p style={{ color: COLORS.secondaryText }}>support@evion.lk</p>
              <p style={{ color: COLORS.secondaryText }}>
                partnerships@evion.lk
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <PhoneIcon className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: COLORS.mainTextColor }}
              >
                Phone Support
              </h3>
              <p style={{ color: COLORS.secondaryText }}>+94 11 123 4567</p>
              <p
                style={{
                  color: COLORS.secondaryText,
                  fontSize: FONTS.sizes.sm,
                }}
              >
                Mon-Fri 8AM-8PM
              </p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: COLORS.mainTextColor }}
              >
                Social Media
              </h3>
              <div className="space-y-1">
                <p style={{ color: COLORS.secondaryText }}>@EVIONSriLanka</p>
                <p
                  style={{
                    color: COLORS.secondaryText,
                    fontSize: FONTS.sizes.sm,
                  }}
                >
                  Facebook | Instagram | Twitter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 px-6"
        style={{ backgroundColor: COLORS.mainTextColor }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3
                className="font-bold mb-4 text-white"
                style={{ fontSize: FONTS.sizes.xl }}
              >
                EVION
              </h3>
              <p className="text-gray-400" style={{ fontSize: FONTS.sizes.sm }}>
                Powering the future of EV travel in Sri Lanka. Find. Charge.
                Connect.
              </p>
            </div>
            <div>
              <h4
                className="font-semibold mb-4 text-white"
                style={{ fontSize: FONTS.sizes.base }}
              >
                Company
              </h4>
              <ul
                className="space-y-2 text-gray-400"
                style={{ fontSize: FONTS.sizes.sm }}
              >
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold mb-4 text-white"
                style={{ fontSize: FONTS.sizes.base }}
              >
                Support
              </h4>
              <ul
                className="space-y-2 text-gray-400"
                style={{ fontSize: FONTS.sizes.sm }}
              >
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold mb-4 text-white"
                style={{ fontSize: FONTS.sizes.base }}
              >
                Download App
              </h4>
              <div className="space-y-3">
                <a href="#" className="block">
                  <div className="bg-gray-800 hover:bg-gray-700 rounded-lg p-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
                      <div>
                        <p className="text-white text-sm font-semibold">
                          Download on
                        </p>
                        <p className="text-gray-300 text-xs">Google Play</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400" style={{ fontSize: FONTS.sizes.sm }}>
              © 2024 EVION. All rights reserved. Made with ❤️ in Sri Lanka.
            </p>
          </div>
        </div>
      </footer>

    </Layout>
  );
}


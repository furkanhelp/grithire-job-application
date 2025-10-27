import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/images/favicon.ico";
import Iridescence from "../components/Iridescence";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PillNav from "../components/PillNav";
import SentenceFlip from "../components/SentenceFlip";
import AnimatedGradientButton from "../components/Button";
import LogoLoop from "../components/LogoLoop";
import {
  SiAmazon,
  SiGoogle,
  SiNetflix,
  SiSpotify,
  SiUber,
  SiAirbnb,
  SiStripe,
  SiSlack,
  SiFigma,
} from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import ScrollReveal from "../components/ScrollReveal";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../components/ThemeContext";
import MagicBento from "../components/MagicBento";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import LogoutContainer from "../components/LogoutContainer";

const techLogos = [
  { node: <SiAmazon />, title: "Amazon", href: "https://amazon.com" },
  { node: <SiGoogle />, title: "Google", href: "https://google.com" },
  { node: <FaApple />, title: "Apple", href: "https://apple.com" },
  { node: <SiNetflix />, title: "Netflix", href: "https://netflix.com" },
  { node: <SiSpotify />, title: "Spotify", href: "https://spotify.com" },
  { node: <SiUber />, title: "Uber", href: "https://uber.com" },
  { node: <SiAirbnb />, title: "Airbnb", href: "https://airbnb.com" },
  { node: <SiStripe />, title: "Stripe", href: "https://stripe.com" },
  { node: <SiTesla />, title: "Tesla", href: "https://tesla.com" },
  { node: <SiSlack />, title: "Slack", href: "https://slack.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
];

const Landing = () => {
  const { user, logout, isLoading } = useAuth();
 
  const { isDarkTheme, toggleDarkTheme } = useTheme();

  
  return (
    <>
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-60 pointer-events-auto">
        <div className="flex justify-between items-center w-full !p-4">
          {/* Empty for balance */}
          <div className="w-1/3"></div>

          {/* Center Navigation */}
          <div className="w-1/3 flex justify-center">
            <PillNav
              logo={logo}
              logoAlt="Company Logo"
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
              ]}
              activeHref="/"
              className="custom-nav rounded-full opacity-65"
              ease="power2.easeOut"
              baseColor="transparent"
              pillColor="oklch(12.9% 0.042 264.695)"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#ffffff"
              isDarkTheme={isDarkTheme}
              toggleDarkTheme={toggleDarkTheme}
            />
          </div>

          {/* Right Section - Auth Buttons / User Menu */}
          <div className="w-1/3 flex justify-end items-center !space-x-4">
            {user ? (
              // Compact User Menu
              <div className="relative group hidden md:block">
                <LogoutContainer />

                {/* Dropdown Menu */}
                <div
                  className="absolute right-0 top-full mt-2 w-48 bg-gradient-to-tr 
           dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] 
                rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 
                invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 
                transform group-hover:translate-y-0 translate-y-2"
                >
                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Dashboard</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Your job applications
                        </p>
                      </div>
                    </Link>

                    {/* Profile */}
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Profile</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Edit your information
                        </p>
                      </div>
                    </Link>

                    {/* Settings */}
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-purple-600 dark:text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Settings</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Preferences & options
                        </p>
                      </div>
                    </Link>
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-center px-3 py-2.5 rounded-xl transition-all duration-200 group">
                      <ThemeToggle />
                    </div>
                    {/* Divider */}
                    <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>

                    {/* Enhanced Logout Button */}
                    <div className="px-2 pb-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center justify-center space-x-2 px-3 py-2.5
                     bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 
                     text-white rounded-xl font-medium text-sm transition-all duration-200 
                     transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg
                     group border border-red-400/30"
                      >
                        <svg
                          className="w-4 h-4 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="font-semibold">Log out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Compact Auth Buttons
              <div className="flex items-center !space-x-2 hidden md:flex">
                <ThemeToggle />
                <Link to="/register">
                  <button className="bg-gradient-to-r from-purple-900 to-pink-800 text-white font-semibold !py-2 !px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Always Visible Theme Toggle - Mobile */}
      {/* <div className="fixed top-4 right-4 z-50 hidden lg:block">
        <ThemeToggle />
      </div> */}

      {/* Main Content */}
      <div className="w-full h-screen relative pointer-events-auto">
        <Iridescence
          color={[0.2, 0, 0.3]}
          mouseReact={true}
          amplitude={0.4}
          speed={1.5}
        />
      </div>

      <div
        className="absolute left-1/2 top-1/2 
    transform -translate-x-1/2 -translate-y-1/2 
    text-center font-medium
    w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]
    max-w-[700px]
    !px-4 sm:px-6
    z-50
    overflow-hidden"
      >
        <SentenceFlip
          sentences={[
            {
              sentence: "Your personal dashboard for job applications",
              highlight: [1, 3, 4],
            },
            {
              sentence: "Keep your job search organized and efficient",
              highlight: [2, 4, 5],
            },
            {
              sentence: "Manage offers, interviews, and rejections easily",
              highlight: [2, 3, 5],
            },
            {
              sentence: "Focus on applying we handle the tracking",
              highlight: [1, 4],
            },
            {
              sentence: "Your job hunt, simplified and structured",
              highlight: [2, 5],
            },
          ]}
        />
        <p
          className="!mt-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl
      text-gray-500 leading-relaxed break-words
      !mx-auto !max-w-[90%] sm:!max-w-[85%]"
        >
          Grithire helps you organize your entire job search from applications
          to interviews all in one intuitive dashboard. Track progress, set
          reminders, and stay focused on landing your next opportunity.
        </p>
      </div>

      {/* Main CTA Buttons - Only show when not logged in */}
      {!user && (
        <div
          className="absolute 
        top-[calc(55%+150px)] sm:top-[calc(50%+130px)] md:top-[calc(50%+150px)] lg:top-[calc(50%+260px)] 
        left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        text-center flex flex-col sm:flex-row justify-center items-center 
        !gap-3 sm:gap-4 md:gap-6 w-full !max-w-[90vw] px-4 z-50"
        >
          <Link to="/register">
            <AnimatedGradientButton
              className=" register-link !w-30 !h-11 
            sm:w-40 sm:h-14 
            md:w-48 md:h-16 
            flex items-center justify-center "
            >
              Register/Demo User
            </AnimatedGradientButton>
          </Link>

          <Link to="/login">
            <AnimatedGradientButton
              className=" !w-30 !h-11
            sm:w-40 sm:h-14 
            md:w-48 md:h-16 
            flex items-center justify-center"
            >
              Login
            </AnimatedGradientButton>
          </Link>
        </div>
      )}

      <div className="w-full py-12">
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-6xl font-black text-black
           dark:text-white mb-6 tracking-tight"
          >
            <span
              className="bg-gradient-to-b from-black to-gray-900 dark:from-white
             dark:to-gray-950 bg-clip-text text-transparent drop-shadow-2xl"
            >
              FEATURED{" "}
            </span>

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              PARTNERS
            </span>
          </h2>
          <div className=" flex justify-center items-center space-x-4 ">
            <div className=" w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <p className="text-gray-400 text-sm uppercase tracking-widest !-my-1 ">
              Trusted Collaborations
            </p>
            <div className=" w-8 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
        </div>

        <div
          style={{ height: "120px", position: "relative", overflow: "hidden" }}
        >
          <LogoLoop
            className="!py-10"
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={50}
            gap={80}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="from-black to-gray-900 dark:from-white dark:to-gray-950"
            ariaLabel="Technology partners"
          />
        </div>

        {/* Nuclear CSS override */}
        <style jsx global>{`
          [class*="LogoLoop"] li,
          [class*="logoLoop"] li,
          [class*="logoloop"] li {
            margin-right: 80px !important;
          }
        `}</style>
      </div>

      <div className="w-full !py-12 !px-4 sm:px-6 lg:px-8 from-gray-900 to-black rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content - Left side */}
          <div className="flex-1 order-2 lg:order-1 lg:!px-20 xl:!px-80">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={0}
              blurStrength={3}
              containerClassName="!my-0"
              textClassName="text-gray-600 dark:text-gray-400 !text-lg leading-8 font-normal !text-left"
            >
              Pug drinking vinegar fam craft beer pork belly trust fund food
              truck, slow-carb 8-bit. Sriracha flexitarian hexagon, knausgaard
              kitsch celiac enamel pin vibecession +1. Pour-over jean shorts
              ramps, retro swag thundercats ugh photo booth man bun aesthetic
              bushwick wolf paleo. Vice green juice church-key solarpunk,
              meditation taxidermy slow-carb gorpcore organic heirloom offal
              tilde poutine. Sartorial umami ennui, fingerstache before they
              sold out same 3 wolf moon raw denim XOXO scenester glossier ascot
              pickled. Tumblr austin vibecession pop-up poke enamel pin cray
              tattooed yes plz knausgaard gastropub edison bulb pork belly
              gatekeep.
            </ScrollReveal>
          </div>

          {/* Lottie Animation - Right side */}
          <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100">
              <DotLottieReact
                src="https://lottie.host/ec94b46a-a716-4d21-befb-db25fbfd0860/GkC9RPvMj5.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 from-gray-900 to-black rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Lottie Animation - Now on left side */}
          <div className="flex-1 flex justify-center lg:justify-start order-1">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <DotLottieReact
                src="https://lottie.host/357510dc-d418-4bc8-bb99-782ad7c92a66/lgQK2eufzB.lottie"
                loop
                autoplay
              />
            </div>
          </div>

          <div className="flex-1 order-2">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={0}
              blurStrength={10}
              containerClassName="!my-0"
              textClassName="text-gray-600 dark:text-gray-400 !text-lg leading-8 font-normal !text-left"
            >
              Pug drinking vinegar fam craft beer pork belly trust fund food
              truck, slow-carb 8-bit. Sriracha flexitarian hexagon, knausgaard
              kitsch celiac enamel pin vibecession +1. Pour-over jean shorts
              ramps, retro swag thundercats ugh photo booth man bun aesthetic
              bushwick wolf paleo. Vice green juice church-key solarpunk,
              meditation taxidermy slow-carb gorpcore organic heirloom offal
              tilde poutine. Sartorial umami ennui, fingerstache before they
              sold out same 3 wolf moon raw denim XOXO scenester glossier ascot
              pickled. Tumblr austin vibecession pop-up poke enamel pin cray
              tattooed yes plz knausgaard gastropub edison bulb pork belly
              gatekeep.
            </ScrollReveal>
          </div>
        </div>
      </div>

      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
        enableImageReveal={true}
      />

      <FeaturesSection />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default Landing;

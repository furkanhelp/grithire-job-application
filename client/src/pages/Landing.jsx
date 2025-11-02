import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useToast from "../hooks/useToast";
import logo from "../assets/images/favicon.ico";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

//React Icons
import { SiAmazon } from "react-icons/si";
import { SiGoogle } from "react-icons/si";
import { SiNetflix } from "react-icons/si";
import { SiSpotify } from "react-icons/si";
import { SiUber } from "react-icons/si";
import { SiAirbnb } from "react-icons/si";
import { SiStripe } from "react-icons/si";
import { SiSlack } from "react-icons/si";
import {SiFigma} from "react-icons/si";
import { FaApple, FaSignOutAlt } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import PillNav from "../components/PillNav";
import Iridescence from "../components/Iridescence";
import SentenceFlip from "../components/SentenceFlip";
import LogoLoop from "../components/LogoLoop";
import ScrollReveal from "../components/ScrollReveal";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../components/ThemeContext";
import MagicBento from "../components/MagicBento";
import FeaturesSection from "../components/FeaturesSection";
import Testimonials from "../components/Testimonials";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import AnimatedGradientButton from "../components/Button";
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
  const { toast } = useToast(); 
  const navigate = useNavigate(); 

const handleLogout = async () => {
  try {
    const userName = user?.name || "User";
    await logout();
    toast.success(
      `Hope to see you again, ${userName}! 👋`,
      "You have been successfully logged out"
    );
    
    setTimeout(() => {
      navigate("/");
    }, 1500);
  } catch (error) {
    toast.error(
      "Logout Failed",
      "There was an issue logging out. Please try again."
    );
  }
};


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
                {/* User Info Trigger */}
                <div className="flex items-center !space-x-3 cursor-pointer lg:block hidden">
                  {/* Menu Text with Arrow */}

                  <div
                    className="border-2 border-black rounded-2xl bg-gradient-to-tr 
           dark:from-[#481f81] dark:to-[#000000] from-[#cec1e0] to-[#9950ff] 
            hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 "
                  >
                    <div
                      className="text-center capitalize text-sm !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
                  bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70
                  flex items-center !space-x-2"
                    >
                      {/* Logout Button */}
                      <div className="pointer-events-none">
                        <LogoutContainer />
                      </div>
                      <span className="mr-2">Menu</span>
                    </div>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div
                  className="absolute right-0 top-full mt-2 w-56 bg-gradient-to-tr 
           dark:from-[#481f81] dark:to-[#000000] from-[#7314f8] to-[#c19ef3] 
                rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 
                invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 
                transform group-hover:translate-y-0 translate-y-2"
                >
                  {/* User Info Header */}
                  <div className="p-4 border-b border-white/20 dark:border-gray-600/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/50 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={`${user.name} ${user.lastName}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-lg font-bold">
                            {user.name?.charAt(0)}
                            {user.lastName?.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {user.name} {user.lastName}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-white/60">
                        Welcome back!
                      </span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100/20 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-blue-300 dark:text-blue-400"
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
                        <p className="font-medium text-sm text-white">
                          Dashboard
                        </p>
                        <p className="text-xs text-white/70">
                          Your job applications
                        </p>
                      </div>
                    </Link>

                    {/* Profile */}
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center space-x-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100/20 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-green-300 dark:text-green-400"
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
                        <p className="font-medium text-sm text-white">
                          Profile
                        </p>
                        <p className="text-xs text-white/70">
                          Edit your information
                        </p>
                      </div>
                    </Link>

                    {/* Settings */}
                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-3 py-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100/20 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg
                          className="w-4 h-4 text-purple-300 dark:text-purple-400"
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
                        <p className="font-medium text-sm text-white">
                          Settings
                        </p>
                        <p className="text-xs text-white/70">
                          Preferences & options
                        </p>
                      </div>
                    </Link>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between px-3 py-2.5 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group mt-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-100/20 dark:bg-orange-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg
                            className="w-4 h-4 text-orange-300 dark:text-orange-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Theme</span>
                      </div>
                      <ThemeToggle />
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/20 my-2"></div>
                    {/* Logout Button */}
                    <div className="!p-4">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="group relative w-full bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-900
                        hover:to-pink-800 text-white !py-2 !px-2 rounded-xl font-semibold transition-all duration-300
                        transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
                      >
                        
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-500 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300"
                        ></div>

                       
                        <div className="relative flex items-center justify-center !space-x-2">
                          <FaSignOutAlt className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          <span>Log out</span>
                        </div>

                       
                        <div
                          className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform 
                      -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"
                        ></div>
                      </button>

                      {/* Cancel Button */}
                      <button
                        type="button"
                        onClick={() => setShowLogout(false)}
                        className="w-full !mt-2 !py-2 !px-2 text-gray-700 dark:text-gray-400 hover:text-gray-800
                        dark:hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Compact Auth Buttons
              <div className="flex items-center !space-x-2 hidden lg:flex">
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

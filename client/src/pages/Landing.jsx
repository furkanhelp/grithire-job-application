import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";

import { Link } from "react-router-dom";
import { Logo } from "../components";
import logo from "../assets/images/favicon.ico";
import Iridescence from "../components/Iridescence";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PillNav from "../components/PillNav";
import SentenceFlip from "../components/SentenceFlip";
import AnimatedGradientButton from "../components/Button";
import LogoLoop from "../components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import ScrollReveal from "../components/ScrollReveal";

import ThemeToggle from "../components/ThemeToggle";
  


const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const imageLogos = [
  {
    src: "/logos/company1.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logos/company2.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/logos/company3.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];



const Landing = () => {
  
  return (
    <Wrapper>
      {/* Navbar with Theme Toggle */}
      <div className="flex justify-between items-center w-full fixed top-0 left-0 right-0 z-50 p-4">
        {/* Empty div to balance the layout */}
        <div className="w-1/3"></div>

        {/* Centered PillNav */}
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
          />
        </div>

        {/* Theme Toggle in Top-Right - Using your ThemeToggle component */}
        <div className="w-1/3 flex justify-end ">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full h-screen relative">
        <Iridescence
          color={[0.3, 0, 0.2]}
          mouseReact={true}
          amplitude={0.3}
          speed={1.0}
        />
      </div>

      {/* <nav>
        <Link to="/">
        <Logo />
        </Link>
        </nav> */}

      <div
        className="absolute left-[55%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-medium 
  w-full max-w-[90vw] px-4
  sm:max-w-[80vw] sm:px-6
  md:max-w-[70vw] 
  lg:max-w-[60vw] 
  xl:max-w-[50vw]"
      >
        <SentenceFlip
          sentences={[
            {
              sentence: "The home for your AI assistants",
              highlight: [1, 4, 5],
            },
            {
              sentence: "Build personal AI assistants your way",
              highlight: [1, 2, 3],
            },
            {
              sentence: "Build smarter assistants, your unique way",
              highlight: [1, 2],
            },
            {
              sentence: "Create custom AI with custom prompts",
              highlight: [2, 4, 5],
            },
            { sentence: "Break free from Generic AI", highlight: [3, 4] },
          ]}
        />
      </div>

      <div
        className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center 
    px-4 py-3 
    sm:px-3 sm:py-2 
    md:px-5 md:py-3
    flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 "
      >
        <Link to="/register">
          <AnimatedGradientButton
            className=" register-link !w-30 !h-11 
  sm:w-40 sm:h-14 
  md:w-48 md:h-16 
  flex items-center justify-center "
          >
            Register
          </AnimatedGradientButton>
        </Link>

        <Link to="/login">
          <AnimatedGradientButton
            className=" !w-30 !h-11
  sm:w-40 sm:h-14 
  md:w-48 md:h-16 
  flex items-center justify-center"
          >
            Login / Demo User
          </AnimatedGradientButton>
        </Link>
      </div>

      <div className="w-full py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-black to-gray-900 dark:from-white dark:to-gray-950 bg-clip-text text-transparent drop-shadow-2xl">
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

      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 from-gray-900 to-black rounded-3xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content - Left side */}
          <div className="flex-1 order-2 lg:order-1 lg:!px-20 xl:!px-80">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={0}
              blurStrength={5}
              containerClassName="!my-0"
              textClassName="!text-lg leading-8 font-normal !text-left" // Custom text styles
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
                src="https://lottie.host/357510dc-d418-4bc8-bb99-782ad7c92a66/lgQK2eufzB.lottie"
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
              textClassName="text-white !text-lg leading-8 font-normal !text-left"
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

      {/* <div className="container page">
        <div className="info">
          <p>
            Pug drinking vinegar fam craft beer pork belly trust fund food
            truck, slow-carb 8-bit. Sriracha flexitarian hexagon, knausgaard
            kitsch celiac enamel pin vibecession +1. Pour-over jean shorts
            ramps, retro swag thundercats ugh photo booth man bun aesthetic
            bushwick wolf paleo. Vice green juice church-key solarpunk,
            meditation taxidermy slow-carb gorpcore organic heirloom offal tilde
            poutine. Sartorial umami ennui, fingerstache before they sold out
            same 3 wolf moon raw denim XOXO scenester glossier ascot pickled.
            Tumblr austin vibecession pop-up poke enamel pin cray tattooed yes
            plz knausgaard gastropub edison bulb pork belly gatekeep.
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="grit" className="img main-img" /> */}
      {/* <DotLottieReact
        src="https://lottie.host/357510dc-d418-4bc8-bb99-782ad7c92a66/lgQK2eufzB.lottie"
        loop
        autoplay
      /> */}
      <DotLottieReact
        className="img main-img"
        src="https://lottie.host/ec94b46a-a716-4d21-befb-db25fbfd0860/GkC9RPvMj5.lottie"
        loop
        autoplay
      />
    </Wrapper>
  );
};

export default Landing;

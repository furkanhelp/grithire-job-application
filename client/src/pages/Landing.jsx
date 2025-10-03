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

const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];
const Landing = () => {
  return (
    <Wrapper>
      <div className="flex justify-center w-full fixed top-5 left-0 right-0 z-50 pt-4 ">
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

      <div className="container page">
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

          {/* <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link> */}
        </div>
        {/* <img src={main} alt="grit" className="img main-img" /> */}
        <DotLottieReact
          src="https://lottie.host/357510dc-d418-4bc8-bb99-782ad7c92a66/lgQK2eufzB.lottie"
          loop
          autoplay
        />
        <DotLottieReact
          className="img main-img"
          src="https://lottie.host/ec94b46a-a716-4d21-befb-db25fbfd0860/GkC9RPvMj5.lottie"
          loop
          autoplay
        />
      </div>
    </Wrapper>
  );
};

export default Landing;

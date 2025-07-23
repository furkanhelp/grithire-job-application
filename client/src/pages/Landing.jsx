import styled from "styled-components";
import Wrapper from '../assets/wrappers/LandingPage';
import main from "../assets/images/main.svg";

import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper >
      <nav>

        <Link to="/">
          <Logo />
        </Link>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job tracking app</h1>
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
        <img src={main} alt="grit" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing
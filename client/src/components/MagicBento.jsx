import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import CountUp from "../components/CountUp";


const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

const cardData = [
  {
    color: "#060010",
    title: "Analytics",
    description: "Insights on your progress",
    label: "Efficiency",
    animatedFile: "/dist/assets/dashboard.svg", // SVG for desktop
    image: "/dist/assets/dashboard.svg",
    countUp: {
      value: 4,
      suffix: "",
      label: "COMPONENT VARIANTS",
      gradient: "from-yellow-400 to-amber-600",
    },
  },
  {
    color: "#060010",
    title: "Interviews",
    description: "View upcoming or past interviews",
    label: "Connectivity",
    animatedFile: "/dist/assets/consulting.svg", // SVG for desktop
    image: "/dist/assets/consulting.svg",
  },
  {
    color: "#060010",
    title: "Security",
    description: "Enterprise-grade protection",
    label: "Protection",
    animatedFile: "/dist/assets/security.svg", // SVG for desktop
    image: "/dist/assets/security.svg",
    countUp: {
      value: 100,
      suffix: "%",
      label: "SUCCESS RATE",
      gradient: "from-purple-400 to-fuchsia-600",
    },
  },
];

// Helper functions
const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// GlobalSpotlight component
const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) =>
          card.style.setProperty("--glow-intensity", "0")
        );
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance)
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

        updateCardGlowProperties(
          card,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlightRef.current?.remove();
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// BentoCardGrid component
const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-2 p-3 max-w-[104rem] select-none relative mx-auto"
    ref={gridRef}
  >
    {children}
  </div>
);

// Mobile detection hook
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Main Component
const MagicBento = ({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
  enableImageReveal = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const revealRefs = useRef([]);

  const handleCardMouseMove = useCallback(
    (e, index) => {
      if (
        !enableImageReveal ||
        shouldDisableAnimations ||
        !revealRefs.current[index]
      )
        return;

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const revealEl = revealRefs.current[index];
      if (revealEl) {
        revealEl.style.setProperty("--mx", `${x}px`);
        revealEl.style.setProperty("--my", `${y}px`);
      }
    },
    [enableImageReveal, shouldDisableAnimations]
  );

  const handleCardMouseLeave = useCallback(
    (index) => {
      if (!enableImageReveal || !revealRefs.current[index]) return;

      const revealEl = revealRefs.current[index];
      if (revealEl) {
        revealEl.style.setProperty("--mx", "-9999px");
        revealEl.style.setProperty("--my", "-9999px");
      }
    },
    [enableImageReveal]
  );

  return (
    <>
      <style>
        {`
      .bento-section {
        --glow-x: 50%;
        --glow-y: 50%;
        --glow-intensity: 0;
        --glow-radius: 200px;
        --glow-color: ${glowColor};
        --border-color: #392e4e;
        --background-dark: #060010;
      }
      
      .card-responsive {
        display: grid;
        width: 100%;
        max-width: 120rem;
        margin: 0 auto;
        padding: 0.5rem;
        gap: 0.85rem;
      }
      
      /* Mobile First */
      @media (max-width: 639px) {
        .card-responsive { grid-template-columns: 1fr; width: 95%; }
        .card-responsive .card { min-height: 160px; }
      }

      @media (max-width: 768px) {
        .card-reveal-animated { display: none; }
        .countup-number { font-size: 2rem; }
        .countup-label { font-size: 0.75rem; }
        .mobile-image { display: block; }
      }

      @media (min-width: 769px) {
        .card-reveal-animated { display: block; }
        .countup-number { font-size: 3rem; }
        .countup-label { font-size: 0.875rem; }
        .mobile-image { display: none; }
      }

      /* Tablet */
      @media (min-width: 640px) and (max-width: 1023px) {
        .card-responsive { grid-template-columns: repeat(2, 1fr); width: 95%; }
      }
      
      @media (min-width: 1024px) {
        .bento-section {
          max-width: 100rem !important; 
          margin: 0 auto !important;
        }
        .card-responsive {
          grid-template-columns: repeat(3, 1fr);
        }
        
        /* Analytics - Make it larger */
        .card-responsive .card:nth-child(1) {
          grid-column: span 2;
          grid-row: span 2;
        }
        
        .card-responsive .card:nth-child(1) .card-title {
        font-size: 5.5rem;

        }
        .card-responsive .card:nth-child(1) .card-description{
        font-size: 1.5rem;
        }
        .card-responsive .card:nth-child(1) .countup-number{
        font-size: 5.5rem;
        }

        /* Interviews - Top right */
        .card-responsive .card:nth-child(2) {
          grid-column: 3;
          grid-row: 1;
        }
        
        .card-responsive .card:nth-child(2) .card-title {
           font-size: 3rem;
        }
        .card-responsive .card:nth-child(2) .card-description{
        font-size: 1rem;
        }

        /* Security - Bottom right */
        .card-responsive .card:nth-child(3) {
          grid-column: 3;
          grid-row: 2;
        }

        .card-responsive .card:nth-child(3) .card-title{
          font-size: 3rem;
        }
        .card-responsive .card:nth-child(3) .card-description{
        font-size: 1rem;
        }
      }
      
      /* Enhanced Typography */
      .card-title {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 1.2;
        background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: -0.025em;
        margin-bottom: 1rem;
      }
      
      .card-description {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 400;
        font-size: 0.95rem;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.85);
        opacity: 0.9;
      }
      
      .countup-container {
        margin: 1.5rem 0;
      }
      
      .countup-number {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 900;
        letter-spacing: -0.02em;
        background: linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #F59E0B 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3));
      }
      
      .countup-suffix {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 700;
        letter-spacing: -0.01em;
      }
      
      .countup-subtitle {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.75rem;
      }

      /* Animated SVG reveal styles */
      .card-reveal-animated {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 5;
        mix-blend-mode: lighten;
        opacity: 0.6;
        pointer-events: none;
        --mx: -9999px;
        --my: -9999px;
        -webkit-mask-image: radial-gradient(
          circle at var(--mx) var(--my), 
          rgba(255,255,255,1) 0px, 
          rgba(255,255,255,0.98) 120px,
          rgba(255,255,255,0.8) 200px,
          rgba(255,255,255,0.5) 300px,
          rgba(255,255,255,0.2) 400px,
          rgba(255,255,255,0) 500px
        );
        mask-image: radial-gradient(
          circle at var(--mx) var(--my), 
          rgba(255,255,255,1) 0px, 
          rgba(255,255,255,0.98) 120px,
          rgba(255,255,255,0.8) 200px,
          rgba(255,255,255,0.5) 300px,
          rgba(255,255,255,0.2) 400px,
          rgba(255,255,255,0) 500px
        );
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        overflow: hidden;
        border-radius: 20px;
      }

      .animated-svg {
        width: 100% !important;
        height: 100% !important;
        border-radius: 20px;
        object-fit: cover;
      }

      /* Mobile GIF styles */
      .mobile-image {
        position: absolute;
        inset: 0;
        z-index: 0;
        opacity: 0.3;
        transition: opacity 0.3s ease;
        border-radius: 20px;
        overflow: hidden;
      }

      .mobile-image:hover { opacity: 0.4; }
      .mobile-image img { width: 100%; height: 100%; object-fit: cover; }

      /* Card content */
      .card__header, .card__content { position: relative; z-index: 10; }

      .text-clamp-1, .text-clamp-2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .text-clamp-1 { -webkit-line-clamp: 1; line-clamp: 1; }
      .text-clamp-2 { -webkit-line-clamp: 2; line-clamp: 2; }
      
      .card--border-glow::after {
        content: '';
        position: absolute;
        inset: 0;
        padding: 6px;
        background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%);
        border-radius: inherit;
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: subtract;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        pointer-events: none;
        transition: opacity 0.3s ease;
        z-index: 1;
      }
      
      .card--border-glow:hover::after { opacity: 1; }
    `}
      </style>

      <div className="relative overflow-hidden from-black to-gray-900 dark:from-white rounded-3xl min-h-[600px]">
        <div className="relative z-10">
          {enableSpotlight && (
            <GlobalSpotlight
              gridRef={gridRef}
              disableAnimations={shouldDisableAnimations}
              spotlightRadius={spotlightRadius}
              glowColor={glowColor}
            />
          )}
          <BentoCardGrid gridRef={gridRef}>
            <div className="card-responsive grid gap-2">
              {cardData.map((card, index) => {
                const isRevealCard = !isMobile && card.animatedFile;

                return (
                  <div
                    key={index}
                    className={`card flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
                      enableBorderGlow ? "card--border-glow" : ""
                    }`}
                    style={{
                      backgroundColor: card.color || "var(--background-dark)",
                      borderColor: "var(--border-color)",
                      color: "white",
                    }}
                    onMouseMove={(e) =>
                      isRevealCard && handleCardMouseMove(e, index)
                    }
                    onMouseLeave={() =>
                      isRevealCard && handleCardMouseLeave(index)
                    }
                  >
                    {/* Mobile GIF Background */}
                    {card.image && (
                      <div className="mobile-image">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Desktop SVG Animation */}
                    {isRevealCard && enableImageReveal && card.animatedFile && (
                      <div
                        ref={(el) => (revealRefs.current[index] = el)}
                        className="card-reveal-animated"
                      >
                        <img
                          src={card.animatedFile}
                          alt={`${card.title} animation`}
                          className="animated-svg"
                        />
                      </div>
                    )}

                    <div className="card__content flex flex-col justify-between relative text-white z-10 h-full">
                      {/* Title Section */}
                      <div className="flex flex-col items-center text-center">
                        <h3
                          className={`card-title ${
                            textAutoHide ? "text-clamp-1" : ""
                          }`}
                        >
                          {card.title}
                        </h3>
                      </div>

                      {/* CountUp Section - Centered */}
                      {card.countUp && (
                        <div className="countup-container flex flex-col items-center justify-center space-y-3">
                          <div className="flex items-baseline justify-center">
                            <CountUp
                              from={0}
                              to={card.countUp.value}
                              separator=","
                              direction="up"
                              duration={2.5}
                              className="countup-number text-4xl md:text-5xl"
                              decimals={card.countUp.decimals}
                            />
                            <span className="countup-suffix text-2xl md:text-3xl ml-2">
                              {card.countUp.suffix}
                            </span>
                          </div>
                          <p className="countup-subtitle">
                            {card.countUp.label}
                          </p>
                        </div>
                      )}

                      {/* Description Section */}
                      <div className="flex flex-col items-center text-center mt-auto">
                        <p
                          className={`card-description ${
                            textAutoHide ? "text-clamp-2" : ""
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </BentoCardGrid>
        </div>
      </div>
    </>
  );
};

export default MagicBento;

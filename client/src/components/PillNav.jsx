import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#000000",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  isDarkTheme,
  toggleDarkTheme,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);
  const menuTl = useRef(null);

  // cssVars
  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "42px",
    ["--logo"]: "36px",
    ["--pill-pad-x"]: "18px",
    ["--pill-gap"]: "3px",
  };

  // handle outside clicks
  useEffect(() => {
    const handlePointerDownOutside = (event) => {
      if (!mobileMenuRef.current || !hamburgerRef.current) return;

      // Robust path detection
      const path = event.composedPath ? event.composedPath() : event.path || [];

      const clickedInsideMenu = path.includes(mobileMenuRef.current);
      const clickedHamburger = path.includes(hamburgerRef.current);

      // Detect theme button
      const clickedThemeToggle = path.some((node) => {
        try {
          return node?.classList?.contains?.("theme-toggle-btn");
        } catch {
          return false;
        }
      });

      if (
        isMobileMenuOpen &&
        !clickedInsideMenu &&
        !clickedHamburger &&
        !clickedThemeToggle
      ) {
        // close menu
        toggleMobileMenu();
      }
    };

    // it runs early and works with composited events
    document.addEventListener("pointerdown", handlePointerDownOutside, {
      capture: true,
    });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside, {
        capture: true,
      });
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, {
        visibility: "hidden",
        opacity: 0,
        scale: 0.8,
        rotationX: 90,
      });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling on background
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]); 

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    // Kill any existing animation
    menuTl.current?.kill();

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      const dot = hamburger.querySelector(".hamburger-dot");

      if (newState) {
        // Open animation - morph into X
        gsap.to(lines[0], { rotation: 45, y: 8, duration: 0.4, ease });
        gsap.to(lines[1], { rotation: -45, y: -8, duration: 0.4, ease });
        gsap.to(dot, { scale: 0, duration: 0.2, ease });
      } else {
        // Close animation - morph back from X
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.4, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.4, ease });
        gsap.to(dot, { scale: 1, duration: 0.3, delay: 0.1, ease });
      }
    }

    if (menu) {
      if (newState) {
        // Open menu with 3D flip effect
        gsap.set(menu, { visibility: "visible" });
        menuTl.current = gsap.timeline().fromTo(
          menu,
          { opacity: 0, scale: 0.8, rotationX: 90, y: 50 },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            transformOrigin: "top center",
          }
        );
      } else {
        // Close menu with reverse animation
        menuTl.current = gsap.timeline().to(menu, {
          opacity: 0,
          scale: 0.8,
          rotationX: 90,
          y: 50,
          duration: 0.4,
          ease: "power2.in",
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href) => href && !isExternalLink(href);

  // Update the ThemeToggleButton component in the same file
  const ThemeToggleButton = () => (
    <motion.button
      className={`theme-toggle-btn relative w-10 h-10 rounded-full border-2 flex items-center justify-center 
    transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm
    ${
      isDarkTheme
        ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/60"
        : "bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-400/60"
    }`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkTheme();
      }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isDarkTheme ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <BsFillMoonFill className="w-4 h-4 text-purple-200" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
          >
            <BsFillSunFill className="w-4 h-4 text-amber-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  return (
    <div
      className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto
    "
    >
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start 
          box-border !px-4 md:px-0  ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            to={items[0].href}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            role="menuitem"
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full !p-2 inline-flex items-center justify-center overflow-hidden
            "
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block  "
            />
          </Link>
        ) : (
          <a
            href={items?.[0]?.href || "#"}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            ref={(el) => {
              logoRef.current = el;
            }}
            className="rounded-full !p-2 inline-flex items-center justify-center overflow-hidden "
            style={{
              width: "var(--nav-h)",
              height: "var(--nav-h)",
              background: "var(--base, #000)",
            }}
          >
            <img
              src={logo}
              alt={logoAlt}
              ref={logoImgRef}
              className="w-full h-full object-cover block"
            />
          </a>
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2 "
          style={{
            height: "var(--nav-h)",
            background: "var(--base, #000)",
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 !p-[3px] h-full "
            style={{ gap: "var(--pill-gap)" }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle = {
                background: "var(--pill-bg, #fff)",
                color: "var(--pill-text, var(--base, #000))",
                paddingLeft: "var(--pill-pad-x)",
                paddingRight: "var(--pill-pad-x)",
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] 
                    block pointer-events-none "
                    style={{
                      background: "var(--base, #000)",
                      willChange: "transform",
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2] ">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1] "
                      style={{ willChange: "transform" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block "
                      style={{
                        color: "var(--hover-text, #fff)",
                        willChange: "transform, opacity",
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 
                      rounded-full z-[4] "
                      style={{ background: "var(--base, #000)" }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-semibold text-[16px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

              return (
                <li key={item.href} role="none" className="flex h-full ">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Modern Hamburger Menu */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full flex flex-col items-center justify-center cursor-pointer 
          !p-3 relative group backdrop-blur-md bg-gradient-to-br 
          from-white/20 to-white/10 border border-white/30 shadow-lg 
          hover:bg-white/30 transition-all duration-300"
          style={{
            width: "var(--nav-h)",
            height: "var(--nav-h)",
          }}
        >
          {/* Animated Hamburger Lines */}
          <span
            className=" hamburger-line w-5 h-0.5 rounded-full 
            origin-center transition-all duration-300 ease-out
            !mb-1.5 bg-black dark:!bg-white"
            style={{ background: "var(--pill-bg, #ffffff)" }}
          />
          <span
            className="hamburger-line w-5 h-0.5 rounded-full 
            origin-center transition-all duration-300 ease-out 
            bg-black dark:!bg-white"
            style={{ background: "var(--pill-bg, #ffffff)" }}
          />
          {/* Central Dot */}
          <span
            className="hamburger-dot absolute w-1 h-0 rounded-full 
            transition-all duration-200 ease-out "
            style={{ background: "var(--pill-bg, #ffffff)" }}
          />
        </button>
      </nav>
      {/* Modern Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 z-[999] !backdrop-blur-xl"
        style={{
          background: isDarkTheme
            ? "linear-gradient(135deg, rgba(26, 15, 46, 0.98) 0%, rgba(38, 20, 63, 0.98) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(178, 137, 255, 0.98) 100%)",
        }}
      >
        {/* Top Bar with Close button and Theme Toggle */}
        <div className="flex justify-between items-center !p-6 !pb-4 border-b border-white/10">
          {/* Logo and Title */}
          <div className="flex items-center !space-x-3">
            <img
              src={logo}
              alt={logoAlt}
              className="w-10 h-10 rounded-full object-cover border border-white/30"
            />
            <h2
              className="text-xl !font-sans !font-bold !tracking-[-0.025em] !leading-[1.5] bg-clip-text text-transparent 
              bg-gradient-to-r dark:to-[#a5b4fc] dark:from-white to-[#4818a0] from-black/70 "
            >
              Grithire
            </h2>
          </div>

          {/* Theme Toggle and Close button */}
          <div className="flex items-center !space-x-3">
            <div
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ThemeToggleButton />
            </div>
            <button
              onClick={toggleMobileMenu}
              className="!p-2 rounded-full bg-gradient-to-br from-white/70 to-white/20 border 
              border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 dark:text-white text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col !p-6 !pt-8 !h-[calc(100vh-80px)] !overflow-y-auto">
          {/* Navigation Links */}
          <ul className="!space-y-3 !mb-8">
            {items.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.href}>
                  {isRouterLink(item.href) ? (
                    <Link
                      to={item.href}
                      className="block !py-3 !px-4 text-base font-medium rounded-xl transition-all 
                      duration-200 hover:!scale-[1.02] hover:!shadow-md"
                      style={{
                        background: isActive
                          ? "#3f1d6e" // Purple for active links (both modes)
                          : isDarkTheme
                          ? "rgba(139, 92, 246, 0.1)" // Light purple bg in dark
                          : "rgba(139, 92, 246, 0.05)", // Very light purple bg in light
                        color: isActive
                          ? "#FFFFFF" // White text for active
                          : isDarkTheme
                          ? "#E5E7EB" // Light gray in dark
                          : "#4B5563", // Dark gray in light
                        border: isActive
                          ? "none"
                          : isDarkTheme
                          ? "1px solid rgba(139, 92, 246, 0.3)" // Purple border in dark
                          : "1px solid rgba(139, 92, 246, 0.2)", // Light purple border in light
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="block !py-3 !px-4 text-base font-medium rounded-xl transition-all 
                      duration-200 hover:!scale-[1.02] hover:!shadow-md"
                      style={{
                        background: isActive
                          ? "var(--pill-bg, #fff)"
                          : "rgba(255,255,255,0.08)",
                        color: isActive
                          ? "var(--hover-text, #fff)"
                          : "var(--pill-text, #fff)",
                        border: isActive
                          ? "none"
                          : "1px solid rgba(255,255,255,0.15)",
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Auth Buttons - At the bottom */}
          <div className="!mt-15 !space-y-3">
            <Link
              to="/register"
              className="block !py-3 !px-4 text-base font-semibold rounded-xl text-center 
              transition-all duration-200 hover:!scale-[1.02] hover:!shadow-md !border-0"
              style={{
                background: isDarkTheme
                  ? "var(--pill-bg, #3f1d6e)" // 👈 Dark mode background
                  : "#3f1d6e", // 👈 Light mode background
                color: isDarkTheme
                  ? "var(--hover-text, #fff)" // 👈 Dark mode text
                  : "#FFFFFF", // 👈 Light mode text
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="block !py-3 !px-4 text-base font-semibold rounded-xl text-center 
              transition-all duration-200 hover:!scale-[1.02] hover:!shadow-md !border"
              style={{
                background: "transparent",
                color: isDarkTheme
                  ? "var(--pill-text, #fff)" // 👈 Dark mode text
                  : "#ffffff", // 👈 Light mode text
                borderColor: isDarkTheme
                  ? "var(--pill-bg, #fff)" // 👈 Dark mode border
                  : "#3f1d6e", // 👈 Light mode border
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Demo User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PillNav;

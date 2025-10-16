import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "../assets/images/favicon.ico";

export const StaggeredMenu = ({
  position = "left",
  colors = ["#B19EEF", "#5227FF"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = { logo },
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  changeMenuColorOnOpen = true,
  isFixed = false,
  accentColor = "#5227FF",
  user = { user },
  onMenuOpen,
  onMenuClose,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(["Menu", "Close"]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".sm-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      // Use transform instead of xPercent for better mobile performance
      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  // Rest of your GSAP animation functions remain the same...
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel"));
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    );
    const socialTitle = panel.querySelector(".sm-socials-title");
    const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link"));
    const userInfo = panel.querySelector(".sm-user-info");
    const sidebarHeader = panel.querySelector(".sm-sidebar-header");
    const logoutSection = panel.querySelector(".sm-logout-section");

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    if (userInfo) gsap.set(userInfo, { opacity: 0, y: 20 });
    if (sidebarHeader) gsap.set(sidebarHeader, { opacity: 0, y: 20 });
    if (logoutSection) gsap.set(logoutSection, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    // Animate sidebar header and user info first
    if (sidebarHeader) {
      tl.fromTo(
        sidebarHeader,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        panelInsertTime + 0.1
      );
    }

    if (userInfo) {
      tl.fromTo(
        userInfo,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        panelInsertTime + 0.2
      );
    }

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity"]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => gsap.set(socialLinks, { clearProps: "opacity" }),
          },
          socialsStart + 0.04
        );
      }
    }

    // Animate logout section last
    if (logoutSection) {
      tl.fromTo(
        logoutSection,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        panelInsertTime + 0.5
      );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        );
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item"
          )
        );
        if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity"]: 0 });

        const socialTitle = panel.querySelector(".sm-socials-title");
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link")
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        const userInfo = panel.querySelector(".sm-user-info");
        const sidebarHeader = panel.querySelector(".sm-sidebar-header");
        const logoutSection = panel.querySelector(".sm-logout-section");
        if (userInfo) gsap.set(userInfo, { opacity: 0, y: 20 });
        if (sidebarHeader) gsap.set(sidebarHeader, { opacity: 0, y: 20 });
        if (logoutSection) gsap.set(logoutSection, { opacity: 0, y: 20 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  return (
    <div
      className={`sm-scope z-40 ${
        isFixed
          ? "fixed top-0 left-0 w-screen h-screen overflow-hidden"
          : "w-full h-full"
      }`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper relative w-full h-full"
        }
        style={accentColor ? { ["--sm-accent"]: accentColor } : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 left-0 
          bottom-0 pointer-events-none z-[5] w-full sm:w-80"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["#1e1e22", "#35353c"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>
        <header
          className="staggered-menu-header absolute top-0 left-0 w-full 
          flex items-center justify-between !p-4 sm:!p-[2em] bg-transparent pointer-events-none z-20"
          aria-label="Main navigation header"
        >
          <div
            className="sm-logo flex items-center select-none pointer-events-auto"
            aria-label="Logo"
          >
            <img
              src={logoUrl}
              alt="Logo"
              className="sm-logo-img block !h-6 sm:!h-8 w-auto object-contain"
              draggable={false}
              width={110}
              height={24}
            />
          </div>

          <button
            ref={toggleBtnRef}
            className="sm-toggle relative inline-flex items-center !gap-[0.3rem] 
            bg-transparent border-0 cursor-pointer text-[#ffffff] font-medium 
            leading-none overflow-visible pointer-events-auto text-sm sm:text-base"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative inline-block !h-[1em] 
              overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] 
              min-w-[var(--sm-toggle-width,auto)]"
              aria-hidden="true"
            >
              <span
                ref={textInnerRef}
                className="sm-toggle-textInner flex flex-col leading-none"
              >
                {textLines.map((l, i) => (
                  <span
                    className="sm-toggle-line block h-[1em] leading-none text-sm sm:text-base"
                    key={i}
                  >
                    {l}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative w-3 h-3 sm:w-[14px] sm:h-[14px] shrink-0 inline-flex 
              items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full 
                h-[1.5px] sm:h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 
                [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 
                top-1/2 w-full h-[1.5px] sm:h-[2px] bg-current rounded-[2px] -translate-x-1/2
                 -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 left-0 h-full
           bg-white flex flex-col overflow-y-auto !z-10 backdrop-blur-[12px] w-full sm:w-80"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col !gap-4 sm:!gap-6">
            {/* Sidebar Header */}
            <div className="sm-sidebar-header !p-4 sm:!p-4 !pt-16 sm:!pt-15 border-b border-gray-200">
              <div className="flex items-center !space-x-3">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 
                rounded-lg flex items-center justify-center"
                >
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="sm-logo-img block !h-6 sm:!h-8 w-auto object-contain"
                    draggable={false}
                    width={110}
                    height={24}
                  />
                  <span className="text-white font-bold text-base sm:text-lg">
                    G
                  </span>
                </div>
                <div>
                  <h1 className="!text-lg sm:!text-xl font-bold text-gray-900">
                    HIRE Dashboard
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Welcome back
                  </p>
                </div>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="!p-4 sm:!p-6 border-b border-gray-200 dark:border-gray-500">
                <div className="flex items-center !space-x-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.name || user.email}'s avatar`}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-300
                       dark:border-gray-600"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-blue-500 
                    rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base"
                    >
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="!text-xs sm:!text-sm !font-medium capitalize text-gray-900 dark:text-black truncate">
                      {user?.name || user?.email}
                    </p>
                    <p className="!text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Items */}
            <ul
              className="sm-panel-list list-none m-0 !p-0 flex flex-col !gap-1 sm:!gap-2 flex-1 !px-4"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative text-black !font-semibold !text-2xl sm:!text-[2.5rem] 
                      cursor-pointer leading-none !tracking-[-1px] sm:!tracking-[-2px] uppercase transition-[background,color] 
                      duration-150 ease-linear inline-block no-underline !pr-8 sm:!pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span
                        className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] 
                      will-change-transform"
                      >
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span
                    className="sm-panel-item relative text-black font-semibold !text-2xl sm:!text-[3rem] 
                  cursor-pointer leading-none !tracking-[-1px] sm:!tracking-[-2px] uppercase transition-[background,color] 
                  duration-150 ease-linear inline-block no-underline !pr-8 sm:!pr-[1.4em]"
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {/* Logout Section */}
            <div className="sm-logout-section !p-4 border-t border-gray-200 !mt-auto">
              <div className="bg-gradient-to-r from-red-50 to-purple-50 !rounded-xl !p-3 sm:!p-4">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center !space-x-2 !px-4
                  !py-2 sm:!py-1 bg-gradient-to-r from-purple-900 to-pink-800 hover:from-purple-900
                 hover:to-pink-800 text-white rounded-lg font-medium text-sm sm:text-base
                  transition-all duration-200 transform hover:scale-105"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
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
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials !mt-4 !pt-4 flex flex-col !gap-3 border-t border-gray-200 !px-3"
                aria-label="Social links"
              >
                <h3
                  className="sm-socials-title !m-0 text-sm sm:text-base font-medium 
                [color:var(--sm-accent,#ff0000)]"
                >
                  Socials
                </h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center 
                  gap-3 sm:gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link !text-base sm:!text-[1.2rem] font-medium text-[#111] 
                        no-underline relative inline-block !py-[2px] transition-[color,opacity]
                         duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { 
  position: relative; 
  width: 100%; 
  height: 100%; 
  z-index: 40; 
}

.sm-scope .staggered-menu-header { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 100%; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 1rem; 
  background: transparent; 
  pointer-events: none; 
  z-index: 20; 
}

.sm-scope .staggered-menu-header > * { 
  pointer-events: auto; 
}

.sm-scope .sm-logo { 
  display: flex; 
  align-items: center; 
  user-select: none; 
}

.sm-scope .sm-logo-img { 
  display: block; 
  height: 32px; 
  width: auto; 
  object-fit: contain; 
}

.sm-scope .sm-toggle { 
  position: relative; 
  display: inline-flex; 
  align-items: center; 
  gap: 0.3rem; 
  background: transparent; 
  border: none; 
  cursor: pointer; 
  color: #e9e9ef; 
  font-weight: 500; 
  line-height: 1; 
  overflow: visible; 
  font-size: 1rem; 
}

.sm-scope .sm-toggle:focus-visible { 
  outline: 2px solid #ffffffaa; 
  outline-offset: 4px; 
  border-radius: 4px; 
}

.sm-scope .sm-toggle-textWrap { 
  position: relative; 
  margin-right: 0.5em; 
  display: inline-block; 
  height: 1em; 
  overflow: hidden; 
  white-space: nowrap; 
  width: var(--sm-toggle-width, auto); 
  min-width: var(--sm-toggle-width, auto); 
}

.sm-scope .sm-toggle-textInner { 
  display: flex; 
  flex-direction: column; 
  line-height: 1; 
}

.sm-scope .sm-toggle-line { 
  display: block; 
  height: 1em; 
  line-height: 1; 
  font-size: 1rem; 
}

.sm-scope .sm-icon { 
  position: relative; 
  width: 14px; 
  height: 14px; 
  flex: 0 0 14px; 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  will-change: transform; 
}

.sm-scope .sm-panel-itemWrap { 
  position: relative; 
  overflow: hidden; 
  line-height: 1; 
}

.sm-scope .sm-icon-line { 
  position: absolute; 
  left: 50%; 
  top: 50%; 
  width: 100%; 
  height: 2px; 
  background: currentColor; 
  border-radius: 2px; 
  transform: translate(-50%, -50%); 
  will-change: transform; 
}

.sm-scope .staggered-menu-panel { 
  position: fixed; 
  top: 0; 
  left: 0; 
  width: 100vw; 
  height: 100vh; 
  background: white; 
  backdrop-filter: blur(12px); 
  -webkit-backdrop-filter: blur(12px); 
  display: flex; 
  flex-direction: column; 
  padding: 1rem;
  overflow-y: auto; 
  z-index: 10; 
}

.sm-scope .sm-prelayers { 
  position: fixed; 
  top: 0; 
  left: 0; 
  bottom: 0; 
  width: 100vw;
  pointer-events: none; 
  z-index: 5; 
}

.sm-scope .sm-prelayer { 
  position: absolute; 
  top: 0; 
  right: 0; 
  height: 100%; 
  width: 100%; 
  transform: translateX(0); 
}

.sm-scope .sm-panel-inner { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem; 
}

.sm-scope .sm-socials { 
  margin-top: auto; 
  padding-top: 1rem; 
  display: flex; 
  flex-direction: column; 
  gap: 0.75rem; 
}

.sm-scope .sm-socials-title { 
  margin: 0; 
  font-size: 1rem; 
  font-weight: 500; 
  color: var(--sm-accent, #ff0000); 
}

.sm-scope .sm-socials-list { 
  list-style: none; 
  margin: 0; 
  padding: 0; 
  display: flex; 
  flex-direction: row; 
  align-items: center; 
  gap: 1rem; 
  flex-wrap: wrap; 
}

.sm-scope .sm-socials-link { 
  font-size: 1.2rem; 
  font-weight: 500; 
  color: #111; 
  text-decoration: none; 
  position: relative; 
  padding: 2px 0; 
  display: inline-block; 
  transition: color 0.3s ease, opacity 0.3s ease; 
}

.sm-scope .sm-socials-link:hover { 
  color: var(--sm-accent, #000000); 
}

.sm-scope .sm-panel-list { 
  list-style: none; 
  margin: 0; 
  padding: 0; 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
}

.sm-scope .sm-panel-item { 
  position: relative; 
  color: #000; 
  font-weight: 600; 
  font-size: 2rem; 
  cursor: pointer; 
  line-height: 1; 
  letter-spacing: -1px; 
  text-transform: uppercase; 
  transition: background 0.25s, color 0.25s; 
  display: inline-block; 
  text-decoration: none; 
  padding-right: 1.4em; 
  min-height: 44px;
  display: flex;
  align-items: center;
}

.sm-scope .sm-panel-itemLabel { 
  display: inline-block; 
  will-change: transform; 
  transform-origin: 50% 100%; 
}

.sm-scope .sm-panel-item:hover { 
  color: var(--sm-accent, #26143f); 
}

.sm-scope .sm-panel-list[data-numbering] { 
  counter-reset: smItem; 
}

.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { 
  counter-increment: smItem; 
  content: counter(smItem, decimal-leading-zero); 
  position: absolute; 
  top: 0.1em; 
  right: 0.5em; 
  font-size: 16px; 
  font-weight: 400; 
  color: var(--sm-accent, #ff0000); 
  letter-spacing: 0; 
  pointer-events: none; 
  user-select: none; 
  opacity: var(--sm-num-opacity, 0); 
}

/* Sidebar specific styles */
.sm-scope .sm-sidebar-header { border-bottom: 1px solid #e5e7eb; }
.sm-scope .sm-user-info { border-bottom: 1px solid #e5e7eb; }
.sm-scope .sm-logout-section { border-top: 1px solid #e5e7eb; }

/* Desktop styles - only when really needed */
@media (min-width: 768px) {
  .sm-scope .staggered-menu-panel { 
    width: 320px; 
    padding: 2em;
  }
  
  .sm-scope .sm-prelayers { 
    width: 320px; 
  }
  
  .sm-scope .sm-panel-item {
    font-size: 3rem;
  }
}

/* Prevent body scroll when menu is open */
.sm-scope[data-open] { 
  overflow: hidden; 
}

body.sm-menu-open { 
  overflow: hidden; 
}
`}</style>
    </div>
  );
};

export default StaggeredMenu;

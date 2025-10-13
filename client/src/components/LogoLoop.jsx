import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value) =>
  typeof value === "number" ? `${value}px` : value ?? undefined;

const cx = (...parts) => parts.filter(Boolean).join(" ");

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements
      .map((ref) => {
        if (!ref?.current) return null;
        const observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return observer;
      })
      .filter(Boolean); // Filter out null observers

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    if (!seqRef?.current) {
      onLoad();
      return;
    }

    const images = seqRef.current.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      const htmlImg = img;
      if (htmlImg.complete || htmlImg.naturalHeight > 0) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener("load", handleImageLoad, { once: true });
        htmlImg.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
  }, dependencies);
};

const useAnimationLoop = (
  trackRef,
  targetVelocity,
  seqWidth,
  isHovered,
  pauseOnHover
) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef?.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime =
        Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor =
        1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

export const LogoLoop = memo(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const seqRef = useRef(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const directionMultiplier = direction === "left" ? 1 : -1;
      const speedMultiplier = speed < 0 ? -1 : 1;
      return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth =
        seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) +
          ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
      setIsLoaded(true);
    }, []);

    const handleImageLoadComplete = useCallback(() => {
      updateDimensions();
    }, [updateDimensions]);

    useResizeObserver(
      updateDimensions,
      [containerRef, seqRef],
      [logos, gap, logoHeight]
    );

    useImageLoader(seqRef, handleImageLoadComplete, [logos, gap, logoHeight]);

    useAnimationLoop(
      trackRef,
      targetVelocity,
      seqWidth,
      isHovered,
      pauseOnHover
    );

    const cssVariables = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
      }),
      [gap, logoHeight, fadeOutColor]
    );

    const rootClasses = useMemo(
      () =>
        cx(
          "relative overflow-x-hidden group",
          scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.1)]",
          className
        ),
      [scaleOnHover, className]
    );

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item, key) => {
        const isNodeItem = "node" in item;

        const content = isNodeItem ? (
          <span
            className={cx(
              "inline-flex items-center",
              "motion-reduce:transition-none",
              scaleOnHover &&
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110"
            )}
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <img
            className={cx(
              "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
              "[-webkit-user-drag:none] pointer-events-none",
              "[image-rendering:crisp-edges]",
              "motion-reduce:transition-none",
              scaleOnHover &&
                "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110"
            )}
            src={item.src}
            srcSet={item.srcSet}
            sizes={item.sizes}
            width={item.width}
            height={item.height}
            alt={item.alt ?? ""}
            title={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={(e) => {
              // Fallback for broken images
              e.target.style.display = "none";
            }}
          />
        );

        const itemAriaLabel = isNodeItem
          ? item.ariaLabel ?? item.title
          : item.alt ?? item.title;

        const inner = item.href ? (
          <a
            className={cx(
              "inline-flex items-center no-underline rounded",
              "transition-opacity duration-200 ease-linear",
              "hover:opacity-80",
              "focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
            )}
            href={item.href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        );

        return (
          <li
            className={cx(
              "flex-none mr-[var(--logoloop-gap)] text-[length:var(--logoloop-logoHeight)] leading-[1]",
              scaleOnHover && "overflow-visible group/item"
            )}
            key={key}
            role="listitem"
          >
            {inner}
          </li>
        );
      },
      [scaleOnHover]
    );

    const logoLists = useMemo(() => {
      if (!logos?.length) return null;

      return Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`)
          )}
        </ul>
      ));
    }, [copyCount, logos, renderLogoItem]);

    const containerStyle = useMemo(
      () => ({
        width: toCssLength(width) ?? "100%",
        ...cssVariables,
        ...style,
      }),
      [width, cssVariables, style]
    );

    // Add a safety check to prevent rendering if no logos
    if (!logos?.length) {
      return (
        <div
          className={rootClasses}
          style={containerStyle}
          aria-label={ariaLabel}
        >
          <div className="flex items-center justify-center h-[var(--logoloop-logoHeight)] text-gray-500">
            No logos to display
          </div>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={rootClasses}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <>
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 left-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,transparent_100%)]"
              )}
            />
            <div
              aria-hidden
              className={cx(
                "pointer-events-none absolute inset-y-0 right-0 z-[1]",
                "w-[clamp(24px,8%,120px)]",
                "bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,transparent_100%)]"
              )}
            />
          </>
        )}

        <div
          className={cx(
            "flex w-max will-change-transform select-none",
            "motion-reduce:transform-none"
          )}
          ref={trackRef}
        >
          {isLoaded && logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;

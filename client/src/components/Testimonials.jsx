import { useEffect, useRef } from "react";

export default function TestimonialsSection() {
  const scrollContainerRef1 = useRef(null); // First grid
  const scrollContainerRef2 = useRef(null); // Second grid
  const animationRef1 = useRef(null);
  const animationRef2 = useRef(null);
  const isPausedRef1 = useRef(false);
  const isPausedRef2 = useRef(false);

  const testimonials = [
    {
      id: 1,
      text: "I finally stopped losing track of my job applications — this app keeps me focused and organized throughout my job search journey.",
      author: "Sarah M.",
      role: "Software Engineer",
    },
    {
      id: 2,
      text: "The analytics dashboard transformed how I approach my career growth. Data-driven insights made all the difference in my job search strategy.",
      author: "Alex K.",
      role: "Frontend Developer",
    },
    {
      id: 3,
      text: "From application to offer letter, this platform streamlined my entire job hunting process. The interview tracking feature is a game-changer.",
      author: "Michael T.",
      role: "Full Stack Developer",
    },
    {
      id: 4,
      text: "The real-time collaboration features helped me and my career coach stay perfectly aligned during my job transition. Incredible tool!",
      author: "Jessica L.",
      role: "UX Designer",
    },
    {
      id: 5,
      text: "Security and privacy were my top concerns, and this platform delivered enterprise-grade protection for all my sensitive career data.",
      author: "David R.",
      role: "DevOps Engineer",
    },
    {
      id: 6,
      text: "The customizable workflows adapted perfectly to my unique job search approach. Finally, a tool that works the way I do.",
      author: "Emily C.",
      role: "Product Manager",
    },
  ];

  const testimonials2 = [
    {
      id: 7,
      text: "As a marketing director, this platform revolutionized how I track campaign performance and team productivity across multiple projects.",
      author: "Maria Rodriguez",
      role: "Marketing Director",
    },
    {
      id: 8,
      text: "Managing my freelance writing business became so much easier with the organized workflow and client management features.",
      author: "James Chen",
      role: "Freelance Writer",
    },
    {
      id: 9,
      text: "The financial tracking tools helped me streamline my consulting business and provide better insights to my clients.",
      author: "Dr. Sarah Johnson",
      role: "Financial Consultant",
    },
    {
      id: 10,
      text: "As an educator, I use this to organize my lesson plans and student progress tracking - it's been a game-changer for my classroom.",
      author: "Robert Williams",
      role: "High School Teacher",
    },
    {
      id: 11,
      text: "Running my small bakery business became so much more efficient with the inventory management and customer relationship features.",
      author: "Lisa Thompson",
      role: "Small Business Owner",
    },
    {
      id: 12,
      text: "The project management tools transformed how our non-profit organization coordinates volunteers and tracks community outreach programs.",
      author: "David Martinez",
      role: "Non-Profit Coordinator",
    },
  ];

  // Setup scrolling for first container
  useEffect(() => {
    const scrollContainer = scrollContainerRef1.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const autoScroll = () => {
      if (isPausedRef1.current) {
        animationRef1.current = requestAnimationFrame(autoScroll);
        return;
      }

      scrollPosition += scrollSpeed;

      const singleSetWidth = scrollContainer.scrollWidth / 2;

      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }

      animationRef1.current = requestAnimationFrame(autoScroll);
    };

    animationRef1.current = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => {
      isPausedRef1.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef1.current = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef1.current) {
        cancelAnimationFrame(animationRef1.current);
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Setup scrolling for second container
  useEffect(() => {
    const scrollContainer = scrollContainerRef2.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const autoScroll = () => {
      if (isPausedRef2.current) {
        animationRef2.current = requestAnimationFrame(autoScroll);
        return;
      }

      scrollPosition += scrollSpeed;

      const singleSetWidth = scrollContainer.scrollWidth / 2;

      if (scrollPosition >= singleSetWidth) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }

      animationRef2.current = requestAnimationFrame(autoScroll);
    };

    animationRef2.current = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => {
      isPausedRef2.current = true;
    };

    const handleMouseLeave = () => {
      isPausedRef2.current = false;
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef2.current) {
        cancelAnimationFrame(animationRef2.current);
      }
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="!py-30 from-black to-gray-900 dark:from-white">
      <div className="max-w-screen-xl text-center !mx-auto px-4 !md:px-8">
        {/* Header Section */}
        <div className="!max-w-1xl !mx-auto text-center">
          <h2
            className="bg-gradient-to-tl from-black via-purple-800 to-pink-800
          bg-clip-text text-transparent !text-6xl sm:text-4xl font-sans
          !font-bold leading-[1.5] !tracking-[-0.025em]"
          >
            What Our Clients Say
          </h2>
          <p className="!mt-3 !mx-auto text-gray-600 dark:text-gray-300">
            See what clients are saying about our platform
          </p>
        </div>

        {/* First Auto-scrolling Testimonials Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef1}
            className="flex overflow-x-hidden !space-x-9 !py-4 scrollbar-hide"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}-1`}
                className="flex-shrink-0 w-100 bg-gradient-to-r 
                rounded-2xl p-6 border transition-all duration-300
                border-gray-800 from-[#26143f] to-black
                 hover:shadow-gray-800 hover:border-violet-600"
              >
                <div className="flex items-start !mb-4">
                  <div
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 
                  rounded-full !mt-2 !mr-2"
                  ></div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="text-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20
            from-black to-gray-900 dark:from-white dark:to-gray-950 pointer-events-none"
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-20 
           from-black to-gray-900 dark:from-white dark:to-gray-950 pointer-events-none"
          ></div>
        </div>

        {/* Second Auto-scrolling Testimonials Grid */}
        <div className="relative">
          <div
            ref={scrollContainerRef2}
            className="flex overflow-x-hidden !space-x-9 !py-4 scrollbar-hide"
          >
            {[...testimonials2, ...testimonials2].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}-2`}
                className="flex-shrink-0 w-100 bg-gradient-to-r 
                rounded-2xl p-6 border transition-all duration-300
                border-gray-800 from-[#26143f] to-black
                 hover:shadow-gray-800 hover:border-violet-600"
              >
                <div className="flex items-start mb-4">
                  <div
                    className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 
                  rounded-full mt-2 mr-2"
                  ></div>
                  <p className="text-gray-300 leading-relaxed flex-1">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="text-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-20
            from-black to-gray-900 dark:from-white dark:to-gray-950 pointer-events-none"
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-20 
           from-black to-gray-900 dark:from-white dark:to-gray-950 pointer-events-none"
          ></div>
        </div>
      </div>
    </section>
  );
}

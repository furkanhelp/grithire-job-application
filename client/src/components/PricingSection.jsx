import { Link } from "react-router-dom";

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      desc: "Perfect for individuals and small projects getting started.",
      price: 0,
      isMostPop: false,
      features: [
        "Up to 2 team members",
        "Basic analytics",
        "2GB storage",
        "Community support",
        "Standard security",
        "Limited API access",
        "Public documentation",
      ],
    },
    {
      name: "Startup",
      desc: "Great for small teams and growing businesses.",
      price: 12,
      isMostPop: true,
      features: [
        "Up to 10 team members",
        "Advanced analytics dashboard",
        "50GB storage",
        "Email support",
        "Enhanced security",
        "Full API access",
        "Priority documentation",
        "Custom integrations",
      ],
    },
    {
      name: "Enterprise",
      desc: "Advanced features for large teams and organizations.",
      price: 32,
      isMostPop: false,
      features: [
        "Unlimited team members",
        "Advanced analytics + insights",
        "500GB storage",
        "Priority 24/7 support",
        "Enterprise-grade security",
        "Full API access + webhooks",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom reporting",
      ],
    },
  ];

  return (
    <section className="!py-14 from-black to-gray-900 dark:from-white">
      <div className="max-w-screen-xl !mx-auto !px-4 md:px-8">
        {/* Header Section */}
        <div className="max-w-1xl !mx-auto text-center !mb-15">
          <h2
            className="bg-gradient-to-tl from-black via-purple-800 to-pink-800
          bg-clip-text text-transparent !text-6xl sm:text-4xl !font-sans
          !font-bold leading-[1.5] !tracking-[-0.025em]"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="!mt-3 !mx-auto text-gray-600 dark:text-gray-300">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl !mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl !p-10 border transition-all duration-300 ${
                plan.isMostPop
                  ? "bg-gradient-to-br from-[#26143f] to-black border-purple-500 shadow-lg shadow-purple-500/20 scale-105"
                  : "bg-gradient-to-br from-[#26143f] to-black border-gray-800 hover:border-gray-500 hover:shadow-gray-800"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.isMostPop && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span
                    className="bg-gradient-to-r from-purple-500 to-pink-500
                   text-white text-sm font-semibold !px-3 !py-1 rounded-full"
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Free Plan Badge */}
              {plan.price === 0 && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span
                    className="bg-gradient-to-r from-green-500 to-emerald-500
                   text-white text-sm font-semibold !px-3 !py-1 rounded-full"
                  >
                    Free Forever
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center !mb-8">
                <h3
                  className="!text-5xl !font-sans !font-bold
                bg-gradient-to-br from-white to-[#a5b4fc] bg-clip-text 
                text-transparent !tracking-[-0.025em] !leading-[1.5] !mb-2"
                >
                  {plan.name}
                </h3>
                <p className="text-gray-300 !mb-6">{plan.desc}</p>
                {/* Price */}
                <div className="!mb-6">
                  <span
                    className="text-5xl font-bold bg-gradient-to-r 
                  from-purple-500 via-pink-500
                to-purple-900 bg-clip-text text-transparent"
                  >
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 text-lg">
                    {plan.price === 0 ? "" : "/month"}
                  </span>
                </div>
                {/* CTA Button */}
                <Link
                  to={
                    plan.name === "Free"
                      ? "/register"
                      : plan.name === "Startup"
                      ? "/register"
                      : "/register"
                  }
                  className={`w-full !py-3 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    plan.isMostPop
                      ? "bg-gradient-to-r from-purple-500 to-purple-900 text-white hover:shadow-lg hover:shadow-purple-500/25"
                      : plan.price === 0
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/25"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:border-gray-600"
                  }`}
                >
                  {plan.price === 0 ? "Get Started Free" : "Get Started"}
                </Link>
              </div>

              {/* Features List */}
              <ul className="!space-y-5">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start !space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 !mt-0.5 ${
                        plan.price === 0
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : plan.isMostPop
                          ? "bg-gradient-to-r from-purple-500 to-pink-800"
                          : "bg-gradient-to-r from-purple-500 to-pink-800"
                      }`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="!mt-10 !px-10 max-w-2xl text-center !mx-auto text-gray-600 dark:text-gray-300">
          <p className="text-gray-400">
            All paid plans include a 14-day free trial. No credit card required
            for free plan.
          </p>
        </div>
      </div>
    </section>
  );
}

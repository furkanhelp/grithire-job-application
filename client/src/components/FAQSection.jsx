import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="!space-y-5 !mt-6 overflow-hidden border-b border-gray-800/60 pb-1 
      last:border-b-0 group-hover:border-gray-700/60 transition-colors duration-300"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer flex items-center justify-between text-xl
        font-semibold hover:text-purple-800 transition-colors duration-200">
        <span className="flex items-start">
          <span className="text-purple-800 !mr-3 !mt-1 text-lg">•</span>
          {faqsList.q}
        </span>
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-900 !ml-4 flex-shrink-0 transform 
            transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-900 !ml-4 flex-shrink-0 transform 
            transition-transform duration-300 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-500 transition-all ease-out"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div className="!pt-2">
          <p className=" leading-relaxed text-lg font-light !pl-6 
          border-l-3 border-purple-500/30">
            {faqsList.a}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const faqsList = [
    {
      q: "How do I get started with the free plan?",
      a: "Simply click the 'Get Started Free' button on our pricing section. You'll be guided through a quick setup process and can start using the platform immediately without any credit card required.",
    },
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes, you can change your plan at any time. Upgrades take effect immediately with pro-rated billing, while downgrades will apply at the start of your next billing cycle.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and for enterprise plans we also support bank transfers and purchase orders.",
    },
    {
      q: "Is my data secure and private?",
      a: "Absolutely. We use enterprise-grade encryption, comply with GDPR and CCPA regulations, and undergo regular security audits. Your data is never shared with third parties without your explicit consent.",
    },
    {
      q: "Do you offer custom enterprise solutions?",
      a: "Yes, we provide fully customized enterprise solutions with dedicated support, custom integrations, and tailored pricing. Contact our sales team to discuss your specific requirements.",
    },
    {
      q: "What kind of support can I expect?",
      a: "Free plan users get community support, Startup plan includes email support with 24-hour response time, and Enterprise plan offers 24/7 priority support with a dedicated account manager.",
    },
  ];

  return (
    <section className="!py-14 from-black to-gray-900 dark:from-white">
      <div className="max-w-screen-xl !mx-auto !px-4 md:px-8">
        {/* Header Section - Redesigned */}
        <div className="max-w-2xl !mx-auto text-center !mb-15">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60"></div>
            <h2
              className="bg-gradient-to-br from-white via-purple-800 to-pink-900
          bg-clip-text text-transparent !text-5xl sm:!text-6xl font-sans
          !font-bold leading-[1.2] !tracking-tight whitespace-nowrap"
            >
              FAQ
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-pink-500 to-transparent opacity-60"></div>
          </div>
          <p className="!mt-4 !mx-auto text-gray-700 dark:text-gray-400 text-lg font-light">
            Quick answers to common questions about our platform
          </p>
        </div>

        {/* FAQ Content - Enhanced */}
        <div
          className="max-w-3xl gap-10 !mx-auto relative rounded-2xl 
       !p-8 md:!p-12 rounded-2xl shadow-xl overflow-hidden
      backdrop-blur-sm"
        >
          {faqsList.map((item, idx) => (
            <div key={idx} className="group">
              <FaqsCard idx={idx} faqsList={item} />
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center !mt-12 ">
          <p className="text-gray-600 dark:text-gray-400 !mb-6 text-lg !mx-auto">
            Still have questions? We're here to help.
          </p>
          <Link to="/contact">
            <button
              className="bg-gradient-to-r from-purple-900 to-pink-800
            hover:from-purple-900 hover:to-pink-800 text-white !px-8 !py-4 
            rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/30 
            transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

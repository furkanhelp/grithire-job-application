import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    const isActive = activeClass && currentPage === pageNumber;
    return (
      <button
        className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 transform 
          hover:scale-110 ${
            isActive
              ? "bg-gradient-to-r from-purple-800 to-purple-950 text-white shadow-lg"
              : "bg-black/30 text-gray-300 border border-gray-600 hover:border-purple-500/50 hover:bg-purple-500/20"
          }`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // FIRST PAGE
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // DOTS
    if (currentPage > 3) {
      pageButtons.push(
        <span
          className="w-10 h-10 flex items-center justify-center text-gray-500"
          key="dots-1"
        >
          ...
        </span>
      );
    }

    // BEFORE CURRENT PAGE
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // CURRENT PAGE
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }
    // AFTER CURRENT PAGE
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }
    // DOTS
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span
          className="w-10 h-10 flex items-center justify-center text-gray-500"
          key="dots+1"
        >
          ...
        </span>
      );
    }

    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 !mt-10 w-full">
      {/* Page Info - Always centered */}
      <div className="text-sm text-gray-400 text-center">
        Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
        <span className="text-white font-semibold">{numOfPages}</span>
      </div>

      {/* Pagination Controls - Stack on mobile */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        {/* Previous Button - Full width on mobile */}
        <button
          className="flex items-center justify-center !space-x-2 !px-4 !py-2 bg-black/30 text-gray-300 border border-gray-600
           rounded-xl hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-200 
           transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 sm:w-auto"
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = numOfPages;
            handlePageChange(prevPage);
          }}
          disabled={currentPage === 1}
        >
          <HiChevronDoubleLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Page Numbers - Wrap on mobile */}
        <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2">
          {renderPageButtons()}
        </div>

        {/* Next Button - Full width on mobile */}
        <button
          className="flex items-center justify-center !space-x-2 !px-4 !py-2 bg-black/30 text-gray-300 border border-gray-600 
          rounded-xl hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-white transition-all duration-200 transform
          hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 sm:w-auto"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
          disabled={currentPage === numOfPages}
        >
          <span>Next</span>
          <HiChevronDoubleRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default PageBtnContainer;

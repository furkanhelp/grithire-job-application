import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
  const {data: {numOfPages, currentPage}} = useAllJobsContext()
  const pages = Array.from({ length: numOfPages}, (_, index) => {
    return index + 1;
  });

  const { search, pathname} = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

const addPageButton = ({pageNumber, activeClass}) => {
   return (
     <button
       className={`btn page-btn ${activeClass === currentPage && "active"}`}
       key={pageNumber}
       onClick={() => handlePageChange(pageNumber)}
     >
       {pageNumber}
     </button>
   );
}

const renderPageButtons = () => {
  const pageButtons = [];
  // FIRST PAGE
  pageButtons.push(
    addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
  );

  // DOTS
  if (currentPage > 3) {
    pageButtons.push(
      <span className="page-btn dots" key="dots-1">
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
      <span className="page-btn dots" key="dots+1">
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
}

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {renderPageButtons()}
        <button
          className="btn next-btn"
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > numOfPages) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          next
          <HiChevronDoubleRight />
        </button>
      </div>
    </Wrapper>
  );
};
export default PageBtnContainer;

import { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Button2({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-gray-600 text-white" : "text-gray-700"}
      ${
        !disabled
          ? "bg-white hover:bg-gray-700 hover:text-white"
          : "text-gray-300 bg-white cursor-not-allowed"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}


function PaginationNav1({
    currentPage,
    handlePageChange,
    pageCount,
  }) {
    const gotoPage = (page) => {
      handlePageChange(page + 1);
    };
  
    const renderPageLinks = useCallback(() => {
      if (pageCount === 0) return null;
      const visiblePageButtonCount = 3;
      let numberOfButtons =
        pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
      const pageIndices = [currentPage - 1];
      numberOfButtons--;
      [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
        const pageNumberBefore = pageIndices[0] - 1;
        const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
        if (
          pageNumberBefore >= 0 &&
          (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
        ) {
          pageIndices.unshift(pageNumberBefore);
        } else {
          pageIndices.push(pageNumberAfter);
        }
      });
      return pageIndices.map((pageIndexToMap) => (
        <li key={pageIndexToMap}>
          <Button2
            content={pageIndexToMap + 1}
            onClick={() => gotoPage(pageIndexToMap)}
            active={currentPage - 1 === pageIndexToMap}
          />
        </li>
      ));
    }, [currentPage, pageCount]);
  
    return (
      <ul className="flex gap-2 mx-auto">
        <li>
          <Button2
            content={
              <div className="flex ml-1">
                <FaChevronLeft size="0.9rem" />
                <FaChevronLeft size="0.9rem" className="-translate-x-1/2" />
              </div>
            }
            onClick={() => gotoPage(0)}
            disabled={currentPage === 1}
          />
        </li>
        {renderPageLinks()}
        <li>
          <Button2
            content={
              <div className="flex ml-1">
                <FaChevronRight size="0.9rem" />
                <FaChevronRight size="0.9rem" className="-translate-x-1/2" />
              </div>
            }
            onClick={() => gotoPage(pageCount - 1)}
            disabled={currentPage === pageCount}
          />
        </li>
      </ul>
    );
  }
  
  function PaginationNav1Presentation({
    currentPage,
    handlePageChange,
    pageCount,
  }) {
    return (
      <div className="flex gap-3 flex-wrap py-5 justify-center">
        <PaginationNav1
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          pageCount={pageCount}
        />
      </div>
    );
  }
  
  export { PaginationNav1Presentation };

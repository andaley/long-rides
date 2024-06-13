import { ChevronUp, ChevronDown } from "lucide-react";
import { useCallback } from "react";
import { SortByProperty, SortOpts } from "./consts/consts";

type SortChevronProps = {
  sortOrder: SortOpts;
  sortBy: SortByProperty;
  selectedSortBy: SortByProperty;
  onSortOrder: (sortBy: SortByProperty, sortOrder: SortOpts) => void;
};

const SortChevron = (props: SortChevronProps) => {

  const handleSort = useCallback(
    (sortOrder: SortOpts) => {
      props.onSortOrder(props.sortBy, sortOrder);
    },
    [props]
  );

  const showAscending = ((props.sortBy === props.selectedSortBy) && props.sortOrder === "ascending");

  return (
    <>
      {showAscending ? (
        <ChevronUp
          onClick={() => handleSort("descending")}
          role="button"
          aria-label={`sort rides in descending order by ${props.sortBy}`}
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === "ArrowDown") &&
            handleSort("descending")
          }
        />
      ) : (
        <ChevronDown
          onClick={() => handleSort("ascending")}
          role="button"
          aria-label={`sort rides in ascending order by ${props.sortBy}`}
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === "ArrowUp") &&
            handleSort("ascending")
          }
        />
      )}
    </>
  );
};

export default SortChevron;

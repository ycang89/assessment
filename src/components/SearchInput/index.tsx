import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import _debounce from "lodash/debounce";
import { useSearchSuggestion } from "@/hooks/search";
import Image from "next/image";

export default function Index({
  onSearch,
}: {
  onSearch: (_keyword: string) => void;
}) {
  const [keyword, setKeyword] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { suggestions, isLoading } = useSearchSuggestion(
    keyword?.length > 2 ? keyword : ""
  );
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const limitedSuggestions = useMemo(() => {
    if (!suggestions?.suggestions) return [];
    return suggestions?.suggestions.slice(0, 6);
  }, [suggestions]);

  const onKeydownSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (
        selectedIndex === null ||
        selectedIndex === limitedSuggestions?.length - 1
      ) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex((prevIndex) => (prevIndex as number) + 1);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (selectedIndex === null || selectedIndex === 0) {
        setSelectedIndex(limitedSuggestions?.length - 1);
      } else {
        setSelectedIndex((prevIndex) => (prevIndex as number) - 1);
      }
    }
    if (e.key === "Enter") {
      onSubmitSearch(e.currentTarget.value);
    }
    if (e.key === "Enter" && selectedIndex !== null) {
      const selectedSuggestion = limitedSuggestions?.[selectedIndex];
      if (selectedSuggestion) {
        onSubmitSearch(selectedSuggestion);
      }
    }
  };

  const onSubmitSearch = (selectedSuggestion: string) => {
    if (isLoading) return;
    onSearch(selectedSuggestion);
    setKeyword(selectedSuggestion);
    setInputValue(selectedSuggestion);
    setSelectedIndex(null);
    setIsShowSuggestions(false);
  };

  const throttledSetKeyword = useCallback(
    _debounce((value: string) => {
      setKeyword(value);
    }, 300),
    []
  );

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (selectedIndex !== null) {
      setSelectedIndex(null);
    }
    if (value.length > 2) {
      throttledSetKeyword(value);
      setIsShowSuggestions(true);
    } else {
      setKeyword("");
    }
  };

  const onClearSearch = () => {
    setInputValue("");
    setKeyword("");
    setIsShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const highlightText = (text: string, keyword: string) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          value={inputValue}
          ref={searchInputRef}
          onChange={onChangeSearchInput}
          onKeyDown={onKeydownSearchInput}
          placeholder="Search..."
          className={`w-full border border-[#a4a4a4] text-lg py-3.5 px-5 leading-[26px] ${
            isShowSuggestions ? "rounded-tl-md rounded-tr-md" : "rounded-md "
          }`}
          data-cy="search bar"
        />
        <div className="absolute top-0 flex items-center right-0">
          {inputValue?.length > 0 && (
            <div className="mr-4">
              <Image
                src="/icons/close.svg"
                width={20}
                height={20}
                alt="close"
                className="cursor-pointer"
                onClick={onClearSearch}
                data-cy="search bar X button"
              />
            </div>
          )}
          <button
            onClick={() => onSubmitSearch(keyword)}
            className="bg-[#1c76d5] text-white px-4 sm:px-8 py-3.5 rounded-md flex items-center text-lg font-[600] hover:bg-[#166BB4]"
            data-cy="search button"
          >
            <Image
              src="/icons/search.svg"
              width={26}
              height={26}
              alt="search"
            />{" "}
            Search
          </button>
        </div>
      </div>

      {isShowSuggestions && limitedSuggestions?.length > 0 && (
        <ul
          className="rounded-bl-md rounded-br-md shadow-[0_4px_6px_rgba(224,228,229,0.35)] absolute w-[calc(100%-145px)] bg-white"
          data-cy="suggestion dropdown"
        >
          {limitedSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-200 ${
                selectedIndex === index ? "bg-blue-100" : ""
              }`}
              onClick={() => onSubmitSearch(suggestion)}
              data-cy="suggestion result"
            >
              {highlightText(suggestion, inputValue)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import OfficialGovLabel from "@/components/OfficialGovLabel";
import ResultItem from "@/components/ResultItem";
import SearchInput from "@/components/SearchInput";
import { useSearch } from "@/hooks/search";
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const { results, isLoading, error } = useSearch(keyword);
  return (
    <div>
      <Head>
        <title>LifeSG - Search</title>
        <meta name="description" content="LifeSG - Search" />
      </Head>
      <OfficialGovLabel />
      <div className="px-2 xl:px-0 shadow-downwards">
        <div className="max-w-[1120px] mx-auto py-10">
          <SearchInput
            onSearch={(selectedKeyword) => {
              setKeyword(selectedKeyword);
            }}
          />
        </div>
      </div>
      <div className="px-2 xl:px-0 max-w-[1120px] mx-auto py-10">
        <div className="max-w-[832px]">
          {isLoading ? (
            <div>Searching...</div>
          ) : results && results?.TotalNumberOfResults > 0 ? (
            <>
              <p className="text-[28px] font-semibold mb-10">
                Showing {results?.Page}-{results?.PageSize} of{" "}
                {results?.TotalNumberOfResults} results
              </p>
              {results?.ResultItems?.map((result) => (
                <div className="mb-10" key={result?.DocumentId}>
                  <ResultItem
                    title={result?.DocumentTitle?.Text}
                    description={result?.DocumentExcerpt?.Text}
                    descriptionHighlight={result?.DocumentExcerpt?.Highlights}
                    link={result?.DocumentURI}
                  />
                </div>
              ))}
            </>
          ) : error ? (
            <p>Please try with another search.</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

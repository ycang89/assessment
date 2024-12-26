import { Highlight } from "@/declarations/search";
import { JSX, useMemo } from "react";

export default function Index({
  title,
  descriptionHighlight,
  description,
  link,
}: {
  title: string;
  description: string;
  descriptionHighlight?: Highlight[];
  link: string;
}) {
  const highlightDescription = useMemo(() => {
    const highlightedText: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    if (!descriptionHighlight) return description;
    descriptionHighlight.forEach(({ BeginOffset, EndOffset }, index) => {
      if (lastIndex < BeginOffset) {
        highlightedText.push(description.slice(lastIndex, BeginOffset));
      }
      highlightedText.push(
        <span key={index} className="font-bold">
          {description.slice(BeginOffset, EndOffset)}
        </span>
      );
      lastIndex = EndOffset;
    });

    if (lastIndex < description.length) {
      highlightedText.push(description.slice(lastIndex));
    }

    return highlightedText;
  }, [description, descriptionHighlight]);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-cy="search result"
    >
      <h3
        className="text-[#1C76D5] text-[22px] leading-7 font-semibold mb-3"
        data-cy="search result title"
      >
        {title}
      </h3>
      <p className="mb-3" data-cy="search result description">
        {highlightDescription}
      </p>
      <p
        className="text-xs text-[#686868] break-all"
        data-cy="search result link"
      >
        {link}
      </p>
    </a>
  );
}

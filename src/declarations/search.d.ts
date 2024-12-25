export interface ResultItem {
  Id?: string;
  Type?: string;
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentURI: string;
}

export interface Highlight {
  BeginOffset: number;
  EndOffset: number;
}

export interface Suggestion {
  stemmedQueryTerm: string;
  suggestions: string[];
}

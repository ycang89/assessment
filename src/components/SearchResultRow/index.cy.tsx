import React from "react";
import Index from "./index";

describe("<Index />", () => {
  it("renders correctly", () => {
    // Mount the component
    cy.mount(
      <Index
        title="This article should highlight 'dolor'"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        descriptionHighlight={[{ BeginOffset: 12, EndOffset: 17 }]}
        link="https://example.com"
      />
    );
    cy.get(`[data-cy="search result title"]`)
      .contains("This article should highlight 'dolor'")
      .should("be.visible");
    cy.get('[data-cy="search result description"]')
      .find(`.font-bold:contains(dolor)`)
      .should("be.visible");
    cy.get(`[data-cy="search result link"]`)
      .contains("https://example.com")
      .should("be.visible");
  });
});

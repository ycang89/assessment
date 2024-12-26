import React from "react";
import Index from "./index";

describe("<Index />", () => {
  beforeEach(() => {
    // Intercept the API call and return mock data from the fixture
    cy.intercept("GET", "/api/suggestion*", { fixture: "suggestion.json" }).as(
      "getSuggestion"
    );
  });

  it("renders correctly", () => {
    cy.mount(<Index onSearch={() => {}} />);
    cy.get(`[data-cy="search bar"]`).should("exist");
    cy.get(`[data-cy="search button"]`).should("exist");
  });

  it("handles error correctly when suggestion API fails", () => {
    cy.intercept("GET", "/api/suggestion*", {
      statusCode: 500,
      body: { error: "Server error" },
    }).as("getSuggestionFailed");

    cy.mount(<Index onSearch={() => {}} />);
    cy.get(`[data-cy="search bar"]`).type("chi");
    cy.wait("@getSuggestionFailed");

    cy.get(`[data-cy="suggestion dropdown"]`).should("not.exist");
  });

  it("suggestion rendered correctly", () => {
    cy.mount(<Index onSearch={() => {}} />);
    cy.get(`[data-cy="search bar"]`).type("chi");
    cy.wait("@getSuggestion");
    cy.get(`[data-cy="suggestion result"]`).should("have.length", 6);
  });

  it("close button working correctly", () => {
    cy.mount(<Index onSearch={() => {}} />);
    cy.get(`[data-cy="search bar"]`).type("chi");
    cy.get(`[data-cy="search bar X button"]`).should("exist").click();
    cy.get(`[data-cy="search bar"]`).should("have.value", "");
  });
});

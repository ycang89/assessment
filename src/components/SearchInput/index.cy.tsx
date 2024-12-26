import React from "react";
import Index from "./index";

describe("<Index />", () => {
  it("renders correctly", () => {
    // Mount the component
    cy.mount(<Index onSearch={() => {}} />);

    // Assert that the text content is present
    cy.contains("Search").should("be.visible");
  });
});

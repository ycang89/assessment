import React from "react";
import Index from "./index";

describe("<Index />", () => {
  it("renders correctly", () => {
    // Mount the component
    cy.mount(<Index />);

    // Assert that the header exists
    cy.get("header").should("exist");

    // Assert that the image is rendered with the correct `src` and `alt` attributes
    cy.get("img")
      .should("have.attr", "src", "/logo.svg")
      .and("have.attr", "alt", "logo");

    // Assert that the text content is present
    cy.contains("An Official Website of the").should("be.visible");
    cy.contains("Singapore Government").should("be.visible");
  });
});

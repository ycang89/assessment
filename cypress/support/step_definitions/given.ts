import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("user navigate to home page", () => {
  cy.visit("/");
});

Given("user is focused on {string}", (ele) => {
  cy.get(`[data-cy="${ele}"]`).focus();
});

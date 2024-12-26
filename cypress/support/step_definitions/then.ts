import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then("{string} should be appear", (ele) => {
  cy.get(`[data-cy="${ele}"]`).should("be.visible");
});

Then("{string} should be disappear", (ele) => {
  cy.get(`[data-cy="${ele}"]`).should("not.exist");
});

Then("{string} textfield should be cleared but retain focused", (ele) => {
  cy.get(`[data-cy="${ele}"]`).should("have.value", "").should("have.focus");
});

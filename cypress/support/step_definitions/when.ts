import { When } from "@badeball/cypress-cucumber-preprocessor";

When("user click on {string}", (ele) => {
  cy.get(`[data-cy="${ele}"]`).click();
});

When("user press Enter on {string}", (ele) => {
  cy.get(`[data-cy="${ele}"]`).type("{enter}");
});

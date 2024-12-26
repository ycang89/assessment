import { When } from "@badeball/cypress-cucumber-preprocessor";

When("user types >= 1 character is typed in {string}", (ele) => {
  cy.get(`[data-cy="${ele}"]`).type("c");
});

When("user types > 2 character in {string}", (ele) => {
  cy.get(`[data-cy="${ele}"]`).type("chi");
});

When(
  "up or down keyboard button is pressed to select any suggestion",
  () => {
    cy.get(`[data-cy="search bar"]`)
      .type("chi")
      .type(`{downArrow}`)
      .type(`{downArrow}`)
      .type(`{downArrow}`)
      .type(`{upArrow}`);
  }
);

When("user click on {string} suggestion search term", (ele: string) => {
  cy.get(`[data-cy="suggestion result"]`).contains(ele).click();
});
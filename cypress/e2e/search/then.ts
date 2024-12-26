import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then("results should be displayed in correct format", () => {
  cy.get("[data-cy='search result']").each(($row) => {
    cy.wrap($row).find('[data-cy="search result title"]').should("be.visible");
    cy.wrap($row)
      .find('[data-cy="search result description"]')
      .should("be.visible");
    cy.wrap($row).find('[data-cy="search result link"]').should("be.visible");
  });
});

Then("each search result should have the term {string} highlighted", (term) => {
  cy.get("[data-cy='search result']").each(($row) => {
    cy.wrap($row)
      .find('[data-cy="search result description"]')
      .find(`.font-bold:contains(${term})`) // hightlight by giving font-bold
      .should("have.length.greaterThan", 0);
  });
});

Then("suggestion dropdown should showing top 6 results", () => {
  cy.get('[data-cy="suggestion result"]').should("have.length", 6);
});

Then(
  "selected suggestion search term {string} should appear in {string}",
  (ele1, ele2) => {
    cy.get(`[data-cy="${ele2}"]`).should("have.value", ele1);
  }
);

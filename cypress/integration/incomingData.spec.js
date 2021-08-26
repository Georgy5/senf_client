/** @format */

describe("Testing incomng data", () => {
  before(() => {
    cy.setCookie("Cookie_settings", "all");
    // cy.intercept("**/api/projects", { fixture: "projects.json" });
    // cy.intercept("**/api/screamsFrontend", { fixture: "screams.json" });
    cy.visit("/");
  });

  it("data is incoming successfully", () => {
    //Check if ideas within the main page are loading correctly
    //cy.
    //Check if the data related to a specific idea/scream is loading correctly
    //cy.
    //Check if the data within the insightspage is loading correctly
    //cy.
    //Check if the data within the monitoringboard is loading correctly
    //cy.
  });
});

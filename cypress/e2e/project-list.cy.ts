import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders loading spinner", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        delayMs: 100,
        fixture: "projects.json",
      });

      cy.visit(`http://localhost:3000/dashboard`);

      cy.get('[data-cy="loading-spinner"]').should("be.visible");
      cy.get('[data-cy="loading-spinner"]').should("not.exist");
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el)
            .find("a")
            .should("have.attr", "href", "/dashboard/issues");
        });
    });

    it("renders proper badge labels and appropriate badge colors", () => {
      // check that our fixture data has the wrong labels
      // so we're testing the transformProjectsResponse
      // function in projecys.ts
      expect(mockProjects[0].status).to.equal("error");
      expect(mockProjects[1].status).to.equal("warning");
      expect(mockProjects[2].status).to.equal("info");

      /*
        Unfortunately I couldn't get .next() to work
        as expected, ie:

        cy.get("[data-cy='project-card_badge']")
          .first()
          .should("have.text", "Critical")
          .next()
          .should("have.text", "Warning");

        The docs are at: https://docs.cypress.io/api/commands/next
      */

      cy.get("[data-cy='project-card_badge']")
        .eq(0)
        .should("have.text", "Critical")
        .should("have.css", "color", "rgb(180, 35, 24)")
        .should("have.css", "background-color", "rgb(254, 243, 242)");

      cy.get("[data-cy='project-card_badge']")
        .eq(1)
        .should("have.text", "Warning")
        .should("have.css", "color", "rgb(181, 71, 8)")
        .should("have.css", "background-color", "rgb(255, 250, 235)");

      cy.get("[data-cy='project-card_badge']")
        .eq(2)
        .should("have.text", "Stable")
        .should("have.css", "color", "rgb(2, 122, 72)")
        .should("have.css", "background-color", "rgb(236, 253, 243)");
    });
  });
});

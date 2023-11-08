import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  context("with errors", () => {
    it("renders an error message for issues", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
        status: 400,
        forceNetworkError: true,
        retryOnNetworkFailure: false,
      });

      cy.visit(`http://localhost:3000/dashboard/issues`, {
        retryOnNetworkFailure: false,
      });

      cy.wait(5000);

      cy.get('[data-cy="alert-banner_error"]').should("be.visible");

      cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
        fixture: "issues-page-1.json",
      }).as("getIssuesPage1");

      cy.get('[data-cy="alert-banner_buttonError"]').click();

      cy.get("@getIssuesPage1")
        .its("response")
        .should("have.property", "statusCode", 200);
    });

    it("renders an error message for projects", () => {
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
        status: 400,
        forceNetworkError: true,
        retryOnNetworkFailure: false,
      });

      cy.visit(`http://localhost:3000/dashboard/issues`, {
        retryOnNetworkFailure: false,
      });

      cy.wait(5000);

      cy.get('[data-cy="alert-banner_error"]').should("be.visible");

      cy.intercept("GET", "https://prolog-api.profy.dev/project", {}).as(
        "getProjects",
      );

      cy.get('[data-cy="alert-banner_buttonError"]').click();

      cy.get("@getProjects")
        .its("response")
        .should("have.property", "statusCode", 200);
    });
  });

  context("with data", () => {
    beforeEach(() => {
      // setup request mocks
      cy.intercept("GET", "https://prolog-api.profy.dev/project", {
        fixture: "projects.json",
      }).as("getProjects");

      [1, 2, 3].forEach((num, _i) => {
        cy.intercept("GET", `https://prolog-api.profy.dev/issue?page=${num}`, {
          fixture: `issues-page-${num}.json`,
        }).as(`getIssuesPage${num}`);
      });

      // open issues page
      cy.visit(`http://localhost:3000/dashboard/issues`);

      // wait for request to resolve
      cy.wait(["@getProjects", "@getIssuesPage1"]);

      // set button aliases
      cy.get("button").contains("Previous").as("prev-button");
      cy.get("button").contains("Next").as("next-button");
    });

    context("desktop resolution", () => {
      beforeEach(() => {
        cy.viewport(1025, 900);
      });

      it("renders loading spinner", () => {
        cy.intercept("GET", "https://prolog-api.profy.dev/", {
          delayMs: 100,
        });

        cy.visit(`http://localhost:3000/dashboard/issues`);

        cy.get('[data-cy="loading-spinner"]').should("be.visible");
        cy.get('[data-cy="loading-spinner"]').should("not.exist");
      });

      it("renders the issues", () => {
        // lets make sure we're on page 1
        cy.contains("Page 1 of 3");

        const issues = mockIssues1.items;

        cy.get("main")
          .find("tbody")
          .find("tr")
          .each(($el, index) => {
            const issue = issues[index];
            const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();

            cy.wrap($el).get('[data-cy="issues_name"]').contains(issue.name);

            cy.wrap($el)
              .get('[data-cy="issues_message"]')
              .contains(issue.message);

            cy.wrap($el)
              .get('[data-cy="issues_numEvents"]')
              .contains(issue.numEvents);

            cy.wrap($el)
              .get('[data-cy="issues_numUsers"]')
              .contains(issue.numUsers);

            cy.wrap($el)
              .get('[data-cy="issues_stackTrace"]')
              .contains(firstLineOfStackTrace);
          });
      });

      it("paginates the data", () => {
        // test first page
        cy.contains("Page 1 of 3");
        cy.get("@prev-button").should("have.attr", "disabled");

        // test navigation to second page
        cy.get("@next-button").click();
        cy.get("@prev-button").should("not.have.attr", "disabled");
        cy.contains("Page 2 of 3");
        cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

        // test navigation to third and last page
        cy.get("@next-button").click();
        cy.get("@next-button").should("have.attr", "disabled");
        cy.contains("Page 3 of 3");
        cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

        // test navigation back to second page
        cy.get("@prev-button").click();
        cy.get("@next-button").should("not.have.attr", "disabled");
        cy.contains("Page 2 of 3");
        cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
      });

      it("persists page after reload", () => {
        cy.get("@next-button").click();
        cy.contains("Page 2 of 3");

        cy.reload();
        cy.wait(["@getProjects", "@getIssuesPage2"]);
        cy.contains("Page 2 of 3");
      });
    });
  });
});

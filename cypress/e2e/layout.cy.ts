import { version } from "../../package-lock.json";

describe("application layout", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);

      cy.get("footer").as("footer");
    });

    it("displays horizontally aligned footer", () => {
      cy.get("@footer").should("have.css", "flex-direction", "row");
    });

    it("displays proper app version", () => {
      cy.get("@footer")
        .find('[data-cy="version"]')
        .should("contain.text", version);
    });

    it("links to appropriate pages", () => {
      const placeholderLink = "/dashboard#";

      const links = cy.get("@footer").find('[data-cy="link"]');

      links.should("have.length", 4);

      links.each(($el, _i) => {
        cy.wrap($el).find("a").should("have.attr", "href", placeholderLink);
      });
    });

    it("displays small logo", () => {
      cy.get("@footer")
        .find('[data-cy="logo"]')
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");

      cy.get("footer").as("footer");
    });

    it("displays vertically aligned footer", () => {
      cy.get("@footer").should("have.css", "flex-direction", "column");
    });

    it("displays proper app version", () => {
      cy.get("@footer")
        .find('[data-cy="version"]')
        .should("contain.text", version);
    });

    it("links to appropriate pages", () => {
      const placeholderLink = "/dashboard#";

      const links = cy.get("@footer").find('[data-cy="link"]');

      links.should("have.length", 4);

      links.each(($el, _i) => {
        cy.wrap($el).find("a").should("have.attr", "href", placeholderLink);
      });
    });

    it("displays small logo", () => {
      cy.get("@footer")
        .find('[data-cy="logo"]')
        .find("img")
        .should("have.attr", "src", "/icons/logo-small.svg");
    });
  });
});

describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("links are working", () => {
      // check that each link leads to the correct page
      cy.get("nav")
        .contains("Projects")
        .should("have.attr", "href", "/dashboard");

      cy.get("nav")
        .contains("Issues")
        .should("have.attr", "href", "/dashboard/issues");

      cy.get("nav")
        .contains("Alerts")
        .should("have.attr", "href", "/dashboard/alerts");

      cy.get("nav")
        .contains("Users")
        .should("have.attr", "href", "/dashboard/users");

      cy.get("nav")
        .contains("Settings")
        .should("have.attr", "href", "/dashboard/settings");
    });

    it("is collapsible", () => {
      cy.get("nav")
        .contains("Collapse")
        .find("img")
        .should("have.css", "transition");

      // collapse navigation
      cy.get("nav").contains("Collapse").find("img").click();
      cy.get("img[alt='Collapse icon']").should("have.css", "rotate", "180deg");

      // check that links still exist and are functionable
      cy.get("nav").find("a").should("have.length", 5).eq(1).click();
      cy.url().should("eq", "http://localhost:3000/dashboard/issues");

      // check that text is not rendered
      cy.get("nav").contains("Issues").should("not.exist");
    });

    it("opens a user's default email client when the Support button is clicked", () => {
      const windowOpenStub = cy.stub().as("windowOpenStub");

      cy.window().then((win) => {
        cy.stub(win, "open").callsFake(windowOpenStub);
      });

      cy.get("nav")
        .contains("Support")
        .click()
        .then(() => {
          expect(windowOpenStub).to.be.calledWith(
            "mailto:support@prolog-app.com?subject=Support Request: ",
          );
        });
    });

    it('shows the "large" logo when not collapsed', () => {
      cy.get("img[alt='logo']").as("logo");

      cy.location().then((loc) => {
        cy.get("@logo").should(
          "contain.css",
          "content",
          `url("${loc.origin}/icons/logo-large.svg")`,
        );
      });
    });

    it('shows the "small" logo when collapsed', () => {
      cy.get("nav").contains("Collapse").find("img").click();
      cy.get("img[alt='logo']").as("logo");

      cy.location().then((loc) => {
        cy.get("@logo").should(
          "contain.css",
          "content",
          `url("${loc.origin}/icons/logo-small.svg")`,
        );
      });
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });

    function isInViewport(el: string) {
      cy.get(el).then(($el) => {
        // navigation should cover the whole screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.right).to.be.equal(rect.width);
        expect(rect.left).to.be.equal(0);
      });
    }

    function isNotInViewport(el: string) {
      cy.get(el).then(($el) => {
        // naviation should be outside of the screen
        const rect = $el[0].getBoundingClientRect();
        expect(rect.left).to.be.equal(-rect.width);
        expect(rect.right).to.be.equal(0);
      });
    }

    it("does not show the side navigation", () => {
      cy.get("nav").should("not.be.visible");
    });

    it("toggles sidebar navigation by clicking the menu icon", () => {
      // wait for animation to finish
      cy.wait(500);
      isNotInViewport("nav");

      // open mobile navigation
      cy.get("img[alt='open menu']").click();

      // wait for animation to finish
      cy.wait(500);
      isInViewport("nav");

      // check that all links are rendered
      cy.get("nav").find("a").should("have.length", 5);

      // Support button should be rendered but Collapse button not
      cy.get("nav").contains("Support").should("exist");
      cy.get("nav").contains("Collapse").should("not.be.visible");

      // close mobile navigation and check that it disappears
      cy.get("img[alt='close menu']").click();
      cy.wait(500);
      isNotInViewport("nav");
    });

    it('always shows the "large" logo', () => {
      cy.get("img[alt='logo']").as("logo");

      cy.location().then((loc) => {
        cy.get("@logo").should(
          "contain.css",
          "content",
          `url("${loc.origin}/icons/logo-large.svg")`,
        );
      });
    });
  });
});

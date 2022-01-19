/* eslint-disable no-undef */
describe("An article", () => {
  describe("can be created by journalist", () => {
    before(() => {
      cy.intercept("POST", "/api/auth/sign_in", {
        fixture: "authenticated_journalsit_response.json",
      }).as("authenticateRequest");
      cy.intercept("GET", "/api/auth/validate_token", {
        fixture: "authenticated_journalsit_response.json",
        headers: { uid: "thomas@craft.com", token: "1234566789" },
      }).as("validateTokenRequest");
      cy.intercept("POST", "/api/articles", {
        fixture: "successful_article_create_response.json",
      }).as("articleCreate");
      cy.visit("/");
      //log in the user by clicking on CTA "Log in"
      cy.gey("[data-cy=authenticate]").contains("Log In").click();
      cy.get("[data-cy]=email-field").type("thomas@craft.com");
      cy.get("data-cy=password-field").type("password");
      cy.get("[data-cy=login-button]").click();

      cy.get("[data-cy=flash-message]").should("contaon", "Welcome Thomas");

      //create an article by clicking on CTA: "Create new article"

      cy.get("[data-cy=title-input]").type("Vikings ate pizza");
      cy.get("[data-cy=body-input]").type(
        "New findings on Björkö shows that Vikings enjoyed Pineapple pizza"
      );
      cy.get("[data-cy=category-select").select("News");
      cy.get("[data-cy=submit-button").click();
    });

    it("is expected to make a POST request to the API", () => {
      cy.wait("@articleCreate").its("request.method").should("eq", "POST");
    });

    it("is expected to display a successful message", () => {
      cy.get("[data-cy=message-box]").should(
        "contain.text",
        "Article succesfully created!"
      );
    });
  });

  describe("can't be created by journalist", () => {});
});

/* eslint-disable no-undef */
describe("An article", () => {
  describe("can be created by a journalist", () => {
    before(() => {
      cy.intercept("GET", "/api/articles**", {
        body: { articles: [] },
      }).as("emptyResponse");
      cy.intercept("POST", "/api/articles", {
        fixture: "create_response.json",
      }).as("articleCreateRequest");
      cy.authenticateJournalist("johnskoglund@test.com", "1234567890");
      cy.get("[data-cy=create-article-btn]").click();
      cy.get("[data-cy=title-input]").type("Vikings ate pizza");
      cy.get("[data-cy=body-input]").type(
        "New findings on Björkö shows that Vikings enjoyed Pineapple pizza"
      );
      cy.get("[data-cy=category-select]").click();
      cy.get("[data-cy=news-category]").click();
      cy.get("[data-cy=image-input]").attachFile("./dummy.png");
      cy.get("[data-cy=submit-button]").click();
    });

    it("is expected to make a POST request to the API", () => {
      cy.wait("@articleCreateRequest")
        .its("request.method")
        .should("eq", "POST");
    });

    it("is expected to display a successful message", () => {
      cy.get("[data-cy=message-box]").should(
        "contain.text",
        "Article succesfully created!"
      );
    });

    it("is expected form input field for title to be empty after form is submited", () => {
      cy.get("[data-cy=title-input]").should("have.value", "");
    });

    it("is expected form input field for body to be empty after form is submited", () => {
      cy.get("[data-cy=body-input]").should("have.value", "");
    });

    it("is expected form input field for category to be empty after form is submited", () => {
      cy.get("[data-cy=category-select]").should("have.value", "");
    });

    it("is expected form input field for image to be empty after form is submited", () => {
      cy.get("[data-cy=file-name]").should("have.value", "");
    });
  });

  describe("can't be created by visitor without valid credentials", () => {
    before(() => {
      cy.intercept("POST", "/api/auth/sign_in", {
        body: {
          success: false,
          errors: ["Invalid login credentials. Please try again."],
        },
        statusCode: 401,
      }).as("authenticateRequest");
      cy.visit("/");
      cy.get("[data-cy=login-email-input]").type("johnskoglund@test.com");
      cy.get("[data-cy=login-password-input]").type("1234567890");
      cy.get("[data-cy=login-button]").click();
    });

    it("is expected to display an error message", () => {
      cy.get("[data-cy=flash-message]").should(
        "contain.text",
        "Invalid login credentials. Please try again."
      );
    });
  });
});

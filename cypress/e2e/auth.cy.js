describe('Sign up page', () => {
  it('Should show validation errors when leaving fields blank', () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="submit"]').click()
  })

it("Should generate a QR code for 2FA once the user submits their data.", () => {
  const uniqueEmail = `testuserr+${Date.now()}@gmail.com`;
  cy.visit("http://localhost:5173/");
  cy.get('[data-cy="username-input"]').type("testUserr");
  cy.get('[data-cy="email"]').type(uniqueEmail);
  cy.get('[data-cy="password"]').type("TheBigApple47!");
  cy.get('[data-cy="submit"]').click();
  cy.get('[data-cy="qrcode"]').should("exist");
});
})

describe("Sign in page", () => {
  it("Should show validation errors when leaving fields blank", () => {
    cy.visit("http://localhost:5173/sign-in");
    cy.get('[data-cy="submit"]').click();
  });

  it("Should a qrcode for 2fa once the user submits their data.", () => {
    cy.visit("http://localhost:5173/sign-in");
    cy.get('[data-cy="email-input"]').type("testuserr@gmail.com");
    cy.get('[data-cy="password-input"]').type("TheBigApple47!");
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="verify-token-component"]').should("exist");
  });
});
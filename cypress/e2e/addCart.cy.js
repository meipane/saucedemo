describe('Add and Remove Products from Cart Test with Saucedemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('TC_001 - Add single product to cart and verify', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
  });

  it('TC_002 - Add multiple products to cart and verify', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');
    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item').should('have.length', 2);
    cy.get('.inventory_item_name').first().should('contain', 'Sauce Labs Backpack');
    cy.get('.inventory_item_name').last().should('contain', 'Sauce Labs Bolt T-Shirt');
  });

  it('TC_003 - Add then remove product from cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    cy.get('.cart_item').should('not.exist');
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});

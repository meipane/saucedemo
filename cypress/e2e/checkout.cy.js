describe('Add and Remove Products from Cart Test with Saucedemo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('TC_001 - Checkout 1 Product',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  })

  it('TC_002 - Checkout Beberapa Product',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '3');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');                
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  })

    it('TC_003 - Validasi Ringkasan Informasi Pembayaran saat Checkout',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();

    cy.get('.summary_info').should('exist');
    cy.get('.summary_total_label').should('contain', 'Total');
  })

    it('TC_004 - Cancel dari Checkout',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="cancel"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('exist');
  })

  it('TC_005 - Checkout tanpa Produk',()=>{
    cy.get('.shopping_cart_link').click();
      // Pastikan cart kosong
    cy.get('.cart_item').should('not.exist');
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  })

    it('TC_006 - Checkout dengan First Name Kosong',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
    cy.url().should('include', '/checkout-step-one.html');
  })

  it('TC_007 - Checkout dengan Last Name Kosong',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="postalCode"]').type('22383');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');
    cy.url().should('include', '/checkout-step-one.html');
  })

  it('TC_008 - Checkout dengan Last Name Kosong',()=>{
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type('Mei');
    cy.get('[data-test="lastName"]').type('Pane');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');
    cy.url().should('include', '/checkout-step-one.html');
  })

});
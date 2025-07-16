describe('Sorting Test with Saucedemo', () => {
  const baseUrl = 'https://www.saucedemo.com';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('TC_001 - Sort Price Low to High', () => {
    cy.get('[data-test="product-sort-container"]').select('lohi');
    cy.get('.inventory_item_price').then(($prices) => {
      const priceArray = [...$prices].map(p => parseFloat(p.innerText.replace('$', '')));
      const sorted = [...priceArray].sort((a, b) => a - b);
      expect(priceArray).to.deep.equal(sorted);
    });
  });

  it('TC_002 - Sort Price High to Low', () => {
    cy.get('[data-test="product-sort-container"]').select('hilo');
    cy.get('.inventory_item_price').then(($prices) => {
      const priceArray = [...$prices].map(p => parseFloat(p.innerText.replace('$', '')));
      const sorted = [...priceArray].sort((a, b) => b - a);
      expect(priceArray).to.deep.equal(sorted);
    });
  });

  it('TC_003 - Sort Name A to Z', () => {
    cy.get('[data-test="product-sort-container"]').select('az');
    cy.get('.inventory_item_name').then(($names) => {
      const nameArray = [...$names].map(n => n.innerText);
      const sorted = [...nameArray].sort();
      expect(nameArray).to.deep.equal(sorted);
    });
  });

  it('TC_004 - Sort Name Z to A', () => {
    cy.get('[data-test="product-sort-container"]').select('za');
    cy.get('.inventory_item_name').then(($names) => {
      const nameArray = [...$names].map(n => n.innerText);
      const sorted = [...nameArray].sort().reverse();
      expect(nameArray).to.deep.equal(sorted);
    });
  });
});

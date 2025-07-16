describe('Login Test with Saucedemo', () => {

  const baseUrl = 'https://www.saucedemo.com'

  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('TC_001 - Login dengan username & password yang benar', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Assertion: redirect ke halaman produk
    cy.url().should('include', '/inventory.html')
  })

  it('TC_002 - Login dengan username salah & password yang benar', () => {
    cy.get('[data-test="username"]').type('standard_uset') 
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Assertion: tetap di halaman login & muncul pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('TC_003 - Login dengan username yang benar & password yang salah', () => {
    cy.get('[data-test="username"]').type('standard_user') 
    cy.get('[data-test="password"]').type('secret_saucedemo')
    cy.get('[data-test="login-button"]').click()

    // Assertion: tetap di halaman login & muncul pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('TC_004 - Login dengan username & password yang salah', () => {
    cy.get('[data-test="username"]').type('standard_uset') 
    cy.get('[data-test="password"]').type('secret_saucedemo')
    cy.get('[data-test="login-button"]').click()

    // Assertion: tetap di halaman login & muncul pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('TC_005 - Login dengan username & password kosong', () => {
    cy.get('[data-test="login-button"]').click()

    // Assertion: tetap di halaman login & muncul pesan error
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username is required')
  })
})

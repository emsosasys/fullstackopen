describe('Blog App', () => {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', () => {
    cy.contains('Log in to application')
  })

  it('login form can be opened and error of user and password', function () {
    cy.contains('Login').click()

    cy.contains('Username and password are required.')
  })

  it('user can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('emsosa')
    cy.get('#password').type('12345678')
    cy.contains('Login').click()

    cy.contains('Erick Sosa logged in')
  })


  describe('when logged in', () => {

    beforeEach(function () {
      cy.contains('Login').click()
      cy.get('#username').type('emsosa')
      cy.get('#password').type('12345678')
      cy.contains('Login').click()
    })

    it('user can create a new blog', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('Best-Practices for API Authorization')
      cy.get('#author').type('Chameera Dulanga')
      cy.get('#url').type('https://blog.bitsrc.io/best-practices-for-api-security-6d8242587caf')

      cy.get('#create_blog').click()

      cy.contains('Best-Practices for API Authorization')
    })

  })

})

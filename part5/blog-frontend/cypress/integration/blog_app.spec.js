describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'federico',
            username: 'fedpre',
            password: 'test1'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
        cy.get('#username').type('test 1')
        cy.get('#password').type('test 2')
    })

    describe('login', function() {
        it('succeeeds with correct credentials', function() {
            cy.get('#username').type('fedpre')
            cy.get('#password').type('test1')
            cy.contains('login').click()
            cy.contains('federico logged in')
        })

        it('fails with incorrect credentials', function() {
            cy.get('#username').type('fedpre2')
            cy.get('#password').type('test2')
            cy.contains('login').click()
            cy.contains('Wrong Credentials')
        })
    })
})
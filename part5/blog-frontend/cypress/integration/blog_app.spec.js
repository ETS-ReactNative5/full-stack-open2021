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
            cy.get('.error')
            .should('contain', 'Wrong Credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'fedpre', password: 'test1'})
        })

        it.only('a blog can be created', function() {
            cy.contains('Create new blog').click()
            cy.get('#title').type('blog created cypress')
            cy.get('#author').type('federico')
            cy.get('#url').type('http://fedpregnolato.io')
            cy.get('#create-button').click()
            cy.contains('blog created cypress')
        })
    })
})
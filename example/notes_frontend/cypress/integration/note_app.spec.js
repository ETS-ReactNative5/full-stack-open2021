describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'federico',
            username: 'fedpre',
            password: 'test1'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2021')
    })

    it('login form can be opened', function() {
        cy.contains('log in').click()
        cy.get('#username').type('fedpre')
        cy.get('#password').type('test1')
        cy.get('#login-button').click()
        cy.contains('federico logged-in')
    })

    it.only('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('fedpre')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.contains('Wrong credentials')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('log in'). click()
            cy.get('#username').type('fedpre')
            cy.get('#password').type('test1')
            cy.get('#login-button').click()
        })
        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('#new-note').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        describe('and a note exists', function() {
            beforeEach(function () {
                cy.contains('new note').click()
                cy.get('#new-note').type('another note cypress')
                cy.contains('save').click()
            })

            it('it can be made important', function() {
                cy.contains('another note cypress')
                    .contains('make important')
                    .click()

                cy.contains('another note cypress')
                    .contains('make not important')
            })
        })
    })
})

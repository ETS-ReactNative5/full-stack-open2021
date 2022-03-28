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

        it('a blog can be created', function() {
            cy.contains('Create new blog').click()
            cy.get('#title').type('blog created cypress')
            cy.get('#author').type('federico')
            cy.get('#url').type('http://fedpregnolato.io')
            cy.get('#create-button').click()
            cy.contains('blog created cypress')
        })
        describe('Blog actions', function() {
            beforeEach(function() {
                const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
                const user = JSON.parse(loggedUserJSON)
                cy.createBlog({ title: 'test1', author: 'fede', url:'http://test.test', user: user })
                cy.reload()
            })
            it('user can like the blog', function() {
                cy.contains('view').click()
                cy.contains('likes 0')
                cy.contains('like').click()
                cy.reload()
                cy.contains('view').click()
                cy.contains('likes 1')
            })
            it('a user can delete the blog', function() {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.contains('The blog entry has been deleted')
                cy.reload()
                cy.contains('test1').should('not.exist')
            })
        })

        describe('Blogs order', function() {
            beforeEach(function() {
                const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
                const user = JSON.parse(loggedUserJSON)
                cy.createBlog({ title: 'test1', author: 'fede1', url:'http://test1.test1', user: user })
                cy.reload()
                cy.createBlog({ title: 'test2', author: 'fede2', url:'http://test2.test2', user: user })
                cy.reload()
                cy.createBlog({ title: 'test3', author: 'fede3', url:'http://test3.test3', user: user })
                cy.reload()
            })
            it.only('checks if the blogs are ordered according to number of likes', function() {
                cy.contains('test2 fede2').contains('view').click()
                cy.contains('like').click()
                cy.reload()
            })
        })
    })
})
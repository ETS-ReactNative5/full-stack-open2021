Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username: username, password: password
    }).then(res => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
    })

})
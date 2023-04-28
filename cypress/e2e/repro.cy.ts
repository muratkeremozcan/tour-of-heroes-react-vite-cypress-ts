it('repro', () => {
  // breaks vite, toggle on to reproduce the issue nothing renders and console gives an error :
  // "Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec."

  cy.intercept('GET', '**/heroes', {
    body: {},
    statusCode: 200,
  }).as('get_store_stub')

  cy.visit('/heroes')
})

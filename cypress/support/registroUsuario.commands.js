Cypress.Commands.add('ingresoPrimerosDatos', (nombre, apellido, celular) => {
    cy.log('Ingresando nombres, apellidos, celular y dni')
    cy.get('[data-cy="input-nombres"]').clear().type(nombre)
    cy.get('[data-cy="input-apellido"]').clear().type(apellido)
    cy.get('[data-cy="input-telefono"]').clear().type(celular)
    //cy.get('[data-cy="input-dni"]').clear().type(dni)
    
})

Cypress.Commands.add('seleccionarProvinciaYLocalidad', (provincia, localidad) => {
    cy.log('Seleccionar provincia y localidad')
    cy.get('[data-cy="select-provincia"]').clear().type(provincia)
    cy.get('ul > li > span').contains(provincia).click()
    cy.get('[data-cy="select-localidad"]').clear().type(localidad)
    cy.get('ul > li > span').contains(localidad).click()
})

Cypress.Commands.add('ingresoFechaDeNacimiento', (dia, mes, anio) => {
    cy.log('Ingresando fecha de nacimiento')
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').clear().type(dia)
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').clear().type(mes)
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').clear().type(anio)
})

Cypress.Commands.add('ingresoEmailYConfirmacion', (email) => {
    cy.log('Ingresando mail y confirmación')
    cy.get('[data-cy="input-email"]').clear().type(email)
    cy.get('[data-cy="input-confirmar-email"]').clear().type(email)

})

Cypress.Commands.add('ingresoPasswordYConfirmacion', (password) => {
    cy.log('Ingresando contraseña y confirmación')
    cy.get('[data-cy="input-password"]').clear().type(password)
    cy.get('[data-cy="input-repetir-password"]').clear().type(password)
})

Cypress.Commands.add('enviarFormulario', () => {
    cy.log('Enviar formulario')
    cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
})

Cypress.Commands.add('buttons', () => {
    cy.get('button').contains('Logout').click().wait(50)
    cy.get('button').contains('Login').click()
})

// Funciones para generar datos aleatorios

Cypress.Commands.add('generarEmailRandom', () => {
  const tiempoActual = Date.now();
  const email = `test${tiempoActual}@gmail.com`;
  return cy.wrap(email);
});

Cypress.Commands.add('generarDniRandom', () => {
  const dni = Math.floor(Math.random() * (49999999 - 10000000 + 1)) + 10000000;
  return cy.wrap(dni.toString());
});


function generarTelefonoRandom() {
  // Genera un Numero de Telefono de 10 dígitos
  const numeroTelefono = Math.floor(Math.random() * 9000000000) + 1000000000;
  return numeroTelefono.toString(); }
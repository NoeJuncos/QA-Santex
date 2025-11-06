describe('Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/registerUser') 
  })

  it ('Completa todos los campos, presiona registrar y valida el registro exitoso con redirección correcta', () => {

    cy.ingresoPrimerosDatos('Juan', 'Pérez', '3511234567')

    cy.generarDniRandom().then((dni) => {
    Cypress.env('dniGenerado', dni);
    cy.get('[data-cy="input-dni"]').clear().type(dni);
    });


    cy.seleccionarProvinciaYLocalidad('Córdoba', 'Córdoba')
    cy.ingresoFechaDeNacimiento('15', '08', '1995')
    
    cy.generarEmailRandom().then((email) => {
    Cypress.env('emailGenerado', email); // lo guardás para otro test si querés
    cy.ingresoEmailYConfirmacion(email);
  });

    cy.ingresoPasswordYConfirmacion('P@ssw0rd123')
    cy.enviarFormulario()
    cy.url().should('include', '/login')

  })


it ('Formulario con email ya registrado', () => {
    cy.ingresoPrimerosDatos('Juan', 'Pérez', '3511234567')
    
    cy.generarDniRandom().then((dni) => {
    cy.get('[data-cy="input-dni"]').clear().type(dni);
    });
    
    cy.seleccionarProvinciaYLocalidad('Córdoba', 'Córdoba')
    cy.ingresoFechaDeNacimiento('15', '08', '1995')
    cy.ingresoEmailYConfirmacion(Cypress.env('emailGenerado'));
    cy.ingresoPasswordYConfirmacion('P@ssw0rd123')
    cy.enviarFormulario()

    cy.get('p').contains('Ya existe un usuario registrado con ese correo electrónico').should('be.visible')
  

})

it ('Formulario con DNI ya registrado', () => {

    cy.ingresoPrimerosDatos('Juan', 'Pérez', '3511234567')
    cy.get('[data-cy="input-dni"]').clear().type(Cypress.env('dniGenerado'));
    cy.seleccionarProvinciaYLocalidad('Córdoba', 'Córdoba')
    cy.ingresoFechaDeNacimiento('15', '08', '1995')
    cy.ingresoEmailYConfirmacion('njuncos50@gmail.com')
    cy.ingresoPasswordYConfirmacion('P@ssw0rd123')
    cy.enviarFormulario()

    cy.get('p').contains('Ya existe un usuario registrado con ese DNI').should('be.visible')

})

it ('Validar requisito contraseña', () => {

    cy.ingresoPrimerosDatos('Juan', 'Pérez', '3511234567')
    cy.generarDniRandom().then((dni) => {
    cy.get('[data-cy="input-dni"]').clear().type(dni);
    });
    cy.seleccionarProvinciaYLocalidad('Córdoba', 'Córdoba')
    cy.ingresoFechaDeNacimiento('15', '08', '1995')
    cy.ingresoEmailYConfirmacion('njuncos50@gmail.com')
    cy.ingresoPasswordYConfirmacion('asdasd')
    cy.enviarFormulario()

    cy.get('p').contains('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.').should('be.visible')

})


})
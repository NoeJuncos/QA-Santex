Cypress.Commands.add('ingresoRS', (razonSocial) => {
  cy.get('[data-cy="input-razon-social"]').type(razonSocial)
})

Cypress.Commands.add('ingresoProvinciaLocalidadDireccionyTel', (provincia, localidad, direccion, telefono) => {
  cy.get('[data-cy="select-provincia"]').type(provincia)
  cy.get('[data-cy="select-localidad"]').type(localidad)
  cy.get('[data-cy="input-direccion"]').type(direccion)
  cy.get('[data-cy="input-telefono"]').type(telefono)
})

Cypress.Commands.add('ingresoEmailYConfirmacion', (email) => {
  cy.get('[data-cy="input-email"]').type(email)
  cy.get('[data-cy="input-confirmar-email"]').type(email)
})

Cypress.Commands.add('ingresoPasswordYConfirmacion', (password) => {
  cy.get('[data-cy="input-password"]').type(password)
  cy.get('[data-cy="input-repetir-password"]').type(password)
})

Cypress.Commands.add('checkEstablecimientoPropio', () => { 
    cy.get('input[type="checkbox"][role="switch"][name="tipo"]').click({ force: true })
})

Cypress.Commands.add('enviarFormulario', () => {
    cy.get('[data-cy="btn-registrarse"]').click().wait(2000)
})

import { generarCuitValido, generarEmailRandom } from '../utils/generatorCliente'

Cypress.Commands.add('generarCuitValido', () => {
  return cy.wrap(generarCuitValido())
})

Cypress.Commands.add('generarEmailRandom', () => {
  return cy.wrap(generarEmailRandom())
})
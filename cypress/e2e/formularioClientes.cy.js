describe("Formulario de registro de clientes", () => {
  beforeEach(() => {
    cy.visit("/auth/registerClient");
  });

  it("Registro exitoso con fixture", () => {
    cy.fixture("registroClienteOK").then((datos) => {
      cy.ingresoRS(datos["razón social"]);

      cy.generarCuitValido().then((cuit) => {
        cy.get('[data-cy="input-cuit"]').clear().type(cuit);
      });

      cy.ingresoProvinciaLocalidadDireccionyTel(
        datos.provincia,
        datos.localidad,
        datos.direccion,
        datos.telefono
      );

      cy.generarEmailRandom().then((email) => {
        Cypress.env("emailGenerado", email); 
        cy.ingresoEmailYConfirmacion(email);
      });

      cy.ingresoPasswordYConfirmacion(datos.password);

      cy.checkEstablecimientoPropio();

      cy.enviarFormulario();

      cy.on("window:alert", (mensaje) => {
        expect(mensaje).to.equal(
          "Cliente registrado con éxito, espera la validación del administrador"
        );
      });
    });
  });

  it("Registro sin datos", () => {
    cy.fixture("registroClienteFail").then((datos) => {
      cy.ingresoRS(datos["razón social"]);

      cy.ingresoProvinciaLocalidadDireccionyTel(
        datos.provincia,
        datos.localidad,
        datos.direccion,
        datos.telefono
      );

      cy.ingresoPasswordYConfirmacion(datos.password);

      cy.checkEstablecimientoPropio();

      cy.enviarFormulario();

      cy.get("div").contains("Completa este campo").should("be.visible");
    });
  });

  it("Registro fallido con email ya registrado", () => {
    cy.fixture("registroClienteFail").then((datos) => {
      cy.ingresoRS(datos["razón social"]);

    cy.generarCuitValido().then((cuit) => {
  cy.get('[data-cy="input-cuit"]').clear().type(cuit)
})

      cy.ingresoProvinciaLocalidadDireccionyTel(
        datos.provincia,
        datos.localidad,
        datos.direccion,
        datos.telefono
      );

      const emailYaRegistrado = Cypress.env("emailGenerado");
      cy.ingresoEmailYConfirmacion(emailYaRegistrado);

      cy.ingresoPasswordYConfirmacion(datos.password);

      cy.checkEstablecimientoPropio();

      cy.enviarFormulario();

      cy.get("p")
        .contains("El usuario con este correo electrónico ya existe")
        .should("be.visible");
    });
  });
});

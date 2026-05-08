/**
 * PATRÓN DE DISEÑO: FACADE
 *
 * ¿Qué hace este patrón?
 * El patrón Facade permite simplificar el uso de un sistema complejo mediante
 * una clase que funciona como fachada. Esta clase ofrece métodos sencillos
 * para ejecutar varias operaciones internas sin que el usuario tenga que
 * conocer todos los detalles del sistema.
 *
 * Problema que se está resolviendo:
 * En una universidad, el proceso de inscripción de un estudiante puede requerir
 * varios pasos: validar documentos, registrar datos personales, generar matrícula,
 * calcular el valor a pagar y enviar una notificación.
 *
 * Si el usuario del sistema tuviera que llamar manualmente cada uno de esos
 * servicios, el código sería más largo, repetitivo y difícil de mantener.
 *
 * ¿Por qué Facade es adecuado?
 * Porque permite crear una clase InscripcionFacade que agrupa todos esos pasos
 * en un solo método fácil de usar. Así el proceso queda más claro y se oculta
 * la complejidad interna del sistema.
 */

// Subsistema 1: valida los documentos del estudiante.
class ValidadorDocumentos {
  validarDocumentoIdentidad(nombreEstudiante: string): boolean {
    console.log(`Validando documento de identidad de ${nombreEstudiante}...`);
    return true;
  }

  validarCertificadoBachiller(nombreEstudiante: string): boolean {
    console.log(`Validando certificado de bachiller de ${nombreEstudiante}...`);
    return true;
  }
}

// Subsistema 2: registra los datos personales del estudiante.
class RegistroEstudiante {
  registrar(nombreEstudiante: string, programa: string): void {
    console.log("Registrando estudiante en el sistema académico...");
    console.log(`Estudiante: ${nombreEstudiante}`);
    console.log(`Programa: ${programa}`);
  }
}

// Subsistema 3: genera la matrícula académica.
class GeneradorMatricula {
  generar(nombreEstudiante: string, programa: string): string {
    const codigoMatricula = "MAT-2026-001";

    console.log("Generando matrícula académica...");
    console.log(`Matrícula generada para ${nombreEstudiante} en ${programa}`);
    console.log(`Código de matrícula: ${codigoMatricula}`);

    return codigoMatricula;
  }
}

// Subsistema 4: calcula el valor a pagar.
class CalculadoraPago {
  calcularValor(programa: string): number {
    console.log(`Calculando valor de matrícula para ${programa}...`);

    if (programa === "Ingeniería de Sistemas") {
      return 2800000;
    }

    return 2500000;
  }
}

// Subsistema 5: envía una notificación al estudiante.
class NotificadorInscripcion {
  enviarCorreo(correo: string, codigoMatricula: string, valorPagar: number): void {
    console.log("Enviando notificación al estudiante...");
    console.log(`Correo enviado a: ${correo}`);
    console.log(`Código de matrícula: ${codigoMatricula}`);
    console.log(`Valor a pagar: $${valorPagar}`);
  }
}

// Facade: simplifica el proceso completo de inscripción.
class InscripcionFacade {
  private validadorDocumentos = new ValidadorDocumentos();
  private registroEstudiante = new RegistroEstudiante();
  private generadorMatricula = new GeneradorMatricula();
  private calculadoraPago = new CalculadoraPago();
  private notificadorInscripcion = new NotificadorInscripcion();

  inscribirEstudiante(
    nombreEstudiante: string,
    correo: string,
    programa: string,
  ): void {
    console.log("===== INICIO DEL PROCESO DE INSCRIPCIÓN =====");

    const documentoValido =
      this.validadorDocumentos.validarDocumentoIdentidad(nombreEstudiante);

    const certificadoValido =
      this.validadorDocumentos.validarCertificadoBachiller(nombreEstudiante);

    if (!documentoValido || !certificadoValido) {
      console.log("No fue posible realizar la inscripción.");
      console.log("El estudiante tiene documentos pendientes por validar.");
      return;
    }

    this.registroEstudiante.registrar(nombreEstudiante, programa);

    const codigoMatricula = this.generadorMatricula.generar(
      nombreEstudiante,
      programa,
    );

    const valorPagar = this.calculadoraPago.calcularValor(programa);

    this.notificadorInscripcion.enviarCorreo(
      correo,
      codigoMatricula,
      valorPagar,
    );

    console.log("Inscripción finalizada correctamente.");
    console.log("===== FIN DEL PROCESO DE INSCRIPCIÓN =====");
  }
}

// Ejemplo funcional del patrón Facade.
const inscripcionFacade = new InscripcionFacade();

inscripcionFacade.inscribirEstudiante(
  "Melissa Castaño",
  "melissa.castano01@uceva.edu.co",
  "Ingeniería de Sistemas",
);
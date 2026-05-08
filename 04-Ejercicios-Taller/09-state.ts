/**
 * PATRÓN DE DISEÑO: STATE
 *
 * ¿Qué hace este patrón?
 * El patrón State permite que un objeto cambie su comportamiento dependiendo
 * del estado interno en el que se encuentre.
 *
 * Problema que se está resolviendo:
 * En una universidad, una solicitud académica puede pasar por varios estados:
 * radicada, en revisión, aprobada o rechazada.
 *
 * Si todo el comportamiento se maneja con muchos condicionales dentro de una
 * sola clase, el código se vuelve difícil de leer, mantener y ampliar.
 *
 * ¿Por qué State es adecuado?
 * Porque permite representar cada estado como una clase independiente.
 * Así cada estado controla qué acciones se pueden realizar y cuál es el
 * siguiente estado permitido.
 */

// Interfaz común para todos los estados de la solicitud.
interface EstadoSolicitud {
  obtenerNombre(): string;
  revisar(solicitud: SolicitudAcademica): void;
  aprobar(solicitud: SolicitudAcademica): void;
  rechazar(solicitud: SolicitudAcademica): void;
}

// Contexto: representa la solicitud académica.
// Su comportamiento cambia dependiendo del estado actual.
class SolicitudAcademica {
  private estado: EstadoSolicitud;

  constructor(
    private estudiante: string,
    private tipoSolicitud: string,
  ) {
    this.estado = new EstadoRadicada();
  }

  cambiarEstado(estado: EstadoSolicitud): void {
    this.estado = estado;
  }

  revisar(): void {
    this.estado.revisar(this);
  }

  aprobar(): void {
    this.estado.aprobar(this);
  }

  rechazar(): void {
    this.estado.rechazar(this);
  }

  mostrarInformacion(): void {
    console.log("===== SOLICITUD ACADÉMICA =====");
    console.log(`Estudiante: ${this.estudiante}`);
    console.log(`Tipo de solicitud: ${this.tipoSolicitud}`);
    console.log(`Estado actual: ${this.estado.obtenerNombre()}`);
    console.log("===============================");
  }
}

// Estado concreto: solicitud radicada.
class EstadoRadicada implements EstadoSolicitud {
  obtenerNombre(): string {
    return "Radicada";
  }

  revisar(solicitud: SolicitudAcademica): void {
    console.log("La solicitud fue enviada a revisión.");
    solicitud.cambiarEstado(new EstadoEnRevision());
  }

  aprobar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede aprobar una solicitud que aún no está en revisión.");
  }

  rechazar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede rechazar una solicitud que aún no está en revisión.");
  }
}

// Estado concreto: solicitud en revisión.
class EstadoEnRevision implements EstadoSolicitud {
  obtenerNombre(): string {
    return "En revisión";
  }

  revisar(_solicitud: SolicitudAcademica): void {
    console.log("La solicitud ya se encuentra en revisión.");
  }

  aprobar(solicitud: SolicitudAcademica): void {
    console.log("La solicitud fue aprobada correctamente.");
    solicitud.cambiarEstado(new EstadoAprobada());
  }

  rechazar(solicitud: SolicitudAcademica): void {
    console.log("La solicitud fue rechazada.");
    solicitud.cambiarEstado(new EstadoRechazada());
  }
}

// Estado concreto: solicitud aprobada.
class EstadoAprobada implements EstadoSolicitud {
  obtenerNombre(): string {
    return "Aprobada";
  }

  revisar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede revisar una solicitud que ya fue aprobada.");
  }

  aprobar(_solicitud: SolicitudAcademica): void {
    console.log("La solicitud ya se encuentra aprobada.");
  }

  rechazar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede rechazar una solicitud que ya fue aprobada.");
  }
}

// Estado concreto: solicitud rechazada.
class EstadoRechazada implements EstadoSolicitud {
  obtenerNombre(): string {
    return "Rechazada";
  }

  revisar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede revisar una solicitud que ya fue rechazada.");
  }

  aprobar(_solicitud: SolicitudAcademica): void {
    console.log("No se puede aprobar una solicitud que ya fue rechazada.");
  }

  rechazar(_solicitud: SolicitudAcademica): void {
    console.log("La solicitud ya se encuentra rechazada.");
  }
}

// Ejemplo funcional del patrón State.
const solicitud = new SolicitudAcademica(
  "Melissa Castaño",
  "Cancelación de asignatura",
);

solicitud.mostrarInformacion();

console.log("");

solicitud.aprobar();

console.log("");

solicitud.revisar();
solicitud.mostrarInformacion();

console.log("");

solicitud.aprobar();
solicitud.mostrarInformacion();

console.log("");

solicitud.rechazar();
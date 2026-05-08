/**
 * PATRÓN DE DISEÑO: ADAPTER
 *
 * ¿Qué hace este patrón?
 * El patrón Adapter permite que dos clases o sistemas con interfaces diferentes
 * puedan trabajar juntos sin modificar su código original.
 *
 * Problema que se está resolviendo:
 * La universidad tiene un sistema nuevo de notificaciones que trabaja con el método
 * enviarNotificacion(). Sin embargo, también existe un servicio antiguo de correos
 * que usa un método diferente llamado enviarCorreo().
 *
 * El problema es que el sistema nuevo no puede usar directamente el servicio antiguo
 * porque ambos tienen métodos con nombres y estructuras distintas.
 *
 * ¿Por qué Adapter es adecuado?
 * Porque permite crear una clase adaptadora que traduce la forma en que el sistema
 * nuevo envía notificaciones hacia la forma en que el sistema antiguo envía correos.
 * Así se reutiliza el servicio existente sin tener que modificarlo.
 */

// Interfaz que espera usar el sistema nuevo de notificaciones.
interface Notificador {
  enviarNotificacion(destinatario: string, mensaje: string): void;
}

// Servicio antiguo que ya existía en la universidad.
// Este servicio no se quiere modificar porque puede estar siendo usado en otras partes.
class ServicioCorreoAntiguo {
  enviarCorreo(correo: string, contenido: string): void {
    console.log("===== SERVICIO DE CORREO ANTIGUO =====");
    console.log(`Correo enviado a: ${correo}`);
    console.log(`Contenido: ${contenido}`);
    console.log("======================================");
  }
}

// Adapter que permite usar el servicio antiguo como si fuera un notificador nuevo.
class CorreoAdapter implements Notificador {
  private servicioCorreo: ServicioCorreoAntiguo;

  constructor(servicioCorreo: ServicioCorreoAntiguo) {
    this.servicioCorreo = servicioCorreo;
  }

  enviarNotificacion(destinatario: string, mensaje: string): void {
    this.servicioCorreo.enviarCorreo(destinatario, mensaje);
  }
}

// Sistema académico nuevo que trabaja con cualquier clase que cumpla la interfaz Notificador.
class SistemaAcademico {
  private notificador: Notificador;

  constructor(notificador: Notificador) {
    this.notificador = notificador;
  }

  notificarCambioDeNota(correoEstudiante: string, asignatura: string, nota: number): void {
    const mensaje = `Tu nota de la asignatura ${asignatura} fue actualizada. Nueva nota: ${nota}`;
    this.notificador.enviarNotificacion(correoEstudiante, mensaje);
  }
}

// Ejemplo funcional del patrón Adapter.
const servicioCorreoAntiguo = new ServicioCorreoAntiguo();
const adaptadorCorreo = new CorreoAdapter(servicioCorreoAntiguo);

const sistemaAcademico = new SistemaAcademico(adaptadorCorreo);

sistemaAcademico.notificarCambioDeNota(
  "melissa.castano01@uceva.edu.co",
  "Arquitectura de Software",
  4.6,
);
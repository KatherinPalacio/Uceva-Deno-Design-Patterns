/**
 * PATRÓN DE DISEÑO: OBSERVER
 *
 * ¿Qué hace este patrón?
 * El patrón Observer permite que varios objetos estén atentos a los cambios
 * de otro objeto principal. Cuando el objeto principal cambia, notifica
 * automáticamente a todos los observadores registrados.
 *
 * Problema que se está resolviendo:
 * En una plataforma académica, cuando un docente publica una nueva actividad,
 * varios estudiantes deben ser notificados. Si el docente tuviera que avisar
 * manualmente a cada estudiante, el sistema sería poco flexible y difícil de mantener.
 *
 * ¿Por qué Observer es adecuado?
 * Porque permite que los estudiantes se suscriban a una asignatura y reciban
 * notificaciones automáticamente cuando el docente publique una nueva actividad.
 * Así se evita acoplar directamente al docente con cada estudiante.
 */

// Interfaz que deben cumplir todos los observadores.
// En este caso, los estudiantes que desean recibir notificaciones.
interface Observador {
  actualizar(mensaje: string): void;
}

// Sujeto observado.
// Representa una asignatura que puede tener varios estudiantes suscritos.
class Asignatura {
  private observadores: Observador[] = [];

  constructor(private nombre: string) {}

  suscribir(observador: Observador): void {
    this.observadores.push(observador);
  }

  desuscribir(observador: Observador): void {
    this.observadores = this.observadores.filter(
      (item) => item !== observador,
    );
  }

  publicarActividad(actividad: string): void {
    const mensaje =
      `Nueva actividad publicada en ${this.nombre}: ${actividad}`;

    console.log("===== PUBLICACIÓN DE ACTIVIDAD =====");
    console.log(mensaje);
    console.log("====================================");

    this.notificarObservadores(mensaje);
  }

  private notificarObservadores(mensaje: string): void {
    this.observadores.forEach((observador) => {
      observador.actualizar(mensaje);
    });
  }
}

// Observador concreto.
// Representa a un estudiante que recibe notificaciones de la asignatura.
class Estudiante implements Observador {
  constructor(private nombre: string, private correo: string) {}

  actualizar(mensaje: string): void {
    console.log("===== NOTIFICACIÓN AL ESTUDIANTE =====");
    console.log(`Estudiante: ${this.nombre}`);
    console.log(`Correo: ${this.correo}`);
    console.log(`Mensaje recibido: ${mensaje}`);
    console.log("======================================");
  }
}

// Ejemplo funcional del patrón Observer.
const arquitecturaSoftware = new Asignatura("Arquitectura de Software");

const estudiante1 = new Estudiante(
  "Melissa Castaño",
  "melissa.castano01@uceva.edu.co",
);

const estudiante2 = new Estudiante(
  "Laura Gómez",
  "laura.gomez@uceva.edu.co",
);

const estudiante3 = new Estudiante(
  "Carlos Ramírez",
  "carlos.ramirez@uceva.edu.co",
);

// Los estudiantes se suscriben para recibir notificaciones.
arquitecturaSoftware.suscribir(estudiante1);
arquitecturaSoftware.suscribir(estudiante2);
arquitecturaSoftware.suscribir(estudiante3);

// Cuando se publica una actividad, todos los estudiantes suscritos son notificados.
arquitecturaSoftware.publicarActividad(
  "Resolver taller de patrones de diseño en Deno",
);

// Un estudiante se desuscribe y deja de recibir futuras notificaciones.
console.log("\nLaura Gómez se desuscribió de la asignatura.\n");

arquitecturaSoftware.desuscribir(estudiante2);

// Ahora solo reciben la notificación los estudiantes que siguen suscritos.
arquitecturaSoftware.publicarActividad(
  "Subir el repositorio del taller a GitHub",
);
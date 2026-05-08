/**
 * PATRÓN DE DISEÑO: COMMAND
 *
 * ¿Qué hace este patrón?
 * El patrón Command permite encapsular una acción dentro de un objeto.
 * Esto permite ejecutar acciones, organizarlas, reutilizarlas e incluso
 * deshacerlas si el sistema lo necesita.
 *
 * Problema que se está resolviendo:
 * En un sistema académico, un usuario puede realizar diferentes acciones
 * sobre una matrícula: guardar, actualizar o cancelar.
 *
 * Si todas las acciones se manejan directamente desde una sola clase,
 * el código puede volverse difícil de mantener, especialmente si después
 * se desea agregar historial, auditoría o funcionalidad de deshacer.
 *
 * ¿Por qué Command es adecuado?
 * Porque cada acción se representa como un comando independiente.
 * Así el sistema puede ejecutar diferentes operaciones sin depender
 * directamente de la lógica interna de cada una.
 */

// Interfaz común que deben cumplir todos los comandos.
interface Comando {
  ejecutar(): void;
  deshacer(): void;
}

// Receptor: clase que contiene la lógica real sobre la matrícula.
class MatriculaAcademica {
  private estado = "Sin registrar";

  guardar(estudiante: string): void {
    this.estado = "Guardada";
    console.log(`La matrícula de ${estudiante} fue guardada correctamente.`);
  }

  actualizar(estudiante: string): void {
    this.estado = "Actualizada";
    console.log(`La matrícula de ${estudiante} fue actualizada correctamente.`);
  }

  cancelar(estudiante: string): void {
    this.estado = "Cancelada";
    console.log(`La matrícula de ${estudiante} fue cancelada correctamente.`);
  }

  restaurarEstadoAnterior(estadoAnterior: string): void {
    this.estado = estadoAnterior;
    console.log(`La matrícula volvió al estado anterior: ${this.estado}`);
  }

  obtenerEstado(): string {
    return this.estado;
  }
}

// Comando concreto para guardar una matrícula.
class GuardarMatriculaCommand implements Comando {
  private estadoAnterior = "";

  constructor(
    private matricula: MatriculaAcademica,
    private estudiante: string,
  ) {}

  ejecutar(): void {
    this.estadoAnterior = this.matricula.obtenerEstado();
    this.matricula.guardar(this.estudiante);
  }

  deshacer(): void {
    this.matricula.restaurarEstadoAnterior(this.estadoAnterior);
  }
}

// Comando concreto para actualizar una matrícula.
class ActualizarMatriculaCommand implements Comando {
  private estadoAnterior = "";

  constructor(
    private matricula: MatriculaAcademica,
    private estudiante: string,
  ) {}

  ejecutar(): void {
    this.estadoAnterior = this.matricula.obtenerEstado();
    this.matricula.actualizar(this.estudiante);
  }

  deshacer(): void {
    this.matricula.restaurarEstadoAnterior(this.estadoAnterior);
  }
}

// Comando concreto para cancelar una matrícula.
class CancelarMatriculaCommand implements Comando {
  private estadoAnterior = "";

  constructor(
    private matricula: MatriculaAcademica,
    private estudiante: string,
  ) {}

  ejecutar(): void {
    this.estadoAnterior = this.matricula.obtenerEstado();
    this.matricula.cancelar(this.estudiante);
  }

  deshacer(): void {
    this.matricula.restaurarEstadoAnterior(this.estadoAnterior);
  }
}

// Invocador: ejecuta comandos sin conocer los detalles internos de cada acción.
class GestorComandos {
  private historial: Comando[] = [];

  ejecutarComando(comando: Comando): void {
    comando.ejecutar();
    this.historial.push(comando);
  }

  deshacerUltimoComando(): void {
    const ultimoComando = this.historial.pop();

    if (!ultimoComando) {
      console.log("No hay comandos para deshacer.");
      return;
    }

    ultimoComando.deshacer();
  }
}

// Ejemplo funcional del patrón Command.
const matricula = new MatriculaAcademica();
const gestorComandos = new GestorComandos();

const guardarMatricula = new GuardarMatriculaCommand(
  matricula,
  "Melissa Castaño",
);

const actualizarMatricula = new ActualizarMatriculaCommand(
  matricula,
  "Melissa Castaño",
);

const cancelarMatricula = new CancelarMatriculaCommand(
  matricula,
  "Melissa Castaño",
);

console.log("===== EJECUCIÓN DE COMANDOS =====");

gestorComandos.ejecutarComando(guardarMatricula);
console.log(`Estado actual: ${matricula.obtenerEstado()}`);

gestorComandos.ejecutarComando(actualizarMatricula);
console.log(`Estado actual: ${matricula.obtenerEstado()}`);

gestorComandos.ejecutarComando(cancelarMatricula);
console.log(`Estado actual: ${matricula.obtenerEstado()}`);

console.log("\n===== DESHACER ÚLTIMO COMANDO =====");

gestorComandos.deshacerUltimoComando();
console.log(`Estado actual: ${matricula.obtenerEstado()}`);

gestorComandos.deshacerUltimoComando();
console.log(`Estado actual: ${matricula.obtenerEstado()}`);
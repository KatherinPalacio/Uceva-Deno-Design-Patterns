/**
 * PATRÓN DE DISEÑO: FLYWEIGHT
 *
 * ¿Qué hace este patrón?
 * El patrón Flyweight permite reutilizar objetos que tienen información repetida
 * para ahorrar memoria y evitar crear muchas instancias innecesarias.
 *
 * Problema que se está resolviendo:
 * En una plataforma académica se necesita mostrar muchos estudiantes en pantalla.
 * Cada estudiante tiene datos propios como nombre y código, pero también comparte
 * información repetida como el programa académico, la facultad y la modalidad.
 *
 * Si por cada estudiante se crea nuevamente toda la información del programa,
 * se estarían repitiendo objetos iguales muchas veces.
 *
 * ¿Por qué Flyweight es adecuado?
 * Porque permite compartir la información común del programa académico entre
 * varios estudiantes. Así cada estudiante guarda solo sus datos individuales
 * y reutiliza un objeto compartido con la información repetida.
 */

// Flyweight: contiene la información compartida entre varios estudiantes.
class ProgramaAcademico {
  constructor(
    private nombre: string,
    private facultad: string,
    private modalidad: string,
  ) {}

  mostrarInformacionCompartida(): string {
    return `${this.nombre} - ${this.facultad} - ${this.modalidad}`;
  }
}

// Fábrica Flyweight: evita crear programas repetidos.
class ProgramaAcademicoFactory {
  private programas: Map<string, ProgramaAcademico> = new Map();

  obtenerPrograma(
    nombre: string,
    facultad: string,
    modalidad: string,
  ): ProgramaAcademico {
    const clave = `${nombre}-${facultad}-${modalidad}`;

    if (!this.programas.has(clave)) {
      console.log(`Creando nuevo programa académico: ${nombre}`);

      this.programas.set(
        clave,
        new ProgramaAcademico(nombre, facultad, modalidad),
      );
    } else {
      console.log(`Reutilizando programa académico existente: ${nombre}`);
    }

    return this.programas.get(clave)!;
  }

  obtenerCantidadProgramasCreados(): number {
    return this.programas.size;
  }
}

// Contexto: contiene la información individual de cada estudiante.
class Estudiante {
  constructor(
    private codigo: string,
    private nombre: string,
    private semestre: number,
    private programa: ProgramaAcademico,
  ) {}

  mostrarEstudiante(): void {
    console.log("===== ESTUDIANTE =====");
    console.log(`Código: ${this.codigo}`);
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Semestre: ${this.semestre}`);
    console.log(`Programa: ${this.programa.mostrarInformacionCompartida()}`);
    console.log("======================");
  }
}

// Ejemplo funcional del patrón Flyweight.
const programaFactory = new ProgramaAcademicoFactory();

const ingenieriaSistemas = programaFactory.obtenerPrograma(
  "Ingeniería de Sistemas",
  "Facultad de Ingeniería",
  "Presencial",
);

const administracion = programaFactory.obtenerPrograma(
  "Administración de Empresas",
  "Facultad de Ciencias Administrativas",
  "Presencial",
);

// Aquí se reutiliza el programa de Ingeniería de Sistemas.
// No se crea otro objeto igual.
const ingenieriaSistemasReutilizada = programaFactory.obtenerPrograma(
  "Ingeniería de Sistemas",
  "Facultad de Ingeniería",
  "Presencial",
);

const estudiantes: Estudiante[] = [
  new Estudiante("230001", "Melissa Castaño", 8, ingenieriaSistemas),
  new Estudiante("230002", "Laura Gómez", 7, ingenieriaSistemasReutilizada),
  new Estudiante("230003", "Carlos Ramírez", 6, administracion),
];

console.log("\n===== LISTADO DE ESTUDIANTES =====\n");

estudiantes.forEach((estudiante) => estudiante.mostrarEstudiante());

console.log(
  `Total de programas académicos creados en memoria: ${programaFactory.obtenerCantidadProgramasCreados()}`,
);
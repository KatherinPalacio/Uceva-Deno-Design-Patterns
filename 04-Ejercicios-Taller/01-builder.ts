/**
 * PATRÓN DE DISEÑO: BUILDER
 *
 * ¿Qué hace este patrón?
 * El patrón Builder permite construir objetos complejos paso a paso,
 * separando el proceso de creación de la representación final del objeto.
 *
 * Problema que se está resolviendo:
 * En una universidad, una matrícula académica puede tener muchos datos:
 * estudiante, programa, semestre, asignaturas, jornada, modalidad y beneficios.
 * Si se crea todo directamente en el constructor, el código puede volverse
 * difícil de leer, mantener y modificar.
 *
 * ¿Por qué Builder es adecuado?
 * Porque permite construir una matrícula de forma ordenada, agregando cada
 * parte paso a paso. Así el código queda más claro, flexible y fácil de entender.
 */

// Clase que representa el objeto complejo que queremos construir.
class MatriculaUniversitaria {
  estudiante = "";
  programa = "";
  semestre = 0;
  asignaturas: string[] = [];
  jornada = "";
  modalidad = "";
  beneficio = "Sin beneficio";

  mostrarResumen(): void {
    console.log("===== RESUMEN DE MATRÍCULA =====");
    console.log(`Estudiante: ${this.estudiante}`);
    console.log(`Programa: ${this.programa}`);
    console.log(`Semestre: ${this.semestre}`);
    console.log(`Asignaturas: ${this.asignaturas.join(", ")}`);
    console.log(`Jornada: ${this.jornada}`);
    console.log(`Modalidad: ${this.modalidad}`);
    console.log(`Beneficio: ${this.beneficio}`);
    console.log("================================");
  }
}

// Builder encargado de construir la matrícula paso a paso.
class MatriculaBuilder {
  private matricula: MatriculaUniversitaria;

  constructor() {
    this.matricula = new MatriculaUniversitaria();
  }

  asignarEstudiante(nombre: string): MatriculaBuilder {
    this.matricula.estudiante = nombre;
    return this;
  }

  asignarPrograma(programa: string): MatriculaBuilder {
    this.matricula.programa = programa;
    return this;
  }

  asignarSemestre(semestre: number): MatriculaBuilder {
    this.matricula.semestre = semestre;
    return this;
  }

  agregarAsignatura(asignatura: string): MatriculaBuilder {
    this.matricula.asignaturas.push(asignatura);
    return this;
  }

  asignarJornada(jornada: string): MatriculaBuilder {
    this.matricula.jornada = jornada;
    return this;
  }

  asignarModalidad(modalidad: string): MatriculaBuilder {
    this.matricula.modalidad = modalidad;
    return this;
  }

  asignarBeneficio(beneficio: string): MatriculaBuilder {
    this.matricula.beneficio = beneficio;
    return this;
  }

  construir(): MatriculaUniversitaria {
    return this.matricula;
  }
}

// Ejemplo funcional del patrón Builder.
const matricula = new MatriculaBuilder()
  .asignarEstudiante("Melissa Castaño")
  .asignarPrograma("Ingeniería de Sistemas")
  .asignarSemestre(8)
  .agregarAsignatura("Arquitectura de Software")
  .agregarAsignatura("Bases de Datos")
  .agregarAsignatura("Ingeniería de Software")
  .asignarJornada("Nocturna")
  .asignarModalidad("Presencial")
  .asignarBeneficio("Monitoría de investigación")
  .construir();

matricula.mostrarResumen();
/**
 * PATRÓN DE DISEÑO: FACTORY METHOD
 *
 * ¿Qué hace este patrón?
 * El patrón Factory Method permite crear objetos sin especificar directamente
 * la clase concreta que se va a instanciar.
 *
 * Problema que se está resolviendo:
 * En una universidad se generan diferentes tipos de reportes académicos:
 * reporte de notas, reporte de asistencia y reporte financiero.
 *
 * Si el sistema crea cada reporte usando directamente new ReporteNotas(),
 * new ReporteAsistencia() o new ReporteFinanciero(), el código queda muy
 * acoplado a clases específicas y se vuelve más difícil de modificar.
 *
 * ¿Por qué Factory Method es adecuado?
 * Porque permite centralizar la creación de reportes en una fábrica.
 * Así el sistema solo solicita el tipo de reporte que necesita y la fábrica
 * se encarga de crear el objeto correcto.
 */

// Interfaz común que deben cumplir todos los reportes.
interface Reporte {
  generar(): void;
}

// Producto concreto: reporte de notas.
class ReporteNotas implements Reporte {
  generar(): void {
    console.log("===== REPORTE DE NOTAS =====");
    console.log("Estudiante: Melissa Castaño");
    console.log("Asignatura: Arquitectura de Software");
    console.log("Nota final: 4.6");
    console.log("============================");
  }
}

// Producto concreto: reporte de asistencia.
class ReporteAsistencia implements Reporte {
  generar(): void {
    console.log("===== REPORTE DE ASISTENCIA =====");
    console.log("Estudiante: Melissa Castaño");
    console.log("Asignatura: Arquitectura de Software");
    console.log("Asistencia: 92%");
    console.log("=================================");
  }
}

// Producto concreto: reporte financiero.
class ReporteFinanciero implements Reporte {
  generar(): void {
    console.log("===== REPORTE FINANCIERO =====");
    console.log("Estudiante: Melissa Castaño");
    console.log("Estado de matrícula: Pagada");
    console.log("Saldo pendiente: $0");
    console.log("==============================");
  }
}

// Tipos de reportes disponibles en el sistema.
type TipoReporte = "notas" | "asistencia" | "financiero";

// Creator: clase encargada de fabricar reportes.
class ReporteFactory {
  crearReporte(tipo: TipoReporte): Reporte {
    if (tipo === "notas") {
      return new ReporteNotas();
    }

    if (tipo === "asistencia") {
      return new ReporteAsistencia();
    }

    if (tipo === "financiero") {
      return new ReporteFinanciero();
    }

    throw new Error("Tipo de reporte no válido");
  }
}

// Ejemplo funcional del patrón Factory Method.
const reporteFactory = new ReporteFactory();

const reporteNotas = reporteFactory.crearReporte("notas");
const reporteAsistencia = reporteFactory.crearReporte("asistencia");
const reporteFinanciero = reporteFactory.crearReporte("financiero");

reporteNotas.generar();
console.log("");

reporteAsistencia.generar();
console.log("");

reporteFinanciero.generar();
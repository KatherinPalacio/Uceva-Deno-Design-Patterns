/**
 * PATRÓN DE DISEÑO: SINGLETON
 *
 * ¿Qué hace este patrón?
 * El patrón Singleton garantiza que una clase tenga una única instancia
 * durante toda la ejecución del programa.
 *
 * Problema que se está resolviendo:
 * En un sistema académico se necesita manejar una configuración general,
 * como el nombre de la universidad, el periodo académico, el modo del sistema
 * y el correo institucional.
 *
 * Si cada módulo del sistema crea su propia configuración, podrían existir
 * datos diferentes en distintas partes del programa, generando inconsistencias.
 *
 * ¿Por qué Singleton es adecuado?
 * Porque permite tener una única instancia de configuración compartida.
 * De esta manera, todos los módulos consultan y modifican la misma información,
 * evitando duplicidad y errores de sincronización.
 */

// Clase Singleton encargada de manejar la configuración global del sistema.
class ConfiguracionSistema {
  private static instancia: ConfiguracionSistema;

  private universidad = "UCEVA";
  private periodoAcademico = "2026-1";
  private modoSistema = "Producción";
  private correoSoporte = "soporte@uceva.edu.co";

  // El constructor es privado para evitar que se creen objetos con new.
  private constructor() {}

  // Método que permite obtener la única instancia disponible.
  static obtenerInstancia(): ConfiguracionSistema {
    if (!ConfiguracionSistema.instancia) {
      ConfiguracionSistema.instancia = new ConfiguracionSistema();
    }

    return ConfiguracionSistema.instancia;
  }

  mostrarConfiguracion(): void {
    console.log("===== CONFIGURACIÓN DEL SISTEMA =====");
    console.log(`Universidad: ${this.universidad}`);
    console.log(`Periodo académico: ${this.periodoAcademico}`);
    console.log(`Modo del sistema: ${this.modoSistema}`);
    console.log(`Correo de soporte: ${this.correoSoporte}`);
    console.log("=====================================");
  }

  cambiarPeriodoAcademico(nuevoPeriodo: string): void {
    this.periodoAcademico = nuevoPeriodo;
  }

  cambiarModoSistema(nuevoModo: string): void {
    this.modoSistema = nuevoModo;
  }
}

// Módulo académico que consulta la configuración.
class ModuloAcademico {
  private configuracion = ConfiguracionSistema.obtenerInstancia();

  mostrarPeriodoActivo(): void {
    console.log("===== MÓDULO ACADÉMICO =====");
    console.log("Periodo activo consultado desde el módulo académico:");
    this.configuracion.mostrarConfiguracion();
  }
}

// Módulo administrativo que también usa la misma configuración.
class ModuloAdministrativo {
  private configuracion = ConfiguracionSistema.obtenerInstancia();

  actualizarPeriodo(nuevoPeriodo: string): void {
    console.log("===== MÓDULO ADMINISTRATIVO =====");
    console.log(`Actualizando periodo académico a: ${nuevoPeriodo}`);
    this.configuracion.cambiarPeriodoAcademico(nuevoPeriodo);
    console.log("=================================");
  }
}

// Ejemplo funcional del patrón Singleton.
const configuracionPrincipal = ConfiguracionSistema.obtenerInstancia();

console.log("\nConfiguración inicial:");
configuracionPrincipal.mostrarConfiguracion();

const moduloAcademico = new ModuloAcademico();
const moduloAdministrativo = new ModuloAdministrativo();

moduloAdministrativo.actualizarPeriodo("2026-2");

console.log("\nConfiguración consultada después de actualizar el periodo:");
moduloAcademico.mostrarPeriodoActivo();

// Verificación de que ambas variables apuntan a la misma instancia.
const otraConfiguracion = ConfiguracionSistema.obtenerInstancia();

console.log(
  "\n¿La configuración principal y la otra configuración son la misma instancia?",
);
console.log(configuracionPrincipal === otraConfiguracion);
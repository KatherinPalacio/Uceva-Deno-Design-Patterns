/**
 * PATRÓN DE DISEÑO: STRATEGY
 *
 * ¿Qué hace este patrón?
 * El patrón Strategy permite definir diferentes formas de resolver una tarea
 * y cambiar el algoritmo utilizado sin modificar el código principal.
 *
 * Problema que se está resolviendo:
 * En una universidad se pueden aplicar diferentes tipos de descuento al valor
 * de la matrícula de un estudiante: descuento por monitoría, descuento por beca
 * académica o descuento por convenio institucional.
 *
 * Si todos los descuentos se calculan dentro de una sola clase usando muchos
 * condicionales, el código se vuelve difícil de mantener y de ampliar.
 *
 * ¿Por qué Strategy es adecuado?
 * Porque permite separar cada tipo de descuento en una clase diferente.
 * Así el sistema puede cambiar la estrategia de descuento según el caso,
 * sin modificar la lógica principal de la matrícula.
 */

// Interfaz común para todas las estrategias de descuento.
interface EstrategiaDescuento {
  calcularDescuento(valorMatricula: number): number;
  obtenerDescripcion(): string;
}

// Estrategia concreta: descuento por monitoría.
class DescuentoMonitoria implements EstrategiaDescuento {
  calcularDescuento(valorMatricula: number): number {
    return valorMatricula * 0.20;
  }

  obtenerDescripcion(): string {
    return "Descuento por monitoría del 20%";
  }
}

// Estrategia concreta: descuento por beca académica.
class DescuentoBecaAcademica implements EstrategiaDescuento {
  calcularDescuento(valorMatricula: number): number {
    return valorMatricula * 0.50;
  }

  obtenerDescripcion(): string {
    return "Descuento por beca académica del 50%";
  }
}

// Estrategia concreta: descuento por convenio institucional.
class DescuentoConvenio implements EstrategiaDescuento {
  calcularDescuento(valorMatricula: number): number {
    return valorMatricula * 0.30;
  }

  obtenerDescripcion(): string {
    return "Descuento por convenio institucional del 30%";
  }
}

// Contexto: usa una estrategia de descuento sin depender de una clase específica.
class CalculadoraMatricula {
  constructor(private estrategiaDescuento: EstrategiaDescuento) {}

  cambiarEstrategia(estrategiaDescuento: EstrategiaDescuento): void {
    this.estrategiaDescuento = estrategiaDescuento;
  }

  calcularValorFinal(valorMatricula: number): void {
    const descuento = this.estrategiaDescuento.calcularDescuento(valorMatricula);
    const valorFinal = valorMatricula - descuento;

    console.log("===== CÁLCULO DE MATRÍCULA =====");
    console.log(`Valor inicial: $${valorMatricula}`);
    console.log(`Estrategia aplicada: ${this.estrategiaDescuento.obtenerDescripcion()}`);
    console.log(`Descuento: $${descuento}`);
    console.log(`Valor final a pagar: $${valorFinal}`);
    console.log("================================");
  }
}

// Ejemplo funcional del patrón Strategy.
const valorMatricula = 2800000;

const calculadora = new CalculadoraMatricula(new DescuentoMonitoria());

calculadora.calcularValorFinal(valorMatricula);

console.log("");

calculadora.cambiarEstrategia(new DescuentoBecaAcademica());
calculadora.calcularValorFinal(valorMatricula);

console.log("");

calculadora.cambiarEstrategia(new DescuentoConvenio());
calculadora.calcularValorFinal(valorMatricula);
# Taller Patrones de Diseño

## Integrantes

- KATHERIN ANDREA PALACIO ZULUAGA
- Nombre del otro integrante

## Descripción del taller

Este repositorio contiene el desarrollo del taller de patrones de diseño para la asignatura Arquitectura de Software.

El objetivo del taller es implementar 10 ejercicios prácticos aplicando patrones de diseño creacionales, estructurales y de comportamiento. Cada ejercicio se encuentra en un archivo independiente dentro de la carpeta `04-Ejercicios-Taller`.

## Patrones implementados

| Número | Patrón | Tipo | Archivo |
|---|---|---|---|
| 1 | Builder | Creacional | `04-Ejercicios-Taller/01-builder.ts` |
| 2 | Adapter | Estructural | `04-Ejercicios-Taller/02-adapter.ts` |
| 3 | Flyweight | Estructural | `04-Ejercicios-Taller/03-flyweight.ts` |
| 4 | Observer | Comportamiento | `04-Ejercicios-Taller/04-observer.ts` |
| 5 | Factory Method | Creacional | `04-Ejercicios-Taller/05-factory-method.ts` |
| 6 | Singleton | Creacional | `04-Ejercicios-Taller/06-singleton.ts` |
| 7 | Facade | Estructural | `04-Ejercicios-Taller/07-facade.ts` |
| 8 | Strategy | Comportamiento | `04-Ejercicios-Taller/08-strategy.ts` |
| 9 | State | Comportamiento | `04-Ejercicios-Taller/09-state.ts` |
| 10 | Command | Comportamiento | `04-Ejercicios-Taller/10-command.ts` |

## Descripción de los ejercicios

### 1. Builder

Se implementa un ejemplo de construcción de una matrícula universitaria. El patrón permite crear una matrícula paso a paso, agregando estudiante, programa, semestre, asignaturas, jornada, modalidad y beneficio.

### 2. Adapter

Se adapta un servicio antiguo de correos para que pueda ser utilizado por un sistema académico nuevo de notificaciones. El patrón permite que dos interfaces diferentes trabajen juntas sin modificar el código original.

### 3. Flyweight

Se reutiliza la información compartida de programas académicos entre varios estudiantes. El patrón permite evitar la creación repetida de objetos iguales y optimizar el uso de memoria.

### 4. Observer

Se implementa un sistema donde varios estudiantes se suscriben a una asignatura y reciben notificaciones cuando se publica una nueva actividad.

### 5. Factory Method

Se crea una fábrica de reportes académicos que permite generar reportes de notas, asistencia y estado financiero sin instanciar directamente las clases concretas.

### 6. Singleton

Se implementa una configuración global del sistema académico para garantizar que todos los módulos usen la misma instancia de configuración.

### 7. Facade

Se simplifica el proceso de inscripción de un estudiante mediante una fachada que coordina validación de documentos, registro, generación de matrícula, cálculo de pago y notificación.

### 8. Strategy

Se implementan diferentes estrategias de descuento para calcular el valor final de una matrícula, como descuento por monitoría, beca académica o convenio institucional.

### 9. State

Se representa el flujo de una solicitud académica que puede pasar por los estados radicada, en revisión, aprobada o rechazada.

### 10. Command

Se encapsulan acciones sobre una matrícula académica, como guardar, actualizar y cancelar. Además, se permite deshacer comandos ejecutados.

## Ejecución de los ejercicios del taller

Para ejecutar cada archivo, ubicarse en la raíz del proyecto y usar los siguientes comandos:

```bash
deno run 04-Ejercicios-Taller/01-builder.ts
deno run 04-Ejercicios-Taller/02-adapter.ts
deno run 04-Ejercicios-Taller/03-flyweight.ts
deno run 04-Ejercicios-Taller/04-observer.ts
deno run 04-Ejercicios-Taller/05-factory-method.ts
deno run 04-Ejercicios-Taller/06-singleton.ts
deno run 04-Ejercicios-Taller/07-facade.ts
deno run 04-Ejercicios-Taller/08-strategy.ts
deno run 04-Ejercicios-Taller/09-state.ts
deno run 04-Ejercicios-Taller/10-command.ts
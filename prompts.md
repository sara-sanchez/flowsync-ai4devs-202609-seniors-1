# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
Lee el requisito «Lo que cada tarea muestra de su responsable» en openspec/specs/tasks/spec.md.
Identifica los scenarios que pertenecen a este requisito y, para cada uno, busca en las pruebas existentes qué test podría cubrirlo.
No escribas ni modifiques ningún archivo.
No crees nuevos tests.
No supongas que un scenario está cubierto solo porque encuentres un test con un nombre parecido: revisa el contenido del test y explica qué comportamiento verifica.
Para cada scenario, indícame:
El nombre del scenario.
El test que consideras relacionado, indicando su ruta y nombre exacto.
Si consideras que está Covered, Not covered o Don’t know.
La evidencia concreta del test que te llevó a esa conclusión.
Si no encuentras un test relacionado, indícalo explícitamente.
Limítate a revisar el requisito y las pruebas existentes. No propongas cambios todavía.
```

**Qué salió:** los tres scenarios salieron «Not covered». Fallaron los comandos de shell, así que los ficheros de test se encontraron adivinando sus nombres.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
Con lo que encuentres, crea docs/verificacion/ss.md con la matriz (una fila por scenario, cuatro columnas). Para marcar "Cubierto", abre el test y lee qué comprueba.
```

**Qué salió:** creó la matriz. Esta vez sí se pudieron listar los tests y se confirmó que no había ninguno de `tasks`.

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
Para cada fila "No cubierto", pide un test en backend/tests/functional/tasks/ y ejecútalo. Si sale rojo, déjalo en rojo.
```

**Qué salió:** creó `backend/tests/functional/tasks/assignee.spec.ts`. Pasan 2 tests y falla 1: la lista expone el email del responsable.

## Prompt 4

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
Debajo de la matriz, en el mismo ss.md, escribe las tres líneas: tu estimación frente al resultado real, el scenario en el que dudaste, y lo que tuviste que decidir tú al escribir el test.
```

**Qué salió:** añadió los tres párrafos debajo de la matriz.

## Prompt 5

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
puedes escribir las propmpts por favor, primero indicame donde las vas a escribir antes de hacerlo
```

## Prompt 6

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
escribelas en el archivo: prompts.md
```

**Qué salió:** rellenó este archivo.

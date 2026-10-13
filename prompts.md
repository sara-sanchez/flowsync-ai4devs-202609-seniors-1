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
Lee el archivo CLAUDE.md ubicado en la raíz del repositorio.
Localiza y lee completa la sección que contiene las reglas de proceso.
Por ahora, no modifiques, crees ni elimines ningún archivo.
Devuélveme:
El nombre exacto de la sección.
Cada regla de proceso identificada, explicada individualmente sin cambiar su sentido.
La ubicación de cada regla dentro del archivo.
No inventes reglas ni agregues recomendaciones que no estén documentadas. Si no encuentras la sección, indícalo expresamente.
```

**Qué salió:** a la primera: sección `## Reglas de proceso` (`CLAUDE.md:129`) con sus cinco reglas en las líneas 130–134.

## Prompt 2

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
Realiza una auditoría de las reglas de proceso identificadas en CLAUDE.md, contrastándolas con los últimos 15 commits del repositorio y el estado actual de los archivos.
Reglas obligatorias:
No modifiques, crees ni elimines archivos.
No corrijas código ni incumplimientos.
No inventes información, evidencia ni resultados.
Para cada regla, identifica qué comandos ejecutaste, qué archivos revisaste y qué evidencia encontraste.
Utiliza únicamente estos veredictos: se cumple, no se cumple o no se puede comprobar con la información disponible.
Si no existe evidencia suficiente, explica qué información falta.
No confundas la ausencia de evidencia con evidencia de incumplimiento.
Presenta los resultados en el chat, usando una fila por regla y estas cinco columnas:
Qué pide la regla.
Qué se revisó para comprobarla.
Veredicto.
Evidencia.
Qué harías con ella: dejarla, borrarla o convertirla en una comprobación automática.
No generes todavía el archivo de entrega. Espera a que revise los resultados y compruebe personalmente la evidencia de al menos una fila.
```

**Qué salió:** las cinco reglas salieron «no se puede comprobar con la información disponible»; la 3 con evidencia parcial (el README sí se actualizó en `cbe9617`).

## Prompt 3

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
guarda lo siguiente en el archivo docs/auditoria/ss.md: 

La regla en la que más me equivoqué: Inicialmente pensé que las reglas 2 y 4 se cumplían, pero la auditoría mostró que el historial de Git no contiene evidencia suficiente para confirmarlo. Mi expectativa inicial no estaba respaldada por una comprobación directa.
Una regla que no se puede comprobar: La regla 5 no puede verificarse con el repositorio, porque depende de la respuesta escrita en el chat al abrir un Pull Request. Para comprobarla, sería necesario disponer de las transcripciones correspondientes o definir un mecanismo de registro verificable.
La regla que eliminaría y por qué: Eliminaría la regla 5 de las reglas de proceso auditables del repositorio, porque describe cómo responder en el chat y no un comportamiento que pueda comprobarse mediante los commits. Si se considera importante conservarla, debería documentarse como una instrucción de comunicación independiente.
```

**Qué salió:** creó la rama `auditoria-ss` y guardó el texto tal cual; la tabla de la auditoría no se incluyó en el archivo.

## Prompt 4

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
añade también los prompts usados en la auditoría, en el archivo de prompts
```

**Qué salió:** sustituyó el ejemplo de la plantilla por los prompts 1–4.

## Prompt 5

**Modelo:** Claude Opus 5.5
**Herramienta:** Claude Code

```
sí, añade la tabla al archivo de auditoría
```

**Qué salió:** añadió la tabla encima de las tres líneas en `docs/auditoria/ss.md`.

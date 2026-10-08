# Verificación: «Lo que cada tarea muestra de su responsable»

Requisito: `openspec/specs/tasks/spec.md` (líneas 97-114).

Tests revisados: los cuatro de `backend/tests/functional/auth/`, que no tocan tareas, y `backend/tests/functional/tasks/assignee.spec.ts`, escrito para estos scenarios. Resultado de `node ace test functional --files=tasks/`: **2 pasan, 1 falla**.

| Scenario | Test relacionado | Estado | Evidencia |
|---|---|---|---|
| Responsable identificable | `backend/tests/functional/tasks/assignee.spec.ts` › «el responsable se identifica por su nombre y sus iniciales» | Cubierto (✔ pasa) | Crea una tarea cuyo responsable es «Ada Lovelace» y comprueba `assignee.fullName === 'Ada Lovelace'` y `assignee.initials === 'AL'` tanto en `GET /tasks/:id` como en `GET /tasks`. Pasa en las dos vías. |
| La tarea no filtra datos de cuenta | `backend/tests/functional/tasks/assignee.spec.ts` › «la tarea no filtra el email ni otros datos de la cuenta» | Cubierto (✖ falla) | Comprueba que el `assignee` no tiene `email` ni `password` y que el email no aparece en ningún campo. Falla en la línea 74: `expected { id: 4, …(5) } to not have nested property 'email'`. El `assignee` con 6 campos es el de la lista: `task_transformer.ts` lo serializa con `UserTransformer`, que incluye `email`. La tarea suelta usa `TaskAssigneeTransformer` (`id`, `fullName`, `initials`) y cumple. Como el test se para en el primer fallo, las comprobaciones de `password` y del email en otros campos no llegan a ejecutarse para la lista. |
| Responsable sin nombre | `backend/tests/functional/tasks/assignee.spec.ts` › «un responsable sin nombre llega con nombre nulo y con iniciales» | Cubierto (✔ pasa) | Crea una tarea cuyo responsable tiene `fullName: null` y comprueba que `assignee.fullName` es nulo y que `assignee.initials` es un texto no vacío, en la vía suelta y en la lista. Pasa en las dos. No comprueba el valor exacto de las iniciales. |

**Estimación frente a resultado:** después de leer `task_transformer.ts` estimé que el 1 y el 3 saldrían en verde y el 2 en rojo solo en la lista, porque ese transformer serializa el responsable con `UserTransformer`, que incluye el email. El resultado coincidió: 2 en verde y 1 en rojo, y el fallo está en la lista (el `assignee` llega con 6 campos), no en la tarea suelta.

**Scenario en el que dudé:** «La tarea no filtra datos de cuenta». La spec prohíbe exponer «ningún otro dato de esa cuenta», pero el scenario solo nombra «el email ni ningún otro dato de acceso». El test comprueba `email` y `password` y deja pasar `id`, `createdAt` y `updatedAt`. Si esos campos cuentan como datos de la cuenta, el test es más permisivo que el requisito; incluso la tarea suelta expone `id`.

**Lo que decidí yo al escribir el test:** mirar cada scenario por las dos vías (suelta y lista), porque la spec dice «suelta o dentro de la lista» y cada una usa un transformer distinto; crear las tareas con `Task.create` en vez de `POST /tasks`, así que la respuesta de creación, que también usa `TaskTransformer`, queda sin probar; fijar `today=2026-10-07` porque la consulta suelta lo exige; y en el scenario 3 comprobar solo que las iniciales son un texto no vacío, no su valor exacto, porque la spec no lo fija.

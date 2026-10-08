import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que una tarea enseña de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * Cada scenario se mira por las dos puertas por las que sale una tarea: suelta
 * (`GET /tasks/:id`) y dentro de la lista (`GET /tasks`). Que una cumpla no dice
 * nada de la otra, porque cada una usa su propio transformer.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any) {
    await User.create({ fullName: 'Grace Hopper', email: 'grace@example.com', password: 'secreto123' })

    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: 'grace@example.com', password: 'secreto123' })

    return response.body().data.token as string
  }

  async function tareaDe(responsable: User) {
    return Task.create({ title: 'Revisar el informe', status: 'pending', assigneeId: responsable.id })
  }

  async function suelta(client: any, token: string, task: Task) {
    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-10-07' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    return response.body().data
  }

  async function enLaLista(client: any, token: string, task: Task) {
    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    return response.body().data.find((t: any) => t.id === task.id)
  }

  test('el responsable se identifica por su nombre y sus iniciales', async ({ client, assert }) => {
    const token = await sesion(client)
    const ada = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const task = await tareaDe(ada)

    for (const tarea of [await suelta(client, token, task), await enLaLista(client, token, task)]) {
      assert.equal(tarea.assignee.fullName, 'Ada Lovelace')
      assert.equal(tarea.assignee.initials, 'AL')
    }
  })

  test('la tarea no filtra el email ni otros datos de la cuenta', async ({ client, assert }) => {
    const token = await sesion(client)
    const ada = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const task = await tareaDe(ada)

    for (const tarea of [await suelta(client, token, task), await enLaLista(client, token, task)]) {
      assert.notProperty(tarea.assignee, 'email')
      assert.notProperty(tarea.assignee, 'password')
      // Por si el email se cuela con otro nombre de campo.
      assert.notInclude(JSON.stringify(tarea.assignee), 'ada@example.com')
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const anonima = await User.create({
      fullName: null,
      email: 'anonima@example.com',
      password: 'secreto123',
    })
    const task = await tareaDe(anonima)

    for (const tarea of [await suelta(client, token, task), await enLaLista(client, token, task)]) {
      assert.isNull(tarea.assignee.fullName)
      assert.isString(tarea.assignee.initials)
      assert.isNotEmpty(tarea.assignee.initials)
    }
  })
})

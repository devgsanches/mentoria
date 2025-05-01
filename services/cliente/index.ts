import db from '../../data/db'

const getAll = async () => {
  const result = await db.all('SELECT * FROM Cliente')
  return result
}

const getById = async (id: number) => {
  const result = await db.get('SELECT * FROM Cliente WHERE id = ?', id)
  return result
}

const create = async (nome: string) => {
  const result = await db.run('INSERT INTO Cliente (nome) VALUES (?)', nome)

  if (result.lastID) {
    const cliente = await db.get(
      'SELECT * FROM Cliente WHERE id = ?',
      result.lastID
    )
    return cliente
  }
  return null
}

const update = async (id: number, nome: string) => {
  const result = await db.run(
    'UPDATE Cliente SET nome = ? WHERE id = ?',
    nome,
    id
  )

  if (result.changes) {
    const cliente = await db.get('SELECT * FROM Cliente WHERE id = ?', id)
    return cliente
  }
  return null
}

const remove = async (id: number) => {
  const result = await db.run('DELETE FROM Cliente WHERE id = ?', id)

  if (result.changes) {
    return true
  }
  return false
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
}

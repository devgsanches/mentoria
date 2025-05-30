import service from '../../services/cliente'

const getAll = async () => {
  const result = await service.getAll()
  return result
}

const getById = async (id: string) => {
  const idNumber = Number(id)
  const result = await service.getById(idNumber)
  return result
}

const create = async (nome: string) => {
  const result = await service.create(nome)

  if (result) {
    const cliente = await service.getById(result.id)

    return cliente
  }
  return null
}

const update = async (id: string, nome: string) => {
  const idNumber = Number(id)

  const result = await service.update(idNumber, nome)

  if (result.changes) {
    const cliente = await service.getById(idNumber)
    return cliente
  }
  return null
}

const remove = async (id: string) => {
  const idNumber = Number(id)
  const result = await service.remove(idNumber)

  if (result) {
    return true
  }
  return false
}

export { getAll, getById, create, update, remove }

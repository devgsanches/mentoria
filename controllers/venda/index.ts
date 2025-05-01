import service from '../../services/venda'

const getAll = async () => {
  const result = await service.getAll()
  return result
}

const getById = async (id: string) => {
  const idNumber = Number(id)
  const result = await service.getById(idNumber)
  return result
}

const create = async (data: number, total: number, id_cliente: number) => {
  const result = await service.create(data, total, id_cliente)

  if (result) {
    const produto = await service.getById(result.id)
    return produto
  }
  return null
}

const update = async (
  id: string,
  data: number,
  total: number,
  id_cliente: number
) => {
  const idNumber = Number(id)

  const result = await service.update(idNumber, data, total, id_cliente)

  if (!result) {
    return null
  }

  const produto = await service.getById(idNumber)

  return produto
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

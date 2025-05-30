import type { IProduto } from 'interfaces/produto'
import service from '../../services/venda'
import produtoService from '../../services/produto'

const getAll = async () => {
  const result = await service.getAll()
  return result
}

const getById = async (id: string) => {
  const idNumber = Number(id)
  const result = await service.getById(idNumber)
  return result
}

const create = async (cliente: number, produtos: IProduto[]) => {
  let products: IProduto[] = []

  products.forEach(async produto => {
    const result = await produtoService.getById(produto.id)

    products.push({
      id: produto.id,
      quantidade: produto.quantidade,
      preco: produto.preco,
    })
  })

  const result = await service.create(cliente, products)

  return result ?? null
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

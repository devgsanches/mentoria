import express from 'express'
import clienteRoutes from './cliente'
import produtoRoutes from './produto'
import fornecedorRoutes from './fornecedor'
import vendaRoutes from './venda'

const router = express.Router()

router.use('/cliente', clienteRoutes)
router.use('/produto', produtoRoutes)
router.use('/fornecedor', fornecedorRoutes)
router.use('/venda', vendaRoutes)

export default router

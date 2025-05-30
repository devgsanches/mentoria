import app from './data/express'
import routes from './routes/index'

import handleError from './middlewares/error'

const PORT = 3333
app.use(routes)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

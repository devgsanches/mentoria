import app from './data/express'
import routes from './routes/index'

const PORT = 3333
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

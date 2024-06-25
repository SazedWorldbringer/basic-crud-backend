const express = require('express')
const app = express()

app.use(express.json())

let products = [
	{
		id: 1,
		name: 'laptop',
		price: 1000
	},
	{
		id: 2,
		name: 'phone',
		price: 500,
	},
	{
		id: 3,
		name: 'tablet',
		price: 300
	}
]

app.get('/', (req, res) => {
	res.send("Hello world")
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const id = req.params.id
	const product = products.find(p => p.id === parseInt(id))
	if (product) {

		res.json(product)
	} else {
		res.status(404).end()
	}
})

const generateId = () => {
	const maxId = products.length > 0
		? Math.max(...products.map(p => p.id))
		: 0
	return String(maxId + 1)
}

app.post('/api/products', (req, res) => {
	const body = req.body

	if (!body.name || !body.price) {
		return res.status(400).json({
			error: "A product must have a name and price"
		})
	}

	const product = {
		name: body.name,
		price: body.price,
		id: generateId()
	}

	products = products.concat(product)

	res.json(product)
})

app.delete('/api/products/:id', (req, res) => {
	const id = req.params.id
	products = products.filter(p => p.id !== parseInt(id))

	res.status(204).end()
})

const PORT = 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: "040-123456"

    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: "12-43-234345"
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: "39-236423122"
    },
]

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} persons</p>
        ${new Date()}
        `)
})

app.get('/api/persons', (request, response) => {

    console.log(generateId())
    response.json(persons)

})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) response.json(person) 
    else response.status(404).end()

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()

})


const generateId = () => (Math.floor(Math.random() * (999999999999999999999-5)+5))


app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    console.log(body.name)
    if (persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())){

        return response.status(400).json({
            error: 'name must be unique'
        })

    }


    const person = {

        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
    

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
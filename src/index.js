const express = require("express")
const { Pool } = require('pg')
require('dotenv').config()


const PORT = 3333

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {console.log("Olá mundo!")})

app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users')
        return res
        .status(200).send(rows)
    } catch (err) {
        return res.status(400).send(err)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
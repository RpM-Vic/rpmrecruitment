import 'dotenv/config';
import express from "express"
import { pages } from "./server/pages.js"
import cors from "cors"
import { sendToDiscord } from './server/sendToDiscord.js';

const PORT =process.env.port||5000

const app = express()

app.use(cors(),express.json(),express.urlencoded({ extended: true }))
app.use(pages)

app.post('/submit',(req,res)=>{
  const data =req.body
  sendToDiscord(data)
  res.json({
    ok:false,
    message:"You are too noob"
  })
})

app.listen(PORT,()=>{
  console.log(`server running on http://localhost:${PORT}`)
})

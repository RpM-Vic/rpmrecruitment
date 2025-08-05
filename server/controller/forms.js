import { Router } from "express"
import { submitTimeQuestions } from "../submitTimeQuestions.js"

export const forms=Router()

forms.get('/submittime',(req,res)=>{
  res.send({
    ok:true,
    submitTimeQuestions
  })
})

forms.post('/submittime',(req,res)=>{
  //validate Data

  res.send({
    ok:true,
    message:"success"
  })
})

forms.post('/joinus',(req,res)=>{
  res.send({
    message:"success"
  })
})

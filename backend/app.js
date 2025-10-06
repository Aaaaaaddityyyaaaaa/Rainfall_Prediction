import express from "express" 
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
app.post("/api/prediction", (req,res)=>{
  const data = req.body ; 
  res.json(1)
})

app.listen(5000)
import express from "express" 
import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
app.post("/api/prediction", async(req,res)=>{
const data = req.body ; 
try
{
  const pred =await fetch("http://127.0.0.1:8000/api/predict", {method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data) 
  })
  const ans = await pred.json()
  res.json({"prediction":ans.prediction[0]})
}
catch
{
  res.json({"prediction":"Error while Predicting"})
}
})

app.listen(5000)
import { useEffect, useState } from "react";
import { data, Form, useActionData } from "react-router";

export async function action({request})
{
  const formdata = await request.formData() ;
  let data = Object.fromEntries(formdata) 
  const numericFields = [
    "MinTemp", "MaxTemp", "Rainfall", "Evaporation", "Sunshine",
    "WindGustSpeed", "WindSpeed9am", "WindSpeed3pm",
    "Humidity9am", "Humidity3pm", "Pressure9am", "Pressure3pm",
    "Cloud9am", "Cloud3pm", "Temp9am", "Temp3pm"
  ];
  numericFields.forEach((field)=>{if(data[field]!==undefined)
  {
    if(data[field]==="")
    {
      data[field]=0.0
    }
    else
    {
      data[field] = parseFloat(data[field])
    }
  }
  })
  const res = await fetch("http://localhost:5000/api/prediction",{method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  })
  const pred = await res.json() ; 
  console.log(pred)
  return pred ; 
}
export default function Formm()
{
  const data = useActionData()
  const [prediction, setPrediction] = useState(null);
  useEffect(()=>
    {
      if(data!==null)
      {
        setPrediction(data)  ; 
      }
    },[data])
  const schema = {
    Location: "object",
    MinTemp: "float64",
    MaxTemp: "float64",
    Rainfall: "float64",
    Evaporation: "float64",
    Sunshine: "float64",
    WindGustDir: "object",
    WindGustSpeed: "float64",
    WindDir9am: "object",
    WindDir3pm: "object",
    WindSpeed9am: "float64",
    WindSpeed3pm: "float64",
    Humidity9am: "float64",
    Humidity3pm: "float64",
    Pressure9am: "float64",
    Pressure3pm: "float64",
    Cloud9am: "float64",
    Cloud3pm: "float64",
    Temp9am: "float64",
    Temp3pm: "float64",
    RainToday: "object",
    Season: "object",
  };
  const dropdownOptions = {
    Location: ["Melbourne", "MelbourneAirport", "Watsonia"],
    WindGustDir: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    WindDir9am:  ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    WindDir3pm:  ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
    RainToday: ["Yes", "No"],
    Season: ["summer", "winter", "autumn", "spring"],
  };
  return <><Form method="post">
    {Object.entries(schema).map(([field , type])=>{ return <div key={field}><label>{field}</label>
      {type==="object"?<select name={field}>
        {dropdownOptions[field].map((opt)=>{return <option key={opt}value={opt}>{opt}</option>})}        
      </select>:
      <input type="number" step={0.01} name={field}></input>}</div>
    
    })}
    <button type="submit">Predict</button>
  </Form>
  {prediction&&<h3>Will it rain tomorrow : {prediction.prediction}</h3>}
  </>
}

import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/todos/");
        // const res = await axios.get("https://localhost:3000/validate");

        setData(res.data);
      }
      catch(e){
        console.log(e);
      } 
    }
    fetchData();
  },[])

const filtervalues = data && data.filter(value=>value.title.includes(search))
    return (
    <>
    <input type="text" value={search} placeholder="Enter your name"  onChange={(e)=>setSearch(e.target.value)} />
    <div>
      {filtervalues && filtervalues.map((item)=>(
        <div key={item.id}>
          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
    </>
  )
}

export default App


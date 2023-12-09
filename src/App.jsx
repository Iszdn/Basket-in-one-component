import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [basket, setBasket] = useState(localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
 localStorage.setItem("basket",JSON.stringify(basket))
}, [basket])

async function getProducts() {
  const data=await fetch("https://northwind.vercel.app/api/products")
  const res=await data.json()
  setProducts(res)
  setIsLoading(false)
}
useEffect(() => {
  getProducts()
}, [])

function handleBasket(item) {
  const elementIndex=basket.findIndex(x=>x.id===item.id)
 if (elementIndex !== -1) {
  const newBasket=[...basket]
  newBasket[elementIndex].count++
  setBasket(newBasket)
 }
 else{
  setBasket([...basket,{...item,count:1}])
 }
}
function handleDelete(id) {
  setBasket(basket.filter(x=> x.id!==id))
}
function handleCountVal(isAdd,item) {
  const elementIndex=basket.findIndex(x=>x.id===item.id)
  const newBasket=[...basket]
  if (isAdd) {
     newBasket[elementIndex].count++
  setBasket(newBasket)
  }
 else{
  if(newBasket[elementIndex].count===1){
return
  }
  newBasket[elementIndex].count--
  setBasket(newBasket)
 }
}
  return (
    <div>
<h3>umumi hisse</h3>
<button>basket popunu ac</button>

<div style={{border:"1px solid black"}}>
<h3>basket</h3>

{
  basket && basket.map((x)=>(
    <>
    <ul>
      <li>{x.id}</li>
      <li>{x.name}</li>
  <li>say:{x.count}</li>
<button onClick={()=>handleCountVal(true,x)}>+</button>
<button onClick={()=>handleCountVal(false,x)}>-</button>
  <button onClick={()=>handleDelete(x.id)}>del</button>

    </ul>
    </>
  ))
}
</div>
{
  isLoading ? <p>Loading...</p> : 
  <>
  {  products && products.map((x)=>(
<ul>
  <li>{x.name}</li>
  <li>{x.id}</li>
  <button onClick={()=>handleBasket(x)}>add</button>
</ul>
    ))}
  </>
}

    
    </div>
  )
}

export default App

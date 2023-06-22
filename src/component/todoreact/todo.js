import React, { useState ,useEffect} from 'react'
import "./style.css";


// get the local data
const getLocalData= () => {
    const lists = localStorage.getItem("mytodolist")  // mytodolist ====> pass the key

    if(lists){
      return JSON.parse(lists);
    }
    else{
      return []
    }
};
const Todo = () => {

  const [inputData,setInputData] = useState("");
  const [items,setItems] = useState(getLocalData())
  const [isEditItem,setIsEditItem] = useState("") // edited vadi row store karva particular edition mate
  const [toggleButton,setToggleButton] = useState("")

  // add the items
  const addItem= () =>{
      if(!inputData){
        alert("Please fill the Data")
      }
      else if(inputData && toggleButton){       // after clicking toggle button becomes true
        setItems(
          items.map((curElem)=>{              // after clicking that is match or not from our available element
            if(curElem.id===isEditItem){
              return {...curElem,name:inputData}    // this line 31,32,33 is for edited line not add 
            }                                     // new row must reflect on that line where edit button clicked
           
            return curElem
          })
        )
      setInputData("");
      setIsEditItem(null)                     // after complete editing that inputfield empty 
      setToggleButton(false)
      }
      
      else{
        const myNewInputData = {
          id: new Date().getTime().toString(),
          name: inputData,
        }

        // setItems([...items,inputData]);   before doing key:value method
        setItems([...items,myNewInputData]);
        setInputData("")
      }
  }

  // delete the items

  const deleteItem = (index)=>{
      const updatedItem = items.filter((curElem)=>{
        return curElem.id !== index
      })
      setItems(updatedItem);
  }

  // remove all

  const removeAll = ()=>{
   setItems([]);
  }

// Local storage

  useEffect(()=>{
      localStorage.setItem("mytodolist",JSON.stringify(items))
  },[items]);
  
  // edit the item section

  const editItem = (index) =>{                                 // onclicking edit button togglebutton is true
      const item_todo_edited = items.find((curElem)=>{
        return curElem.id === index;
      })
      setInputData(item_todo_edited.name);
      setIsEditItem(index)
      setToggleButton(true)
  }

  return (
    <>
    <div className='main-div'>
      <div className='child-div'>
        <figure >
          <img src='./images/todo.svg' alt="todo logo"/>
          <figcaption>Add Yout List Here✌️</figcaption>
        </figure>
        <div className='addItems'>
          <input type = "text"
          placeholder='✍️ Add items'
          className='form-control'
          value={ inputData}
          onChange={(event)=>setInputData(event.target.value)}
            >

          </input>
        <i class="fa fa-plus add-btn" onClick={addItem} ></i>
        </div>


        {/*   Show your items  */}
        <div className='showItems'>

          {items.map((curElem,index)=>{   // jetla ma loop chale aema unique key hovi j joiy.
                return(
                <div className='eachItem' key={curElem.id}>
                 <h3>{curElem.name}</h3> {/*   curElem.name because key:value  */}
                <div className='todo-btn'>
                <i class="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                <i class="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                </div>
                </div>
                )
          })}          
        </div>


        {/* Remove all buttons */}
        <div className='showItems'><button 
        className='btn effect04' 
        data-sm-link-text="Remove All"
        onClick={removeAll}
        >
          
          <span>CHECK LIST</span></button></div>
      </div>
      
    </div>

    </>
  )
}

export default Todo;

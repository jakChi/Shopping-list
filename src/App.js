//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


const App = () => {
  
  const [ input, setInput ] = useState([]);
  const [ list, setList ] = useState([]);
  const [ show, setShow ] = useState(false);
  const [ itemIndex, setItemIndex ] = useState(null);
  const [ criticalLevel, setCriticalLevel ] = useState(false);
  const [ itemsCondition, setItemsCondition ] = useState(true);
   
  const criticalQuantity = () => {
    if(list.length <= 8) {
      setCriticalLevel(false);
    } else {
      setCriticalLevel(true);
    }
  }
  
  const handleChange = (e) => {
    setInput(
      {
        name: e.target.value, 
        state: true
      }
    );
    criticalQuantity();
  }
  
  //tavidan ro eweros 0 items in the list da mere ro chavwert pirvles ishelbodes
  
  const handleClick = (e) => {
    e.preventDefault();
    const newList = [...list, input];
  
    if (list.length <= 8) {
      if(input.name !== "") {
        setList(newList);
        setInput({name: "", state: null});
      } else {
        alert("type in the input field to add item!");
      }
    } else {
      alert("There isn't enough space on the list!")
    }
  }
  
  const handleShowing = () => {
    setShow(!show);
  }
  
  
  //tu fanjaraze davaklikebt done-s mashin mogvarebuli gaxdeba da amito false 
  //gaxdeba misi mdgomareboa tu deletes davadgamt mashinac igive moxdeba ogond waishelba siidan
  
  const handleItemState = (answer) => {
    const doneList = [];
    if(list[itemIndex].state && answer === "Done") {
      list[itemIndex].state = false; 
      doneList.push(list[itemIndex]);
      
    } else if(answer === "Delete") {
      list.splice(itemIndex, 1);
    } else if(answer === "Undone") {
      list[itemIndex].state = true;
    }
    setShow(false);
  }
  
  const doubleFunction = (i) => {
    handleShowing();
    setItemIndex(i);
  }
  
  //tu complitedList iqneba true mashin <ol> gvachvenebs aqtiur davalebebs listidan
  const handleList = (res) => {
    res ? setItemsCondition(true) : setItemsCondition(false);
  }
  
  return (  
    <>
      <h1 className="title">Shopping List</h1>
      <div onClick={show ? handleShowing : null} className={show ? "container-blur" : "container"}>
        <div className="form-div">
          <form className="input-form" onSubmit={handleClick}>
            <input type="text" placeholder="type items here..." onChange={handleChange} value={input.name} required />
            <input className={criticalLevel ? "critical-quantity" : "add-btn"} type="button" value="Add" onClick={handleClick}/>
          </form>  
        </div>
        <div className="listed-div">
          <h2 className="list-title">Listed Items ({itemsCondition ? "Active" : "Completed"})</h2> 
          <ol>
            {
              itemsCondition ? (
                list.filter((item) => item.state).map((item, index) => (
                  <ListItem 
                    key={index} 
                    value={item.name}  
                    state={item.state}
                    onItemClick={() => {doubleFunction(index)}}
                    />
                ))  
              ) : (
                list.filter((item) => !item.state).map((item, index) => (
                  <ListItem 
                    key={index} 
                    value={item.name}  
                    state={item.state}
                    onItemClick={() => {doubleFunction(index)}}
                    />
                ))  
              )         
            }
          </ol>
        </div>  
      </div>
      <Window btnClick={(answer) => { handleItemState(answer) }} showing={show} itemsCondition={itemsCondition} />
      <div className='condition-btns'>
        <button onClick={() => handleList(true)}>Active</button>
        <button onClick={() => handleList(false)}>Complated</button> 
      </div>
    </> 
  )
};

const ListItem = ({ value, index, state, onItemClick }) => {
  return (
    <li key={index} onClick={onItemClick} className={state ? null : "false-crossed"}>{value}</li>
  )
};

const Window = ({ showing, btnClick, itemsCondition }) => {
  if (showing) {
    return (
      <div className="window">
        <h2 className="window-title">What to do with this item?</h2> 
        <div className="window-btns">
          {
            itemsCondition ? (
              <button onClick={() => {btnClick("Done")}}>Done</button>
            ) : (
              <button onClick={() => {btnClick("Undone")}}>Undone</button>
            )
          }
          <button onClick={() => { btnClick("Delete") }} >Delete</button>
        </div> 
      </div>
    ); 
  } else {
    return null;
  }
}

export default App;

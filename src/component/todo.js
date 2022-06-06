import React, { useEffect, useState } from "react";
import "../App.css";

const todoOne = "/images/todo.png";
  

// to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please write 👍 something");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((currElm) => {
          if (currElm.id === editItem) {
            return { ...currElm, name: inputData };
          }
          return currElm;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);

      setInputData("");
    }
  };
  const deleteItem = (index) => {
    const updatedItems = items.filter((currElm) => {
      return index !== currElm.id;
    });
    setItems(updatedItems);
  };
  const removeAll = () => {
    if (items == "") {
      alert("Nothing data avilable..");
    } else {
      setItems([]);
    }
  };

  const editItems = (id) => {
    let newEditItems = items.find((currElm) => {
      return currElm.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItems.name);
    setEditItem(id);
  };

  // add data to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child">
          <figure>
            <img src={todoOne} alt="images" width="150px" />
            <p className="textStyle">Write your Todo List</p>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items.."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <i
                className="fa fa-plus addbtn"
                title="Add Items"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit addbtn"
                title="Edit Items"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((currElm) => {
              return (
                <div className="eachItems" key={currElm.id}>
                  <h3>{currElm.name}</h3>
                  <div className="todobtn">
                    <i
                      className="far fa-edit add-btn"
                      title="edit Me"
                      onClick={() => editItems(currElm.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title=""
                      onClick={() => deleteItem(currElm.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" onClick={removeAll}>
              <span>Remove Data</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;

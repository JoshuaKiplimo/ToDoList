import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("groceryList");
  if (list) {
    return JSON.parse(localStorage.getItem("groceryList"));
  } else {
    return [];
  }
};

function App() {
  const [groceryValue, setGroceryValue] = useState("");
  const [groceryList, setGroceryList] = useState(getLocalStorage());
  //const [alert, setAlert] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [isEditing, setisEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const submitData = (e) => {
    e.preventDefault();
    if (!groceryValue) {
      //display alert: msg

      showAlert(true, "danger", "please enter value");
    } else if (groceryValue && isEditing) {
      groceryList.map((item) => {
        if (item.id === editID) {
          item.title = groceryValue;
          // return { ...item, title: groceryValue };
        } else {
          return item;
        }
      });
      const editingValue = {
        show: true,
        msg: "value changed",
        type: "success",
      };
      setAlert(editingValue);
      setGroceryValue("");
      setisEditing(false);
      setEditID(null);
    } else {
      //show alert
      showAlert(true, "success", "added to list");
      //add item to list
      const newItem = {
        id: new Date().getTime().toString(),
        title: groceryValue,
      };
      setGroceryList([...groceryList, newItem]);
      setGroceryValue("");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    console.log("del item", id);
    const toRemove = groceryList.filter((items) => items.id === id)[0].title;
    console.log(toRemove);
    const filtered = groceryList.filter((items) => items.id !== id);
    console.log("to delete");
    console.log(filtered);
    setGroceryList(filtered);

    showAlert(true, "danger", `${toRemove}  removed`);
  };
  const editItem = (id) => {
    const toEdit = groceryList.find((items) => items.id === id);
    console.log(toEdit.title);
    setGroceryValue(toEdit.title);
    setEditID(id);
    setisEditing(true);
  };
  useEffect(() => {
    //save local values
    //Reason we use use effect : every time list changes update values in local storage
    localStorage.setItem("groceryList", JSON.stringify(groceryList));
  }, [groceryList]);
  return (
    <>
      <main>
        <section className="section-center">
          <form className="grocery-form">
            {alert.show && (
              <Alert
                {...alert}
                removeAlert={showAlert}
                groceryList={groceryList}
              />
            )}
            <h3>Grocery bud</h3>
            <div className="form-control">
              <input
                className="grocery"
                type="text"
                placeholder="e.g eggs"
                name="grocery"
                id="grocery"
                value={groceryValue}
                onChange={(e) => setGroceryValue(e.target.value)}
              ></input>

              <button onClick={submitData} className="submit-btn">
                {isEditing ? "edit" : "submit"}
              </button>
            </div>
          </form>

          <article className="grocery-container">
            <List
              item={groceryList}
              removeItem={removeItem}
              editItem={editItem}
            />
            <button
              className="clear-btn"
              onClick={() => {
                showAlert(true, "success", "items successfully removed");
                setGroceryList([]);
              }}
            >
              Clear Items
            </button>
          </article>
        </section>
      </main>
    </>
  );
}

export default App;

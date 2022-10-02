import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ item, removeItem, editItem }) => {
  //console.log(removeItem);
  return (
    <>
      <article className="grocery-list">
        {item.map((item) => {
          const { id, title } = item;
          return (
            <article key={id} className="grocery-item">
              <p className="title">{title}</p>
              <div className="btn-continer">
                <button type="button" className="edit-btn">
                  <FaEdit onClick={() => editItem(id)} />
                </button>
                <button className="delete-btn">
                  <FaTrash onClick={() => removeItem(id)} />
                </button>
              </div>
            </article>
          );
        })}
      </article>
    </>
  );
};

export default List;

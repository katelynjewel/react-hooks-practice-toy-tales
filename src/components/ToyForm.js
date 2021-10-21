import React, { useState } from "react";

function ToyForm({setToys}) {

  const [newToy, setNewToy] = useState({
    name: "",
    image: "",
    likes: "",
  })

  function handleChange(e) {
    e.preventDefault();
    setNewToy((currentNewToys) => {
      return {
        ...currentNewToys,
        [e.target.name]: e.target.value,
      }
    });
  }

  function handleSubmit(e) {
    const toys={
      name: newToy.name,
      image: newToy.image,
      likes: 0,
    }
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(toys)
    }).then(resp => resp.json())
    .then((data) => setToys(currentToys => [data, ...currentToys]));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={newToy.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={newToy.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;

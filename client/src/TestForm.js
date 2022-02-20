import React, { useState } from "react";

export default function TestForm() {
  const [lastName, setLastname] = useState("");
  const [imageData, setImageData] = useState("");
  const [id, setId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    //
    const formData = new FormData();

    formData.append("last_name", lastName);
    formData.append("image", imageData);
    //
    fetch(`users/${id}`, {
      method: "PATCH",
      body: formData,
    });
    //
  };

  return (
    <div>
      <h1>Test Form</h1>
      <form onSubmit={handleSubmit}>
        <span>set last name</span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="last name"
        />
        <br />
        <span>set image</span>
        <input
          type="file"
          name="newPhoto"
          accept="image/*"
          enctype="multipart/form-data"
          onChange={(e) => setImageData(e.target.files[0])}
        />
        <br />
        <span>set id</span>
        <input
          type="number"
          name=""
          id=""
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

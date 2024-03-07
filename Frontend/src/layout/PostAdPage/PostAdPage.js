import React, { useState } from "react";

function PostAdPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    // Handle image selection
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Selected Image:", selectedImage);
    // Additional logic to post ad
  };

  return (
    <div>
      <h1>Post Free Ad</h1>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <label>Select Image</label>
      </div>
      <div>
        <h2>Location:</h2>
        {/* Location card */}
      </div>
      <div>
        <h2>Car Model:</h2>
        {/* Car model card */}
      </div>
      <div>
        <h2>Registered:</h2>
        {/* Registered card */}
      </div>
      <div>
        <h2>Body Color:</h2>
        {/* Body color card */}
      </div>
      <div>
        <h2>KM's Driven:</h2>
        {/* KM's driven card */}
      </div>
      <div>
        <h2>Price (PKR):</h2>
        {/* Price card */}
      </div>
      <div>
        <h2>Contact Info:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit">Post Ad</button>
        </form>
      </div>
    </div>
  );
}

export default PostAdPage;

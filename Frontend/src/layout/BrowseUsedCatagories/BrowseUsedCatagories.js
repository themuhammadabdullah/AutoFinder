import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["Category", "City", "Make", "Model", "Budget", "Type"];
  const cardData = {
    Category: [
      { name: "Car 1", text: "Lorem ipsum 1", image: "image1.jpg" },
      { name: "Car 2", text: "Lorem ipsum 2", image: "image2.jpg" },
      { name: "Car 3", text: "Lorem ipsum 3", image: "image3.jpg" },
      { name: "Car 4", text: "Lorem ipsum 4", image: "image4.jpg" },
      { name: "Car 1", text: "Lorem ipsum 1", image: "image1.jpg" },
      { name: "Car 2", text: "Lorem ipsum 2", image: "image2.jpg" },
      { name: "Car 3", text: "Lorem ipsum 3", image: "image3.jpg" },
      { name: "Car 4", text: "Lorem ipsum 4", image: "image4.jpg" },
      { name: "Car 1", text: "Lorem ipsum 1", image: "image1.jpg" },
      { name: "Car 2", text: "Lorem ipsum 2", image: "image2.jpg" },
      { name: "Car 3", text: "Lorem ipsum 3", image: "image3.jpg" },
      { name: "Car 4", text: "Lorem ipsum 4", image: "image4.jpg" },
    ],
    City: [
      { name: "City 1", text: "Lorem ipsum 5", image: "image5.jpg" },
      { name: "City 2", text: "Lorem ipsum 6", image: "image6.jpg" },
      { name: "City 3", text: "Lorem ipsum 7", image: "image7.jpg" },
      { name: "City 4", text: "Lorem ipsum 8", image: "image8.jpg" },
    ],
    Make: [
      { name: "Make 1", text: "Lorem ipsum 9", image: "image9.jpg" },
      { name: "Make 2", text: "Lorem ipsum 10", image: "image10.jpg" },
      { name: "Make 3", text: "Lorem ipsum 11", image: "image11.jpg" },
      { name: "Make 4", text: "Lorem ipsum 12", image: "image12.jpg" },
    ],
    Model: [
      { name: "Model 1", text: "Lorem ipsum 7", image: "image7.jpg" },
      { name: "Model 2", text: "Lorem ipsum 8", image: "image8.jpg" },
    ],
    Budget: [
      { name: "Budget 1", text: "Lorem ipsum 9", image: "image9.jpg" },
      { name: "Budget 2", text: "Lorem ipsum 10", image: "image10.jpg" },
    ],
    Type: [
      { name: "Type 1", text: "Lorem ipsum 11", image: "image11.jpg" },
      { name: "Type 2", text: "Lorem ipsum 12", image: "image12.jpg" },
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [displayedCards, setDisplayedCards] = useState([]);

  useEffect(() => {
    const getRandomCards = () => {
      const filteredCards =
        selectedCategory === "all" ? [] : cardData[selectedCategory];

      setDisplayedCards(filteredCards);
    };

    getRandomCards();

    return () => {
      setDisplayedCards([]);
    };
  }, [selectedCategory]);

  return (
    <div className="container">
      <h1>Browse Used Cars</h1>
      <nav className="navigation-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="content-container">
        {displayedCards.length > 0 && (
          <div className="cards-container">
            {displayedCards.map((card) => (
              <div key={card.name} className="card">
                <div className="card-content">
                  <img src={card.image} alt={card.name} />
                  <h3>{card.name}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

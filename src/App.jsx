import { useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import ReadCreators from "./pages/ReadCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import CreatorInfo from "./pages/CreatorInfo";
import "./App.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/gallery",
      element: <ReadCreators searchQuery={searchQuery} />
    },
    {
      path: "/edit/:id",
      element: <EditCreator />
    },
    {
      path: "/add",
      element: <AddCreator />
    },
    {
      path: "/info/:id",
      element: <CreatorInfo />
    }
  ]);
  
  return (
    <div className="App">
      <div className="header">
        <div className="header-name">
          <h2>CreatorVerse 🎥</h2>
        </div>
        <div className="header-buttons">
          <Link to="/"><button className="header-button">Home</button></Link>
          <Link to="/gallery"><button className="header-button">Creator Gallery</button></Link>
          <Link to="/add"><button className="header-button">Add New Creator</button></Link>
        </div>
        <div className="header-search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="search-bar"
          />
        </div>
      </div>
      <div className="content">
        {element}
      </div>
    </div>
  );
};

export default App;
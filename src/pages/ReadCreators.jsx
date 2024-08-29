import { useEffect, useState } from "react";
import { supabase } from "../client";
import Creator from "../components/Creator";

const ReadCreators = ({ searchQuery }) => {
  const [creators, setCreators] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  
  useEffect(() => {
    // Read all posts from the database table
    const fetchCreators = async () => {
      let query = supabase
        .from("Creators")
        .select();
      if (sortBy === "newest") {
        query.order("created_at", {ascending: false});
      } else if (sortBy === "popular") {
        query.order("upvotes", {ascending: false})
      }
      const { data } = await query;
      setCreators(data);
    };
    fetchCreators();
  }, [sortBy]);
  
  // Filter posts based on search query
  const filteredCreators = searchQuery ? creators.filter(creator => creator.name.toLowerCase().includes(searchQuery.toLowerCase())) : creators;

  return (
    <div className="read-posts">
      <h1 className="read-posts-title">Creator Gallery</h1>
      <div className="sort-buttons">
        <button className={`sort-button ${sortBy === "newest" ? "active" : ""}`} onClick={() => setSortBy("newest")}>Newest</button>
        <button className={`sort-button ${sortBy === "popular" ? "active" : ""}`} onClick={() => setSortBy("popular")}>Most Popular</button>
      </div>
      <div className="read-posts-gallery">
        {
          filteredCreators && filteredCreators.length > 0 ?
          filteredCreators.map((creator, index) =>
            <Creator key={index} id={creator.id} name={creator.name} description={creator.description} URL={creator.URL} imageURL={creator.imageURL} upvotes={creator.upvotes} createdAt={creator.created_at} />
          ) : <h2>{'No Creators Yet 😞'}</h2>
        }
      </div>
    </div>
  );
};

export default ReadCreators;
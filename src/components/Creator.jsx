import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Creator = (props) => {
  const [upvotes, setUpvotes] = useState(props.upvotes);
  const [timePosted, setTimePosted] = useState("");
  
  useEffect(() => {
    const getTimeDifference = (createdAt) => {
      const currentTime = new Date();
      const postedTime = new Date(createdAt);
      const difference = currentTime - postedTime;
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        setTimePosted(`Posted ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`);
      } else if (days > 0) {
        setTimePosted(`Posted ${days} ${days === 1 ? "day" : "days"} ago`);
      } else if (hours > 0) {
        setTimePosted(`Posted ${hours} ${hours === 1 ? "hour" : "hours"} ago`);
      } else if (minutes > 0) {
        setTimePosted(`Posted ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
      } else {
        setTimePosted("Posted just now");
      }
    };
    getTimeDifference(new Date(props.createdAt));
  }, [props.createdAt]);

  const upvote = async (event) => {
    setUpvotes(upvotes + 1);
    event.preventDefault();
    await supabase
      .from("Creators")
      .update({ upvotes: upvotes + 1 })
      .eq("id", props.id);
    window.location = "/gallery";
  };

  return (
    <div className="post">
      <Link to={`/info/${props.id}`} key={props.id} className="post-link">
        <div className="post-container">
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <h5>{props.upvotes} upvotes</h5>
          <Link to={props.URL} target="_blank"><button className="post-creator-button">Creator Platform</button></Link>
          <br /> <br />
          <img className="post-img" src={props.imageURL} />
          <p>{timePosted}</p>
        </div>
        <Link to={`/edit/${props.id}`}><button className="post-link-button">Edit Creator</button></Link>
        <input className="upvote-button" type="submit" value="Upvote 👍" onClick={upvote} />
      </Link>
    </div>
  );
};

export default Creator;
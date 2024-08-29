import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../client";

const CreatorInfo = () => {
  const {id} = useParams();
  const [creator, setCreator] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [timePosted, setTimePosted] = useState("");

  useEffect(() => {
    // Read all posts from the database table
    const grabCurrentInfo = async () => {
      const {data, error} = await supabase
        .from("Creators")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        throw error;
      };
      if (data) {
        setCreator(data);
        setUpvotes(data.upvotes);
        const commentsArray = Object.values(data.comments || {}).map((comment, index) => ({
          id: index, // Generate an id for each comment (replace with actual comment id if available)
          content: comment.comment, // Assuming comments are stored as text
          created_time: comment.created_time
        }));
        setComments(commentsArray);
        getTimeDifference(new Date(data.created_at));
      };
    };
    grabCurrentInfo();

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
  }, [id]);
  
  const upvote = async (event) => {
    setUpvotes(upvotes + 1);
    event.preventDefault();
    await supabase
      .from("Creators")
      .update({upvotes: upvotes + 1})
      .eq("id", creator.id);
    window.location = `/info/${id}`;
  };

  const submitComment = async () => {
    const currentTime = new Date().toISOString();
    const newCommentObject = {
      id: comments.length,
      comment: newComment,
      created_time: currentTime
    };
    const updatedComments = [...comments, newCommentObject];
    await supabase
      .from("Creators")
      .update({comments: updatedComments})
      .eq("id", post.id);
    setComments(updatedComments);
    setNewComment("");
    window.location = `/info/${id}`;
  };
  
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <div className="post-info">
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <h5>{creator.upvotes} upvotes</h5>
      <Link to={creator.URL}><button className="post-creator-button">Creator Platform</button></Link>
      <br /> <br />
      <img className="post-info-img" src={creator.imageURL} />
      <p>{timePosted}</p>
      <div className="buttons-section">
        <Link to={`/edit/${creator.id}`}><button className="post-link-button">Edit Creator</button></Link>
        <button className="upvote-button" type="submit" onClick={upvote}>Upvote 👍</button>
      </div>

      <div className="comments-section">
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="add-comment-section">
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Leave a comment..."
          rows={4}
          className="comment-textarea"
        />
        <button onClick={submitComment} className="submit-comment-button">Submit Comment</button>
      </div>
    </div>
  );
};

export default CreatorInfo;
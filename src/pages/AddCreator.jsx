import { useState } from "react";
import { supabase } from "../client";

const AddCreator = () => {
  const [creator, setCreator] = useState({ name: "", URL: "", description: "", imageURL: "" });

  const addCreator = async (event) => {
    event.preventDefault();
    await supabase
      .from("Creators")
      .insert({ name: creator.name, URL: creator.URL, description: creator.description, imageURL: creator.imageURL })
      .select();
    window.location = "/gallery";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="create-post">
      <h1>Add New Creator</h1>
      <form>
        <label>Name</label> <br />
        <input type="text" id="name" name="name" value={creator.name} placeholder="Name" onChange={handleChange} /> <br />
        <br />

        <label>Description</label> <br />
        <textarea rows="8" type="text" id="description" name="description" value={creator.description} placeholder="Description" onChange={handleChange} /> <br />
        <br />

        <label>URL</label> <br />
        <input type="text" id="URL" name="URL" value={creator.URL} placeholder="URL" onChange={handleChange} /> <br />
        <br />

        <label>Image URL (Optional)</label> <br />
        <input type="text" id="imageURL" name="imageURL" value={creator.imageURL} placeholder="Image URL (Optional)" onChange={handleChange} /> <br />
        <br />

        <input className="create-button" type="submit" value="Add Creator" onClick={addCreator} />
      </form>
    </div>
  );
};

// const AddCreator = () => {
//     const [post, setPost] = useState({title: "", content: "", imageUrl: "", upvotes: 0, secretKey: ""});

//     const createPost = async (event) => {
//         event.preventDefault();
//         await supabase
//             .from("Posts")
//             .insert({title: post.title, content: post.content, image_url: post.imageUrl, upvotes: post.upvotes, secret_key: post.secretKey})
//             .select();
//         window.location = "/gallery"
//     };

//     const handleChange = (event) => {
//         const {name, value} = event.target;
//         setPost((prev) => {
//             return {
//                 ...prev,
//                 [name]: value,
//             };
//         });
//     };

//     return (
//         <div className="create-post">
//             <h1>Create New Post</h1>
//             <form>
//                 <label>Title</label> <br />
//                 <input type="text" id="title" name="title" value={post.title} placeholder="Title" onChange={handleChange} /> <br />
//                 <br />

//                 <label>Content (Optional)</label> <br />
//                 <textarea rows="8" type="text" id="content" name="content" value={post.content} placeholder="Content (Optional)" onChange={handleChange} /> <br />
//                 <br />

//                 <label>Image URL (Optional)</label> <br />
//                 <input type="text" id="image-url" name="imageUrl" value={post.image_url} placeholder="Image URL (Optional)" onChange={handleChange} /> <br />
//                 <br />

//                 <label>Secret Key (Optional)</label> <br />
//                 <input type="text" id="secret-key" name="secretKey" value={post.secret_key} placeholder="Secret Key (Optional)" onChange={handleChange} /> <br />
//                 <br />

//                 <input className="create-button" type="submit" value="Create Post" onClick={createPost} />
//             </form>
//         </div>
//     );
// };

export default AddCreator;
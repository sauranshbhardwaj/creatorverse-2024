import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const {id} = useParams();
  const [creator, setCreator] = useState({id: null, name: "", description: "", URL: "", imageURL: ""});

  useEffect(() => {
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
        setCreator(data)
      };
    };
    grabCurrentInfo();
  }, [id]);

  const updateCreator = async (event) => {
    event.preventDefault();
    await supabase
      .from("Creators")
      .update({name: creator.name, description: creator.description, URL: creator.URL, imageURL: creator.imageURL})
      .eq("id", id);
    window.location = "/gallery";
  };

  const deleteCreator = async (event) => {
    event.preventDefault();
    await supabase
      .from("Creators")
      .delete()
      .eq("id", id);
    window.location = "/gallery";
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCreator((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="edit-post">
      <h1>Update Post</h1>
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
        
        <input className="update-button" type="submit" value="Update Creator" onClick={updateCreator} />
        <input className="delete-button" type="submit" value="Delete Creator" onClick={deleteCreator} />
      </form>
    </div>
  );
};

export default EditCreator;
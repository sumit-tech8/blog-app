import React,{useState, useEffect} from 'react'
import Layout from '../components/layout/layout'
import './../style/newblogs.css';
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';



const Updateblog = () => {
    const navigate = useNavigate()
    const colorOptions = ["#D0D4CA","#008B8B", "#B0D9B1", "#E9967A","#2F4F4F"];
    const params = useParams();
    const [id, setId] = useState("");
    const [selected, setSelected] = useState(null);
    const [updateTitle, setUpdatedTitle] = useState("");
    const [updatedDiscription, setUpdatedDiscription] = useState("");
    const [updatedColor, setUpdatedColor] = useState("");

    const handleColorSelect = (updatedColor) => {
      setUpdatedColor(updatedColor);
  };

    const modules = {
      toolbar: [
          [{header: "1"}, {header: "2"}, {font: []}],
          [{list: "ordered"}, {list: "bullet"}],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{align: []}],
          [
              {color: ["red", "yellow", "green", "blue"]},
              {background: ["red", "yellow", "green", "blue"]},
          ],
          ["link"],
          ["image", "video"],
          ["clean"],
      ],
  };
  

   //get single blogs
 const getSingleblog = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blogs/get-blog/${params.slug}`
      );
      setUpdatedTitle(data.blog.title);
      setId(data.blog._id);
      setUpdatedDiscription(data.blog.discription);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleblog();
    //eslint-disable-next-line
  }, []);


  //update category
  const handleUpdate = async (e) => {
   
    try {
      const { data } = await axios.put(
        `/api/v1/blogs/update-blog/${id}`,
        { title: updateTitle, discription:updatedDiscription, Color:updatedColor }
      );
      if (data.success) {
        toast.success(`${""} is updated`);
        setSelected(null);
        setUpdatedTitle("");
        setUpdatedDiscription("");
        setUpdatedColor("");
         navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };


      const handleclose = async () => {
        navigate('/');
    }


  return (
    <Layout>
    <div className='form-container'>
<form>
<h4 className='title'>UPDATE-BLOG</h4>
<div className="mb-3">
 <input type="text" value={updateTitle} className="form-control" id="exampleFormControlInput1" placeholder= "title"
 onChange={(e) => setUpdatedTitle(e.target.value)} required />
</div>
<div className="mb-3">
 <label htmlFor="exampleFormControlTextarea1" className="form-label" >Description</label>

  <ReactQuill
       theme='snow'
       value={updatedDiscription}
       onChange={(content) => setUpdatedDiscription(content)} required
       modules={modules}
     />

</div>  
</form>

<div>
           <div>
                 {colorOptions.map((color, index) => (
                     <button
                         key={index}
                         style={{
                             backgroundColor: color,
                             width: "50px",
                             height: "35px",
                             margin: "5px",
                             borderRadius: "5%",
                             cursor: "pointer",
                             padding: "5px",
               
                         }}
                         onClick={() => handleColorSelect(color)}
                     >

                     </button>
                 ))}
             </div>
             </div>
 <button type="submit" className="bbbtn btn-primary"onClick={() => { handleUpdate()}}  >UPDATE</button>
 <button type='cancle' className="bbbtn btn-primary" onClick={handleclose}>CANCEL</button>

</div>

 </Layout>
  )
}

export default Updateblog

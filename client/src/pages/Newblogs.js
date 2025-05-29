import React,{useState} from 'react'
import Layout from '../components/layout/layout'
import './../style/newblogs.css';
import toast from 'react-hot-toast'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const Newblogs = () => {
    const [title,setTitle] = useState("")
    const [discription,setDiscription] = useState("")
    const [photo,setPhoto] = useState("")
    const navigate = useNavigate()
    const [Color, setSelectedColor] = useState(null);
    const colorOptions = ["#D0D4CA","#008B8B", "#B0D9B1", "#E9967A","#2F4F4F"];

    const handleColorSelect = (color) => {
      setSelectedColor(color);
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

  // const handlesubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(title,discription,Color,photo);
  //   try {
  //      const res = await axios.post('/api/v1/notes/New-notes',{title,discription,Color,photo});
  //     if (res && res.data.success) {
  //       toast.success(res.data && res.data.message);
  //       navigate('/');
  //     } else {
  //       toast.error(res.data.message);
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Something went wrong')
  //   }
  // }

    const handlesubmit = async (e) => {    
        console.log(title,discription,Color,photo);
        try {
          const productData = new FormData();
          productData.append("title", title);
          productData.append("discription", discription);
          productData.append("photo", photo);
          productData.append("Color", Color);
          const {data} = axios.post(
            "/api/v1/blogs/New-blogs",
            productData
          );
          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("blogs Created Successfully");
            alert("blog Created!!");
            navigate('/');
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
        }
      }

      const handleclose = async () => {
        navigate('/');
    }


  return (
    <Layout>
       <div className='form-container'>
   <form onSubmit={handlesubmit}>
   <h4 className='title'>ADD-BLOGS</h4>
  <div className="mb-3">
    <input type="text" value={title} className="form-control" id="exampleFormControlInput1" placeholder="Enter title"
    onChange={(e) => setTitle(e.target.value)} required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label" >Description</label>
     <ReactQuill
          theme='snow'
          value={discription}
          onChange={(content) => setDiscription(content)} required
          modules={modules}
        />
             <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 m-3">
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                   
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
   
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
    <button type="submit" onClick={handlesubmit} className="bbbtn btn-primary">SAVE</button>
    <button type='cancle' className="bbbtn btn-primary" onClick={handleclose}>CANCEL</button>
  
</div>

    </Layout>
  )
}

export default Newblogs




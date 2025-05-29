import React, { useState, useEffect } from "react";
import Layout from './../components/layout/layout'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../style/homepage.css"
import {BiSolidAddToQueue,BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import HTMLReactParser from "html-react-parser";



const Homepage = () => {
 
  const [blogs, setblogs] = useState([]);
  const navigate = useNavigate();
 
  
//getall blogs
const getAllblogs = async () => {
  try {
    const { data } = await axios.get("/api/v1/blogs/get-blogs");
    setblogs(data.blogs);
  } catch (error) {
    console.log(error);
    toast.error("Someething Went Wrong");
  }
};

//lifecycle method
useEffect(() => {
  getAllblogs();
}, []);




 //delete a product
 const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/blogs/delete-blog/${pId}`
    ); window.location.reload()
    toast.success("blog Deleted Succfully");
  } catch (error) {
    console.log(error);
    toast.error("Something weeent wrong"); 
  }
};


  return (
    <Layout>
       
       <div className="d-flexs flex-wrap " >
            {blogs?.map((n) => (
              

                <div className="card m-3 " style={{ width: "" ,height: "5rem",backgroundColor:n.Color}} >
                 
                  <img
                    src={`/api/v1/blogs/blogs-photo/${n._id}`}
                    className="carrrd"
                    alt={"not found"}
                    style={{width: '300px',height: "90%", margin:"10px"}}
                  />
                 <h4 className="card-title">{n.title.substring(0, 30)}... </h4 >
                  <div className="card-body" >
                  
                    <p className="card-text" style={{overflow:"hidden" }}>{HTMLReactParser(n.discription.substring(0, 90))}</p>
                    
                  </div>
                  <Link
                key={n._id}
                to={`/blogs/${n.slug}`}
                className="product-link"
                style={{ textDecoration:'none' }} > view details
                  </Link>
                  
                  <BiEdit className="text-success me-3 ms-auto"onClick={() => {
            navigate("/blog/" + n.slug);
          }} ></BiEdit>  
                   <MdDelete className="text-danger m-3 ms-auto" onClick={() => {
                              handleDelete(n._id);
                            }}></MdDelete>
                            
                            
                </div>
             
               ))}
               
              </div>

          
            {/* add blogs button at corner */}

         <Link to="newblogs" >
             <div id="top"> 
               <BiSolidAddToQueue/>
             </div> 
         </Link>

    </Layout>
  )
}

export default Homepage

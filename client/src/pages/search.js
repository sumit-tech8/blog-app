import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/layout";
import { useSearch } from "../context/search";
import { Link} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import "../style/homepage.css"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import HTMLReactParser from "html-react-parser";
const Search = () => {
  const [values, setValues] = useSearch();
  const [blogs, setblogs] = useState([]);

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
      // let answer = window.prompt("Are You Sure want to delete this blogs ? ");
      // if (!answer) return;
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
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No blogs Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap " >
            {values?.results?.map((n) => (
                <div className="card m-3 " style={{ width: "" ,height: "13rem" }} >
                 <Link
                key={n._id}
                to={`/blogs/${n.slug}`}
                className="product-link"
                style={{ textDecoration:'none' }} >
                 <h4 className="card-title">{n.title.substring(0, 20)}... </h4 >
                  <div className="card-body"  /*onClick={handleShow}*/ style={{ width: "" ,height: "6rem" }}>
                  
             
                    <p className="card-text" style={{overflow:"hidden" }}>{HTMLReactParser(n.discription.substring(0, 60))}....?
                    </p>
                    
                  </div>
                  </Link> 
                  <BiEdit className=" me-3 ms-auto text-success " style={{cursor:'pointer',fontSize:'13pt'}}></BiEdit>  
                   <MdDelete className="m-3 ms-auto text-danger "onClick={() => {
                              handleDelete(n._id);
                            }} style={{cursor:'pointer',fontSize:'13pt'}}></MdDelete>
                            
                </div>
               
               ))}
               
              </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
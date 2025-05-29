import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import '../style/detailpage.css';
import HTMLReactParser from 'html-react-parser';

const Detailpage = () => {
    const params = useParams();
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [id, setId] = useState("");
    


    //get single notes
 const getSingleblog = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blogs/get-blog/${params.slug}`
      );
      setTitle(data.blog.title);
      setId(data.blog._id);
      setDiscription(data.blog.discription);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleblog();
    //eslint-disable-next-line
  }, []);

  return (
    <>
       <Layout>
      <div className='formcontainer'>
        <div className="my-card" style={{width: '18rem'}}>
        <div className="card-body">
           <img
                    src={`/api/v1/blogs/blogs-photo/${id}`}
                    className="card-img-top"
                    alt={title}
                    style={{width: '80%'}}
                  />
          <h5 className="my-card-title"> {title}</h5>
          <h6> Description:</h6>
          <p className="card-text"> {HTMLReactParser(discription)} </p>
          <a href="/" className="my-bb btn-primary">Go-back</a>
         
        </div>
       </div>
       </div>
      </Layout>
    </>
  )
}

export default Detailpage

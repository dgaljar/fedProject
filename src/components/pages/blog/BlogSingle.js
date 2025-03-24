import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import MediaImg from "./MediaImg";

const BlogSingle = () => {

    const {slug} = useParams();    
    const [post, setPost] = useState(null);
   
    useEffect(
        () => {
            fetch('https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?slug=' + slug)
            .then(response => response.json())
            .then(data => setPost(data[0]))
        }, [slug]
    );

    if(!post) return <p>Loading...</p>

    return(
        <>
            <div className="container">
                <div className="row">
                    <h1 className="my-5" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                    <MediaImg id={post.featured_media} size="medium_large" />
                    <div dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                </div>
               
            </div>


        </>
    );
};

export default BlogSingle;
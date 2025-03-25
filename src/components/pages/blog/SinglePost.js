import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../users/context/AuthProwider"; // Import Auth Context
import PostCategory from "../home/home-components/PostCategory";
import PostAuthor from "../home/home-components/PostAuthor";
import PostDate from "../home/home-components/PostDate";
import Loading from "../home/home-components/Loading";
import Ads from "../home/home-components/Ads";

import "./SinglePost.css";

const SinglePost = () => {
  const { slug } = useParams();
  const { auth } = useContext(AuthContext); // Get logged-in user details
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // Store user input
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(
      `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/posts?_embed&slug=${slug}`
    )
      .then((response) => response.json())
      .then((data) => setPost(data[0]));
  }, [slug]);

  useEffect(() => {
    if (post) {
      fetch(
        `https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/comments?post=${post.id}`
      )
        .then((response) => response.json())
        .then((data) => setComments(data));
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!auth.token) {
      setError("You must be logged in to comment.");
      setIsSubmitting(false);
      return;
    }

    if (newComment.trim() === "") {
      setError("Comment cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    const commentData = {
      post: post.id,
      content: newComment,
      author_name: auth.user, // Use logged-in user’s name
      author_email: auth.email, // Use logged-in user's email
    };

    try {
      const response = await fetch(
        "https://frontend.internetskimarketing.eu/backend/wp-json/wp/v2/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`, // Include token for authentication
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      const newCommentData = await response.json();
      setComments([...comments, newCommentData]); // Add new comment to the list
      setNewComment(""); // Clear input after submission
      setError("");
    } catch (error) {
      setError("Error submitting comment. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (!post) return <Loading />;

  const imgSize =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.full
      ?.source_url || post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <>
      <section className="single-title">
        <div className="container">
          <div className="row">
            <div className="col-12 px-3">
              <div className="cat-card">
                <PostCategory id={post.categories} />
                <h1
                  className="my-4"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h1>
                <span>
                  <img
                    className="profile-img"
                    src={post._embedded.author[0].avatar_urls[48]}
                    alt="author"
                  />
                  <PostAuthor
                    name={post._embedded.author?.[0]?.name}
                    slug={post._embedded.author?.[0]?.slug}
                  />

                  <PostDate date={post.date} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="single-hero">
        <div className="container p-0">
          <img
            className="coverimg"
            src={imgSize}
            alt={post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text}
          />
        </div>
      </section>

      <section className="single-content">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          <Ads />

          <section className="comments">
            <div className="row">
              <div className="col-12 px-5">
                <h3 className="commentTitleMain mb-4">Comments</h3>
                {auth.token ? (
                  <form onSubmit={handleSubmit}>
                    <textarea
                      cols={10}
                      rows={5}
                      maxLength={250}
                      placeholder="Write your comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      disabled={isSubmitting}
                    ></textarea>
                    {error && <p className="error">{error}</p>}
                    <button
                      type="submit"
                      className="btn mb-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </form>
                ) : (
                  <div className="notice">
                    <p>You must be logged in to comment.</p>
                    <Link className="btn" to="/signin">
                      Sign in
                    </Link>
                  </div>
                )}
              </div>

              <div className="col-12 px-5">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="d-flex gap-4 p-5 align-items-start comm"
                    >
                      <img
                        src={
                          comment.author_avatar_urls?.["48"] ||
                          "https://placehold.co/60"
                        }
                        alt="avatar"
                        width="40px"
                      />
                      <div className="commentBlock">
                        <span className="commentDate">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                        <span className="commentAuthor">
                          {comment.author_name}
                        </span>
                        <p
                          className="commentBody"
                          dangerouslySetInnerHTML={{
                            __html: comment.content.rendered,
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default SinglePost;

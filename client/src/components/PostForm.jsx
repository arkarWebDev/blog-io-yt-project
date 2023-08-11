import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const PostForm = ({ uiTitle, uiBtnText, isEditMode }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editPostId, setEditPostId] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [redirect, setRedirect] = useState(false);

  const params = useParams();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const getOldData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/edit-post/${params.id}`
    );
    const post = await response.json();
    const { title, content, imageUrl, _id, author } = post;

    setTitle(title);
    setImageUrl(imageUrl);
    setContent(content);
    setEditPostId(_id);
    setAuthorId(author);
  };

  useEffect((_) => {
    if (isEditMode) {
      getOldData();
    }
  }, []);

  const uploadPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("imageUrl", imageUrl);
    formData.append("content", content);
    formData.append("post__id", editPostId);
    formData.append("author_id", authorId);

    let fetchUrl = `${import.meta.env.VITE_URL}/upload`;
    let method = "POST";

    if (isEditMode) {
      fetchUrl = `${import.meta.env.VITE_URL}/edit-post`;
      method = "PUT";
    }

    const response = await fetch(fetchUrl, {
      method,
      body: formData,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Something went wrong.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="w-1/2 mx-auto">
      <h1 className="text-xl font-medium my-4">{uiTitle}</h1>
      <form onSubmit={uploadPost} method="post">
        <div className="mb-2">
          <label htmlFor="title" className="font-medium">
            Enter post title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="border border-black text-lg p-2 w-full block"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image" className="font-medium">
            Upload cover photo url
          </label>
          <input
            type="text"
            name="image"
            id="image"
            required
            className="border border-black text-lg p-2 w-full block"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className=" h-44 text-lg"
          value={content}
          onChange={setContent}
        />
        <button className="bg-black text-white text-lg font-medium text-center mt-12 py-4 w-full">
          {uiBtnText}
        </button>
      </form>
    </section>
  );
};

export default PostForm;

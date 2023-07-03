import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostForm = ({ uiTitle, uiBtnText }) => {
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
  return (
    <section className="w-1/2 mx-auto">
      <h1 className="text-xl font-medium my-4">{uiTitle}</h1>
      <form>
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
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="font-medium">
            Upload cover photo
          </label>
          <input
            type="file"
            name=""
            id=""
            required
            className=" text-lg py-2 w-full block"
          />
        </div>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          className=" h-44"
        />
        <button className="bg-black text-white text-lg font-medium text-center mt-12 py-4 w-full">
          {uiBtnText}
        </button>
      </form>
    </section>
  );
};

export default PostForm;

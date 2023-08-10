import React from "react";
import PostForm from "../components/PostForm";

const CreatePage = () => {
  return (
    <PostForm
      uiTitle={"Create your post now."}
      uiBtnText={"Create Post"}
      isEditMode={false}
    />
  );
};

export default CreatePage;

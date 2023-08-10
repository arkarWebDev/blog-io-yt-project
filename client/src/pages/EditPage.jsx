import React from "react";
import PostForm from "../components/PostForm";

const EditPage = () => {
  return (
    <PostForm
      uiBtnText={"Update Post"}
      uiTitle={"Edit your post here"}
      isEditMode={true}
    />
  );
};

export default EditPage;

import { Link, Navigate, useParams } from "react-router-dom";
import BackIcon from "../icons/BackIcon";
import { useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";

const DetailPage = () => {
  const [post, setPost] = useState([]);
  const params = useParams();

  const [redirect, setRedirect] = useState(false);

  const getPost = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/post/${params.id}`
    );
    const post = await response.json();
    setPost(post);
  };

  useEffect((_) => {
    getPost();
  }, []);

  const postDelete = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_URL}/post-delete/${params.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Something went wrong.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const { title, imageUrl, author, createdAt, _id, content } = post;

  return (
    <>
      {post && (
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h1 className=" text-4xl font-bold">{title}</h1>
              <p className="text-sm my-2 font-medium text-gray-500">
                {author ? author.username : ""} |{" "}
                <span>
                  {createdAt
                    ? formatISO9075(new Date(createdAt), {
                        representation: "date",
                      })
                    : ""}
                </span>
              </p>
            </div>
            <Link to={"/"}>
              <BackIcon />
            </Link>
          </div>
          <img src={imageUrl} alt={title} className="w-full" />
          <div
            className="font-medium text-gray-700 my-3"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="flex items-center gap-2 justify-end mb-20">
            <Link
              to={`/post-edit/${_id}`}
              className="px-3 py-1 text-lg border-2 border-black bg-black text-white"
            >
              Edit
            </Link>
            <p
              className="px-3 py-1 text-lg border-2 border-black bg-black text-white"
              onClick={postDelete}
            >
              Delete
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default DetailPage;

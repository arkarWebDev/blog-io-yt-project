import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";

const PostItem = ({ post }) => {
  const { title, imageUrl, author, createdAt, _id } = post;

  return (
    <div className="mb-4">
      <Link to={`/post/${_id}`}>
        <h2 className=" text-3xl font-medium">{title.toUpperCase()}</h2>
        <p className="text-sm my-2 font-medium text-gray-500">
          {author.username} |{" "}
          <span>
            {formatISO9075(new Date(createdAt), { representation: "date" })}
          </span>
        </p>
        <img src={imageUrl} alt={title} className=" h-64 w-full object-cover" />
        <hr className="my-10" />
      </Link>
    </div>
  );
};

export default PostItem;

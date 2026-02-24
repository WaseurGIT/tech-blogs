const BlogCard = ({ blog }) => {
  return (
    <div className="relative w-full h-70 rounded-lg overflow-hidden">
      <div className="border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <span className="ml-3 text-sm text-white bg-blue-500 px-3 py-2 rounded-2xl mt-2 absolute">
          {blog.category}
        </span>
        <img
          src={blog.image_one}
          alt={blog.title}
          className="w-full h-70 object-cover rounded-md"
        />
      </div>
      <h2 className="font-semibold text-lg absolute bottom-3 left-3 text-white">
        {blog.title}
      </h2>
    </div>
  );
};

export default BlogCard;

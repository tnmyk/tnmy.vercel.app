const Posts = () => {
  return (
    <div className="flex gap-x-4">
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Posts;

const PostCard = () => {
  return (
    <div style={{width:'11.3rem',height:'11.3rem'}} className=" rounded-md flex items-center justify-center p-6 bg-pink-300 text-lg leading-5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </div>
  );
};

import Link from "next/link";

const Posts = ({ posts }: { posts: Array<{ [key: string]: any }> }) => {
  return (
    <div className="flex gap-x-4">
      {posts.map((post, index) => {
        return <PostCard key={index} post={post} />;
      })}
    </div>
  );
};

export default Posts;

const PostCard = ({ post }: { post: { [key: string]: any } }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div
        style={{ width: "11.3rem", height: "11.3rem" }}
        className=" rounded-md flex items-center justify-center p-6 bg-pink-300 text-lg leading-5"
      >
        {post.properties.Name.title[0].plain_text}
      </div>
    </Link>
  );
};

import Link from "next/link";

const Posts = ({ posts }: { posts: Array<{ [key: string]: any }> }) => {
  return (
    <div className="flex flex-wrap gap-x-4">
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
        style={{
          width: "11.3rem",
          height: "11.3rem",
          backgroundColor: post.properties.BgColor?.rich_text[0]?.plain_text,
          color: post.properties.Color?.rich_text[0]?.plain_text,
        }}
        className="cursor-pointer rounded-md flex items-center justify-center p-6 bg-pink-300 text-lg leading-5"
      >
        {post.properties.Name.title[0].plain_text}
      </div>
    </Link>
  );
};

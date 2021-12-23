import Link from "next/link";
import { BsEye } from "react-icons/bs";
import styles from "./Posts.module.css";
const Posts = ({ posts }: { posts: Array<{ [key: string]: any }> }) => {
  return (
    <div
      style={{ maxWidth: "60%" }}
      className="flex justify-center flex-wrap gap-x-4 gap-y-3 "
    >
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
        className={`${styles.post} relative cursor-pointer rounded-md flex items-center justify-center p-6 bg-pink-300 text-lg leading-5`}
      >
        {post.properties.Name.title[0].plain_text}
        <span
          style={{
            position: "absolute",
            right: "1rem",
            bottom: "0.7rem",
            fontSize: "0.9rem",
            display: "flex",
            columnGap: "0.3rem",
            justifyContent: "center",
          }}
        >
          <BsEye style={{ fontSize: "1.1rem" }} />{" "}
          {post.properties.Views.number}
        </span>
        <div />
      </div>
    </Link>
  );
};

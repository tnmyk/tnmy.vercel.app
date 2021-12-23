import { Client } from "@notionhq/client";
import Head from "next/head";
import Posts from "../../components/Home/Posts/Posts";
const PostsPage = ({ posts }: { posts: Array<{ [key: string]: any }> }) => {
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <Posts posts={posts} />
    </>
  );
};
export default PostsPage;

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const postsResponse = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DATABASE_ID!,
    
  });

  return {
    props: {
      posts: postsResponse.results,
    },
    revalidate: 10,
  };
}

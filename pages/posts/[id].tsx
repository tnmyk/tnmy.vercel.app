import { Client } from "@notionhq/client";

const Post = ({ postData }) => {
  return <>{postData}</>;
};

export default Post;

export async function getStaticPaths() {
  //   const paths = getAllPostIds();
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const postsResponse = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DATABASE_ID!,
  });
  const results: any = postsResponse.results;
  const paths = results.map((res: { [key: string]: any }) => {
    return {
      params: {
        id: res.properties.Name.title[0].plain_text.split(" ").join("-"),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = params.id;
    console.log(postData)
  return {
    props: {
      postData,
    },
  };
}

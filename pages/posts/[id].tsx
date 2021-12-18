import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
const Post = ({ postData }: { postData: { [key: string]: any } }) => {
  return (
    <>
      {postData.map((x: any, index: any) => {
        return <div key={index}>{x}</div>;
      })}
    </>
  );
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
        // id: res.properties.Name.title[0].plain_text.split(" ").join("-"),
        id: res.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params!.id;
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });
  const results = response.results;
  const postData = results.map((x: any) => {
    if (x.paragraph.text[0].plain_text) return x.paragraph.text[0].plain_text;
  });
  return {
    props: {
      postData: postData,
    },
  };
};

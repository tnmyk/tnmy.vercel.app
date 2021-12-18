import { Client } from "@notionhq/client";
import { NotionRenderer } from "react-notion-x";
const Post = ({ recordMap }) => {
  return (
    <>
      {/* <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} /> */}
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

export async function getStaticProps({ params }) {
  const pageId = params.id;
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
  return {
    props: {
      recordMap: response,
    },
  };
}

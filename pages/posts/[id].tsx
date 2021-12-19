import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
const Post = ({ postData }: { postData: { [key: string]: any } }) => {
  return (
    <div className="mt-5 flex flex-col gap-y-1 w-1/2">
      {postData.map((x: any, index: any) => {
        const style = {
          fontStyle: x.annotations.italic ? "italic" : "",
          fontWeight: x.annotations.bold ? "800" : "",
          color: x.annotations.color,
        };
        switch (x.type) {
          case "break":
            return <br />;
          case "heading_1":
            return (
              <h1 className="text-5xl" key={index}>
                {x.text}
              </h1>
            );
          case "heading_2":
            return (
              <h1 className="text-3xl" key={index}>
                {x.text}
              </h1>
            );
          case "heading_3":
            return (
              <h1 className="text-xl" key={index}>
                {x.text}
              </h1>
            );
          case "paragraph":
            return (
              <div key={index} style={style}>
                {x.text}
              </div>
            );
        }
      })}
    </div>
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
  const pageId: any = params!.id;
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });
  const results = response.results;
  const postData = results.map((x: any) => {
    const type = x.type;
    if (!x[type].text[0])
      return {
        type: "break",
        annotations: {},
      };
    return {
      type,
      text: x[type].text[0].plain_text,
      annotations: x[type].text[0].annotations,
    };
  });
  return {
    props: {
      postData: postData,
    },
    revalidate: 10,
  };
};

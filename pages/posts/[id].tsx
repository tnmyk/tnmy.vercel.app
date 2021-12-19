import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import Head from "next/head";

const Block = ({
  children,
  annotations,
  type,
}: {
  children: String;
  annotations: { [key: string]: any };
  type: String;
}) => {
  const style = {
    fontStyle: annotations.italic ? "italic" : "",
    fontWeight: annotations.bold ? "800" : "",
    color: annotations.color,
  };
  let className;
  switch (type) {
    case "break":
      return <br />;
    case "heading_1":
      className = "text-3xl";
      break;
    case "heading_2":
      className = "text-2xl";
      break;
    case "heading_3":
      className = "text-xl";
      break;
    case "paragraph":
      break;
  }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

const Post = ({
  postData,
  postProperties,
}: {
  postData: { [key: string]: any };
  postProperties: { [key: string]: any };
}) => {
  return (
    <>
      <Head>
        <title>{postProperties.Name.title[0].plain_text}</title>
      </Head>
      <div className="mt-12 flex flex-col gap-y-1 w-1/2">
        <h1 className="text-5xl">{postProperties.Name.title[0].plain_text}</h1>
        <p className="text-gray-200">
          {new Date(postProperties.Created.created_time).toLocaleDateString(
            "en-EN",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </p>
        <br />
        {postData.map((x: any, index: any) => {
          return (
            <Block key={index} annotations={x.annotations} type={x.type}>
              {x.text}
            </Block>
          );
          //
        })}
      </div>
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
  const pageId: any = params!.id;
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const response = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  });
  const pageResponse = await notion.pages.retrieve({ page_id: pageId });
  console.log(pageResponse.properties);
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
      postProperties: pageResponse.properties,
      postData: postData,
    },
    revalidate: 10,
  };
};

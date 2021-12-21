import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

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
      className = " text-xl sm:text-3xl";
      break;
    case "heading_2":
      className = "text-lg sm:text-2xl";
      break;
    case "heading_3":
      className = "sm:text-xl";
      break;
    case "code":
      className = "font-mono bg-gray-800 rounded p-2";
      return (
        <div className={className} style={style}>
          {children.split("\n").map((exp, index) => {
            return <div key={index}>{exp}</div>;
          })}
        </div>
      );
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
  pageId,
}: {
  postData: { [key: string]: any };
  postProperties: { [key: string]: any };
  pageId: String;
}) => {
  useEffect(() => {
    const update = async () => {
      try {
        await fetch(
          `https://${
            process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL
          }/api/views/${pageId}`,
          {
            method: "POST",
          }
        );
        return null;
      } catch (e) {
        console.log(e);
      }
    };
    update();
  }, []);
  return (
    <>
      <Head>
        <title>{postProperties.Name.title[0].plain_text}</title>
      </Head>
      <div className="mt-6 sm:ml-12 sm:mt-12 flex flex-col gap-y-1 w-10/12  sm:w-3/5 md:w-1/2">
        <h1 className="text-3xl sm:text-5xl">
          {postProperties.Name.title[0].plain_text}
        </h1>
        <p className="text-gray-200 text-xs sm:text-md">
          {new Date(postProperties.Created.created_time).toLocaleDateString(
            "en-EN",
            { year: "numeric", month: "long", day: "numeric" }
          )}
          <span className="ml-6">views: {postProperties.Views.number + 1}</span>
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
  const pageResponse: any = await notion.pages.retrieve({ page_id: pageId });
  let postProperties = pageResponse.properties;

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
      postProperties: postProperties,
      pageId: pageId,
      postData: postData,
    },
    revalidate: 10,
  };
};

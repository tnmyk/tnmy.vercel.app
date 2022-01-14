import { Client } from "@notionhq/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

let listNumber = 0;
const Block = ({ children, block }: { children: String; block: any }) => {
  const { annotations, type, checked } = block;
  const style = {
    fontStyle: annotations.italic ? "italic" : "",
    fontWeight: annotations.bold ? "800" : "",
    color: annotations.color,
    textDecoration: `${annotations.underline ? "underline" : ""} ${
      annotations.strikethrough ? "line-through" : ""
    }`,
  };
  let className;

  switch (type) {
    case "numbered_list_item":
      listNumber++;
      return (
        <div className="ml-1">
          <span className="text-sm">{listNumber / 2}.</span> {children}
        </div>
      );
    default:
      break;
  }

  listNumber = 0;

  switch (type) {
    case "break":
      return <div className="w-full h-1" />;
    case "heading_1":
      className = " text-lg sm:text-2xl";
      break;
    case "heading_2":
      className = "text-md sm:text-xl";
      break;
    case "heading_3":
      className = "sm:text-lg mb-1";
      break;
    case "to_do":
      return (
        <div className={className} style={style}>
          <input type="checkbox" checked={checked} />
          <span
            style={{
              marginLeft: "0.4rem",
              color: checked ? "gray" : "",
              textDecoration: checked ? "line-through" : "",
            }}
          >
            {block.text}
          </span>
        </div>
      );
    case "code":
      className = "font-mono bg-gray-800 rounded p-2 mb-5";
      return (
        <div className={className} style={style}>
          {children.split("\n").map((exp, index) => {
            return <div key={index}>{exp}</div>;
          })}
        </div>
      );
    case "paragraph":
      break;
    case "bulleted_list_item":
      return <div className="ml-1">&#8226; {children}</div>;

    default:
      console.log(block);
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
        <h1 className="text-3xl sm:text-3xl">
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
          if (x.type === "image") {
            return <ImageBlock block={x} />;
          }
          return (
            <Block
              key={index}
              block={x}
              // annotations={x.annotations} type={x.type}
            >
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
    console.log(res.id);
    return {
      params: {
        // id: res.properties.Name.title[0].plain_text.split(" ").join("-"),
        id: res.id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
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
    if (type === "image") {
      return x;
    }
    if (!x[type].text[0])
      return {
        type: "break",
        annotations: {},
      };
    return {
      type,
      text: x[type].text[0].plain_text,
      annotations: x[type].text[0].annotations,
      checked: x[type].checked ? true : false,
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

const ImageBlock = ({ block }: { block: { [key: string]: any } }) => {
  return (
    <>
      <img src={block.image.file.url} width={"50%"} className="mx-auto my-4" />
    </>
  );
};

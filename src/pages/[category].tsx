import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import CategoryPageContainer from "../containers/CategoryPageContainer";

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const { category } = router.query;

  if (!category) return null;

  return (
    <>
      <Head>
        <title>React Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CategoryPageContainer categoryId={category} />
    </>
  );
};

export default CategoryPage;

import HomePage from "../../src/Components/server/HomePage";
import { getDictionary } from "../../src/get-dictionary";
import { HomepageJsonLd } from "../../src/Components/server/HomepageJsonLd";

export default async function Home() {
  const dict = await getDictionary("en");
  return (
    <>
      <HomepageJsonLd lang="en" />
      <HomePage dict={dict} lang="en" />
    </>
  );
}

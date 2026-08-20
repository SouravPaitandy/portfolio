import HomePage from "../../src/Components/server/HomePage";
import { getDictionary } from "../../src/get-dictionary";

export default async function Home() {
  const dict = await getDictionary("en");
  return <HomePage dict={dict} lang="en" />;
}

import Categories from "@/components/Product/Categories";
import Footer from "@/components/UI/Footer";
import HeaderUI from "@/components/UI/HeaderUI";
import HeroUI from "@/components/UI/HeroUI";
import Layout from "@/components/UI/LayoutUI";
import NavigationUI from "@/components/UI/NavigationUI";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Khushi Store</title>
        <meta
          name="description"
          content="Discover the latest fashion trends at our online clothing store! Browse our extensive collection of high-quality clothes, ranging from casual to formal wear, for men, women, and children. Enjoy fast and free shipping on all orders, and take advantage of our hassle-free returns policy. Shop now and upgrade your wardrobe with stylish and affordable clothing!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HeaderUI />
      <Layout>
        <HeroUI />
        <Categories />
      </Layout>
      <NavigationUI />
      <Footer />
    </>
  );
}

export default Home;

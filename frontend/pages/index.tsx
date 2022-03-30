import type { NextPage } from 'next'
import Link from "next/link";
import { GetStaticProps } from 'next';
import { Article } from "../Entities";
import { fetchAPI } from "../utils/api";
import { API_PATHS } from "../constants/urls";
import Image from "next/image";
import { Layout } from "./components/layout";
import styles from '../styles/Home.module.css'

const Home: NextPage = (props: any) => {
  return (
    <Layout title='My travel blog' description='A very cool travel blog' currentPath='/' shareImage=''>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to my blog!
        </h1>

        <p className={styles.description}>
          Check my posts below
        </p>

        <div className={styles.grid}>
          {
            props.articles.map((article: Article) => {
              const image = article.image.url.startsWith("https") ? <Image src={article.image.formats.thumbnail.url} width={article.image.formats.thumbnail.width} height={article.image.formats.thumbnail.height} layout="fixed" /> : <></>
              return <Link href={`/blog/${article.slug}`} key={article.slug}>
                <a className={styles.card}>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  {image}
                </a>
              </Link>
            })
          }
        </div>
      </main>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const articles: Array<Article> = await fetchAPI<Array<Article>>(API_PATHS.articles);
  return {
    props: {
      articles
    }
  }
}

export default Home


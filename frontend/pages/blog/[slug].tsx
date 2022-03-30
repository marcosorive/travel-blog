import type { NextPage } from 'next'
import Head from 'next/head'
import Markdownit from 'markdown-it'
import { GetStaticProps } from 'next';
import { Article } from "../../Entities";
import { fetchAPI } from "../../utils/api";
import { API_PATHS } from "../../constants/urls";
import styles from '../../styles/Home.module.css'
import { Layout } from "../components/layout";

const BlogArticlePage: NextPage = (props: any) => {
    const article: Article = props.article;
    const markdownit = new Markdownit({
        html: true
    });
    const body = markdownit.render(article.content);
    return (
        <Layout title={`${article.title} - My travel blog`} description={article.description} currentPath={article.slug} shareImage={article.image.formats.thumbnail.url}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    {article.title}
                </h1>

                <div className={styles.description} dangerouslySetInnerHTML={{ __html: body }}>

                </div>
            </main>
        </Layout>
    )
}
export const getStaticProps: GetStaticProps = async (context) => {
    const possibleSlugs = context.params?.slug || "";
    const slug: string = Array.isArray(possibleSlugs) ? possibleSlugs[0] : possibleSlugs;
    const path = API_PATHS.articleWithSlug.replace("$slug", slug)
    const article: Article = (await fetchAPI<Array<Article>>(path))[0];
    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const articles = await fetchAPI<Array<Article>>(API_PATHS.articles);
    const paths = articles.map((article: Article) => ({ params: { slug: article.slug } }))
    const finalResult = {
        paths: paths,
        fallback: false
    }
    return finalResult;
};

export default BlogArticlePage

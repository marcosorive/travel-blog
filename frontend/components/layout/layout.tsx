import Head from 'next/head';
import { Footer } from "../footer";

interface LayoutProps {
    title: string
    description: string
    shareImage: string
    currentPath: string
    children?: JSX.Element
}

export function Layout(props: LayoutProps) {
    const { title, description, shareImage, currentPath } = props;
    return <>
        <Head>
            <meta name="description" />
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="UTF-8"></meta>
            <meta lang="es" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://www.blog.com/${currentPath}`} />
            <meta property="og:image" content={shareImage} />
        </Head>
        {props.children}
        <Footer />
    </>
}
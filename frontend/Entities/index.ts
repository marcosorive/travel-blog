export interface ArticleImage {
    url: string
    width: number
    height: number
    formats: {
        thumbnail: {
            url: string
            width: number
            height: number
        }
    }
}


export interface Article {
    title: string
    description: string
    content: string
    slug: string
    category: string
    image: ArticleImage
}
import { useContext, useEffect } from "react";
import { NewsContext } from "../../context/news.context";
import NewsCard from "../news-card/news-card.component";
import axios from "axios";


export default function NewsList() {
	const { news, setNews } = useContext(NewsContext);

	useEffect(() => {
        console.log(import.meta.env.NEWS_API)
        const apiKey = import.meta.env.VITE_NEWS_API as string
		axios
			.get("https://newsapi.org/v2/top-headlines?country=us", {
				headers: { "X-Api-Key": apiKey },
			})
			.then((response) => {
                console.log(response.data)
				setNews(response.data.articles);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<>
		
		<div className="grid lg:grid-cols-5 md;grid-cols-2 gap-3 w-full mt-10 mr-8 mb-4">
			
			{news.map((article: any, index: number) => (
				<NewsCard key={index} {...article} />
			))}
		</div></>
	);
}

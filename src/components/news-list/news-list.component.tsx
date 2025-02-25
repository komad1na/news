import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/news.context";
import NewsCard from "../news-card/news-card.component";
import axios from "axios";
import SkeletonComponent from "../skeleton/skeleton.component";

export default function NewsList() {
	const { news, setNews } = useContext(NewsContext);
	const [loading, setLoading] = useState(true);
	const skeleton = Array.from({ length: 10 }).map((_, index) => <SkeletonComponent key={index} />);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_NEWS_API as string;
		axios
			.get("https://newsapi.org/v2/top-headlines?country=us&pageSize=10", {
				headers: { "X-Api-Key": apiKey },
			})
			.then((response) => {
				console.log(response.data);
				setNews(response.data.articles);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return (
		<>
			<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 w-full mt-10 mr-8 mb-4">
				{loading && skeleton}
				{news.map((article: any, index: number) => (
					<NewsCard key={index} {...article} />
				))}
			</div>
		</>
	);
}

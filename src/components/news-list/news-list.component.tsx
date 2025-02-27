import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/news.context";
import NewsCard from "../news-card/news-card.component";
import axios from "axios";
import SkeletonComponent from "../skeleton/skeleton.component";
interface NewsCardProps {
	title: string;
	description: string;
	author: string;
	content: string;
	publishedAt: string;
	source: {
		id: string;
		name: string;
	};
	url: string;
	urlToImage: string;
}

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
	}, [setNews]);
	return (
		<>
			<div className="grid grid-cols-5 mx-4 col-span-12 gap-3">
				{loading && skeleton}
				{news.map((article: NewsCardProps, index: number) => (
					<NewsCard key={index} {...article} />
				))}
			</div>
		</>
	);
}

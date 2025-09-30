import { useContext, useEffect, useState } from "react";
import { NewsContext } from "../../context/news.context";
import NewsCard from "../news-card/news-card.component";
import axios from "axios";
import SkeletonComponent from "../skeleton/skeleton.component";
import { Empty, Button, Typography } from "antd";
import { FrownOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

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

interface NewsListProps {
	darkMode: boolean;
}

export default function NewsList({}: NewsListProps) {
	const { news, setNews } = useContext(NewsContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const skeleton = Array.from({ length: 10 }).map((_, index) => <SkeletonComponent key={index} />);

	const fetchNews = () => {
		setLoading(true);
		setError(false);
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
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchNews();
	}, [setNews]);

	if (error) {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '400px',
				padding: '40px'
			}}>
				<Empty
					image={<FrownOutlined style={{ fontSize: 80, color: '#8c8c8c' }} />}
					imageStyle={{ height: 80 }}
					description={
						<div>
							<Title level={4} style={{ marginTop: 16, marginBottom: 8 }}>
								Oops! Something went wrong
							</Title>
							<Text type="secondary">
								We couldn't load the news. Please check your connection and try again.
							</Text>
						</div>
					}
				>
					<Button type="primary" icon={<ReloadOutlined />} onClick={fetchNews}>
						Try Again
					</Button>
				</Empty>
			</div>
		);
	}

	if (!loading && news.length === 0) {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '400px',
				padding: '40px'
			}}>
				<Empty
					description={
						<div>
							<Title level={4} style={{ marginTop: 16, marginBottom: 8 }}>
								No News Found
							</Title>
							<Text type="secondary">
								Try searching for something else or browse different categories.
							</Text>
						</div>
					}
				/>
			</div>
		);
	}

	return (
		<div style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
			gap: '20px'
		}}>
			{loading && skeleton}
			{news.map((article: NewsCardProps, index: number) => (
				<NewsCard key={index} {...article} />
			))}
		</div>
	);
}

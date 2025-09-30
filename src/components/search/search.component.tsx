import axios from "axios";
import { useContext, useState } from "react";
import { NewsContext } from "../../context/news.context";
import { Input, Pagination, Button, message, Card, Space, Typography, Divider } from "antd";
import {
	Activity,
	BriefcaseBusiness,
	Cpu,
	Loader2,
	Microscope,
	Newspaper,
	Tv,
	Volleyball,
	Search as SearchIcon
} from "lucide-react";

const { Title } = Typography;

interface SearchProps {
	darkMode: boolean;
}

export default function Search({ darkMode }: SearchProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchTerm, setSearchTerm] = useState("");
	const { setNews } = useContext(NewsContext);
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const apiKey: string = import.meta.env.VITE_NEWS_API as string;
	const categories = [
		{ name: "Business", value: "business", icon: <BriefcaseBusiness size={14} /> },
		{ name: "Entertainment", value: "entertainment", icon: <Tv size={14} /> },
		{ name: "General", value: "general", icon: <Newspaper size={14} /> },
		{ name: "Health", value: "health", icon: <Activity size={14} /> },
		{ name: "Science", value: "science", icon: <Microscope size={14} /> },
		{ name: "Sports", value: "sports", icon: <Volleyball size={14} /> },
		{ name: "Technology", value: "technology", icon: <Cpu size={14} /> },
	];
	const [selectedCategory, setSelectedCategory] = useState<string>("");
	const [pages, setPages] = useState(0);
	const [savedSeacrTerm, setSavedSearchTerm] = useState("");
	const [page, setPage] = useState(1);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setSavedSearchTerm(event.target.value);
	};

	const showNotification = (msg: string, type: 'success' | 'error' | 'info' | 'loading') => {
		if (type === 'loading') {
			messageApi.loading(msg, 0);
		} else {
			messageApi.destroy();
			messageApi[type](msg);
		}
	};

	const onClick = () => {
		if (!searchTerm) {
			showNotification("Please enter a search term", "error");
		} else {
			setLoading(true);
			showNotification("We are loading news for you, please wait", "loading");
			setSelectedCategory("");
			axios
				.get(`https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=30`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					showNotification("We have loaded " + response.data.articles.length + " news for you", "success");
					setPage(1);
					setPages(response.data.totalResults);
					setLoading(false);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				})
				.catch((error) => {
					console.error(error);
					showNotification("Error loading news", "error");
					setLoading(false);
				});
		}
	};

	const handleCategories = (value: string) => {
		setLoading(true);
		showNotification("We are loading " + value + " news for you, please wait", "loading");
		axios
			.get(`https://newsapi.org/v2/top-headlines?category=${value}&pageSize=30`, {
				headers: { "X-Api-Key": apiKey },
			})
			.then((response) => {
				setNews(response.data.articles);
				setSelectedCategory(value);
				setSearchTerm("");
				showNotification("We have loaded " + response.data.articles.length + " news for you", "success");
				setPages(response.data.totalResults);
				setPage(1);
				setLoading(false);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			})
			.catch((error) => {
				console.error(error);
				showNotification("Error loading news", "error");
				setLoading(false);
			});
	};
	const handlePageChange = (page: number) => {
		setLoading(true);
		showNotification("We are loading page " + page + " news for you, please wait", "loading");
		setPage(page);
		if (selectedCategory === "") {
			axios
				.get(`https://newsapi.org/v2/everything?q=${savedSeacrTerm}&pageSize=30&page=${page}`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					showNotification("We have loaded " + response.data.articles.length + " news for you", "success");
					setLoading(false);
					setPages(response.data.totalResults);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				})
				.catch((error) => {
					console.error(error);
					showNotification("Error loading news", "error");
					setLoading(false);
				});
		} else {
			axios
				.get(`https://newsapi.org/v2/top-headlines?category=${selectedCategory}&pageSize=10&page=${page}`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					showNotification("We have loaded " + response.data.articles.length + " news for you", "success");
					setLoading(false);
					setPages(response.data.totalResults);
					window.scrollTo({ top: 0, behavior: 'smooth' });
				})
				.catch((error) => {
					console.error(error);
					showNotification("Error loading news", "error");
					setLoading(false);
				});
		}
	};

	return (
		<div style={{ position: 'sticky', top: 20 }}>
			{contextHolder}
			<Card
				bordered={false}
				style={{
					borderRadius: '8px',
					boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.08)',
					overflow: 'hidden',
					backgroundColor: darkMode ? '#1f1f1f' : '#ffffff'
				}}
			>
				<Space direction="vertical" size={20} style={{ width: '100%' }}>
					{/* Search Section */}
					<div>
						<Title
							level={5}
							style={{
								marginBottom: 12,
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								color: darkMode ? '#ffffff' : undefined
							}}
						>
							<SearchIcon size={18} style={{ color: darkMode ? '#ffffff' : undefined }} />
							Search News
						</Title>
						<Input
							type="text"
							placeholder="Enter keywords..."
							value={searchTerm}
							onChange={handleChange}
							size="large"
							prefix={<SearchIcon size={16} style={{ color: '#8c8c8c' }} />}
							style={{ borderRadius: '8px' }}
							onPressEnter={onClick}
						/>
						<Button
							type="primary"
							onClick={onClick}
							disabled={loading}
							icon={loading ? <Loader2 className="animate-spin" size={16} /> : null}
							block
							size="large"
							style={{
								marginTop: 12,
								borderRadius: '8px',
								height: 44,
								fontWeight: 600
							}}
						>
							{loading ? "Searching..." : "Search"}
						</Button>
					</div>

					<Divider style={{ margin: 0, borderColor: darkMode ? '#434343' : undefined }} />

					{/* Categories Section */}
					<div>
						<Title
							level={5}
							style={{
								marginBottom: 16,
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								color: darkMode ? '#ffffff' : undefined
							}}
						>
							<Newspaper size={18} style={{ color: darkMode ? '#ffffff' : undefined }} />
							Browse Categories
						</Title>
						<Space direction="vertical" size={10} style={{ width: '100%' }}>
							{categories.map((category) => (
								<Button
									key={category.value}
									onClick={() => handleCategories(category.value)}
									disabled={loading}
									type={selectedCategory === category.value ? "primary" : "default"}
									size="large"
									icon={category.icon}
									block
									style={{
										justifyContent: 'flex-start',
										display: 'flex',
										alignItems: 'center',
										height: 44,
										borderRadius: '8px',
										fontWeight: selectedCategory === category.value ? 600 : 500,
										backgroundColor: selectedCategory === category.value ? 'rgb(69, 100, 92)' : (darkMode ? '#141414' : 'transparent'),
										borderColor: selectedCategory === category.value ? 'rgb(69, 100, 92)' : (darkMode ? '#434343' : '#d9d9d9'),
										color: selectedCategory === category.value ? '#fff' : (darkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.88)')
									}}
								>
									{category.name}
								</Button>
							))}
						</Space>
					</div>

					{/* Pagination */}
					{pages > 0 && (
						<>
							<Divider style={{ margin: 0 }} />
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Pagination
									size="small"
									total={pages}
									pageSize={10}
									onChange={handlePageChange}
									current={page}
									showSizeChanger={false}
								/>
							</div>
						</>
					)}
				</Space>
			</Card>
		</div>
	);
}

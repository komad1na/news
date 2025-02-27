import axios from "axios";
import { useContext, useState } from "react";
import { NewsContext } from "../../context/news.context";
import { Input, Pagination } from "@mantine/core";
import { Button } from "@mantine/core";
import {
	Activity,
	BriefcaseBusiness,
	Cpu,
	Loader2,
	Microscope,
	Newspaper,
	SearchCheck,
	Tv,
	Volleyball,
	X,
} from "lucide-react";
import { notifications } from "@mantine/notifications";

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const { setNews } = useContext(NewsContext);
	const [loading, setLoading] = useState(false);
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

	const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setSearchTerm(event.target.value);
		setSavedSearchTerm(event.target.value);
	};

	const onClick = () => {
		if (!searchTerm) {
			notifications.show({
				title: "Error",
				message: "Please enter a search term",
				autoClose: 2000,
				color: "red",
				icon: <X />,
			});
		} else {
			setLoading(true);
			notifications.show({
				title: "Loading news",
				message: "We are loading news for you, please wait",
				autoClose: 2000,
				loading: true,
				icon: <Loader2 className="animate-spin" />,
			});
			setSelectedCategory("");
			axios
				.get(`https://newsapi.org/v2/everything?q=${searchTerm}&pageSize=10`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					notifications.clean();
					notifications.show({
						title: "Loaded news",
						message: "We have loaded " + response.data.articles.length + " news for you",
						autoClose: 2000,
						loading: false,
						icon: <SearchCheck />,
						color: "green",
					});
					setPage(1);
					setPages(response.data.totalResults);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	const handleCategories = (value: string) => {
		setLoading(true);
		notifications.show({
			title: "Loading " + value + " news",
			message: "We are loading " + value + " news for you, please wait",
			autoClose: 2000,
			loading: true,
			icon: <Loader2 className="animate-spin" />,
		});
		axios
			.get(`https://newsapi.org/v2/top-headlines?category=${value}&pageSize=10`, {
				headers: { "X-Api-Key": apiKey },
			})
			.then((response) => {
				setNews(response.data.articles);
				setSelectedCategory(value);
				setSearchTerm("");
				notifications.clean();
				notifications.show({
					title: "Loaded " + value + " news",
					message: "We have loaded " + response.data.articles.length + " news for you",
					autoClose: 2000,
					loading: false,
					icon: <SearchCheck />,
					color: "green",
				});
				setPages(response.data.totalResults);
				setPage(1);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handlePageChange = (page: number) => {
		setLoading(true);
		notifications.show({
			title: "Loading page " + page + " news",
			message: "We are loading page " + page + " news for you, please wait",
			autoClose: 2000,
			loading: true,
			icon: <Loader2 className="animate-spin" />,
		});
		setPage(page);
		if (selectedCategory === "") {
			axios
				.get(`https://newsapi.org/v2/everything?q=${savedSeacrTerm}&pageSize=10&page=${page}`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					notifications.clean();
					notifications.show({
						title: "Loaded page " + page + " news",
						message: "We have loaded " + response.data.articles.length + " news for you",
						autoClose: 2000,
						loading: false,
						icon: <SearchCheck />,
						color: "green",
					});
					setLoading(false);
					setPages(response.data.totalResults);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			axios
				.get(`https://newsapi.org/v2/top-headlines?category=${selectedCategory}&pageSize=10&page=${page}`, {
					headers: { "X-Api-Key": apiKey },
				})
				.then((response) => {
					setNews(response.data.articles);
					setSearchTerm("");
					notifications.clean();
					notifications.show({
						title: "Loaded page " + page + " news",
						message: "We have loaded " + response.data.articles.length + " news for you",
						autoClose: 2000,
						loading: false,
						icon: <SearchCheck />,
						color: "green",
					});
					setLoading(false);
					setPages(response.data.totalResults);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div className="flex flex-col gap-2 mx-3 col-span-3">
			<h2 className="text-lg font-semibold">Search term</h2>
			<Input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleChange}
				className="rounded text-black"
				w="100%"
			/>

			<Button onClick={onClick} disabled={loading} color="rgba(63, 102, 92, 1)" className="rounded dark:bg-accent">
				{loading ? (
					<>
						<Loader2 className="animate-spin" />
						Please wait
					</>
				) : (
					"Search"
				)}
			</Button>

			<h2 className="text-lg font-semibold mt-2">Categories</h2>

			{categories.map((category) => (
				<Button
					key={category.value}
					onClick={() => handleCategories(category.value)}
					disabled={loading || selectedCategory === category.value}
					color={selectedCategory === category.value ? "red" : "rgba(63, 102, 92, 1)"}
					size="compact-md"
					leftSection={category.icon}
					
					className="text-white"
					justify="start"
				>
					{category.name}
				</Button>
			))}
			<Pagination
				size="sm"
				w="100%"
				siblings={1}
				total={Math.ceil(pages / 10)}
				onChange={(page) => handlePageChange(page)}
				value={page}
				color="rgba(63, 102, 92, 1)"
			/>
		</div>
	);
}

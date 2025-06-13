import axios from "axios";
import { useContext, useState } from "react";
import { NewsContext } from "../../context/news.context";
import { TextField, Pagination, Button, Snackbar, Alert } from "@mui/material";
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

export default function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const { setNews } = useContext(NewsContext);
	const [loading, setLoading] = useState(false);
	const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info'; loading?: boolean }>({
		open: false,
		message: '',
		severity: 'info'
	});
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

	const showNotification = (message: string, severity: 'success' | 'error' | 'info', loading?: boolean) => {
		setNotification({ open: true, message, severity, loading });
	};

	const handleCloseNotification = () => {
		setNotification(prev => ({ ...prev, open: false }));
	};

	const onClick = () => {
		if (!searchTerm) {
			showNotification("Please enter a search term", "error");
		} else {
			setLoading(true);
			showNotification("We are loading news for you, please wait", "info", true);
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
		showNotification("We are loading " + value + " news for you, please wait", "info", true);
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
			})
			.catch((error) => {
				console.error(error);
				showNotification("Error loading news", "error");
				setLoading(false);
			});
	};

	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setLoading(true);
		showNotification("We are loading page " + page + " news for you, please wait", "info", true);
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
				})
				.catch((error) => {
					console.error(error);
					showNotification("Error loading news", "error");
					setLoading(false);
				});
		}
	};

	return (
		<div className="flex flex-col gap-2 mx-3 col-span-3">
			<h2 className="text-lg font-semibold">Search term</h2>
			<TextField
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={handleChange}
				variant="outlined"
				fullWidth
				size="small"
			/>

			<Button
				variant="contained"
				onClick={onClick}
				disabled={loading}
				color="primary"
				startIcon={loading ? <Loader2 className="animate-spin" /> : null}
			>
				{loading ? "Please wait" : "Search"}
			</Button>

			<h2 className="text-lg font-semibold mt-2">Categories</h2>

			{categories.map((category) => (
				<Button
					key={category.value}
					onClick={() => handleCategories(category.value)}
					disabled={loading || selectedCategory === category.value}
					variant="contained"
					color={selectedCategory === category.value ? "error" : "primary"}
					size="small"
					startIcon={category.icon}
					fullWidth
					sx={{ justifyContent: 'flex-start' }}
				>
					{category.name}
				</Button>
			))}
			<Pagination
				size="small"
				count={Math.ceil(pages / 10)}
				onChange={handlePageChange}
				page={page}
				color="primary"
				sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}
			/>

			<Snackbar
				open={notification.open}
				autoHideDuration={2000}
				onClose={handleCloseNotification}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert
					onClose={handleCloseNotification}
					severity={notification.severity}
					sx={{ width: '100%' }}
				>
					{notification.loading ? (
						<div className="flex items-center gap-2">
							<Loader2 className="animate-spin" />
							{notification.message}
						</div>
					) : (
						notification.message
					)}
				</Alert>
			</Snackbar>
		</div>
	);
}

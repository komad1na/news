import "./App.css";
import Header from "./components/header/header.component";
import NewsList from "./components/news-list/news-list.component";
import Search from "./components/search/search.component";
import { NewsProvider } from "./context/news.context";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

function App() {
	return (
		<>
			<MantineProvider>
				<NewsProvider>
					<Header />
					<div className="grid grid-cols-15 col-span-3 my-4">
						<Search />
						<NewsList />
						
						
					</div>
				</NewsProvider>
				<Notifications position="top-right"/>
			</MantineProvider>
			
		</>
	);
}

export default App;

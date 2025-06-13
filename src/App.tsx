import "./App.css";
import Header from "./components/header/header.component";
import NewsList from "./components/news-list/news-list.component";
import Search from "./components/search/search.component";
import { NewsProvider } from "./context/news.context";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(69, 100, 92)',
		},
	},
});

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<NewsProvider>
					<Header />
					<div className="grid grid-cols-15 col-span-3 my-4">
						<Search />
						<NewsList />
					</div>
				</NewsProvider>
			</ThemeProvider>
		</>
	);
}

export default App;

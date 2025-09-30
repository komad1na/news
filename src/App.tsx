import "./App.css";
import Header from "./components/header/header.component";
import NewsList from "./components/news-list/news-list.component";
import Search from "./components/search/search.component";
import { NewsProvider } from "./context/news.context";
import { ConfigProvider, Layout } from 'antd';
import { useState } from 'react';

const { Content } = Layout;

function App() {
	const [darkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: 'rgb(69, 100, 92)',
						borderRadius: 8,
						colorBgBase: darkMode ? '#141414' : '#ffffff',
						colorTextBase: darkMode ? '#ffffff' : '#000000',
					},
					algorithm: darkMode ? undefined : undefined,
				}}
			>
				<Layout style={{
					minHeight: '100vh',
					background: darkMode ? '#0a0a0a' : '#f5f7fa',
					transition: 'background 0.3s ease'
				}}>
					<NewsProvider>
						<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
						<Content style={{ padding: '24px 16px' }}>
							<div style={{
								maxWidth: '1400px',
								margin: '0 auto',
								display: 'grid',
								gridTemplateColumns: '1fr',
								gap: '24px',
								alignItems: 'start'
							}}
							className="app-container"
							>
								<Search darkMode={darkMode} />
								<NewsList darkMode={darkMode} />
							</div>
						</Content>
					</NewsProvider>
				</Layout>
			</ConfigProvider>
		</>
	);
}

export default App;

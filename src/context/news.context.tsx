import { createContext, useState } from "react";
import { ReactNode } from "react";
interface iNews {
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
interface NewsProviderProps {
	children: ReactNode;
};

export const NewsContext = createContext<{ news: iNews[]; setNews: React.Dispatch<React.SetStateAction<iNews[]>> }>({
	news: [],
	setNews: () => {},
});

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
	const [news, setNews] = useState<iNews[]>([]);

	return <NewsContext.Provider value={{ news, setNews }}>{children}</NewsContext.Provider>;
};

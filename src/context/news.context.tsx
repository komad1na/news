import { createContext, useState } from "react";
import { ReactNode } from "react";

interface NewsProviderProps {
	children: ReactNode;
};

export const NewsContext = createContext<{ news: any[]; setNews: React.Dispatch<React.SetStateAction<any[]>> }>({
	news: [],
	setNews: () => {},
});

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
	const [news, setNews] = useState<any[]>([]);

	return <NewsContext.Provider value={{ news, setNews }}>{children}</NewsContext.Provider>;
};

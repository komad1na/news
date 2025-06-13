import { ExternalLink } from "lucide-react";
import { Card, CardMedia, CardContent, Typography, Box, Chip, Link } from "@mui/material";

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

export default function NewsCard(props: NewsCardProps) {
	const { title, description, author, content, publishedAt, source, url, urlToImage } = props;
	const cleanedContent = content?.replace(/\[\+\d+ chars\]/, "");

	return (
		<Card sx={{ maxWidth: 345, borderRadius: '8px', boxShadow: 2, p: 0, overflow: 'visible' }}>
			<Box sx={{ position: 'relative' }}>
				<CardMedia
					component="img"
					height="180"
					image={urlToImage ? urlToImage : "https://placehold.co/800?text=No image&font=roboto"}
					alt={title}
					sx={{ 
						borderTopLeftRadius: '8px', 
						borderTopRightRadius: '8px', 
						objectFit: 'cover',
						height: '180px',
						width: '100%'
					}}
				/>
				<Chip
					label="NEWS"
					color="primary"
					size="small"
					sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 400, fontSize: 9, letterSpacing: 1, borderRadius: '4px', padding: 0, height: '20px' }}
				/>
			</Box>
			<Box sx={{ px: 2, pt: 1, pb: 0, textAlign: 'left' }}>
				<Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: 0.5, px: 0, textAlign: 'left' }}>
					{new Date(publishedAt).toLocaleDateString("de-DE")} / BY {author || source.name}
				</Typography>
				<Typography 
					variant="h6" 
					sx={{ 
						fontWeight: 700, 
						color: '#222', 
						mt: 1, 
						mb: 1, 
						lineHeight: 1.2,
						height: '72px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						textAlign: 'left'
					}}
				>
					{title}
				</Typography>
				<Typography 
					variant="body2" 
					color="text.secondary" 
					sx={{ 
						mb: 2, 
						height: '82px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 4,
						WebkitBoxOrient: 'vertical',
						textAlign: 'left'
					}}
				>
					{description || cleanedContent}
				</Typography>
			</Box>
			<Box sx={{ px: 2, pb: 2, pt: 0, display: 'flex', justifyContent: 'flex-start' }}>
				<Link
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					underline="none"
					sx={{
						color: '#1976d2', position: 'relative', bottom: 0, left: 0,
						fontWeight: 500,
						display: 'inline-flex',
						alignItems: 'center',
						fontSize: 15,
						'&:hover': {
							color: '#1976d2',
							textDecoration: 'underline'
						}
					}}
				>
					Read more <ExternalLink size={16} style={{ marginLeft: 4 }} />
				</Link>
			</Box>
		</Card>
	);
}

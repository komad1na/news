import { ExternalLink } from "lucide-react";
import { Card, Image, Text, Badge, Button, Title } from "@mantine/core";

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
	const {
		title,
		author,
		content,
		publishedAt,
		source: { name },
		url,
		urlToImage,
	} = props;

	const cleanedContent = content?.replace(/\[\+\d+ chars\]/, "");
	return (
		<Card shadow="md" padding="lg" radius="md" withBorder>
			<Card.Section>
				<Image
					src={urlToImage ? urlToImage : "https://placehold.co/800?text=No image&font=roboto"}
					alt={title}
					fit="cover"
					h={200}
					className="mb-3"
				/>
				<Badge
					color="red"
					styles={{
						root: { position: "absolute", top: "10px", right: "10px" },
					}}
					radius="md"
					autoContrast
				>
					{new Date(publishedAt).toLocaleDateString("de-DE")}
				</Badge>
				<Title order={4} h={75} lineClamp={3} styles={{ root: { marginBottom: "8px", paddingInline: "8px" } }}>
					{title}
				</Title>
			</Card.Section>

			<Card.Section className="px-4 py-1">
				<Text size="md" h={130} lineClamp={2}>
					{cleanedContent}
				</Text>
			</Card.Section>
			<Card.Section className="flex justify-between items-center">
				<div className="flex flex-row gap-2 justify-between px-4 py-2 items-center">
					<Text size="xs" c="dimmed">
						{name}
					</Text>

					<Text size="xs" c="dimmed">
						{author}
					</Text>
				</div>
				<Button leftSection={<ExternalLink size={14} />} size="compact-md" className="my-2 mb-4" color="blue">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
						className="text-white flex flex-row gap-2 items-center"
					>
						Read more
					</a>
				</Button>
			</Card.Section>
		</Card>
	);
}

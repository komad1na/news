import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import {  Image, Text, Badge, Title } from "@mantine/core";
import { ExternalLink, Eye } from "lucide-react";

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

export default function Demo(props: NewsCardProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const {
		title,
		author,
		content,
        url,
		description,
		publishedAt,
		source: { name },
		urlToImage,
	} = props;
	const cleanedContent = content?.replace(/\[\+\d+ chars\]/, "");

	return (
		<>
			<Drawer opened={opened} onClose={close} title="Preview" h={400} position="left" className="absolute left-0">
				<Image
					src={urlToImage ? urlToImage : "https://placehold.co/800?text=No image&font=roboto"}
					alt={title}
					fit="cover"
					h={200}
					className="mb-3 mx-0"
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

				<div className="flex flex-col gap-2">
					<Title order={4} styles={{ root: { marginBottom: "8px" } }}>
						{title}
					</Title>
					<Text size="md">{description}</Text>

					<Text size="md">{cleanedContent}</Text>
				</div>

				<div className="flex flex-row gap-2 justify-between px-4 py-6 items-center">
					<Text size="xs" c="dimmed">
						{name}
					</Text>

					<Text size="xs" c="dimmed">
						{author}
					</Text>
					<Text size="xs" c="dimmed">
						{new Date(publishedAt).toLocaleDateString("de-DE")}
					</Text>
				</div>
                <Button leftSection={<ExternalLink size={14} />} size="compact-lg" fullWidth color="rgba(63, 102, 92, 1)">
					<a
						href={url}
						target="_blank"
						rel="noreferrer"
						className="text-white flex flex-row gap-2 items-center"
					>
						Read more
					</a>
				</Button>
			</Drawer>

			<Button
				leftSection={<Eye size={14} />}
				size="compact-md"
				className="my-2 mb-4"
				color="rgba(63, 102, 92, 1)"
				onClick={open}
			>
				Preview
			</Button>
		</>
	);
}

import { ExternalLink, Calendar, User, Share2, Copy, Check } from "lucide-react";
import { Card, Tag, Typography, Space, Button, message, Dropdown } from "antd";
import { useRef, useState } from "react";
import { animate } from "animejs";

const { Paragraph, Text, Title } = Typography;

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
	const cardRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const tagRef = useRef<HTMLDivElement>(null);
	const shareButtonRef = useRef<HTMLDivElement>(null);
	const [copied, setCopied] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			messageApi.success('Link copied to clipboard!');
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			messageApi.error('Failed to copy link');
		}
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					text: description,
					url: url,
				});
			} catch (err) {
				console.log('Error sharing:', err);
			}
		} else {
			handleCopyLink();
		}
	};

	const shareMenuItems = [
		{
			key: 'copy',
			icon: copied ? <Check size={16} /> : <Copy size={16} />,
			label: copied ? 'Copied!' : 'Copy Link',
			onClick: handleCopyLink,
		},
		{
			key: 'share',
			icon: <Share2 size={16} />,
			label: 'Share',
			onClick: handleShare,
		},
	];

	const handleMouseEnter = () => {
		if (!cardRef.current || !imageRef.current || !tagRef.current) return;

		// Card lift and shadow animation
		animate(cardRef.current, {
			translateY: -8,
			boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
			duration: 400,
			ease: 'out(3)'
		});

		// Image zoom animation
		animate(imageRef.current, {
			scale: 1.08,
			duration: 600,
			ease: 'out(2)'
		});

		// Tag slide animation
		animate(tagRef.current, {
			translateX: -4,
			translateY: -4,
			duration: 300,
			ease: 'out(2)'
		});
	};

	const handleMouseLeave = () => {
		if (!cardRef.current || !imageRef.current || !tagRef.current) return;

		// Reset card animation
		animate(cardRef.current, {
			translateY: 0,
			boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
			duration: 400,
			ease: 'out(3)'
		});

		// Reset image animation
		animate(imageRef.current, {
			scale: 1,
			duration: 600,
			ease: 'out(2)'
		});

		// Reset tag animation
		animate(tagRef.current, {
			translateX: 0,
			translateY: 0,
			duration: 300,
			ease: 'out(2)'
		});
	};

	const handleLinkMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.currentTarget.style.backgroundColor = 'rgb(69, 100, 92)';
		e.currentTarget.style.color = '#ffffff';
	};

	const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.currentTarget.style.backgroundColor = 'transparent';
		e.currentTarget.style.color = 'rgb(69, 100, 92)';
	};

	const handleShareClick = () => {
		if (!shareButtonRef.current) return;

		animate(shareButtonRef.current, {
			scale: [1, 1.2, 0.95, 1.05, 1],
			duration: 500,
			ease: 'out(2)'
		});
	};

	return (
		<div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Card
				bordered={false}
				style={{
					borderRadius: '8px',
					overflow: 'hidden',
					boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					cursor: 'pointer',
					backgroundColor: 'inherit'
				}}
				styles={{
					body: { padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }
				}}
				cover={
					<div style={{ position: 'relative', height: '220px' }}>
						<div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
							<img
								ref={imageRef}
								alt={title}
								src={urlToImage || "https://placehold.co/800x450/e8f5e9/45645c?text=No+Image"}
								style={{
									height: '100%',
									width: '100%',
									objectFit: 'cover'
								}}
							/>
							<div style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)'
							}} />
						</div>
						<div ref={tagRef} style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}>
							<Tag
								color="rgba(69, 100, 92, 0.95)"
								style={{
									fontWeight: 600,
									fontSize: 10,
									letterSpacing: 1.5,
									borderRadius: '4px',
									padding: '4px 12px',
									border: 'none',
									backdropFilter: 'blur(8px)'
								}}
							>
								{source.name.toUpperCase()}
							</Tag>
						</div>
					</div>
				}
			>
			<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 12 }}>
					<Space size={4} style={{ whiteSpace: 'nowrap' }}>
						<Calendar size={14} style={{ color: '#8c8c8c', flexShrink: 0 }} />
						<Text type="secondary" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
							{new Date(publishedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
						</Text>
					</Space>
					<Space size={4} style={{ width: '100%', overflow: 'hidden' }}>
						<User size={14} style={{ color: '#8c8c8c', flexShrink: 0 }} />
						<Text
							type="secondary"
							style={{
								fontSize: '13px',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								flex: 1
							}}
						>
							{author || source.name}
						</Text>
					</Space>
				</div>

				<Title
					level={4}
					style={{
						fontWeight: 600,
						marginTop: 0,
						marginBottom: 12,
						lineHeight: 1.4,
						minHeight: '64px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
					}}
				>
					{title}
				</Title>

				<Paragraph
					type="secondary"
					style={{
						marginBottom: 16,
						fontSize: '14px',
						lineHeight: 1.6,
						minHeight: '84px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: '-webkit-box',
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						flex: 1
					}}
				>
					{description || cleanedContent}
				</Paragraph>

				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							color: 'rgb(69, 100, 92)',
							fontWeight: 600,
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 14,
							textDecoration: 'none',
							gap: '6px',
							flex: 1,
							border: '1px solid rgb(69, 100, 92)',
							padding: '8px 16px',
							borderRadius: '8px',
							transition: 'all 0.3s ease',
							height: '40px',
							backgroundColor: 'transparent'
						}}
						onMouseEnter={handleLinkMouseEnter}
						onMouseLeave={handleLinkMouseLeave}
					>
						Read Full Article <ExternalLink size={16} />
					</a>
					<div ref={shareButtonRef}>
						<Dropdown
							menu={{ items: shareMenuItems }}
							trigger={['click']}
							placement="bottomRight"
							onOpenChange={(open) => {
								if (open) handleShareClick();
							}}
						>
							<Button
								type="default"
								icon={<Share2 size={16} />}
								style={{
									padding: '8px',
									height: '40px',
									width: '40px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderColor: 'rgb(69, 100, 92)',
									color: 'rgb(69, 100, 92)'
								}}
							/>
						</Dropdown>
					</div>
				</div>
			</div>
		</Card>
			{contextHolder}
		</div>
	);
}

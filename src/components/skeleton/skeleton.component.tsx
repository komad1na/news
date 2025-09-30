import { Card, Skeleton } from "antd";

export default function SkeletonComponent() {
	return (
		<Card style={{ borderRadius: '8px' }}>
			<Skeleton.Image active style={{ width: '100%', height: 180 }} />
			<Skeleton active paragraph={{ rows: 4 }} />
		</Card>
	);
}

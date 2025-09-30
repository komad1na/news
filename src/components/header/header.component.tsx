import { Layout, Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

interface HeaderProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
    return (
        <AntHeader className="shadow-sm" style={{ backgroundColor: 'rgb(69, 100, 92)', padding: '0 16px' }}>
            <div className="max-w-7xl mx-auto py-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="text-3xl font-medium text-white m-0">
                    News
                </h1>
                <Switch
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    checkedChildren={<BulbFilled />}
                    unCheckedChildren={<BulbOutlined />}
                    style={{ backgroundColor: darkMode ? '#177ddc' : 'rgba(255, 255, 255, 0.3)' }}
                />
            </div>
        </AntHeader>
    );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  path, 
  color 
}) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="slide-up-animation transition-all duration-300 hover:-translate-y-1"
      onClick={() => navigate(path)}
    >
      <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${color} md:mb-0 md:mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
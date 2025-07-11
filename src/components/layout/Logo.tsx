import React from 'react';
import { Briefcase } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="bg-primary-500 text-white p-1 rounded">
        <Briefcase size={24} />
      </span>
      <div className="font-bold text-xl">
        <span className="text-primary-500">Rent</span>
        <span className="text-secondary-600">Matrix</span>
      </div>
    </div>
  );
};

export default Logo;
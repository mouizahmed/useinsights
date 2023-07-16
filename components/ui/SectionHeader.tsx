import react from 'react';


interface SectionHeaderProps {
    stepNumber: number;
    headerTitle: string;
    color: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ stepNumber, headerTitle, color }) => {

    return (
        <div className="flex items-center">
            <div className={`bg-${color}-100 text-${color}-500 font-semi-bold font-mono mr-2 h-6 w-6 rounded-full flex items-center justify-center`}>
                {stepNumber}
            </div>
            <h1 className="text-gray-700">{headerTitle}</h1>
            </div>
    );
}
import react from 'react';

export const Header = () => {
    return (
        <nav className="w-full flex items-center justify-between h-12 px-4 mb-4 border-b border-zinc-200">
         <h1 className="font-inter font-bold sm:text-xl flex items-center">
          Plotify
         </h1>
        </nav>
    );
}
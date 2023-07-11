import {SignIn} from '../SignIn';

export const Header = () => {
    return (
        <nav className="w-full flex items-center justify-between h-12 px-4 border-b border-zinc-200 row-span-3">
         <h1 className="font-inter font-bold sm:text-xl flex items-center">
          Plotify
         </h1>
         <SignIn />
        </nav>
    );
}
import React, {  FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Header } from '../ui/Header';



export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Plotify | Visualize your data</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
        </>

    )

}
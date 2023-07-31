import React, {  FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Header } from '../ui/header';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Insightify</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
            </Head>
            <Header />
            <main>
                {children}
            </main>
           
        </>

    )

}
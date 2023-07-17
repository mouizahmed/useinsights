import React, {  FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Header } from '../ui/header';



export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Insightify</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
        </>

    )

}
import React from 'react'
import Head from 'next/head';
import Home from '../containers/Home';

function Index() {
  return (
    <>
      {/* change name of icon for icon */}
      <Head>
        <link rel="shortcut icon" href="test.jpeg" />
      </Head>
      <Home />
    </>
  )
}

export default Index
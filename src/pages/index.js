import React from 'react'
import TestKomponen from '../containers/screeningDua'
import Head from 'next/head';

function Index() {
  return (
    <>
      {/* change name of icon for icon */}
      <Head>
        <link rel="shortcut icon" href="test.jpeg" />
      </Head>
      <TestKomponen />
    </>
  )
}

export default Index
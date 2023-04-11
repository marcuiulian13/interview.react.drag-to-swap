import React, { useCallback } from 'react';
import Head from "next/head";
import PrintPage from "../components/printPage";
import styled from "styled-components";

const PageHeader = styled.div`
  width: 600px;
  margin: auto;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 42px;
  padding-bottom: 24px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.36px;
    color: #585858;
    margin-bottom: 8px;
  }

  p {
    color: #797979;
    margin: 0;
  }
`;

export default function Testpage() {
  const [data, setData] = React.useState([
    {
      title: "Front Print",
      images: [
        "https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
      ],
    },
    {
      title: "Page 2",
      images: [
        "https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
        "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
      ],
    },
    {
      title: "Page 3",
      images: [
        "https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
        "https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
      ],
    },
  ]);

  const doSwap = useCallback((src: string, dest: string) => {
    if (!src || !dest) return;

    const srcEntryIndex = data.findIndex((entry: any) => entry.images.includes(src));
    const destEntryIndex = data.findIndex((entry: any) => entry.images.includes(dest));

    const srcEntry = data[srcEntryIndex];
    const destEntry = data[destEntryIndex];

    const srcIndex = srcEntry.images.indexOf(src);
    const destIndex = destEntry.images.indexOf(dest);

    if (srcEntry === destEntry) {
      // Swap inside the same page
      const newImages = [...srcEntry.images];
      newImages[srcIndex] = dest;
      newImages[destIndex] = src;

      setData((data) => {
        const newData = [...data];
        newData[srcEntryIndex] = {
          ...srcEntry,
          images: newImages,
        };
        return newData;
      });
    } else {
      // Swap between pages
      const newSrcImages = [...srcEntry.images];
      const newDestImages = [...destEntry.images];

      newSrcImages.splice(srcIndex, 1, dest);
      newDestImages.splice(destIndex, 1, src);

      setData((data) => {
        const newData = [...data];
        newData[srcEntryIndex] = {
          ...srcEntry,
          images: newSrcImages,
        };

        newData[destEntryIndex] = {
          ...destEntry,
          images: newDestImages,
        };

        return newData;
      });
    }
  }, [data]);

  return (
    <div>
      <Head>
        <title>Test Page | Popsa.com</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>Trip to the Beach</h1>
        <p>Hardback Photobook last edited on Thursday 13 April 2022 at 16:28</p>
      </PageHeader>
      <PrintPage data={data} doSwap={doSwap} />
    </div>
  );
}

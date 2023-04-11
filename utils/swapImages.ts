export function swapImages(data: Array<any>, src: string, dest: string) {
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

    const newData = [...data];
    newData[srcEntryIndex] = {
      ...srcEntry,
      images: newImages,
    };
    return newData;
  } 

  // Swap between pages
  const newSrcImages = [...srcEntry.images];
  const newDestImages = [...destEntry.images];

  newSrcImages.splice(srcIndex, 1, dest);
  newDestImages.splice(destIndex, 1, src);

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
}
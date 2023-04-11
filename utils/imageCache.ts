const IMAGE_CACHE = new Map<string, HTMLImageElement>();

function getImageData(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL('image/png');
}

export async function getImageBase64(src: string) {
  return new Promise<string>((resolve, reject) => {
    if (IMAGE_CACHE.has(src)) {
      const image = IMAGE_CACHE.get(src);
      return resolve(getImageData(image));
    } 
    
    const image = new Image();

    image.onload = () => {
      IMAGE_CACHE.set(src, image);
      resolve(getImageData(image));
    };

    image.onerror = reject;
    image.src = src;
  });
}
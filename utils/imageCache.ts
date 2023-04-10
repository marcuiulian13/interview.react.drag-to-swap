const IMAGE_CACHE = new Map<string, HTMLImageElement>();

export async function getImageBase64(src: string) {
  return new Promise<string>((resolve, reject) => {
    if (IMAGE_CACHE.has(src)) {
      const image = IMAGE_CACHE.get(src);

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    } else {
      const image = new Image();

      image.onload = () => {
        IMAGE_CACHE.set(src, image);

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      image.onerror = reject;
      image.src = src;
    }
  });
}
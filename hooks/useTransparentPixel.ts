import { useEffect, useState } from "react";

export function useTransparentPixel() {
  const [transparentPixel, setTransparentPixel] = useState<HTMLImageElement>();
  useEffect(() => {
    const image = new Image(1, 1);
    image.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    setTransparentPixel(image);
  }, []);
  return transparentPixel;
}
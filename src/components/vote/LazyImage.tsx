// src/components/LazyImage.tsx
import React, { useState, useEffect, Suspense } from 'react';

// Use Webpack's `require.context` to load all images from the `assets` folder
const images = (require as any).context('../../assets', false, /\.(png|jpe?g|svg)$/);
// Create a map of images using the filenames as keys
const imageMap: Record<string, string> = images.keys().reduce((acc: { [x: string]: any; }, path: string) => {
    const imageName = path.replace('./', '').replace('_lg.png', '');
    acc[imageName] = images(path);
    return acc;
}, {} as Record<string, string>);   

interface LazyImageProps {
  itemName: string;
  height: number;
  width: number
}

const LazyImage: React.FC<LazyImageProps> = ({ itemName, height, width }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (imageMap[itemName]) {
      setImageSrc(imageMap[itemName]);
    } else {
      console.error(`Image not found for item: ${itemName}`);
      setImageSrc(null);
    }
  }, [itemName]);

  return (
    <Suspense fallback={<div>Loading image...</div>}>
      {imageSrc ? <img width={width} height={height} src={imageSrc} alt={`Image of ${itemName}`} className='inline'/> : <div>Image not available</div>}
    </Suspense>
  );
};

export default LazyImage;

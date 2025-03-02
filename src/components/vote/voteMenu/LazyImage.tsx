// src/components/LazyImage.tsx
import React, { useState, useEffect, Suspense } from 'react';

// Use Webpack's `require.context` to load all images from the `assets` folder
const images = (require as any).context('../../../assets', false, /\.(png|jpe?g|svg)$/);
// Create a map of images using the filenames as keys
const imageMap: Record<string, string> = images.keys().reduce((acc: { [x: string]: any; }, path: string) => {
    const imageName = path.replace('./', '').replace(/(_lg)?\.png$/, '');
    console.log(path)
    acc[imageName] = images(path);
    return acc;
}, {} as Record<string, string>);   

interface LazyImageProps {
    imageName: string;
    height: number;
    width: number
}

const LazyImage: React.FC<LazyImageProps> = ({ imageName, height, width }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        if (imageMap[imageName]) {
            setImageSrc(imageMap[imageName]);
            // setLoading(false);
        } else {
            console.error(`Image not found for: ${imageName}`);
            setImageSrc(null);
        }
    }, [imageName]);
    return (
        <>
        <div className="image-wrapper" style={{ width, height, display: "flex", flexDirection: "column", justifyContent: "center" }}> {/* ✅ Fixed size div */}
            {(imageSrc && !loading) && <div className="placeholder"></div>} {/* ✅ Placeholder while loading */}
            {imageSrc &&
                <img
                    src={imageSrc}
                    width={width}
                    height={height}
                    onLoad={() => setLoading(false)} // ✅ Hide placeholder when loaded
                    className={`image ${loading ? "hidden" : ""}`} // ✅ Hide image initially
                />
            }
        </div>
            {/* {(imageSrc && !loading) ? <img style={{ height: height, width: "auto" }} src={imageSrc} alt={`Image of ${imageName}`} className='inline'/> : <div style={{width: width, height: height}}/>} */}
        </>
    );
};

export default LazyImage;

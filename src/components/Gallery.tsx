import React from 'react';
import Image from 'next/image';

const Gallery: React.FC<{ gallery?: string[] }> = ({ gallery }) => {
    if (!gallery) return null;
    return (
        <div className="flex justify-center w-full xl:w-10/12 xl:max-w-5xl">
            {gallery.map((path) => (
                <div key={path} className="h-64 w-full xl:w-96 p-4 bg-slate-600 rounded-md">
                    <Image
                        src={path}
                        alt={path}
                        height={400}
                        width={600}
                        objectFit="contain"
                    />
                </div>
            ))}
        </div>
    );
}

export default Gallery;

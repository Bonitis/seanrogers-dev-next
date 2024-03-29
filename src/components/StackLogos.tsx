import React from 'react';
import Image from "next/image";

const StackLogos: React.FC<{ logos?: string[], size: number }> = ({ logos, size }) => {
    if (!logos || logos.length < 1) return null;
    return <>
        {logos.map((key: string) => {
            return (
                <div key={key} data-tooltip aria-describedby={key} className="p-1">
                    <Image
                        src={`/assets/logos/${key}-logo.png`}
                        alt={key}
                        height={size}
                        width={size}
                        sizes="100vw"
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }} />
                </div>
            );
        })}
    </>;
}

export default StackLogos;

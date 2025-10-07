'use client';

import Image from "next/image";
import { useState } from "react";

interface NotificationAvatarProps {
    src: string | null | undefined;
    alt: string;
    size?: number;
}

export default function NotificationAvatar({ src, alt, size = 40 }: NotificationAvatarProps) {
    const [imageSrc, setImageSrc] = useState(() => {
        // Return default image if src is invalid
        if (!src || src.trim() === '' || src === 'null' || src === 'undefined') {
            return '/customers/default.png';
        }
        return src;
    });

    const handleError = () => {
        setImageSrc('/customers/default.png');
    };

    return (
        <div className={`relative flex-shrink-0`} style={{ width: size, height: size }}>
            <Image 
                src={imageSrc} 
                width={size} 
                height={size} 
                className="rounded-full object-cover w-full h-full border-2 border-gray-200 dark:border-gray-600" 
                alt={alt}
                onError={handleError}
                unoptimized={imageSrc === '/customers/default.png'}
            />
        </div>
    );
}

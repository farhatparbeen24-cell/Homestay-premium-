'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackClassName?: string;
  fallbackText?: string;
  skipWarmOverlay?: boolean;
}

export function SafeImage({
  src,
  alt,
  className,
  fallbackClassName = '',
  fallbackText,
  skipWarmOverlay = false,
  ...rest
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full min-h-[140px] bg-gradient-to-br from-[#101B2D] to-[#2B2540] flex items-center justify-center p-6 text-center border border-[#C9993F]/20 rounded-2xl ${className || ''} ${fallbackClassName}`}
        role="img"
        aria-label={alt || 'Image preview'}
      >
        <div className="max-w-xs space-y-1">
          <span className="text-xs font-serif tracking-wide text-[#EFEAE2]/90 block">
            {fallbackText || alt || 'Cloudveil Ridge'}
          </span>
          <span className="text-[10px] text-[#C9993F]/75 block font-mono">
            Himalayan Sanctuary
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={className}
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
        {...rest}
      />
      {!skipWarmOverlay && (
        <div
          className="absolute inset-0 bg-[#C9993F]/[0.07] mix-blend-multiply pointer-events-none z-[1]"
          aria-hidden="true"
        />
      )}
    </>
  );
}


import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

export function ProjectImage({
  src,
  alt,
  width,
  height,
  title,
  priority = false,
  className = '',
  imgClassName = '',
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE9E4] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {failed ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center text-[#4A4F57] bg-gradient-to-br from-[#F2F1EE] to-[#E2E2DF]">
          <Layers className="w-6 h-6 text-[#1D4ED8]" />
          <span className="text-xs font-medium">{title || 'K & C Epoxy Flooring Installation'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`w-full h-full object-contain block ${imgClassName}`}
        />
      )}
    </div>
  );
}

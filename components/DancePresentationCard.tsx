import Image from 'next/image';

interface DancePresentationCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  className?: string;
}

export default function DancePresentationCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
  className = ''
}: DancePresentationCardProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <div className={`flex flex-col lg:flex-row gap-8 items-center justify-center ${className} w-full`}>
      {/* Imaginea */}
      <div className={`relative w-full lg:w-1/2 aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] flex-shrink-0 ${
        isImageLeft ? 'lg:order-1' : 'lg:order-2'
      }`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-lg shadow-lg"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>

     
      <div className={`w-full   p-2 lg:w-1/3 space-y-4 ${
        isImageLeft ? 'lg:order-2' : 'lg:order-1'
      }`}>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-center">
          {title}
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
          {description}
        </p>
      </div>
    </div>
  );
}

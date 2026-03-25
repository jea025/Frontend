import Image, { StaticImageData } from "next/image";

interface propsCarrousel {
  img: StaticImageData;
  priority?: boolean;
  width?: number;
  height?: number;
}

export default function ExampleCarouselImage({ img, priority = false, width = 1920, height = 869 }: propsCarrousel) {
  return (
    <div className="w-full h-auto relative overflow-hidden" style={{ width: '100%', height: '100%' }}>
      <Image 
        src={img} 
        alt="image" 
        width={width} 
        height={height}
        priority={priority}
        quality={85}
        placeholder="blur"
        className="w-full h-auto object-cover"
        style={{ 
          width: '100%', 
          height: 'auto', 
          display: 'block',
          objectPosition: 'center 25%'
        }}
      />
    </div>
  );
}

type Props = {
  src: string;
  mobile?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

// 사전 최적화된 webp를 그대로 사용 (Vercel 이미지 최적화 쿼터 미사용)
export default function Picture({ src, mobile, alt, width, height, className, priority }: Props) {
  return (
    <picture>
      {mobile && <source media="(max-width: 767px)" srcSet={mobile} />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        // @ts-expect-error fetchpriority is valid HTML
        fetchpriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export const BloomLogo = () => {
    return (
        <Link href="/" target="_blank" rel="noopener noreferrer">
            <Image
            src="/bloom-logo.png"
            alt="Bloom Alternance"
            width={100}
            height={24}
            priority
            />
        </Link>
    );
}
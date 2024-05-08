import Image from 'next/image';
export const Loader = () => {
    return ( 
        <div className="text-black h-full flex flex-col gap-y-4 items-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    fill
                    src="/logo.svg"
                />
            </div>
            <p className='text-black text-sm text-muted-foreground'>
                Genius is thinking...
            </p>
        </div>
     );
}
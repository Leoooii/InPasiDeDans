import { Button } from '@/components/ui/button';
import Link from 'next/link';

const GrupeInFormare = () => {
  return (
    <Link
      href="/grupe-in-formare"
      className="fixed bottom-20 right-8 z-50 group"
    >
      <div className="relative">
        <Button
          size="sm"
          variant={'ghost'}
          className="bg-red-600 text-white hover:bg-red-700 shadow-lg animate-bounce"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
            Grupe noi!
          </span>
        </Button>
      </div>
    </Link>
  );
};
export default GrupeInFormare;

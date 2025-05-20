import {
  WrenchIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Evenimente = () => {
  return (
    <div className="w-full h-screen bg-orange-600 flex flex-col items-center justify-center text-white px-4 text-center">
      <ExclamationTriangleIcon className="h-20 w-20 text-white animate-bounce mb-4" />
      <h1 className="text-4xl font-bold mb-2">Pagină în construcție</h1>
      <p className="text-lg">
        Revenim în curând cu informații despre evenimentele noastre!
      </p>
    </div>
  );
};

export default Evenimente;

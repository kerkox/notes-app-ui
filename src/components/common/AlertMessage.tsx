import React from 'react';

interface AlertMessageProps {
  message: string;
  onClose: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, onClose }) => {
  return (
    <div
      className="fixed right-4 top-4 z-50 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-lg"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="mr-8 block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <svg
          className="h-6 w-6 fill-current text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238A1 1 0 105.652 5.652L8.586 8.586 5.652 11.52a1 1 0 101.414 1.414L10 9.999l2.934 2.935a1 1 0 101.414-1.414l-2.934-2.935 2.934-2.934z" />
        </svg>
      </button>
    </div>
  );
};

export default AlertMessage;

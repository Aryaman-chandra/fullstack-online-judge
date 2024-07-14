import React, {  useState } from 'react';
import { Button } from './button';
interface PopupSearchProps {
  buttonText: React.ReactNode;
  content: React.ReactNode;
}

const PopupSearch: React.FC<PopupSearchProps> =  ({ buttonText, content}) => {      
 const [isOpen, setIsOpen] = useState(false);

  const openPopupSearch = () => setIsOpen(true);
  const closePopupSearch = () =>{
      setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={openPopupSearch}
      >
        {buttonText}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-6  outline outline-2 outline-offset-2 outline-primary rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="mb-4">{content}</div>
            <button
              onClick={closePopupSearch}
              className="bg-primary hover:bg-red-700 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupSearch;

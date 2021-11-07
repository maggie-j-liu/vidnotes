import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useSettings, { colorClasses } from "./SettingsContext";

const SettingsModal = ({ isOpen, setIsOpen }) => {
  const { opacity, setOpacity, color, setColor } = useSettings();
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-gray-900"
                >
                  Settings
                </Dialog.Title>
                <h4 className="mt-3 text-xl font-medium">Overlay Opacity</h4>
                <p>The opacity of the notes overlay.</p>
                <div className="flex items-center justify-between gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={opacity}
                    onChange={(e) => setOpacity(e.target.value)}
                    className="flex-grow"
                  />
                  <span className="w-8">{opacity}%</span>
                </div>
                <h4 className="mt-3 text-xl font-medium">Background Color</h4>
                <p>The background color of the notes overlay.</p>
                <div className="mt-2 flex items-center gap-4">
                  {colorClasses.map((colorClass) => (
                    <button
                      key={colorClass}
                      className={`${
                        colorClass == color ? "ring-gray-900" : "ring-gray-300"
                      } ring-2 rounded-full ${colorClass} w-10 h-10`}
                      onClick={() => setColor(colorClass)}
                    />
                  ))}
                </div>
                <div className="mt-4 w-full flex items-center justify-end">
                  <button
                    type="button"
                    className="text-blue-900 bg-primary bg-opacity-20 hover:bg-opacity-30 duration-150 px-4 py-1 rounded-md"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SettingsModal;

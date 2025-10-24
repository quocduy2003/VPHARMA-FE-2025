
import { FiMinus, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export type AccordionItemData = {
  id?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  buttonClassName?: string;
  defaultOpen?: boolean;    // CSS cho container
  textColor?: string;       // màu chữ cho title
};

export function AccordionItem({
  title,
  description,
  isOpen,
  onClick,
  buttonClassName = "white",
  textColor = "text-ink",     // màu chữ mặc định
}: AccordionItemData & { isOpen: boolean; onClick: () => void }) {
  return (

    <div className="rounded-lg shadow-sm w-full mb-2">
      <button
        className={`flex w-full items-center p-4 justify-between text-left font-semibold ${textColor} ${buttonClassName}`}
        onClick={onClick}
      >
        <span className={`text-sub1 font-bold ${textColor}`}>{title}</span>
        {isOpen ? (
          <FiMinus className="text-white bg-primary rounded text-h6" />
        ) : (
          <FiPlus className="text-white bg-primary rounded text-h6" />
        )}
      </button>
      {isOpen && (
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"
          } p-4 text-sm text-body2 ${textColor}`}>
          {description}
        </div>
      )}
    </div>

  );
}

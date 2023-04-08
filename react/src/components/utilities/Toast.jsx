import { useStateContext } from "../../context/ContextProvider";

export const Toast = () => {
  const { toast } = useStateContext();
  return (
    <>
      {toast.show && (
        <div className="fixed z-50 bottom-4 right-2 w-[300px] py-3 px-4 bg-emerald-500 text-white font-semibold rounded-sm shadow-lg animate-fade-and-drop">
          <small>{toast.message}</small>
        </div>
      )}
    </>
  );
};

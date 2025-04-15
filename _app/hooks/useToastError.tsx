import { RiCloseCircleFill } from "react-icons/ri";
import { useToast } from "./useToast";

const useToastError = () => {
  const { toast } = useToast();

  return (title: string) => {
    toast({
      // @ts-ignore its suppoorted
      title: (
        <div className="flex gap-2 items-center">
          <RiCloseCircleFill className="text-red-500" />
          <span>{title}</span>
        </div>
      ),
    });
  };
};

export default useToastError;

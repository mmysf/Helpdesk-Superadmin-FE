import { RiCheckboxCircleFill } from "react-icons/ri";
import { useToast } from "./useToast";

const useToastSuccess = () => {
  const { toast } = useToast();

  return (title: string) => {
    toast({
      // @ts-ignore its suppoorted
      title: (
        <div className="flex gap-2 items-center">
          <RiCheckboxCircleFill className="text-green-500" />
          <span>{title}</span>
        </div>
      ),
    });
  };
};

export default useToastSuccess;

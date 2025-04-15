/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */

import React from "react";
import { FilesIcon, FolderSearch2Icon, Loader } from "lucide-react";
import { InputBasic } from "../input-basic";

export type FileUpload = {
  id?: string;
  url?: string;
  name?: string;
  size?: number;
};
type UploaderProps = {
  label?: string;
  name?: string;
  hint?: string;
  accept?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessages?: string;
  fullName?: boolean;
  selectedFileName: string;
  isLoading: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputUpload = (props: UploaderProps) => {
  const {
    label,
    name,
    hint,
    accept = "*.png,*.jpg,*.jpeg,*.pdf",
    disabled = false,
    required,
    errorMessages,
    fullName = false,
    selectedFileName,
    isLoading,
    onChange,
  } = props;

  const ref = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (selectedFileName) {
      onResetInputRef();
      console.log(selectedFileName);
    }
  }, [selectedFileName]);

  const onResetInputRef = () => {
    if (ref.current) {
      ref.current.value = "";
      ref.current.onreset = null;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <span
        className={`text-sm font-medium ${errorMessages ? "text-red-500" : "text-black"}`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <div
        role="button"
        tabIndex={0}
        onClick={() => ref.current?.click()}
        className={`flex justify-between cursor-pointer items-center w-full gap-4 p-2 border rounded-md ${disabled ? "bg-gray-300" : ""}`}
      >
        <div className="flex items-center">
          <label>
            <div className="inline-block px-2 rounded-full ">
              {isLoading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <FilesIcon className="w-5 h-5 mt-1 " />
              )}
            </div>
            <InputBasic
              ref={ref}
              type="file"
              disabled={disabled}
              accept={accept}
              id="input-file"
              onChange={onChange}
              name={name}
              className="hidden"
            />
          </label>
          <p
            className={
              fullName ? "text-xs w-full" : "text-xs truncate max-w-40"
            }
          >
            {isLoading
              ? "Uploading File..."
              : selectedFileName || "No file chosen"}
          </p>
        </div>
        <div className="inline-block px-2 rounded-full ">
          <FolderSearch2Icon className="w-5 h-5 " />
        </div>
      </div>
      {errorMessages && (
        <p className="text-xs italic font-medium text-red-500">
          {errorMessages}
        </p>
      )}
      {hint && (
        <p className="text-gray-400 font-[400] text-xs">File size max 2MB</p>
      )}
    </div>
  );
};

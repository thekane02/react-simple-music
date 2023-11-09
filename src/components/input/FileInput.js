import React from "react";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const FileInput = ({ control, name, fileType = "image" }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Xác minh rằng tệp đó là hình ảnh
      if (acceptedFiles[0].type.startsWith(`${fileType}/`)) {
        // Đọc file hình ảnh bằng FileReader API
        onChange(acceptedFiles[0]);
        toast.success(`upload ${fileType} success!`);
      } else {
        console.log(`This is not an ${fileType} format!`);
      }
    },
  });

  return (
    <div {...getRootProps()} className="flex gap-4 text-white">
      <label
        className="w-full h-[120px] flex-1 border-2 border-primary hover:border-secondary border-dashed group rounded-xl cursor-pointer flex items-center justify-center "
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <input
          {...getInputProps()}
          hidden
          accept={`${fileType}/*`}
          name={name}
        />
        <div className="flex flex-col items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={48}
            height={48}
            viewBox="0 0 24 24"
          >
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="group-hover:stroke-secondary"
            >
              <path
                fill="none"
                strokeDasharray={14}
                strokeDashoffset={14}
                d="M6 19h12"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.4s"
                  values="14;0"
                />
              </path>
              <path
                fill="currentColor"
                className="group-hover:fill-secondary"
                d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
              >
                <animate
                  attributeName="d"
                  calcMode="linear"
                  dur="1.5s"
                  keyTimes="0;0.7;1"
                  repeatCount="indefinite"
                  values="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5;M12 15 h2 v-3 h2.5 L12 7.5M12 15 h-2 v-3 h-2.5 L12 7.5;M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
                />
              </path>
            </g>
          </svg>

          {isDragActive ? (
            <p className="text-center text-secondary">
              Drag the image here to upload
            </p>
          ) : (
            <p className="text-center group-hover:text-secondary">
              Select or drag an image here to upload
            </p>
          )}
        </div>
      </label>
      {fileType === "image" && value && (
        <div>
          <img
            src={URL.createObjectURL(value)}
            alt="Uploaded img"
            className="w-[100px] h-[100px] object-cover rounded-md"
          />
          <button
            className="hover:text-secondary"
            onClick={(e) => {
              onChange("");
              e.stopPropagation();
            }}
          >
            Xóa hình ảnh
          </button>
        </div>
      )}
      {fileType === "audio" && value && (
        <div className="max-w-[100px]">
          <p>File name: {value.name}</p>
          <p>File size: {value.size} bytes</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;

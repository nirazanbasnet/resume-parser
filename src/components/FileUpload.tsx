import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) onFileUpload(acceptedFiles[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer rounded-lg border-2 border-dashed border-gray-400 p-4"
    >
      <input {...getInputProps()} />
      <p className="text-center text-gray-500">Drag & drop a file here, or click to select</p>
    </div>
  );
}

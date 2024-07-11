import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function FileUploader({ onFileSelected }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      onFileSelected(files[0]);
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form className="flex row gap-2">
      <Input
        isReadOnly
        className="max-w-xs border border-gray-300 rounded-md p-2"
        placeholder="Planilha dos dados"
        value={selectedFile ? selectedFile.name : ""}
        variant="outline"
        size="md"
      />
      <div className="flex">
        <input
          ref={fileInputRef}
          hidden
          type="file"
          onChange={handleFileChange}
        />
        <Button
          className="bg-blue-500 text-white shadow-lg rounded-2xl p-3"
          onClick={handleClick}
          leftIcon={<DownloadIcon />}
        >
          Selecione a planilha
        </Button>
      </div>
    </form>
  );
}

FileUploader.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
};

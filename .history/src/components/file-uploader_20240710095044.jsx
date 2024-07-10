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
        className="max-w-xs"
        placeholder="Select a file"
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
          className="bg-gradient-to-tr from-cyan-700 to-blue-200 text-white shadow-lg rounded p-3"
          onClick={handleClick}
          leftIcon={<DownloadIcon />}
        >
          Select file
        </Button>
      </div>
    </form>
  );
}

FileUploader.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
};

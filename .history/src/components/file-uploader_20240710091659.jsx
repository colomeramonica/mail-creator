import { DownloadIcon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";


export default function FileUploader({ onFileSelected }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files[0]) {
      setSelectedFile(files[0]);
      onFileSelected(files[0]);
    }
  };

  const handleClick = (event: React.FormEvent) => {
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
        type="text"
        value={selectedFile?.name || "Selecione um arquivo"}
        variant="bordered"
      />
      <div className="flex ">
        <input
          ref={fileInputRef}
          hidden
          multiple
          id="file"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          className="bg-gradient-to-tr from-cyan-700 to-to-blue-200 text-white shadow-lg"
          color="primary"
          variant="solid"
          onClick={handleClick}
        >
          <label htmlFor="file">Selecione o arquivo</label>
        </Button>
      </div>
    </form>
  );
}

import { useState } from "react";

import { months } from "./data/months";

import FileUploader from "./components/file-uploader";
import Birthdays from "./components/birthdays";
import { Button, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [model] = useState("birthdays");
  const [desiredMonth, setDesiredMonth] = useState("1");
  const [templateView, setTemplateView] = useState("");


  const loadTemplateView = (event) => {
    event.preventDefault();

    if (model === "birthdays") {
      return setTemplateView("birthdays");
    }

    return setTemplateView("recognition");
  };

  const handleChange = () => {
    setTemplateView(model === "birthdays" ? "recognition" : "birthdays");
  };

  const handleMonthChange = (event) => {
    setDesiredMonth(event.target.value);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-3xl mb-3 font-bold">Mail Creator</h1>
        <div className="flex flex-col justify-start">
          <div className="p-3">
            <FileUploader onFileSelected={setSelectedFile} />
          </div>
          <div className="p-3">
            <div className="flex row gap-2 items-stretch">
              <RadioGroup
                value={model}
                onChange={handleChange}
              >
                 <Stack direction='row'>
                  <Radio size='md' value="birthdays" defaultChecked>Aniversários do mês</Radio>
                  <Radio size='md' value="recognition">Tempo de casa</Radio>
                </Stack>
              </RadioGroup>
            </div>
            <div className="flex row mt-3 w-full flex-wrap md:flex-nowrap gap-4 justify-center">
              {model === "birthdays" && (
                <Select
                  isRequired
                  className="max-w-xs w-full"
                  label="Selecione o mês"
                  value={desiredMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month) => (
                    <option key={month.key}>{month.label}</option>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded p-3"
          onClick={loadTemplateView}
        >
          Separar registros
        </Button>
        {templateView === "birthdays" && (
          <Birthdays desiredMonth={desiredMonth} file={selectedFile} />
        )}
        {templateView === "recognition" && <div>Reconhecimento</div>}
      </div>
    </section>
  );
};

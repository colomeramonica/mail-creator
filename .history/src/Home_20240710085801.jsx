import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Select, SelectItem } from "@nextui-org/react";

import { months } from "../data/months";

import FileUploader from "@/components/file-uploader";
import Birthdays from "@/components/birthdays";

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [model] = useState<string>("birthdays");
  const [desiredMonth, setDesiredMonth] = useState("1");
  const [templateView, setTemplateView] = useState<string>("");
  const isBrowser = typeof window !== undefined;

  useEffect(() => {
    if (isBrowser) {
      loadTemplateView;
    }
  }, []);

  const loadTemplateView = () => {
    if (model === "birthdays") {
      return setTemplateView("birthdays");
    }

    return setTemplateView("recognition");
  };

  const handleChange = () => {
    setTemplateView(model === "birthdays" ? "recognition" : "birthdays");
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                className="items-start justify-between"
                label="Selecione o modelo de e-mail desejado"
                orientation="horizontal"
                value={model}
                onValueChange={handleChange}
              >
                <Radio value="birthdays">Aniversários do mês</Radio>
                <Radio value="recognition">Tempo de casa</Radio>
              </RadioGroup>
            </div>
            <div className="flex row mt-3 w-full flex-wrap md:flex-nowrap gap-4 justify-center">
              {model === "birthdays" && (
                <Select
                  isRequired
                  className="max-w-xs"
                  label="Selecione o mês"
                  value={desiredMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month) => (
                    <SelectItem key={month.key}>{month.label}</SelectItem>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          radius="full"
          variant="shadow"
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

import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import html2PDF from "jspdf-html2canvas";
import { Button, Image } from '@chakra-ui/react'
import birthdayPhoto from '../assets/birthday-photo.jpg';
import logo from '../assets/logo-jacto.jpg';
const birthdayPhotoSrc = birthdayPhoto.src;
const logoSrc = logo.src;

import { CalendarIcon } from "@chakra-ui/icons";
import { formatDate } from "../utils/utils";

export default function Birthdays({ file, desiredMonth }) {
  const [collaboratorsData, setCollaboratorsData] = useState({});

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;

      if (result) {
        const data = new Uint8Array(result);
        let groupedData = {};

        readXlsxFile(data).then((rows) => {
          rows.forEach((row, rowIndex) => {
            if (rowIndex === 0) return;
            const typedRow = row as unknown as BirthdayRow;

            let worksheetDate = typedRow[6];
            const dateObj = new Date(worksheetDate);
            const month = dateObj.getMonth() + 1;
            const formattedDate = formatDate(dateObj);

            if (month.toString() === desiredMonth) {
              const collaborator = {
                name: typedRow[1] as string,
                position: typedRow[3] as string,
                unity: typedRow[5] as string,
                birthday: formattedDate,
              };

              if (!groupedData[formattedDate]) {
                groupedData[formattedDate] = [];
              }

              groupedData[formattedDate].push(collaborator);
            }
          });
        });

        setCollaboratorsData(groupedData);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file, desiredMonth]);

  function generatePDF(date: string) {
    const input = document.getElementById(`birthday-card-${date}`);

    html2PDF(input as HTMLElement);
  }

  return (
    <div className="flex flex-col w-max p-3 justify-center">
      <div id="birthday-card">
        {Object.entries(collaboratorsData).map(([date, collaborators]) => (
          <>
            <div key={date} id={`birthday-card-${date}`}>
              <Image
                alt="Birthday"
                height="200"
                src={birthdayPhotoSrc}
                width="500"
              />
              <div className="flex flex-col items-center content-center ml-6 p-3">
                <h1 className="uppercase text-templateBlue mt-3 font-template font-extrabold text-2xl justify-start">
                  Happy Birthday!
                </h1>
                <div className="flex flex-row items-center content-center p-2 justify-start">
                  <CalendarIcon width="36" />
                  <span className="m-1 text-templateGray font-template text-base">
                    {date}
                  </span>
                </div>
              </div>
              <div className="flex flex-col p-1">
                {collaborators.map((collaborator, index) => (
                  <div key={index} className="p-1">
                    <p className="text-templateBlue font-template font-bold text-xl">
                      {collaborator.name}
                    </p>
                    <p className="font-template text-gray-500">
                      {collaborator.position}
                    </p>
                  </div>
                ))}
                <footer className="flex flex-col items-start content-end ml-6 p-3">
                  <Image
                    alt="Jacto"
                    className="justify-end pt-16"
                    height="100"
                    src={logoSrc}
                    width="100"
                  />
                </footer>
              </div>
            </div>
            <Button
              className="m-5"
              color="primary"
              variant="shadow"
              onClick={generatePDF.bind(null, date)}
            >
              Gerar PDF para o dia
            </Button>
          </>
        ))}
      </div>
    </div>
  );
}
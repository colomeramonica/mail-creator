import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import html2PDF from "jspdf-html2canvas";
import { AspectRatio, Button, Image } from '@chakra-ui/react'
import birthdayPhoto from '../assets/birthday-photo.jpg';
import logo from '../assets/logo-jacto.jpg';

import { CalendarIcon } from "@chakra-ui/icons";
import { formatDate } from "../utils/utils";
import PropTypes from "prop-types";

export default function Birthdays({ file, desiredMonth }) {
  Birthdays.propTypes = {
    file: PropTypes.object.isRequired,
    desiredMonth: PropTypes.string.isRequired
  };
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
            const typedRow = row;

            let worksheetDate = typedRow[6];
            const dateObj = new Date(worksheetDate);
            const month = dateObj.getMonth() + 1;
            const formattedDate = formatDate(dateObj);

            if (month.toString() === desiredMonth) {
              const collaborator = {
                name: typedRow[1],
                position: typedRow[3],
                unity: typedRow[5],
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

  function generatePDF(date) {
    const input = document.getElementById(`birthday-card-${date}`);

    html2PDF(input);
  }

  return (
    <div className="flex flex-col w-max p-3 justify-center">
      <div id="birthday-card">
        {Object.entries(collaboratorsData).map(([date, collaborators]) => (
          <>
            <div key={date} id={`birthday-card-${date}`}>
            <AspectRatio maxW="500px" ratio={ 720 / 365}>
              <Image
                alt="Birthday"
                objectFit="cover"
                src={birthdayPhoto}
              />
              </AspectRatio>
              <div className="flex flex-col items-center content-center ml-6 p-3">
                <h1 className="uppercase text-templateBlue mt-3 font-template font-extrabold text-2xl justify-start">
                  Happy Birthday!
                </h1>
                <div className="flex flex-row items-center content-center p-2 justify-start">
                  <CalendarIcon width="36" color={"rgb(69 66 66)"} />
                  <span className="m-1 text-templateGray font-template text-base font-bold">
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
              </div>
<<<<<<< HEAD
              <div className="flex flex-row justify-between align-baseline">
                <div className="p-5 ml-7 mt-30">
                  <img src={logo} alt="Jacto Logo" width="100px" height="50px" />
                </div>
=======
              <div className="p-5 ml-7 mt-40">
                <AspectRatio maxW="100px" ratio={ 2032 / 457}>
                <Image
                  alt="Jacto Logo"
                  objectFit="cover"
                  src={logo}
                />
                </AspectRatio>
>>>>>>> 490515925664e89763ed777b788f6403fa2b5227
              </div>
            </div>
            <Button
              className="bg-green-950 text-white shadow-lg rounded-2xl p-3 m-5"
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
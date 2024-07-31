import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import html2PDF from "jspdf-html2canvas";
import { AspectRatio, Button, Image } from '@chakra-ui/react';
import birthdayPhoto from '../assets/birthday-photo.jpg';
import logo from '../assets/logo-jacto.jpg';
import { CalendarIcon } from "@chakra-ui/icons";
import { formatDate } from "../utils/utils";
import PropTypes from "prop-types";
import { toPng } from 'html-to-image';

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
          let orderedData = [];

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
                date: worksheetDate,
                birthday: formattedDate,
              };

              orderedData.push(collaborator);
            }
          });

          orderedData.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const monthA = dateA.getUTCMonth();
            const monthB = dateB.getUTCMonth();
            const dayA = dateA.getUTCDate();
            const dayB = dateB.getUTCDate();

            if (monthA < monthB) return -1;
            if (monthA > monthB) return 1;
            if (dayA < dayB) return -1;
            if (dayA > dayB) return 1;
            return 0;
          });

          groupedData = orderedData.reduce((acc, collaborator) => {
            const { birthday } = collaborator;
            if (!acc[birthday]) {
              acc[birthday] = [];
            }
            acc[birthday].push(collaborator);
            return acc;
          }, {});

          setCollaboratorsData(groupedData);
        });
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file, desiredMonth]);

  function generateAttachment(date) {
    const input = document.getElementById(`birthday-card-${date}`);

    toPng(input)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `birthday-card-${date}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting image:", error);
      });
  }

  return (
    <div className="flex flex-col w-max p-3 justify-center">
      <div id="birthday-card">
        {Object.entries(collaboratorsData).map(([date, collaborators]) => (
          <>
            <div key={date} id={`birthday-card-${date}`} className="bg-white">
              <AspectRatio maxW="500px" ratio={720 / 365}>
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
                      {collaborator.unity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row justify-between align-baseline">
                <div className="p-5 ml-7 mt-30">
                  <img src={logo} alt="Jacto Logo" width="100px" height="50px" />
                </div>
              </div>
            </div>
            <Button
              className="bg-green-950 text-white shadow-lg rounded-2xl p-3 m-5"
              onClick={generateAttachment.bind(null, date)}
            >
              Gerar anexo para o dia
            </Button>
          </>
        ))}
      </div>
    </div>
  );
}
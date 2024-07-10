import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import html2PDF from "jspdf-html2canvas";
import { Button, Image } from '@chakra-ui/react'
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

            </div>
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded p-3 m-5"
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
import { Button } from "@chakra-ui/react";
import html2PDF from "jspdf-html2canvas";
import PropTypes from "prop-types";
import readXlsxFile from "read-excel-file";
import { formatDate } from "../utils/utils";
import { useEffect, useState } from "react";
export default function Recognition({ file, desiredMonth }) {
  Recognition.propTypes = {
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
        let groupedData = [];

        readXlsxFile(data).then((rows) => {
          rows.forEach((row, rowIndex) => {
            if (rowIndex === 0) return;
            const typedRow = row;

            let worksheetDate = typedRow[7];
            const dateObj = new Date(worksheetDate);
            const month = dateObj.getMonth() + 1;
            const formattedDate = formatDate(dateObj);

            if (month.toString() === desiredMonth) {
              const collaborator = {
                name: typedRow[1],
                hireDate: formattedDate,
                years: new Date().getFullYear() - dateObj.getFullYear(),
                department: typedRow[5],
              };

              groupedData.push(collaborator);
            }
          });
        });

        setCollaboratorsData(groupedData);
      }
    };
    reader.readAsArrayBuffer(file);
  }, [file, desiredMonth]);

  function generatePDF() {
    const input = document.getElementById(`recognition-table-${desiredMonth}`);

    html2PDF(input);
  }

  const getMonthNameByIndex = (index) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return monthNames[index];
  };

  return (
    <div className="flex flex-col w-max p-3 justify-center align-middle">
      <div id="recognition-table" className="justify-center">
        <div className="m-5" id={`recognition-table-${desiredMonth}`}>
          <div className="flex flex-col items-center content-center ml-6 p-3">
            <h1 className="uppercase text-templateBlue mt-3 font-template font-extrabold text-2xl justify-start">
              Recognition | {getMonthNameByIndex(desiredMonth) + ' ' + new Date().getFullYear()}
            </h1>
            <h3 className="text-templateBlue font-template">(Company Time)</h3>
          </div>
          <div className="mx-auto p-10 bg-white max-w-5xl">
            <table className="table-auto w-full">
              <thead className="bg-templateBlue">
                <tr>
                  <th className="px-4 py-2 text-white font-template border">Employee</th>
                  <th className="px-4 py-2 text-white font-template border">Admission</th>
                  <th className="px-4 py-2 text-white font-template border">Years</th>
                  <th className="px-4 py-2 text-white font-template border">Department</th>
                  {/* <th className="px-4 py-2 text-white font-template border">Country</th> */}
                </tr>
              </thead>
              <tbody key={desiredMonth}>
                {Object.entries(collaboratorsData).map((collaborators) => (
                  collaborators.map((collaborator) => (
                    <tr key={collaborator.name}>
                      <td className="border px-4 py-2 font-template">{collaborator.name}</td>
                      <td className="border px-4 py-2 font-template">{collaborator.hireDate}</td>
                      <td className="border px-4 py-2 font-template">{collaborator.years}</td>
                      <td className="border px-4 py-2 font-template">{collaborator.department}</td>
                      {/* <td className="border px-4 py-2 font-template">{collaborator.country}</td> */}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <Button
          className="bg-green-950 text-white shadow-lg rounded-2xl p-3 m-5"
          onClick={generatePDF}
        >
          Gerar PDF
        </Button>
      </div>
    </div>
  );
}
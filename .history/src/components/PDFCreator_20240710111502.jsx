import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
function BasicDocument() {
  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
          <Image
          
                alt="Birthday"
                boxSize="500px 200px"
                objectFit="fill"
                src={birthdayPhoto}
              />
              
              <div className="flex flex-col items-center content-center ml-6 p-3">
                <h1 className="uppercase text-templateBlue mt-3 font-template font-extrabold text-2xl justify-start">
                  Happy Birthday!
                </h1>
                <div className="flex flex-row items-center content-center p-2 justify-start">
                  <CalendarIcon width="36" className="text-templateGray" />
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
              <Image
                    alt="Jacto"
                    className="justify-end pt-60"
                    height="100"
                    src={logo}
                    width="100"
                  />
          </View>
          <View style={styles.section}>
            <Text>World</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default BasicDocument;
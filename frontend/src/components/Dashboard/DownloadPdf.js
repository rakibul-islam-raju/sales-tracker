import ReactPDF from "@react-pdf/renderer";
import PdfFile from "./PdfFile";

const DownloadPdf = () => {
	return ReactPDF.render(<PdfFile />, `${__dirname}/example.pdf`);
};

export default DownloadPdf;

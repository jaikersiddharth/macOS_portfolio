import { WindowWrapper } from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { Download } from "lucide-react";


import { pdfjs,Document,Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();




const Resume = () => {
    return(
        <>
        <div id="window-header"> 
            <WindowControls target="resume"/>
            <h2>Resume.pdf</h2>
            <a href="files/Sid_resume.pdf" download 
            className="cursor-pointer"/>
            <Download className="icon"></Download>
        </div>
            <Document file="files/Sid_resume.pdf" renderTextLayer renderAnnotationLayer={false} >
        <Page size="A4" pageNumber={1} />
        <Page size="A4" pageNumber={2} />
      </Document>

        </>
    )
}
const ResumeWithWrapper = WindowWrapper(Resume,'resume');
export default ResumeWithWrapper;
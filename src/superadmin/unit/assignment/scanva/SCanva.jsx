// import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import ImagePart from "../imagepart/ImagePart";
import Pdf from "../pdfpart/Pdf";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./scanva.scss";
// import { error, success } from "../../../../utils/toast";
// import UndoIcon from "@mui/icons-material/Undo";
// import RedoIcon from "@mui/icons-material/Redo";
// import jsPDF from "jspdf";
// import { Button } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";
// import { DeleteForeverRounded } from "@mui/icons-material";
// import { addAssignments } from "../../../../services/assignments";
// import { addAssignment } from "../../../../schema/validate";
// import { useFormik } from "formik";

const AddAssignmentCanvas = ({ pdf }) => {
  // const canvasRef = useRef(null);
  // const contextRef = useRef(null);
  // const [isDrawing, setIsDrawing] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [backgroundImg, setBackgroundImg] = useState(null);
  // const [value, setValue] = useState(5);
  // const [color, setColor] = useState("#000000");
  // const [video, setVideo] = useState("");
  // const [images, setImages] = useState([]);
  const [pdfImages, setPdfImages] = useState([]);
  // const [sizeName, setSizeName] = useState("Font Size");
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  // const [height, setHeight] = useState(1122);
  // const { id } = useParams();

  useEffect(() => {
    var canvasPic = new Image();
    canvasPic.src = canvasDrawn[canvasStage];
    canvasPic.onload = function () {
      setPdfImages([canvasPic]);
    };
  }, [canvasStage, canvasDrawn])

  // //change font size
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setValue(e.target.value);
  // };

  // //change color
  // const colorChange = (e) => {
  //   setColor(e.target.value);
  // };

  // // const handleVideoUpload = (e) => {
  // //   const file = e.target.files[0];
  // //   var reader = new FileReader();
  // //   reader.readAsDataURL(file);
  // //   reader.onload = function () {
  // //     setVideo(file);
  // //   };
  // // }

  // const blobToBase64 = async (url) => {
  //   return new Promise((resolve, _) => {
  //     var img = new Image();
  //     img.src = url;
  //     img.onload = () => {
  //       var myCanvas = document.createElement('canvas');
  //       var ctx = myCanvas.getContext('2d');
  //       ctx.drawImage(img, 0, 0);
  //       resolve(myCanvas.toDataURL())
  //     }
  //   });
  // }

  // //settoDraw
  // const setToDraw = (e) => {
  //   e.preventDefault();
  //   setSizeName("Font Size");
  //   contextRef.current.globalCompositeOperation = "source-over";
  // };

  // //settoErase
  // const setToErase = (e) => {
  //   e.preventDefault();
  //   setSizeName("Erase Size");
  //   contextRef.current.globalCompositeOperation = "destination-out";
  // };

  // // //save image into pdf
  // // const saveImage = () => {
  // //   const canvas = canvasRef.current;
  // //   const canvasWidth = canvas.width;
  // //   const canvasHeight = canvas.height;
  // //   const partHeight = 1122; // Define the height of each part (adjust as needed)

  // //   // Calculate the total number of parts required
  // //   const totalParts = Math.ceil(canvasHeight / partHeight);

  // //   // Create a new jsPDF instance
  // //   const pdf = new jsPDF({
  // //     orientation: 'p', // set orientation to landscape if needed
  // //     unit: 'px', // set unit to pixels
  // //     format: [canvasWidth, partHeight] // set PDF page size to match canvas dimensions
  // //   });

  // //   // Loop through each part and add it to the PDF document
  // //   for (let part = 0; part < totalParts; part++) {
  // //     const startY = part * partHeight;
  // //     const canvasPart = document.createElement('canvas');
  // //     canvasPart.width = canvasWidth;
  // //     canvasPart.height = partHeight;

  // //     const contextPart = canvasPart.getContext('2d');
  // //     contextPart.drawImage(canvas, 0, startY, canvasWidth, partHeight, 0, 0, canvasWidth, partHeight);

  // //     const imgData = canvasPart.toDataURL('image/png');
  // //     pdf.addImage(imgData, 'PNG', 0, 0, canvasWidth, partHeight);

  // //     // Add a new page if there are more parts remaining
  // //     if (part < totalParts - 1) {
  // //       pdf.addPage();
  // //     }
  // //   }

  // //   // Save the PDF file
  // //   pdf.save('image.pdf');
  // // };

  // const navigate = useNavigate();

  // const handleIndividualUpload = async (e) => {
  //   const files = e.target.files;
  //   const imagesTmp = [...images];
  //   for (var i = 0; i < files.length; i++) {
  //     const base64 = await blobToBase64(URL.createObjectURL(files[i]))

  //     imagesTmp.push({
  //       file: base64,
  //       title: files[i].name.substring(0, files[i].name.lastIndexOf(".")),
  //     });
  //   }
  //   imagesTmp.sort((a, b) => {
  //     if (a.title < b.title) {
  //       return -1;
  //     }
  //     if (a.title > b.title) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   setImages(imagesTmp);
  //   e.target.value = null;
  // };

  // const sortImages = () => {
  //   const imagesTmp = [...images];
  //   imagesTmp.sort((a, b) => {
  //     if (a.title < b.title) {
  //       return -1;
  //     }
  //     if (a.title > b.title) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   setImages(imagesTmp);
  // };

  // const Values = {
  //   title: "",
  // };

  // const {
  //   values,
  //   errors,
  //   setFieldValue,
  //   handleBlur,
  //   handleChange: handleFormChange,
  //   touched,
  //   handleSubmit,
  // } = useFormik({
  //   validationSchema: addAssignment,
  //   initialValues: Values,
  //   onSubmit: async (values, action) => {
  //     setLoading(true);
  //     // const newCanvas = trimCanvas(canvasRef.current);
  //     const newCanvas = canvasRef.current;
  //     const image = newCanvas.toDataURL("image/png");
  //     const jsonData = {
  //       unit_id: id,
  //       questions: images,
  //       title: values.title,
  //       file: image,
  //     };

  //     // var formData = new FormData();
  //     // for (var key in jsonData) {
  //     //   formData.append(key, jsonData[key]);
  //     // }

  //     addAssignments(jsonData)
  //       .then((data) => {
  //         success("Question submitted successfully");
  //         setTimeout(() => {
  //           navigate("./../" + data.assessment.id);
  //         }, 1500);
  //       })
  //       .catch((err) => {
  //         error(err.message);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   },
  // });

  // ///increase decrease size and color
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   context.strokeStyle = color;
  //   context.lineWidth = value;
  // }, [value, color]);

  // //Create CANVAS
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   canvas.width = 800;
  //   canvas.height = height;
  //   canvas.style.backgroundColor = "rgb(255, 255, 255)";
  //   canvas.style.borderRadius = "12px";
  //   canvas.style.cursor = "crosshair";
  //   //Draw
  //   const context = canvas.getContext("2d");
  //   // context.scale(2, 2);
  //   context.moveTo(0, 0);
  //   context.lineTo(100, 0);
  //   context.LineCap = "round";
  //   contextRef.current = context;
  // }, [height]);

  // //ADD PAGE
  // const addPage = () => {
  //   const canvas = canvasRef.current;
  //   const addheight = 1122;
  //   const newCanvas = document.createElement("canvas");
  //   newCanvas.width = canvas.width;
  //   newCanvas.height = canvas.height + addheight;

  //   const newContext = newCanvas.getContext("2d");
  //   //copy
  //   newContext.drawImage(canvas, 0, 0);

  //   canvas.height = newCanvas.height;
  //   const context = canvas.getContext("2d");

  //   context.drawImage(newCanvas, 0, 0);
  // };

  // const handleButtonClick = () => {
  //   addPage();
  // };

  // //start Drawing
  // const startDrawing = ({ nativeEvent }) => {
  //   const { offsetX, offsetY } = nativeEvent;
  //   contextRef.current.beginPath();
  //   contextRef.current.moveTo(offsetX, offsetY);
  //   setIsDrawing(true);
  // };

  // function getMousePositionOnCanvas(event) {
  //   const clientX = event.targetTouches[0]
  //     ? event.targetTouches[0].pageX
  //     : event.changedTouches[event.changedTouches.length - 1].pageX;
  //   const clientY = event.targetTouches[0]
  //     ? event.targetTouches[0].pageY
  //     : event.changedTouches[event.changedTouches.length - 1].pageY;
  //   // const clientX = event.clientX || event.touches[0].clientX;
  //   // const clientY = event.clientY || event.touches[0].clientY;
  //   const { offsetLeft, offsetTop } = event.target;
  //   const canvasX = clientX - offsetLeft;
  //   const canvasY = clientY - offsetTop;

  //   return { x: canvasX, y: canvasY };
  // }

  // function handleWritingStart() {
  //   const mousePos = getMousePositionOnCanvas(event);

  //   contextRef.current.beginPath();

  //   contextRef.current.moveTo(mousePos.x, mousePos.y);
  //   setIsDrawing(true);
  // }

  // function handleWritingInProgress() {
  //   if (isDrawing) {
  //     const mousePos = getMousePositionOnCanvas(event);

  //     contextRef.current.lineTo(mousePos.x, mousePos.y);
  //     contextRef.current.stroke();
  //   }
  // }

  // //Finish Drawing
  // const finishDrawing = () => {
  //   contextRef.current.closePath();
  //   setIsDrawing(false);
  //   if (canvasStage + 1 < canvasDrawn.length) {
  //     canvasDrawn.length = canvasStage + 1;
  //   }
  //   setCanvasDrawn([...canvasDrawn, canvasRef.current.toDataURL()]);
  //   setCanvasStage(canvasStage + 1);
  // };

  // const undoCanvas = () => {
  //   contextRef.current.globalCompositeOperation = "source-over";
  //   if (canvasStage > 0) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  //     const newStage = canvasStage - 1;
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     if (canvasStage > 0) {
  //       var canvasPic = new Image();
  //       canvasPic.src = canvasDrawn[newStage];
  //       canvasPic.onload = function () {
  //         context.drawImage(canvasPic, 0, 0);
  //       };
  //     }
  //     setCanvasStage(newStage);
  //   }
  // };

  // const redoCanvas = () => {
  //   if (canvasStage < canvasDrawn.length - 1) {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext("2d");
  //     const newStage = canvasStage + 1;
  //     var canvasPic = new Image();
  //     canvasPic.src = canvasDrawn[newStage];
  //     canvasPic.onload = function () {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //       context.drawImage(canvasPic, 0, 0);
  //     };
  //     setCanvasStage(newStage);
  //   }
  // };

  // //Drawing
  // const draw = ({ nativeEvent }) => {
  //   if (!isDrawing) {
  //     return;
  //   }
  //   const { offsetX, offsetY } = nativeEvent;
  //   if (
  //     contextRef?.current?.globalCompositeOperation &&
  //     sizeName === "Erase Size" &&
  //     backgroundImg
  //   ) {
  //     replacePixel(offsetX, offsetY);
  //   } else {
  //     contextRef.current.lineTo(offsetX, offsetY);
  //     contextRef.current.stroke();
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   var currentPage = 1,
  //     canvasImages = [];

  //   function iterate(pdf) {
  //     // init parsing of first page
  //     if (currentPage <= pdf.numPages) getPage();

  //     // main entry point/function for loop
  //     // main entry point/function for loop
  //     function getPage() {
  //       // when promise is returned do as usual
  //       pdf.getPage(currentPage).then(function (page) {
  //         var scale = 1.25;
  //         var viewport = page.getViewport({ scale: scale });

  //         // Prepare canvas using PDF page dimensions
  //         var canvas = document.createElement("canvas");
  //         var context = canvas.getContext("2d");
  //         canvas.height = viewport.height;
  //         canvas.width = viewport.width;

  //         // Render PDF page into canvas context
  //         var renderContext = {
  //           canvasContext: context,
  //           viewport: viewport,
  //         };
  //         var renderTask = page.render(renderContext);
  //         renderTask.promise.then(function () {
  //           // store compressed image data in array
  //           const imgData = canvas.toDataURL();
  //           var image = new Image();
  //           image.src = imgData;
  //           image.onload = function () {
  //             canvasImages.push(image);
  //           };

  //           if (currentPage < pdf.numPages) {
  //             currentPage++;
  //             getPage(); // get next page
  //           } else {
  //             setPdfImages(canvasImages);
  //             setLoading(false);
  //           }
  //         });
  //       });
  //     }
  //   }
  //   iterate(pdf);
  // }, [pdf]);

  // const replacePixel = (x, y) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   const canvasImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //   var canvasBg = document.createElement("canvas");
  //   canvasBg.width = canvas.width;
  //   canvasBg.height = canvas.height;
  //   var contextBg = canvasBg.getContext("2d", { willReadFrequently: true });
  //   contextBg.drawImage(backgroundImg, 0, 0);
  //   const imgDataBg = contextBg.getImageData(
  //     0,
  //     0,
  //     canvasBg.width,
  //     canvasBg.height
  //   );

  //   for (
  //     let i = x - Math.ceil(value / 1.5);
  //     i < x + Math.ceil(value / 1.5);
  //     i++
  //   ) {
  //     for (
  //       let j = y - Math.ceil(value / 1.5);
  //       j < y + Math.ceil(value / 1.5);
  //       j++
  //     ) {
  //       const index = 4 * (i + j * canvas.width);
  //       canvasImgData.data[index + 0] = imgDataBg.data[index + 0];
  //       canvasImgData.data[index + 1] = imgDataBg.data[index + 1];
  //       canvasImgData.data[index + 2] = imgDataBg.data[index + 2];
  //       canvasImgData.data[index + 3] = imgDataBg.data[index + 3];
  //     }
  //   }

  //   ctx.putImageData(canvasImgData, 0, 0);
  // };

  // useEffect(() => {
  //   if (pdfImages.length && canvasStage === -1) {
  //     let startY = 0;
  //     let totalHeight = 0;
  //     let totalWidth = 800;
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     for (let i = 0; i < pdfImages.length; i++) {
  //       const img = pdfImages[i];
  //       totalHeight = totalHeight + img.height;
  //       totalWidth = totalWidth < img.width ? img.width : totalWidth;
  //     }
  //     canvas.height = totalHeight;
  //     canvas.width = totalWidth;
  //     const inv =
  //       contextRef?.current?.globalCompositeOperation &&
  //       sizeName === "Erase Size";
  //     if (inv) {
  //       contextRef.current.globalCompositeOperation = "source-over";
  //     }
  //     for (let j = 0; j < pdfImages.length; j++) {
  //       const img = pdfImages[j];
  //       ctx.drawImage(img, 0, startY);
  //       startY = startY + img.height;
  //     }
  //     var bImg = new Image();
  //     bImg.src = canvas.toDataURL();
  //     bImg.onload = function () {
  //       setBackgroundImg(bImg);
  //     };
  //     setCanvasDrawn([canvasRef.current.toDataURL()]);
  //     setCanvasStage(0);
  //     if (inv) {
  //       contextRef.current.globalCompositeOperation = "destination-out";
  //     }
  //     ctx.restore();
  //   }
  // }, [pdfImages, canvasStage]);

  const [page, setPage] = useState(0);
  const FormTitles = ["Add Pdf", "Add Details"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Pdf
          canvasDrawn={canvasDrawn}
          setCanvasStage={setCanvasStage}
          canvasStage={canvasStage}
          setCanvasDrawn={setCanvasDrawn}
          pdf={pdf}
        />
      );
    }
    if (page === 1) {
      return <ImagePart pdfImages={pdfImages} />;
    }
  };

  return (
    <>
      <div className="container grid">
        <div className="form">
          <div className="progressbar"></div>
          <div className="form-container">
            <div className="header">
              <h5>{FormTitles[page]}</h5>
            </div>
            <div className="flex-container">
              <button
                disabled={page == 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
                className="form-control"
              >
                <ArrowBackIcon />
                Prev
              </button>
              <button
                disabled={page == FormTitles.length - 1}
                onClick={() => {
                  setPage((currPage) => currPage + 1);
                }}
                className="form-control"
              >
                Next
                <ArrowForwardIcon />
              </button>
            </div>
            <div className="body">{PageDisplay()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAssignmentCanvas;

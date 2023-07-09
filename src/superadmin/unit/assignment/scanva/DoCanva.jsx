import React, { useEffect, useRef, useState } from "react";
import "./scanva.scss";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import RedoIcon from "@mui/icons-material/Redo";
import jsPDF from "jspdf";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Box, Button, Modal, Input } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  ASSIGNMENT_IMAGE_PREFIX,
  ASSIGNMENT_QUESTION_IMAGE_PREFIX,
} from "../../../../constants/url";
import { getAssignment } from "../../../../services/assignments";
import CustomReactTable from "../../../../components/CustomReactTable/CustomReactTable";
import { ThreeDots } from "react-loader-spinner";
import { getCurrentRole, roles } from "../../../../utils/common";

const App = (props) => {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [value, setValue] = useState(5);
  // const [color, setColor] = useState("#000000");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [pdfImages, setPdfImages] = useState([]);
  const [sizeName, setSizeName] = useState("Font Size");
  const [canvasDrawn, setCanvasDrawn] = useState([]);
  const [canvasStage, setCanvasStage] = useState(-1);
  const [data, setData] = useState([]);
  const [height, setHeight] = useState(1122);

  const { id } = useParams();

  const getData = async () => {
    setLoading(true);
    if (getCurrentRole() !== roles.student) {
      const data = await getAssignment(id);
      setData(data.unitAssignmentQuestions);
    }

    setLoading(false);
  };

  useEffect(() => {
    var currentPage = 1,
      canvasImages = [];

    function iterate(pdf) {
      // init parsing of first page
      if (currentPage <= pdf.numPages) getPage();

      // main entry point/function for loop
      // main entry point/function for loop
      function getPage() {
        // when promise is returned do as usual
        pdf.getPage(currentPage).then(function (page) {
          var scale = 1;
          var viewport = page.getViewport({ scale: scale });

          // Prepare canvas using PDF page dimensions
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            // store compressed image data in array
            const imgData = canvas.toDataURL();
            var image = new Image();
            image.src = imgData;
            image.onload = function () {
              canvasImages.push(image);
            };

            if (currentPage < pdf.numPages) {
              currentPage++;
              getPage(); // get next page
            } else {
              setPdfImages(canvasImages);
              setLoading(false);
            }
          });
        });
      }
    }
    if (pdf) {
      setLoading(true);
      iterate(pdf);
    }
  }, [pdf]);

  useEffect(() => {
    if (pdfImages.length) {
      setLoading(true);
      let startY = 0;
      let totalHeight = 0;
      let totalWidth = 300;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < pdfImages.length; i++) {
        const img = pdfImages[i];
        totalHeight = totalHeight + img.height;
        totalWidth = totalWidth < img.width ? img.width : totalWidth;
      }
      canvas.height = totalHeight;
      canvas.width = totalWidth;
      const inv =
        contextRef?.current?.globalCompositeOperation &&
        sizeName === "Erase Size";
      if (inv) {
        contextRef.current.globalCompositeOperation = "source-over";
      }
      for (let j = 0; j < pdfImages.length; j++) {
        const img = pdfImages[j];
        ctx.drawImage(img, 0, startY);
        startY = startY + img.height;
      }
      if (!backgroundImg) {
        var bImg = new Image();
        bImg.src = canvas.toDataURL();
        bImg.onload = function () {
          setBackgroundImg(bImg);
        };
      }
      setCanvasDrawn([...canvasDrawn, canvasRef.current.toDataURL()]);
      setCanvasStage(canvasStage + 1);
      if (inv) {
        contextRef.current.globalCompositeOperation = "destination-out";
      }
      setLoading(false);
      setPdfImages([]);
      ctx.restore();
    }
  }, [pdfImages]);

  useEffect(() => {
    getData();
  }, []);

  //change font size
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // //change color
  // const colorChange = (e) => {
  //   setColor(e.target.value);
  // };

  // const uploadImage = (e) => {
  //   const file = e.target.files[0];
  //   const blobURL = URL.createObjectURL(file);
  //   const img     = new Image();
  //   img.src       = blobURL;
  //   img.onLoad(() => {
  //     const canvas = canvasRef.current;
  //     canvas.getContext("2d").drawImage(img, 0, 0);
  //   })
  // }

  //settoDraw
  const setToDraw = (e) => {
    e.preventDefault();
    setSizeName("Font Size");
    contextRef.current.globalCompositeOperation = "source-over";
  };

  //settoErase
  const setToErase = (e) => {
    e.preventDefault();
    setSizeName("Erase Size");
    contextRef.current.globalCompositeOperation = "destination-out";
  };

  // //save image into pdf
  const saveImage = () => {
    const canvas = canvasRef.current;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const partHeight = 1056; // Define the height of each part (adjust as needed)

    // Calculate the total number of parts required
    const totalParts = Math.ceil(canvasHeight / partHeight);

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: "p", // set orientation to landscape if needed
      unit: "pt", // set unit to pixels
      format: [canvasWidth, partHeight], // set PDF page size to match canvas dimensions
    });

    // Loop through each part and add it to the PDF document
    for (let part = 0; part < totalParts; part++) {
      const startY = part * partHeight;
      const canvasPart = document.createElement("canvas");
      canvasPart.width = canvasWidth;
      canvasPart.height = partHeight;

      const contextPart = canvasPart.getContext("2d");
      contextPart.drawImage(
        canvas,
        0,
        startY,
        canvasWidth,
        partHeight,
        0,
        0,
        canvasWidth,
        partHeight
      );

      const imgData = canvasPart.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, canvasWidth, partHeight);

      // Add a new page if there are more parts remaining
      if (part < totalParts - 1) {
        pdf.addPage();
      }
    }

    // Save the PDF file
    pdf.save("image.pdf");
  };

  //submit answer

  // const submitAnswer = (event) => {
  //   event.preventDefault();
  //   const image = canvasRef.current.toDataURL("image/png");
  //   const ansData = {
  //     unit_id: props.unit_id,
  //     theory_assessment_id: props.id,
  //     answer: "",
  //     ansfile: image,
  //   }

  //   saveAnswer(ansData)
  //     .then(() => {
  //       // success("Answer submitted successfully");

  //       setTimeout(()=>{
  //         navigate("/studentpanel/scourse1")
  //       },1500)
  //     })
  //     .catch((err) => {
  //       // error(err.message);
  //       setDisablebtn(false)
  //     })
  // };

  // ///increase decrease size and color

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = value;
  }, [value]);

  //load question in canvas
  useEffect(() => {
    loadQuestion(props.file);
  }, [props.file]);

  const loadQuestion = (file_name) => {
    if (file_name && canvasRef) {
      const question = new Image();
      question.src = ASSIGNMENT_IMAGE_PREFIX + file_name;
      question.crossOrigin = "";
      question.onload = () => {
        const inv =
          contextRef?.current?.globalCompositeOperation &&
          sizeName === "Erase Size";
        canvasRef.current.height = question.height;
        canvasRef.current.width = question.width > 300 ? question.width : 300;
        setBackgroundImg(question);
        if (inv) {
          contextRef.current.globalCompositeOperation = "source-over";
        }
        canvasRef.current.getContext("2d").drawImage(question, 0, 0);
        setCanvasDrawn([canvasRef.current.toDataURL()]);
        setCanvasStage(0);
        if (inv) {
          contextRef.current.globalCompositeOperation = "destination-out";
        }
      };
    }
  };
  //Create CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = height;
    canvas.style.backgroundColor = "rgb(255, 255, 255)";
    canvas.style.borderRadius = "12px";
    canvas.style.cursor = "crosshair";

    //Draw
    const context = canvas.getContext("2d", { willReadFrequently: true });
    // context.scale(2, 2);
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.strokeStyle = "black";
    context.LineCap = "round";
    contextRef.current = context;
  }, [height]);

  //ADD PAGE
  const addPage = () => {
    const canvas = canvasRef.current;
    const addheight = 1122;
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height + addheight;

    const newContext = newCanvas.getContext("2d");
    //copy
    newContext.drawImage(canvas, 0, 0);

    canvas.height = newCanvas.height;
    const context = canvas.getContext("2d");

    context.drawImage(newCanvas, 0, 0);
  };

  const handleButtonClick = () => {
    addPage();
  };

  //start Drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  //Finish Drawing
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    if (canvasStage + 1 < canvasDrawn.length) {
      canvasDrawn.length = canvasStage + 1;
    }
    setCanvasDrawn([...canvasDrawn, canvasRef.current.toDataURL()]);
    setCanvasStage(canvasStage + 1);
  };

  function getMousePositionOnCanvas(event) {
    const clientX = event.targetTouches[0]
      ? event.targetTouches[0].pageX
      : event.changedTouches[event.changedTouches.length - 1].pageX;
    const clientY = event.targetTouches[0]
      ? event.targetTouches[0].pageY
      : event.changedTouches[event.changedTouches.length - 1].pageY;
    // const clientX = event.clientX || event.touches[0].clientX;
    // const clientY = event.clientY || event.touches[0].clientY;
    const { offsetLeft, offsetTop } = event.target;
    const canvasX = clientX - offsetLeft;
    const canvasY = clientY - offsetTop;

    return { x: canvasX, y: canvasY };
  }

  function handleWritingStart() {
    const mousePos = getMousePositionOnCanvas(event);

    contextRef.current.beginPath();

    contextRef.current.moveTo(mousePos.x, mousePos.y);
    setIsDrawing(true);
  }

  function handleWritingInProgress() {
    if (isDrawing) {
      const mousePos = getMousePositionOnCanvas(event);
      contextRef.current.lineTo(mousePos.x, mousePos.y);
      contextRef.current.stroke();
    }
  }

  const undoCanvas = () => {
    contextRef.current.globalCompositeOperation = "source-over";
    if (canvasStage > 0) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const newStage = canvasStage - 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (canvasStage > 0) {
        var canvasPic = new Image();
        canvasPic.src = canvasDrawn[newStage];
        canvasPic.onload = function () {
          context.drawImage(canvasPic, 0, 0);
        };
      } else {
        loadQuestion(props.file);
      }
      setCanvasStage(newStage);
    }
  };

  const uploadPDF = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    pdfjsLib
      .getDocument(URL.createObjectURL(file))
      .promise.then((pdf) => {
        setPdf(pdf);
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const redoCanvas = () => {
    if (canvasStage < canvasDrawn.length - 1) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const newStage = canvasStage + 1;
      var canvasPic = new Image();
      canvasPic.src = canvasDrawn[newStage];
      canvasPic.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(canvasPic, 0, 0);
      };
      setCanvasStage(newStage);
    }
  };

  const replacePixel = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var canvasBg = document.createElement("canvas");
    canvasBg.width = canvas.width;
    canvasBg.height = canvas.height;
    var contextBg = canvasBg.getContext("2d", { willReadFrequently: true });
    contextBg.drawImage(backgroundImg, 0, 0);
    const imgDataBg = contextBg.getImageData(
      0,
      0,
      canvasBg.width,
      canvasBg.height
    );

    for (
      let i = x - Math.ceil(value / 1.5);
      i < x + Math.ceil(value / 1.5);
      i++
    ) {
      for (
        let j = y - Math.ceil(value / 1.5);
        j < y + Math.ceil(value / 1.5);
        j++
      ) {
        const index = 4 * (i + j * canvas.width);
        canvasImgData.data[index + 0] = imgDataBg.data[index + 0];
        canvasImgData.data[index + 1] = imgDataBg.data[index + 1];
        canvasImgData.data[index + 2] = imgDataBg.data[index + 2];
        canvasImgData.data[index + 3] = imgDataBg.data[index + 3];
      }
    }
    ctx.putImageData(canvasImgData, 0, 0);
  };

  //Drawing
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    if (
      contextRef?.current?.globalCompositeOperation &&
      sizeName === "Erase Size" &&
      backgroundImg
    ) {
      replacePixel(offsetX, offsetY);
    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    }
  };

  // useEffect(()=>{
  //   var currentPage = 1,
  //   canvasImages = [],
  //   url = '/que.pdf';              // specify a valid url

  //   pdfjsLib.getDocument(url).promise.then(iterate);
  //   function iterate(pdf) {

  //     // init parsing of first page
  //     if (currentPage <= pdf.numPages) getPage();

  //     // main entry point/function for loop
  //   // main entry point/function for loop
  //       function getPage() {
  //       // when promise is returned do as usual
  //       pdf.getPage(currentPage).then(function(page) {
  //           var scale = 1.35;
  //           var viewport = page.getViewport({scale: scale});

  //           // Prepare canvas using PDF page dimensions
  //           var canvas = document.createElement('canvas');
  //           var context = canvas.getContext('2d');
  //           canvas.height = viewport.height;
  //           canvas.width = viewport.width;

  //           // Render PDF page into canvas context
  //           var renderContext = {
  //             canvasContext: context,
  //             viewport: viewport
  //           };
  //           var renderTask = page.render(renderContext);
  //           renderTask.promise.then(function () {
  //             // store compressed image data in array
  //             const imgData = canvas.toDataURL();
  //             var image = new Image();
  //             image.src = imgData;
  //             image.onload = function() {
  //               canvasImages.push(image);
  //             };

  //             if (currentPage < pdf.numPages) {
  //                 currentPage++;
  //                 getPage();        // get next page
  //             } else {
  //               setPdfImages(canvasImages);
  //             }
  //           });

  //       });
  //   }
  // }
  // },[])

  // useEffect(()=>{
  //   if(pdfImages.length && canvasStage === -1) {
  //     let startY = 0;
  //     let totalHeight = 0;
  //     let totalWidth = 800;
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     for(let i =0;i<pdfImages.length;i++) {
  //       const img = pdfImages[i];
  //       totalHeight = totalHeight + img.height;
  //       totalWidth = totalWidth < img.width ? img.width : totalWidth
  //     }
  //     canvas.height = totalHeight;
  //     for(let j =0;j<pdfImages.length;j++) {
  //       const img = pdfImages[j];
  //       ctx.drawImage(img, 0, startY);
  //       startY = startY + img.height;
  //     }
  //   }
  // },[pdfImages, canvasStage])

  const columns = React.useMemo(
    () => [
      { Header: "Question", Cell: ({ row }) => <h5>{row.original.title}</h5> },
      {
        Header: "File",
        Cell: ({ row }) => (
          <>
            <div className="que-ans">
              <img
                src={ASSIGNMENT_QUESTION_IMAGE_PREFIX + row.original.image}
                alt={row.original.title}
              />
            </div>
          </>
        ),
      },
      {
        Header: "Obtained Score",
        Cell: ({ row }) => {
          return (
            <>
              <div className="actionbox">
                <div className="video">
                  <input type="text" />
                </div>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="container grid">
        <div className="tool">
          <div className="custom-file mb-3">
            <label className="custom-file-label" htmlFor="customFile">
              <FileUploadIcon /> Upload Assignment
            </label>
            <Input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="filename"
              onChange={uploadPDF}
            />
          </div>
          <div>
            <Button variant="contained" onClick={saveImage}>
              <FileDownloadIcon /> Download Assignment
            </Button>
          </div>
        </div>
        <hr></hr>
        <div className="tool">
          <div>
            <label htmlFor="">{sizeName}</label>
            <select value={value} onChange={handleChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="32">32</option>
              <option value="48">48</option>
              <option value="64">64</option>
              <option value="72">72</option>
              <option value="108">108</option>
            </select>
          </div>

          <div>
            <Button variant="contained" onClick={setToDraw}>
              Draw
            </Button>
          </div>

          {/* <div>
            <label htmlFor="">Color</label>
            <input type="color" value={color} onChange={colorChange} name="" id="" />
          </div> */}

          {/* <div>
            <label>Image</label>
            <input type="file" onChange={uploadImage} name="" id="" />

          </div> */}

          <div>
            <Button variant="contained" onClick={setToErase}>
              Erase
            </Button>
          </div>

          {/* ----------ADD Page---------------   */}
          <div>
            <Button variant="contained" onClick={handleButtonClick}>
              Add Page
            </Button>
          </div>

          <div>
            <Button onClick={undoCanvas}>
              <UndoIcon />
            </Button>
          </div>
          <div>
            <Button onClick={redoCanvas}>
              <RedoIcon />
            </Button>
          </div>
          <div>
            <Button variant="contained">Save as draft</Button>
          </div>
          <Button variant="contained" onClick={saveImage}>
            Submit Answer
          </Button>
        </div>

        <div className="canvasbox">
          {loading ? (
            <>
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#5b58ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </>
          ) : null}
          <canvas
            id="0"
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onTouchStart={handleWritingStart}
            onTouchMove={handleWritingInProgress}
            onTouchEnd={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            style={{ backgroundColor: "white", border: "2px solid black" }}
          />
        </div>
        {getCurrentRole() === roles.instructor ? (
          <span className="float" onClick={() => setShowScore(true)}>
            <i className="fa fa-plus my-float">
              <ScoreboardIcon /> Scores
            </i>
          </span>
        ) : null}
        <Modal
          className="coursemodal"
          open={showScore}
          onClose={() => setShowScore(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box ">
            <div className="create-detail">
              <p>Scores board</p>
              <Button
                className="closequestionicon"
                onClick={() => setShowScore(false)}
              >
                <CloseIcon />
              </Button>
            </div>
            {loading ? (
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#0AB39C"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              <CustomReactTable
                columns={columns}
                data={data}
                loading={loading}
              />
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default App;

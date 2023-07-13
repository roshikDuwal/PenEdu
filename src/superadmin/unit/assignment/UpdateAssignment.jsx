// import { useEffect, useRef, useState } from "react";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ASSIGNMENT_IMAGE_PREFIX } from "../../../constants/url";
import { Box, Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { error, success } from "../../../utils/toast";
import { ThreeDots } from "react-loader-spinner";

import { useFormik } from "formik";
import { addAssignment } from "../../../schema/validate";
import CloseIcon from "@mui/icons-material/Close";
import { updateAssignment } from "../../../services/assignments";

const UpdateAssignment = ({ assignment, getData }) => {
  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [img, setImg] = useState(ASSIGNMENT_IMAGE_PREFIX + assignment.file);
  const [loading, setLoading] = useState(false);
  const [pdfImages, setPdfImages] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    resetForm();
    setOpen(false);
    setFile(null);
  };

  const handleOpen = () => {
    setImg(null);
    setOpen(true);
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
      let startY = 0;
      let totalHeight = 0;
      let totalWidth = 300;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < pdfImages.length; i++) {
        const img = pdfImages[i];
        totalHeight = totalHeight + img.height;
        totalWidth = totalWidth < img.width ? img.width : totalWidth;
      }
      canvas.height = totalHeight;
      canvas.width = totalWidth;
      for (let j = 0; j < pdfImages.length; j++) {
        const img = pdfImages[j];
        ctx.drawImage(img, 0, startY);
        startY = startY + img.height;
      }
      const img = canvas.toDataURL("image/png");
      setImg(img);
      setPdfImages([]);
      ctx.restore();
    }
  }, [pdfImages]);

  const uploadFile = (e) => {
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

  const {
    values,
    errors,
    setFieldValue,
    handleBlur,
    resetForm,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    validationSchema: addAssignment,
    initialValues: { ...assignment, file: "" },
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const data = {
          ...values,
          score: values.score.toString(),
        };
        if (img) {
          data.file = img;
        } else {
          delete data.file;
        }
        await updateAssignment(assignment.id, data);
        success("Assignment updated successfully!");
        action.resetForm();
        getData();
        handleClose();
      } catch (e) {
        error(e.message || "Failed to updated assignment!");
      }
    },
  });
  const schedule =
    (assignment.assignment_schedule?.length &&
      assignment.assignment_schedule[0]) ||
    {};
  return (
    <>
      <div className="container">
        <div className="form">
          <div className="form-container p-5">
            <div className="space-between">
              <h5>Title: {assignment.title || "-"}</h5>
              <Button onClick={handleOpen}>
                {" "}
                <EditIcon />
                {"  "} Edit
              </Button>
            </div>
            <div className="space-between">
              <h5>Start Date: {schedule.start_date || "-"}</h5>
              <h5>End Date: {schedule.end_date || "-"}</h5>
              <h5>Total Score: {assignment.score || "-"}</h5>
            </div>
            <Modal
              className="unitmodal"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="modal-box ">
                <div className="create-detail">
                  <p>Edit Assignment</p>
                  <Button className="closequestionicon" onClick={handleClose}>
                    <CloseIcon />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="instructor-form">
                  <div className="formbox">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.title && touched.title ? (
                      <p className="errorval">{errors.title}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="score">Score</label>
                    <input
                      type="number"
                      name="score"
                      value={values.score}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.score && touched.score ? (
                      <p className="errorval">{errors.score}</p>
                    ) : null}
                  </div>

                  <div className="formbox">
                    <label htmlFor="credit_hours">Change PDF</label>
                    <input
                      type="file"
                      name="file"
                      value={values.file}
                      onChange={(e) => {
                        uploadFile(e);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="submitbtn">
                    <button disabled={isSubmitting || loading} type="submit">
                      <EditIcon /> Update
                    </button>
                  </div>
                </form>
                <div className="modal-body">
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
                  ) : (
                    <img
                      src={img || ASSIGNMENT_IMAGE_PREFIX + assignment.file}
                    />
                  )}
                </div>
              </Box>
            </Modal>
            <div className="body">
              <img src={ASSIGNMENT_IMAGE_PREFIX + assignment.file} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAssignment;

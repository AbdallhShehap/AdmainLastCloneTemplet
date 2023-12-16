import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Import the styles
export default function ThirdMarquee() {

    const [marqueeData, setMarqueeData] = useState([]);

    const [selectedOption, setSelectedOption] = useState("");

    const [text, setText] = useState("");

    const [selectedImage, setSelectedImage] = useState("");

    const [selectedImageId, setSelectedImageId] = useState("");

    const [selectedBottomImageId, setSelectedBottomImageId] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);


    const [selectedOptionTopImg, setSelectedOptionTopImg] = useState("");


    const [selectedOptionBottomImg, setSelectedOptionBottomImg] = useState("");

    const [selectedTopImgFiles, setSelectedTopImgFiles] = useState([]);

    const [selectedBottomImgFiles, setSelectedBottomImgFiles] = useState([]);

    const [topImages, setTopImages] = useState([]);
    const [bottomImages, setBottomImages] = useState([]);

      // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1010/thirdmarquee/thirdmarquee');
        setMarqueeData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const fetchTopImages = async () => {
      try {
        const response = await axios.get('http://localhost:1010/thirdmarquee/topcircleimg');
        setTopImages(response.data);
      } catch (error) {
        console.error("Error fetching top images: ", error);
      }
    };

    const fetchBottomImages = async () => {
      try {
        const response = await axios.get('http://localhost:1010/thirdmarquee/bottomcircleimg');
        setBottomImages(response.data);
      } catch (error) {
        console.error("Error fetching bottom images: ", error);
      }
    };

    fetchData();
    fetchTopImages();
    fetchBottomImages();
  }, []);

  // Handle option selection
  const handleSelection = (e) => {
    const selectedId = e.target.value;
    const selectedItem = marqueeData.find(item => item["id-third-marquee"].toString() === selectedId);

    if (selectedItem) {
      setSelectedOption(selectedId);
      setText(selectedItem.titleThirdMarquee);
      setSelectedImage(`http://localhost:1010/${selectedItem.imageThirdMarqueePath}`);
    }
  };

  const DeletePost = async () => {
    if (selectedOption) {
      try {
        await axios.delete(`http://localhost:1010/thirdmarquee/thirdmarquee/${selectedOption}`);
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();

        // Update the local state to reflect the deletion
        setMarqueeData(marqueeData.filter(item => item["id-third-marquee"].toString() !== selectedOption));
        setSelectedOption(""); // Reset the selected option
        setText(""); // Reset the text
        setSelectedImage(""); // Reset the image
      } catch (error) {
        console.error("Error deleting post: ", error);
        Toastify({
          text: "Error deleting post",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();
      }
    }
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFileTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
      'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
  
    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);
  
      // Update image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Invalid file type. Please select an image or video file.");
      e.target.value = ''; // Reset the file input
    }
  };
  




  const UpdatePost = async () => {
    const formData = new FormData();
    formData.append('titleThirdMarquee', text);
    if (selectedFile) {
      formData.append('imagethirdmarquee', selectedFile);
    }

    try {
      await axios.put(`http://localhost:1010/thirdmarquee/thirdmarquee/${selectedOption}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();

      // You may need to refetch or update marqueeData here to reflect the changes
    } catch (error) {
      console.error("Error updating post: ", error);
      Toastify({
        text: "Error updating post",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };



  const AddPost = async () => {
    if (!text && !selectedFile) {
      // Notify the admin that at least one of text or image is required
      Toastify({
        text: "Please add text or select an image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    const formData = new FormData();
    if (text) {
      formData.append('titleThirdMarquee', text);
    }
    if (selectedFile) {
      formData.append('imagethirdmarquee', selectedFile);
    }
  
    try {
      await axios.post('http://localhost:1010/thirdmarquee/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      
  
      Toastify({
        text: "Added successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
  
      // Handle successful addition (e.g., refresh the marqueeData or clear the form)
    } catch (error) {
      console.error("Error adding post: ", error);
      Toastify({
        text: "Error adding post",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };

  

  const handleTopImgFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const allowedFileTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
      'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
    ];
  
    const allFilesValid = files.every(file => allowedFileTypes.includes(file.type));
  
    if (allFilesValid) {
      setSelectedTopImgFiles(files);
    } else {
      alert("One or more files are not valid image types. Please select only image files.");
      e.target.value = ''; // Reset the file input
    }
  };
  

  // Function to add images
  const AddTopImg = async () => {
    const formData = new FormData();
    
    // Append each selected file to formData
    for (let i = 0; i < selectedTopImgFiles.length; i++) {
      formData.append('topCircleImg', selectedTopImgFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:1010/thirdmarquee/addtopimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      
      Toastify({
        text: "Images added successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();

      setTopImages([...topImages, response.data]); // Assuming response.data is the new category object

    } catch (error) {
      console.error("Error adding images: ", error);
      Toastify({
        text: "Error adding images",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  



  const handleBottomImgFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const allowedFileTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
      'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
    ];
  
    const allFilesValid = files.every(file => allowedFileTypes.includes(file.type));
  
    if (allFilesValid) {
      setSelectedBottomImgFiles(files);
    } else {
      alert("One or more files are not valid image types. Please select only image files.");
      e.target.value = ''; // Reset the file input
    }
  };
  

  const AddBottomImg = async () => {
    const formData = new FormData();
    
    // Append each selected file to formData
    for (let i = 0; i < selectedBottomImgFiles.length; i++) {
      formData.append('bottomCircleImg', selectedBottomImgFiles[i]);
    }

    try {
     const response = await axios.post('http://localhost:1010/thirdmarquee/addbottomimg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      Toastify({
        text: "Images added successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();

      
      window.location.reload();

    } catch (error) {
      console.error("Error adding images: ", error);
      Toastify({
        text: "Error adding images",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };

  const getImageUrlById = (id, isTopImage) => {
    const images = isTopImage ? topImages : bottomImages;
    const image = images.find(img => img[isTopImage ? "id-top-circle-img" : "id-bottom-circle-img"] === id);
    return image ? `http://localhost:1010/${image[isTopImage ? "topCircleImgPath" : "bottomCircleImgPath"]}` : '';
  };



  const UpdateTopImg = async () => {
    // Check if a file has been selected
    if (!selectedTopImgFiles.length) {
      Toastify({
        text: "Please select an image to update",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    const imageId = selectedImageId; // Use the image ID for the update operation
  
    const formData = new FormData();
    formData.append('topCircleImg', selectedTopImgFiles[0]);
  
    try {
      const response = await axios.put(`http://localhost:1010/thirdmarquee/topcircleimg/${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Check the response from the server
  
      Toastify({
        text: "Image updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();


      window.location.reload();

      // Refresh the image list or update state as needed after successful upload
    } catch (error) {
      console.error("Error updating the image: ", error.response ? error.response.data : error.message);
      Toastify({
        text: "Error updating image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  


  const UpdateBottomImg = async () => {
    // Check if a file has been selected
    if (!selectedBottomImgFiles.length) {
      Toastify({
        text: "Please select an image to update",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    const imageId = selectedBottomImageId; // Use the image ID for the update operation
  
    const formData = new FormData();
    formData.append('bottomCircleImg', selectedBottomImgFiles[0]);
  
    try {
      const response = await axios.put(`http://localhost:1010/thirdmarquee/bottomcircleimg/${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.imgPath); // Check the response from the server
  
      Toastify({
        text: "Image updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
      
      window.location.reload();

    } catch (error) {
      console.error("Error updating the image: ", error.response ? error.response.data : error.message);
      Toastify({
        text: "Error updating image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  
  const DeleteTopImg = async () => {
    if (!selectedImageId) {
      Toastify({
        text: "Please select a top image to delete",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    try {
      await axios.delete(`http://localhost:1010/thirdmarquee/topcircleimg/${selectedImageId}`);
      Toastify({
        text: "Top image deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
     
      window.location.reload();

    } catch (error) {
      console.error("Error deleting the top image: ", error);
      Toastify({
        text: "Error deleting top image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  
  const DeleteBottomImg = async () => {
    if (!selectedBottomImageId) {
      Toastify({
        text: "Please select a bottom image to delete",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    try {
      await axios.delete(`http://localhost:1010/thirdmarquee/bottomcircleimg/${selectedBottomImageId}`);
      Toastify({
        text: "Bottom image deleted successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();


            window.location.reload();

    } catch (error) {
      console.error("Error deleting the bottom image: ", error);
      Toastify({
        text: "Error deleting bottom image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  

  return (
    <>
        
        <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../../assets/img/marquee.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>


                  <Row className="mt-5">
                    <h3>Add</h3>
                  </Row>


                  <Row className="mt-5">
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text</label>
                        <Input
                          type="text"
                          onChange={(e) => setText(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon</label>
                        <Input
                          type="file"
                  onChange={handleFileChange} 
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={AddPost}                        >
                          Add
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <h3>Edit & Delete</h3>
                  </Row>

                  <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <label>Marquee Word's</label>
            <Input
              type="select"
              value={selectedOption}
              onChange={handleSelection}
            >
              <option value="" disabled>Select Text's</option>
              {marqueeData.map((item) => (
                <option key={item["id-third-marquee"]} value={item["id-third-marquee"]}>
                  {item.titleThirdMarquee}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        {selectedOption && (
          <>
            <Col className="px-1" md="3">
              <FormGroup>
                <label>Text</label>
                <Input
                  value={text}
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col className="px-1" md="3">
              <FormGroup>
                <label>Icon</label>
                <img src={selectedImage} alt="Selected Icon" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </FormGroup>
            </Col>

            <Col className="px-1" md="3">
  <FormGroup>
    <label>icon</label>
    <Input
      type="file"
      onChange={handleFileChange} 
      accept="image/*"
    />
  </FormGroup>
</Col>

                        <Col className="px-2 mt-3" md="3">
                          <FormGroup>
                            <Button
                              className="btn-round"
                              color="primary"
                              type="button"
                              onClick={UpdatePost}

                            >
                              Update
                            </Button>

                        <Button
                  className="btn-round btn-danger"
                  color="primary"
                  type="button"
                  onClick={DeletePost} // Add onClick handler for Delete
                >
                  Delete
                </Button>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>



                  
                  <Row className="mt-5">
                    <h3>Top Imag's</h3>
                  </Row>

                  <Row className="mt-5">
        <Col className="px-1 ml-4" md="2">
          <FormGroup>
            <label>Imag's</label>
            <Input
              type="file"
              onChange={handleTopImgFileChange}
              accept="image/*"
              multiple  // Allows selection of multiple files
            />
          </FormGroup>
        </Col>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={AddTopImg}
            >
              Add 
            </Button>
          </FormGroup>
        </Col>
      </Row>




                  <Row className="mt-5">
                    <h3>bottom Imag's</h3>
                  </Row>

                  <Row className="mt-5">
        <Col className="px-1 ml-4" md="2">
          <FormGroup>
            <label>Imag's</label>
            <Input
              type="file"
              onChange={handleBottomImgFileChange}
              accept="image/*"
              multiple  // Allows selection of multiple files
            />
          </FormGroup>
        </Col>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={AddBottomImg}
            >
              Add 
            </Button>
          </FormGroup>
        </Col>
      </Row>



                  <Row className="mt-5">
                    <h3>Edit & Delete Imag's</h3>
                  </Row>

                  <Row>
        <Col className="px-2 mt-3" md="3">
        <FormGroup>
  <label>Top Imag's</label>
  <Input
  type="select"
  value={selectedImageId} // Use the image ID for value
  onChange={(e) => {
    const selectedId = e.target.value;
    setSelectedImageId(selectedId); // Store the selected image ID

    const selectedImg = topImages.find(img => img["id-top-circle-img"].toString() === selectedId);
    if (selectedImg) {
      setSelectedOptionTopImg(`http://localhost:1010/${selectedImg.topCircleImgPath}`);
    } else {
      setSelectedOptionTopImg(''); // Clear the image URL if the ID does not match
    }
  }}
>
    <option value="" disabled>Select Image</option>
    {topImages.map((img) => (
    <option key={img["id-top-circle-img"]} value={img["id-top-circle-img"]}>
      {img.topCircleImgPath.split('/').pop()} {/* Extracting image name */}
    </option>
  ))}
</Input>
</FormGroup>
<div style={{height:"200px"}}>
  {selectedOptionTopImg && (
    <img src={selectedOptionTopImg} style={{ maxHeight: '150px', maxWidth: '100%' }} alt="Selected Top Image" />
  )}
</div>


        </Col>
      </Row>

                  <Row>
                    {selectedOptionTopImg && (
                      <>
                       

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              type="file"
                              onChange={handleTopImgFileChange}

                              accept="image/*"
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-2 mt-3" md="3">
                          <FormGroup>
                            <Button
                              className="btn-round"
                              color="primary"
                              type="button"
                              onClick={UpdateTopImg}
                            >
                              Update
                            </Button>

                            <Button
  className="btn-round btn-danger"
  color="primary"
  type="button"
  onClick={DeleteTopImg} // Attach the delete function for top images
>
  Delete
</Button>

                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>

                  <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <label>Bottom Imag's</label>
            <Input
              type="select"
              value={selectedBottomImageId} // Use the image ID for value
             

                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedBottomImageId(selectedId); // Store the selected image ID
              
                  const selectedImg = bottomImages.find(img => img["id-bottom-circle-img"].toString() === selectedId);
                  if (selectedImg) {
                    setSelectedOptionBottomImg(`http://localhost:1010/${selectedImg.bottomCircleImgPath}`);
                  } else {
                    setSelectedOptionBottomImg(''); // Clear the image URL if the ID does not match
                  }
                }}
            >
              <option value="" disabled>Select Image</option>
              {bottomImages.map((img) => (
    <option key={img["id-bottom-circle-img"]} value={img["id-bottom-circle-img"]}>
      {img.bottomCircleImgPath.split('/').pop()} {/* Extracting image name */}
    </option>
  ))}
            </Input>
          </FormGroup>
          <div style={{height:"200px"}}>
  {selectedOptionBottomImg && (
    <img src={selectedOptionBottomImg} style={{ maxHeight: '150px', maxWidth: '100%' }} alt="Selected Top Image" />
  )}
</div>

        </Col>
      </Row>

                  <Row>
                    {selectedOptionBottomImg && (
                      <>
                       

                       <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              type="file"
                              onChange={handleBottomImgFileChange}

                              accept="image/*"
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-2 mt-3" md="3">
                          <FormGroup>
                            <Button
                              className="btn-round"
                              color="primary"
                              type="button"
                              onClick={UpdateBottomImg}
                            >
                              Update
                            </Button>

                            <Button
  className="btn-round btn-danger"
  color="primary"
  type="button"
  onClick={DeleteBottomImg} // Attach the delete function for bottom images
>
  Delete
</Button>

                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>
                  

    </>
  )
}

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
export default function FirstMarquee() {
    const [marqueeData, setMarqueeData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

      // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1010/firstmarquee/firstmarquee');
        setMarqueeData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Handle option selection
  const handleSelection = (e) => {
    const selectedId = e.target.value;
    const selectedItem = marqueeData.find(item => item["id-first-marquee"].toString() === selectedId);

    if (selectedItem) {
      setSelectedOption(selectedId);
      setText(selectedItem.titleFirstMarquee);
      setSelectedImage(`http://localhost:1010/${selectedItem.imageFirstMarqueePath}`);
    }
  };

  const DeletePost = async () => {
    if (selectedOption) {
      try {
        await axios.delete(`http://localhost:1010/firstmarquee/firstmarquee/${selectedOption}`);
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();

        // Update the local state to reflect the deletion
        setMarqueeData(marqueeData.filter(item => item["id-first-marquee"].toString() !== selectedOption));
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
      e.target.value = null; // Reset the file input
    }
  };
  
  




  const UpdatePost = async () => {
    const formData = new FormData();
    formData.append('titleFirstMarquee', text);
    if (selectedFile) {
      formData.append('imagefirstmarquee', selectedFile);
    }

    try {
      await axios.put(`http://localhost:1010/firstmarquee/firstmarquee/${selectedOption}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
           // Update the item in the state
    const updatedData = marqueeData.map(item => 
      item["id-first-marquee"].toString() === selectedOption
        ? { ...item, titleFirstMarquee: text, imageFirstMarqueePath: selectedFile ? 'path/to/new/image' : item.imageFirstMarqueePath }
        : item
    );
    setMarqueeData(updatedData);

    

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
      formData.append('titleFirstMarquee', text);
    }
    if (selectedFile) {
      formData.append('imagefirstmarquee', selectedFile);
    }
  
    try {
      await axios.post('http://localhost:1010/firstmarquee/add', formData, {
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
                <option key={item["id-first-marquee"]} value={item["id-first-marquee"]}>
                  {item.titleFirstMarquee}
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
    </>
  )
}

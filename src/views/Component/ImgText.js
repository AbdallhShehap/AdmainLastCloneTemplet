import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Row,
  Label,
} from "reactstrap";

import Toastify from "toastify-js";


function YourComponent() {
  const [title, setTitle] = useState(""); // assuming title is a state used for Small Text and Big Text
  const [logo, setLogo] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

 
  const [logoFile, setLogoFile] = useState(null);


  const AddPost = async () => {
    Toastify({
      text: "Added completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#5EC693",
    }).showToast();
  };
  
  const UpdatePost = async () => {
    Toastify({
      text: "Updated completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#5EC693",
    }).showToast();
  };

  const DeletePost = async () => {
    Toastify({
      text: "Deleted completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#ce5151",
    }).showToast();
  };




  const handleLogoChange = (e) => {
    const selectedFile = e.target.files[0];

    // Check if a file is selected
    if (selectedFile) {
      // Check if the selected file type is an image
      if (selectedFile.type.startsWith("image/")) {
        setLogoFile(selectedFile);
      } else {
        // Alert or handle the case when the selected file is not an image
        alert("Please select an image file.");
      }
    }
  };

  const handleAdd = () => {
    // Handle the logic to add the data, including the title and logo
    console.log("Title:", title);
    console.log("Logo:", logo);
    // Add your logic here to store or process the data
  };

  return (
    <>
    
      <Row>
        <Col className="px-1" md="3">
          <FormGroup>
            <label>Small Text</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Big Text</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Background Image</label>
            <Input
              type="file"
              onChange={handleLogoChange}
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
              onClick={AddPost}
            >
              Add
            </Button>
          </FormGroup>
        </Col>
      </Row>

      <Row>
                  <Col className="px-2 mt-3" md="3">
        <FormGroup>
          <label>Select Our Services</label>
          <Input
            type="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>Our Services</option>
            <option value="option1">TECHNOLOGY PROCESS</option>
            <option value="option2">UI FOR MUSIC WEBSITE</option>
            <option value="option3">WEBSITE FOR AGEN</option>
            {/* Add more options as needed */}
          </Input>
        </FormGroup>
      </Col>
    </Row>

    <Row>
    {selectedOption && (
        <>
      <Col className="px-1" md="3">
          <FormGroup>
            <label>Small Text</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>


        <Col className="px-1" md="3">
          <FormGroup>
            <label>Big Text</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label> Background Image</label>
            <Input
              type="file"
              onChange={handleLogoChange}
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
                className="btn-round  btn-danger"
                color="primary"
                type="button"
                onClick={DeletePost}
              >
                Delete
              </Button>
              
            </FormGroup>
         
          </Col>

          
          
        </>
      )}
    </Row>
    </>
  );
}

export default YourComponent;

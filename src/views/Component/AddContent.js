import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Toastify from "toastify-js";

function YourComponent() {
  const [contentItems, setContentItems] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showAddAll, setShowAddAll] = useState(false);
  const [showAdditionalContentFields, setShowAdditionalContentFields] =
  useState(false);
const [numContent, setNumContent] = useState(0);


  const handleAddContentField = () => {
    if (numContent < 3) {
      setNumContent(numContent + 1);
      setShowAdditionalContentFields(true);
    } else {
      alert("Available Three Content Field's as a Maximum ");
    }
  };



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



  const handleAddContent = () => {
    setContentItems([...contentItems, { subTitle, content }]);
    setSubTitle("");
    setContent("");
    setShowAddAll(true)
  };


    
  const [logoFile, setLogoFile] = useState(null);

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



  return (
    <>


<Row>
                  <Col className="px-2 mt-3" md="3">
        <FormGroup>
          <label>Select Content for Benefits</label>
          <Input
            type="select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="" disabled>Content Benefits</option>
            <option value="option1">High Standarts</option>
            <option value="option2">Focus on People</option>
            <option value="option3">Different Thinking</option>
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
              <label>Sub Title</label>
              <Input
                type="text"
               
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Content</label>
              <Input
                type="text"
                
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




      <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={handleAddContentField}
            >
              Add Content
            </Button>
          </FormGroup>
        </Col>
      </Row>

      {[...Array(numContent)].map((_, index) => (
        <Row key={index}>
          {showAdditionalContentFields && (
            <>
            
            <Col className="px-1" md="3">
            <FormGroup>
              <label>Sub Title</label>
              <Input
                type="text"
                
               
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Content</label>
              <Input
                type="text"
               
                
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
            </>
          )}
        </Row>
      ))}

      {contentItems.map((item, index) => (
        <Row key={index}>
          <Col className="px-1" md="3">
            <FormGroup>
              <label>Sub Title</label>
              <Input
                type="text"
                value={item.subTitle}
               
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Content</label>
              <Input
                type="text"
                value={item.content}
                
              />
            </FormGroup>
          </Col>
        </Row>
      ))}

      {showAddAll && (
        <>
        
<Row>
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
        </>
      )}

    </>
  );
}

export default YourComponent;

import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import AddSocial from '../Component/AddSocial'
import Toastify from "toastify-js";


function SideMenu() {



  const [logoFile, setLogoFile] = useState(null);

  const [showAdditionalContentFields, setShowAdditionalContentFields] =
    useState(false);
  const [numContent, setNumContent] = useState(0);





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



  const handleAddBlogField = () => {
    if (numContent < 3) {
      setNumContent(numContent + 1);
      setShowAdditionalContentFields(true);
    } else {
      alert("Available Three Content Field's as a Maximum ");
    }
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

  return (
    <>
     
        <Row >
          <Col className="px-1" md="3">
            <FormGroup>
              <label>Logo</label>
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


        <Row >
      

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Title Side menu</label>
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
        </Row>


        <Row >



        
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={handleAddBlogField}
            >
              Add Content Field
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
              <label>  Content </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>


              <Col className="px-2 mt-3" md="3">
                <FormGroup>
                  <Button className="btn-round" color="primary" type="button" onClick={AddPost}>
                    Add
                  </Button>
                </FormGroup>
              </Col>
            </>
          )}
        </Row>
      ))}




        <Row className="mt-5 mb-5">
        <Col className="px-1" md="3">
            <FormGroup>
              <label> Title Subscribe Section </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>

        <Col className="px-1" md="3">
            <FormGroup>
              <label> Place holder for Subscribe input </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>


        <Col className="px-1" md="3">
            <FormGroup>
              <label> Text under the input </label>
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
                </FormGroup>
              </Col>

        </Row>


      <Row>
        <Col className="px-2 mt-3" md="12">
          <FormGroup>
           <AddSocial/>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

export default SideMenu;

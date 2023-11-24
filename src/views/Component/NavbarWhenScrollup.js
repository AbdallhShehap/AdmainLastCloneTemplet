import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import Toastify from "toastify-js";

function NavbarWhenScrollup() {
  const [items, setItems] = useState([]);
  const [selectedOptionPage, setSelectedOptionPage] = useState("");
  
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





  const handleAddItem = () => {
    setItems([
      ...items,
      {
        title: "",
        path: "",
      },
    ]);
  };

  const handleItemChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;
    setItems(updatedItems);
  };

  return (
    <>
      {items.map((item, index) => (
        <Row key={index}>
          <Col className="px-1" md="3">
            <FormGroup>
              <label>Page Name</label>
              <Input
                type="text"
                onChange={(e) => handleItemChange(e, index, "title")}
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Path</label>
              <Input
                type="text"
                onChange={(e) => handleItemChange(e, index, "path")}
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
      ))}

      <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={handleAddItem}
            >
              + Add more Pages
            </Button>
          </FormGroup>
        </Col>
      </Row>


      <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>About Us</label>
                        <Input
                          type="select"
                          value={selectedOptionPage}
                          onChange={(e) => setSelectedOptionPage(e.target.value)}
                        >
                          <option value="" disabled>
                           Pages
                          </option>
                          <option value="option1">
                          Page Name 1
                          </option>
                          <option value="option2">
                          Page Name 2
                          </option>
                          <option value="option3">
                          Page Name 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOptionPage && (
                      <>
                           <Col className="px-1" md="3">
            <FormGroup>
              <label>Page Name</label>
              <Input
                type="text"
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Path</label>
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
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Logo </label>
                        <input
                          type="file"
                          name="imageleft"
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
                </FormGroup>
              </Col>
              
                  </Row>
    
                
                
      <Row>
      <Col className="px-1" md="3">
            <FormGroup>
              <label>Background Color " HEXA CODE" </label>
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
    
    </>
  );
}

export default NavbarWhenScrollup;

import React, { useState } from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import Toastify from "toastify-js";

function YourComponent() {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [numRows, setNumRows] = useState(0); // Initial number of rows
  const [showAdditionalBlogFields, setShowAdditionalBlogFields] =
    useState(false);
  const [numBlogs, setNumBlogs] = useState(0); // Initial number of Blogs
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [number, setNumber] = useState("");
  const [content, setContent] = useState("");
  const [selectedOptionDetailes, setSelectedOptionDetailes] = useState("");
  const [selectedOptionDetailesBlog, setSelectedOptionDetailesBlog] = useState("");


  
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
    if (numBlogs < 4) {
      setNumBlogs(numBlogs + 1);
      setShowAdditionalBlogFields(true);
    } else {
      alert("Available Four blog Field's as a Maximum ");
    }
  };

  const handleAddField = () => {
    if (numRows < 4) {
      setNumRows(numRows + 1);
      setShowAdditionalFields(true);
    } else {
      alert("Available Four Field's as a Maximum ");
    }
  };

  const handleAdd = () => {
    // Add your logic here to handle the added data
    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Number:", number);
    // Reset the fields
    setTitle("");
    setSubtitle("");
    setNumber("");
  };

  return (
    <>

        
<Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>About Us</label>
                        <Input
                          type="select"
                          value={selectedOptionDetailes}
                          onChange={(e) => setSelectedOptionDetailes(e.target.value)}
                        >
                          <option value="" disabled>
                            Detailes With Number 
                          </option>
                          <option value="option1">
                            Number 1
                          </option>
                          <option value="option2">
                          Number 2
                          </option>
                          <option value="option3">
                          Number 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOptionDetailes && (
                      <>
                         <Col className="px-1" md="3">
          <FormGroup>
            <label>Text1</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Text2</label>
            <Input type="text" onChange={(e) => setSubtitle(e.target.value)} />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Number</label>
            <Input type="text" onChange={(e) => setSubtitle(e.target.value)} />
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
              onClick={handleAddField}
            >
              Add one more field
            </Button>
          </FormGroup>
        </Col>
      </Row>

      {[...Array(numRows)].map((_, index) => (
        <Row key={index}>
          {showAdditionalFields && (
            <>
              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Text1</label>
                  <Input
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Text2</label>
                  <Input
                    type="text"
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Number</label>
                  <Input
                    type="text"
                    onChange={(e) => setNumber(e.target.value)}
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

      <Row className=" mt-5 mb-5">
        <Col className="px-1 " md="3">
          <FormGroup>
            <label>Title Section</label>
            <Input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Title</label>
            <Input type="text" onChange={(e) => setSubtitle(e.target.value)} />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Button name </label>
            <Input
              type="text"
              onChange={(e) => setContent(e.target.value)} // Update state with the selected file
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Button Link </label>
            <Input
              type="text"
              onChange={(e) => setContent(e.target.value)} // Update state with the selected file
            />
          </FormGroup>
        </Col>

        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button className="btn-round" color="primary" type="button" onClick={UpdatePost}>
              update
            </Button>
          </FormGroup>
        </Col>
      </Row>

 


               
<Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>About Us </label>
                        <Input
                          type="select"
                          value={selectedOptionDetailesBlog}
                          onChange={(e) => setSelectedOptionDetailesBlog(e.target.value)}
                        >
                          <option value="" disabled>
                            Detailes For Blog's
                          </option>
                          <option value="option1">
                          Blog 1
                          </option>
                          <option value="option2">
                          Blog 2
                          </option>
                          <option value="option3">
                          Blog 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOptionDetailesBlog && (
                      <>
                          <Col className="px-1" md="3">
                <FormGroup>
                  <label>Tile blog </label>
                  <Input
                    type="text"
                    onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                  />
                </FormGroup>
              </Col>

              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Content </label>
                  <Input
                    type="text"
                    onChange={(e) => setContent(e.target.value)} // Update state with the selected file
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
              onClick={handleAddBlogField}
            >
              Add one more field
            </Button>
          </FormGroup>
        </Col>
      </Row>

      {[...Array(numBlogs)].map((_, index) => (
        <Row key={index}>
          {showAdditionalBlogFields && (
            <>
              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Tile blog </label>
                  <Input
                    type="text"
                    onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                  />
                </FormGroup>
              </Col>

              <Col className="px-1" md="3">
                <FormGroup>
                  <label>Content </label>
                  <Input
                    type="text"
                    onChange={(e) => setContent(e.target.value)} // Update state with the selected file
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
    </>
  );
}

export default YourComponent;

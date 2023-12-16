import React, { useState } from "react";
import axios from 'axios';
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import Toastify from "toastify-js";

function NavbarWhenScrollup() {
  const [items, setItems] = useState([
    {
      title: "",
      path: "",
    },
  ]);  const [selectedOptionPage, setSelectedOptionPage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const UpdatePostLogo = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('logoImg', selectedFile);

      try {
        const response = await axios.put('http://localhost:1010/logo/logoimg/4', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          setFeedback('Update successful!');
          Toastify({
            text: "Updated completely",
            duration: 3000, // Duration in milliseconds
            gravity: "top", // 'top' or 'bottom'
            position: "right", // 'left', 'center', 'right'
            backgroundColor: "#5EC693",
          }).showToast();
        } else {
          setFeedback('Failed to update.');
        }
      } catch (error) {
        console.error('Error updating:', error);
        setFeedback('Error updating.');
      }
    } else {
      setFeedback('Please select a file to upload.');
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

  const handleAddItem = async () => {
    try {

      
      const response = await axios.post("http://localhost:1010/pages/addpage", {
        namePage: items[0].title,
        path: items[0].path,
      });

      // Handle the response, e.g., show a success message or update UI
      console.log("Page added successfully:", response.data);

      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();

      
    } catch (error) {
      console.error("Error adding page:", error);
      // Handle the error, e.g., show an error message
    }
  };


  const handleItemChange = (e, index, field) => {
    const newItems = [...items];
    newItems[index][field] = e.target.value;
    setItems(newItems);
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
                value={item.title}
                onChange={(e) => handleItemChange(e, index, "title")}
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Path</label>
              <Input
                type="text"
                value={item.path}
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
                onClick={handleAddItem}
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
            <label>Pages</label>
            <Input
              type="select"
              value={selectedOptionPage}
              onChange={(e) => setSelectedOptionPage(e.target.value)}
            >
              <option value="" disabled>
                Pages
              </option>
              <option value="option1">Page Name 1</option>
              <option value="option2">Page Name 2</option>
              <option value="option3">Page Name 3</option>
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
                <Input type="text" />
              </FormGroup>
            </Col>

            <Col className="px-1" md="3">
              <FormGroup>
                <label>Path</label>
                <Input type="text" />
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

      <Row className="mt-5">
        <h2>Logo</h2>
      </Row>

      <Row>
        <Col className="pl-1" md="4">
          <FormGroup>
            <label htmlFor="exampleInputEmail1">Logo </label>
            <input
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
              onClick={UpdatePostLogo}
            >
              Update
            </Button>
            {feedback && <div>{feedback}</div>}
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="px-1" md="3">
          <FormGroup>
            <label>Background Color " HEXA CODE" </label>
            <Input type="text" />
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

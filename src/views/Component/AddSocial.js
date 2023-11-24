import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Row,
  Label,
  Form,
} from "reactstrap";

import Toastify from "toastify-js";


function YourComponent() {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
  const [content, setContent] = useState("");
  const [showAdditionalSocialMediaFields, setShowAdditionalSocialMediaFields] =
    useState(false);
  const [additionalSocialMediaFields, setAdditionalSocialMediaFields] =
    useState([]);


    const [showAdditionalSocialIconFields, setShowAdditionalSocialIconFields] =
    useState(false);
  const [numSocialIcon, setNumSocialIcon] = useState(0);



  const [socialMediaNames, setSocialMediaNames] = useState([
    "Facebook",
    "Twitter",
    "Instagram",
  ]);



  const handleAddBlogField = () => {
    if (numSocialIcon < 4) {
      setNumSocialIcon(numSocialIcon + 1);
      setShowAdditionalSocialIconFields(true);
    } else {
      alert("Available Four Content Field's as a Maximum ");
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


  const handleAddSocialMedia = () => {
    const newSocialMediaFields = {
      name: "",
      link: "",
    };

    setAdditionalSocialMediaFields([...additionalSocialMediaFields, newSocialMediaFields]);
    setSocialMediaNames([...socialMediaNames, newSocialMediaFields.name]);
  };

  const handleAdditionalSocialMediaChange = (index, field, value) => {
    const updatedFields = [...additionalSocialMediaFields];
    updatedFields[index][field] = value;
    setAdditionalSocialMediaFields(updatedFields);
  };

  const handleAddToDropdown = () => {
    if (additionalSocialMediaFields.length > 0) {
      const updatedNames = [...socialMediaNames];
      updatedNames.push(additionalSocialMediaFields[additionalSocialMediaFields.length - 1].name);
      setSocialMediaNames(updatedNames);
    }
  };

  return (
    <>
      <Row style={{ height: "150px" }}>
        <Col className="px-1" md="3">
          <FormGroup>
            <label>Social Media</label>
            <Input
              type="select"
              value={selectedSocialMedia}
              onChange={(e) => setSelectedSocialMedia(e.target.value)}
            >
              <option value="" disabled>
                Select Social Media
              </option>
              {socialMediaNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label> Link </label>
            <Input
              type="text"
              onChange={(e) => setContent(e.target.value)}
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
              Update Link
            </Button>
          </FormGroup>
        </Col>

        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button
              className="btn-round"
              color="primary"
              type="button"
              onClick={handleAddBlogField}
            >
              + Add more Social Media
            </Button>
          </FormGroup>
        </Col>
      </Row>

      
      {[...Array(numSocialIcon)].map((_, index) => (
        <Row key={index}>
          {showAdditionalSocialIconFields && (
            <>
            
            <Col className="px-1" md="3">
              <FormGroup>
                <Label for={`name-${index}`}>Social Name</Label>
                <Input
                  type="text"
                  id={`name-${index}`}
                 
                  onChange={(e) =>
                    handleAdditionalSocialMediaChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="3">
              <FormGroup>
                <Label for={`link-${index}`}>Social Link</Label>
                <Input
                  type="text"
                  id={`link-${index}`}
                 
                  onChange={(e) =>
                    handleAdditionalSocialMediaChange(
                      index,
                      "link",
                      e.target.value
                    )
                  }
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

    </>
  );
}

export default YourComponent;

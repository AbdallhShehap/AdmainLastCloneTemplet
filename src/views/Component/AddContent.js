import React, { useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import Toastify from 'toastify-js';
import axios from 'axios';

function YourComponent() {
  const [contentItems, setContentItems] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showAddAll, setShowAddAll] = useState(false);
  const [showAdditionalContentFields, setShowAdditionalContentFields] =
  useState(false);
const [numContent, setNumContent] = useState(0);
const [benefitsOptions, setBenefitsOptions] = useState([]);
const [selectedBenefitTitle, setSelectedBenefitTitle] = useState('');
const [selectedBenefitContent, setSelectedBenefitContent] = useState('');
const [selectedBenefitId, setSelectedBenefitId] = useState(null); // New state for tracking the selected benefit's ID



  useEffect(() => {
    const fetchBenefitsContent = async () => {
      try {
        const response = await axios.get('http://localhost:1010/ourbenfits/ourbenfitscontent');
        setBenefitsOptions(response.data);
      } catch (error) {
        console.error('Error fetching benefits content:', error);
      }
    };

    fetchBenefitsContent();
  }, []);

  // const handleContentChange = (index, type, value) => {
  //   const updatedContentFields = [...contentFields];
  //   updatedContentFields[index][type] = value;
  //   setContentFields(updatedContentFields);
  // };
  
  const handleAddContentField = () => {
    if (benefitsOptions.length < 3) {
      // Only set the state for a single new content item
      setSubTitle("");
      setContent("");
      setShowAdditionalContentFields(true); // Show the input fields
    } else {
      alert("Available Three Content Field's as a Maximum");
    }
  };
  
  

  const handleSelectedOptionChange = (e) => {
    const title = e.target.value;
    setSelectedOption(title);

    // Find the benefit data from the benefitsOptions array
    const benefitData = benefitsOptions.find(benefit => benefit.title === title);

    // Set the subTitle and content from the found benefit data
    if (benefitData) {
      setSelectedBenefitId(benefitData.id); // Set the ID for the selected benefit
      setSelectedBenefitTitle(benefitData.title);
      setSelectedBenefitContent(benefitData.content);
    }
  };

  // const AddPost = async () => {
  //   Toastify({
  //     text: "Added completely",
  //     duration: 3000, // Duration in milliseconds
  //     gravity: "top", // 'top' or 'bottom'
  //     position: "right", // 'left', 'center', 'right'
  //     backgroundColor: "#5EC693",
  //   }).showToast();
  // };

  const AddPost = async () => {
    const itemToAdd = {
      title: subTitle,
      content: content
    };
  
    try {
      const response = await axios.post('http://localhost:1010/ourbenfits/addcontent', itemToAdd);
      if (response.status === 200) {
        // Assuming the response contains the newly added item
        const newItem = response.data; 
  
        // Update the benefitsOptions state to include the new item
        setBenefitsOptions(prevOptions => [...prevOptions, newItem]);

  
        Toastify({
          text: "Content added successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
  
        // Reset subtitle and content after adding
        setSubTitle("");
        setContent("");
        setShowAdditionalContentFields(false); // Hide the input fields again
      } else {
        throw new Error('Failed to add the content');
      }
    } catch (error) {
      console.error('Error adding the content:', error);
      Toastify({
        text: "Failed to add content",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  
  
  
  

  
 
  const UpdateContent = async () => {
    // Construct the payload for the PUT request
    const payload = {
      title: selectedBenefitTitle,
      content: selectedBenefitContent
    };
  
    try {
      const response = await axios.put(`http://localhost:1010/ourbenfits/ourbenfitscontent/${selectedBenefitId}`, payload);
      if (response.status === 200) {
        // Update the local state to reflect the changed data
        const updatedBenefits = benefitsOptions.map((benefit) => {
          if (benefit.id === selectedBenefitId) {
            return { ...benefit, title: selectedBenefitTitle, content: selectedBenefitContent };
          }
          return benefit;
        });
        setBenefitsOptions(updatedBenefits);
  
        Toastify({
          text: "Updated successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
      } else {
        throw new Error('Failed to update the post');
      }
    } catch (error) {
      console.error('Error updating the post:', error);
      Toastify({
        text: "Update failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  
  const DeleteContent = async () => {
    try {
      const response = await axios.delete(`http://localhost:1010/ourbenfits/ourbenfitscontent/${selectedBenefitId}`);
      if (response.status === 200) {
        // Remove the deleted benefit from the benefitsOptions state
        setBenefitsOptions(benefitsOptions.filter(benefit => benefit.id !== selectedBenefitId));
        // Reset the selected options
        setSelectedOption('');
        setSelectedBenefitId(null);
        setSelectedBenefitTitle('');
        setSelectedBenefitContent('');

        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();
      } else {
        throw new Error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting the post:', error);
      Toastify({
        text: "Delete failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
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
              onChange={handleSelectedOptionChange}
            >
              <option value="" disabled>Content Benefits</option>
              {benefitsOptions.map((benefit) => (
                <option key={benefit.id} value={benefit.title}>
                  {benefit.title}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <h3>Can add only three content </h3>
      </Row>

      {selectedOption && (
        <Row>
          <Col className="px-1" md="3">
            <FormGroup>
              <label>Sub Title</label>
              <Input
                type="text"
                value={selectedBenefitTitle}
                onChange={(e) => setSelectedBenefitTitle(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Content</label>
              <Input
                type="textarea" // Changed to 'textarea' for multiline content
                value={selectedBenefitContent}
                onChange={(e) => setSelectedBenefitContent(e.target.value)}
              />
            </FormGroup>
          </Col>

          <Col className="px-2 mt-3" md="3">
            <FormGroup>
              <Button
                className="btn-round"
                color="primary"
                type="button"
                onClick={UpdateContent}
               
              >
                Update
              </Button>


              <Button
                className="btn-round  btn-danger"
                color="primary"
                type="button"
                onClick={DeleteContent}
              >
                Delete
              </Button>
              
            </FormGroup>
         
          </Col>

          
          
        
    </Row>
      )}




<Row>
  <Col className="px-2 mt-3" md="3">
    <FormGroup>
      {benefitsOptions.length < 3 && (
        <Button
          className="btn-round"
          color="primary"
          type="button"
          onClick={handleAddContentField}
        >
          Add Content
        </Button>
      )}
    </FormGroup>
  </Col>
</Row>


{showAdditionalContentFields && (
  <Row>
    <Col className="px-1" md="3">
      <FormGroup>
        <label>Sub Title</label>
        <Input
          type="text"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
      </FormGroup>
    </Col>

    <Col className="px-1" md="3">
      <FormGroup>
        <label>Content</label>
        <Input
          type="text"
          value={content}
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
          onClick={AddPost}
        >
          Add 
        </Button>
      </FormGroup>
    </Col>
  </Row>
)}


      {/* {contentItems.map((item, index) => (
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
      )} */}

    </>
  );
}

export default YourComponent;

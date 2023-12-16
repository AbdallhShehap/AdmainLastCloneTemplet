import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(  {
    id: '',
    link: "",
    name: ""
});


  const [content, setContent] = useState("");
  const [showAdditionalSocialMediaFields, setShowAdditionalSocialMediaFields] =
    useState(false);
  const [additionalSocialMediaFields, setAdditionalSocialMediaFields] =
    useState([]);


  const [numSocialIcon, setNumSocialIcon] = useState(0);

  const [contactContents, setContactContents] = useState([]);


  const [socialMediaNames, setSocialMediaNames] = useState([]);
;
const [newSocialMediaName, setNewSocialMediaName] = useState('');
const [newSocialMediaLink, setNewSocialMediaLink] = useState('');


  const [selectedSocialMediaItem, setSelectedSocialMediaItem] = useState(null);

 const handleSocialMediaSelection = (e) => {
  const selectedId = e.target.value;
  const selectedItem = socialMediaNames.find(item => item.id === selectedId);
  
  if (selectedItem) {
    setSelectedSocialMedia(selectedItem);
  } else {
    setSelectedSocialMedia({
      id: '',
      link: "",
      name: ""
    });
  }
};


  // Function to fetch social media names from the API using Axios
  const fetchSocialMediaNames = async () => {
    try {
      const response = await axios.get('http://localhost:1010/mainsection/social');
      const data = response.data;

      // Extracting names from the data and updating the state
      const names = data.map(item => item.name);
      setSocialMediaNames(names);
    } catch (error) {
      console.error('Failed to fetch social media names:', error);
      // Handle the error appropriately
    }
  };

  // useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchSocialMediaNames();
  }, []);

  const handleAddBlogField = () => {
    if (numSocialIcon < 4) {
      setNumSocialIcon(numSocialIcon + 1);
      setContactContents([...contactContents, ""]); // Add an empty string for the new field

    } else {
      alert("Available Four Content Field's as a Maximum ");
    }
  };

  
const handleContentChange = (value, index) => {
  const updatedContents = [...contactContents];
  updatedContents[index] = value;
  setContactContents(updatedContents);
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

  const addSocialMedia = async () => {
    if (!newSocialMediaName || !newSocialMediaLink) {
      Toastify({
        text: "Please fill in both name and link",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:1010/mainsection/addsocial', {
        name: newSocialMediaName,
        link: newSocialMediaLink
      });
  
      if (response.status === 200) {
        Toastify({
          text: "Added successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
  
        // Optionally, reset the input fields and update any local state
        setNewSocialMediaName('');
        setNewSocialMediaLink('');
        fetchSocialMediaNames(); // Refresh the list of social media names
      }
    } catch (error) {
      console.error('Error adding social media:', error);
      Toastify({
        text: "Failed to add",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };







  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState({
    id: '',
    name: '',
    path: ''
  });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:1010/mainsection/social');
        setPages(response.data);
      } catch (error) {
        console.error('Error fetching social media pages:', error);
      }
    };

    fetchPages();
  }, []);

 
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const page = pages.find(p => p.id.toString() === selectedId);
    if (page) {
      setSelectedPage(page);
    }
  };



 
  const UpdatePage = async () => {
    try {
      const response = await axios.put(`http://localhost:1010/mainsection/social/${selectedPage.id}`, {
        name: selectedPage.name,
        link: selectedPage.link
      });

      if (response.status === 200) {
        Toastify({
          text: "Updated successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();

        // Update pages state to reflect the update
        setPages(pages.map(p => p.id === selectedPage.id ? { ...p, name: selectedPage.name, link: selectedPage.link } : p));
      }
    } catch (error) {
      console.error('Error updating the page:', error);
      Toastify({
        text: "Failed to update",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };



  const DeletePage = async () => {
    try {
      const response = await axios.delete(`http://localhost:1010/mainsection/social/${selectedPage.id}`);
      if (response.status === 200) {
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();

        // Update pages state to reflect the deletion
        setPages(pages.filter(page => page.id !== selectedPage.id));
        setSelectedPage({ id: '', name: '', path: '' }); // Reset selected page
      }
    } catch (error) {
      console.error('Error deleting the page:', error);
      Toastify({
        text: "Failed to delete",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };






  return (
    <>


<Row>
       
            <Col className="px-1" md="3">
            <FormGroup>
  <Label>Social Name</Label>
  <Input
    type="text"
    value={newSocialMediaName}
    onChange={(e) => setNewSocialMediaName(e.target.value)}
  />
</FormGroup>
            </Col>
            <Col className="px-1" md="3">
            <FormGroup>
  <Label>Social Link</Label>
  <Input
    type="text"
    value={newSocialMediaLink}
    onChange={(e) => setNewSocialMediaLink(e.target.value)}
  />
</FormGroup>
            </Col>

          


            <Col className="px-2 mt-3" md="3">
              <FormGroup>
              <Button
  className="btn-round"
  color="primary"
  type="button"
  onClick={addSocialMedia}
>
  Add
</Button>

              </FormGroup>
            </Col>
        
        </Row>
      


        <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <label>social Name</label>
            <Input
              type="select"
              value={selectedPage.id}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Choose a social</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>{page.name}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>

      {selectedPage.id && (
        <Row>
          <Col className="px-1" md="3">
            <FormGroup>
              <label> Name</label>
              <Input 
                type="text" 
                value={selectedPage.name} 
                onChange={(e) => setSelectedPage({...selectedPage, name: e.target.value})} 
              />
            </FormGroup>
          </Col>

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Path</label>
              <Input 
                type="text" 
                value={selectedPage.link} 
                onChange={(e) => setSelectedPage({...selectedPage, link: e.target.value})} 
              />
            </FormGroup>
          </Col>

          <Col className="px-2 mt-3" md="3">
            <FormGroup>
              <Button className="btn-round" color="primary" type="button" onClick={UpdatePage}>
                Update
              </Button>
              <Button className="btn-round btn-danger" color="primary" type="button" onClick={DeletePage}>
                Delete
              </Button>
            </FormGroup>
          </Col>
        </Row>
      )}




    </>
  );
}

export default YourComponent;

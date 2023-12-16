import React, { useState , useEffect} from "react";
import axios from 'axios';
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import Toastify from "toastify-js";

function NavbarStander() {
  const [items, setItems] = useState([
    {
      title: "",
      path: "",
    },
  ]);


  
  const [selectedOptionPage, setSelectedOptionPage] = useState("");

 
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');



  const [pages, setPages] = useState([]);

  const [selectedPage, setSelectedPage] = useState({ title: '', path: '' });

const handleSelectChange = (e) => {
  const selectedPageId = e.target.value;
  const page = pages.find(p => p.id.toString() === selectedPageId);
  if (page) {
    setSelectedPage({ id:page.id, title: page.namePage, path: page.path });
  }
};



useEffect(() => {
  const fetchPages = async () => {
    try {
      const response = await axios.get("http://localhost:1010/pages/pages");
      setPages(response.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  fetchPages();
}, []);


const handleFileChange = (e) => {
  const file = e.target.files[0];
  const allowedFileTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
    'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif',
    'video/mp4', 'video/webm', 'video/ogg'
  ];

  if (file && allowedFileTypes.includes(file.type)) {
    setSelectedFile(file);
  } else {
    alert("Invalid file type. Please select an image or video file.");
    e.target.value = ''; // Reset the file input
  }
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




  const UpdatePage = async () => {

    if (!selectedPage.id) {
      console.error("No page selected for updating");
      return;
    }
  
    // Check if the page name or path is empty
    if (!selectedPage.title.trim() || !selectedPage.path.trim()) {
      Toastify({
        text: "Page name and path cannot be empty.",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();


    } else{

      try {
        const response = await axios.put(`http://localhost:1010/pages/pages/${selectedPage.id}`, {
          namePage: selectedPage.title,
          path: selectedPage.path,
        });
        console.log("Page updated successfully:", response.data);
    
        // Update the pages state with the updated page details
        const updatedPages = pages.map(page => 
          page.id === selectedPage.id ? {...page, namePage: selectedPage.title, path: selectedPage.path} : page
        );
        setPages(updatedPages);
  
        Toastify({
          text: "Updated completely",
          duration: 3000, // Duration in milliseconds
          gravity: "top", // 'top' or 'bottom'
          position: "right", // 'left', 'center', 'right'
          backgroundColor: "#5EC693",
        }).showToast();
    
        // Optionally, show a success message
      } catch (error) {
        console.error("Error updating page:", error);
        // Optionally, show an error message
      }
    }
  
  };




  const DeletePage = async () => {

    if (!selectedPage.id) {
      console.error("No page selected for deletion");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:1010/pages/pages/${selectedPage.id}`);
      console.log("Page deleted successfully:", response.data);
  
      // Update the UI by removing the deleted page from the pages state
      setPages(pages.filter(page => page.id !== selectedPage.id));
  
      // Reset selected page
      setSelectedPage({ title: '', path: '' });

      Toastify({
        text: "Deleted completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#ce5151",
      }).showToast();
  
      // Optionally, show a success message
    } catch (error) {
      console.error("Error deleting page:", error);
      // Optionally, show an error message
    }
  
  };

  const handleAddPage = async () => {
     // Check if the page name or path is empty
  if (!items[0].title.trim() || !items[0].path.trim()) {
    alert("Page name and path cannot be empty.");
    return;
  }
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
                onClick={handleAddPage}
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
              onClick={() => setItems([...items, { title: "", path: "" }])}
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
    value={selectedPage.id}
    onChange={handleSelectChange}
  >
    <option value="" disabled>Choose a Page</option>
    {pages.map((page) => (
      <option key={page.id} value={page.id}>{page.namePage}</option>
    ))}
  </Input>
</FormGroup>

        </Col>
      </Row>

      <Row>
        {selectedPage.id && (
          <>
            <Col className="px-1" md="3">
            <FormGroup>
    <label>Page Name</label>
    <Input 
      type="text" 
      value={selectedPage.title} 
      onChange={(e) => setSelectedPage({...selectedPage, title: e.target.value})} 
    />
  </FormGroup>
</Col>

<Col className="px-1" md="3">
  <FormGroup>
    <label>Path</label>
    <Input 
      type="text" 
      value={selectedPage.path} 
      onChange={(e) => setSelectedPage({...selectedPage, path: e.target.value})} 
    />
  </FormGroup>
            </Col>

            <Col className="px-2 mt-3" md="3">
              <FormGroup>
                <Button
                  className="btn-round"
                  color="primary"
                  type="button"
                  onClick={UpdatePage}
                >
                  Update
                </Button>

                <Button
                  className="btn-round  btn-danger"
                  color="primary"
                  type="button"
                  onClick={DeletePage}
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
            <label>Logo</label>
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
              onClick={UpdatePostLogo}
            >
              Update
            </Button>
            {feedback && <div>{feedback}</div>}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

export default NavbarStander;

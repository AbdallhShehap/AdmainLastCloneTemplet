import React, { useState , useEffect} from "react";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import SocialSideMenu from '../Component/SocialSideMenu'
import Toastify from "toastify-js";
import axios from 'axios';


function SideMenu() {



  const [logoFile, setLogoFile] = useState(null);

  const [showAdditionalContentFields, setShowAdditionalContentFields] =
    useState(false);
  const [numContent, setNumContent] = useState(0);


  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');


  const [contactContents, setContactContents] = useState([]);


  const [sideMenuData, setSideMenuData] = useState({
    titlesidemenu: "",
    subtitle1sidemenu: "",
    subtitle2sidemenu: "",
    textsidemenu: "",
    placeHolderInput: "",
  });

  const [contents, setContents] = useState([]);


  const [selectedContent, setSelectedContent] = useState({ id: '', content: '' });
  
  
  const fetchContents = async () => {
    try {
      const response = await axios.get("http://localhost:1010/sidemenu/sidemenucontent");
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };



  useEffect(() => {
    const fetchSideMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:1010/sidemenu/sidemenu/4');
        setSideMenuData(response.data);
      } catch (error) {
        console.error('Error fetching side menu data:', error);
        // Optionally, handle the error, e.g., show an error message
      }
    };
  
    fetchSideMenuData();
    fetchContents();

  }, []);

  

  

  const handleInputChange = (e, field) => {
    setSideMenuData({ ...sideMenuData, [field]: e.target.value });
  };

  const UpdateSideMenu = async () => {
    try {
      const response = await axios.put('http://localhost:1010/sidemenu/sidemenu/4', sideMenuData);
      console.log("Side menu updated successfully:", response.data);
      Toastify({
        text: "Side menu updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
    } catch (error) {
      console.error('Error updating side menu:', error);
      // Optionally, show an error message
    }
  };

  const handleSelectChange = (e) => {
    const selectedContentId = e.target.value;
    const content = contents.find(c => c.id.toString() === selectedContentId);
    if (content) {
      setSelectedContent({ id: content.id, content: content.content });
    }
  };

  

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
    setContactContents([...contactContents, ""]); // Add an empty string for the new field
  } else {
    alert("Available Three Content Field's as a Maximum ");
  }
};

const handleContentChange = (value, index) => {
  const updatedContents = [...contactContents];
  updatedContents[index] = value;
  setContactContents(updatedContents);
};


const addContentToDatabase = async (content, index) => {
  // Check if content is empty
  if (!content.trim()) {
    alert("Content cannot be empty.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:1010/sidemenu/addcontent', { content });
    console.log("Content added successfully:", response.data);

    // Update the contents state with the new content
    const newContent = {
      id: Date.now().toString(), // Temporarily generate an ID (adjust as needed)
      content: content
    };
    setContents(prevContents => [...prevContents, newContent]);

    // Reset the input field
    const updatedContactContents = [...contactContents];
    updatedContactContents[index] = '';
    setContactContents(updatedContactContents);

    Toastify({
      text: "Added completely",
      duration: 3000, 
      gravity: "top",
      position: "right",
      backgroundColor: "#5EC693",
    }).showToast();

  } catch (error) {
    console.error("Error adding content:", error);
    alert("Error adding content.");
  }
};




const UpdateContent = async () => {
  if (!selectedContent.id) {
    console.error("No content selected for updating");
    return;
  }

  try {
    const response = await axios.put(`http://localhost:1010/sidemenu/sidemenucontent/${selectedContent.id}`, {
      content: selectedContent.content,
    });
    console.log("Content updated successfully:", response.data);

// Update the contents state with the updated content details
const updatedContents = contents.map(content => 
  content.id === selectedContent.id 
    ? { ...content, content: selectedContent.content }
    : content
);
setContents(updatedContents);


    Toastify({
      text: "updated completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#5EC693",
    }).showToast();
  } catch (error) {
    console.error("Error updating content:", error);
  }
};


const DeleteContent = async () => {
  if (!selectedContent.id) {
    console.error("No content selected for deletion");
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:1010/sidemenu/sidemenucontent/${selectedContent.id}`);
    console.log("Content deleted successfully:", response.data);

      // Remove the deleted content from the contents state
      setContents(prevContents => prevContents.filter(content => content.id !== selectedContent.id));

      // Reset the selected content
      setSelectedContent({ id: '', content: '' });

      
    Toastify({
      text: "Deleted completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#ce5151",
    }).showToast();


  } catch (error) {
    console.error("Error deleting content:", error);
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

<Row className="mt-5">
        <h3>Logo</h3>
      </Row>
     
        <Row >
          <Col className="px-1" md="3">
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
                </FormGroup>
              </Col>
        </Row>

        <Row className="mt-5">
        <h3>Title Side Menu</h3>
      </Row>
     


        <Row >
      

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Title Side menu</label>
            <Input
  type="text"
  value={sideMenuData.titlesidemenu}
  onChange={(e) => handleInputChange(e, "titlesidemenu")}
/>
            </FormGroup>
          </Col>

          <Col className="px-2 mt-3" md="3">
                <FormGroup>
                  <Button
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={UpdateSideMenu}
                  >
                    Update
                  </Button>
                </FormGroup>
              </Col>
        </Row>


        <Row className="mt-5">
          <h3>
            Contact us
          </h3>
        </Row>


        <Row >
      

          <Col className="px-1" md="3">
            <FormGroup>
              <label>Title Contact us Section </label>
          

<Input
  type="text"
  value={sideMenuData.subtitle1sidemenu}
  onChange={(e) => handleInputChange(e, "subtitle1sidemenu")}
/>
            </FormGroup>
          </Col>

          <Col className="px-2 mt-3" md="3">
                <FormGroup>
                  <Button
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={UpdateSideMenu}
                  >
                    Update
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
              Add Contact us Field
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
            <label>Details</label>
            <Input
              type="text"
              value={contactContents[index]}
              onChange={(e) => handleContentChange(e.target.value, index)}
            />
          </FormGroup>
        </Col>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <Button 
              className="btn-round" 
              color="primary" 
              type="button" 
              onClick={() => addContentToDatabase(contactContents[index], index)}>
              Add
            </Button>
          </FormGroup>
        </Col>
      </>
    )}
  </Row>
))}



<Row>
  <Col className="px-2 mt-3" md="3">
    <FormGroup>
      <label>Contents</label>
      <Input
        type="select"
        value={selectedContent.id}
        onChange={handleSelectChange}
      >
        <option value="" disabled>Choose a Content</option>
        {contents.map((content) => (
          <option key={content.id} value={content.id}>{content.content}</option>
        ))}
      </Input>
    </FormGroup>
  </Col>
</Row>

<Row>
  {selectedContent.id && (
    <>
      <Col className="px-1" md="3">
        <FormGroup>
          <label>Content Details</label>
          <Input 
            type="text" 
            value={selectedContent.content} 
            onChange={(e) => setSelectedContent({...selectedContent, content: e.target.value})} 
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
            className="btn-round btn-danger"
            color="primary"
            type="button"
            onClick={DeleteContent}
          >
            Delete
          </Button>
        </FormGroup>
      </Col>
    </>
  )}
</Row>

          

              <Row className="mt-5">
                    <h3>
                    Subscribe 
                    </h3>
                  </Row>



        <Row className=" ">
        <Col className="px-1" md="3">
            <FormGroup>
              <label> Title Subscribe Section </label>
              <Input
  type="text"
  value={sideMenuData.subtitle2sidemenu}
  onChange={(e) => handleInputChange(e, "subtitle2sidemenu")}
/>


            </FormGroup>
          </Col>

        <Col className="px-1" md="3">
            <FormGroup>
              <label> Place holder for Subscribe input </label>
              <Input
  type="text"
  value={sideMenuData.placeHolderInput}
  onChange={(e) => handleInputChange(e, "placeHolderInput")}
/>


            </FormGroup>
          </Col>


        <Col className="px-1" md="3">
            <FormGroup>
              <label> Text under the input </label>
              <Input
  type="text"
  value={sideMenuData.textsidemenu}
  onChange={(e) => handleInputChange(e, "textsidemenu")}
/>


            </FormGroup>
          </Col>


          
          <Col className="px-2 mt-3" md="3">
                <FormGroup>
                  <Button
                    className="btn-round"
                    color="primary"
                    type="button"
                    onClick={UpdateSideMenu}
                  >
                    Update
                  </Button>
                </FormGroup>
              </Col>

        </Row>

        <Row className="mt-5">
          <h2>Social Media</h2>
        </Row>


           <SocialSideMenu/>
    
    </>
  );
}

export default SideMenu;

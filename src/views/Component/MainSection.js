import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
  Alert,
} from "reactstrap";

import Toastify from "toastify-js";
import MainSecAddSocial from "./MainSectAddSocial";


export default function MainSection() {

    const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
    const [socialMediaNames, setSocialMediaNames] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [icon, setIcon] = useState(""); // This will hold the file path, not the file itself

    const [text3, setText3] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [buttonLink, setButtonLink] = useState('');

    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif',`image/bmp`,`image/tiff`,`image/svg+xml`,`image/x-icon`, `image/heic`,`image/avif`,'video/mp4', 'video/webm', 'video/ogg'];
    
      if (file && allowedFileTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert("Please select an image or video file (jpeg, png, gif, mp4, webm, ogg)");
        // Optionally reset the file input here
        e.target.value = null; // Reset the input
      }
    };
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:1010/menuicons/socialiconmenu");
            const data = response.data;
            setSocialMediaNames(data);
          } catch (error) {
            console.log(`Error getting Blog from frontend: ${error}`);
          }
        };


        const fetchFixedData = async () => {
            try {
              const response = await axios.get("http://localhost:1010/mainsection/textmainsection");
              const data = response.data[0];
              // Set the state with the fetched data
              setText1(data.text1);
              setText2(data.text2);
              setIcon(data.icon); // Assuming data.icon is a string path to the image
              setText3(data.text3);
              setParagraph(data.paragraph);
              setButtonName(data.buttonName);
              setButtonLink(data.buttonLink);
            } catch (error) {
              console.log(`Error fetching data: ${error}`);
            }
          };
      
          fetchData();
    
          fetchFixedData();

      }, []);


      const UpdateFixedData = async () => {
        const payload = {
            text1: text1,
            text2: text2,
            text3: text3,
            paragraph: paragraph,
            buttonName: buttonName,
            buttonLink: buttonLink,
          };
        try {
            const response = await axios.put('http://localhost:1010/mainsection/textmainsection/1', payload);
            if (response.status === 200) {
              setFeedback('Text fields updated successfully!');
              
            Toastify({
              text: "Updated completely",
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#5EC693",
            }).showToast();
            // Optionally, refresh the icon state if a new icon was uploaded
            
          } else {
            setFeedback('Failed to update text fields.');

            Toastify({
                text: "Updated unNNcompletely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ce5151",
              }).showToast();
        }
        } catch (error) {
            console.error('Error updating text fields:', error);
            setFeedback('Error updating text fields.');

            Toastify({
                text: "Updated uncompletely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ce5151",
              }).showToast();
        }
      };
      

      const UpdateIcon = async () => {
        const formData = new FormData();
        if (selectedFile) {
          formData.append('iconmainsection', selectedFile);
        } else {
          return; // Do nothing if no file is selected
        }
      
        try {
          const response = await axios.put('http://localhost:1010/mainsection/iconmainsection/2', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200) {
            setFeedback('Icon updated successfully!');
            Toastify({
                text: "Updated completely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#5EC693",
              }).showToast();
          } else {
            setFeedback('Failed to update icon.');
            Toastify({
                text: "Updated uncompletely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ce5151",
              }).showToast();
          }
        } catch (error) {
          console.error('Error updating icon:', error);
          setFeedback('Error updating icon.');
          Toastify({
            text: "Updated uncompletely",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ce5151",
          }).showToast();
        }
      };

      const DeleteIcon = async () => {
        // Prepare the payload, setting the icon data to a null or empty state.
        const formData = new FormData();
        formData.append('iconmainsection', '');
      
        try {
          const response = await axios.put('http://localhost:1010/mainsection/iconmainsection/2', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200) {
            setFeedback('Icon deleted successfully!');
            Toastify({
              text: "Icon deleted completely",
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#ce5151",
            }).showToast();
          } else {
            setFeedback('Failed to delete icon.');
            Toastify({
              text: "Icon deletion uncompletely",
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#ce5151",
            }).showToast();
          }
        } catch (error) {
          console.error('Error deleting icon:', error);
          setFeedback('Error deleting icon.');
          Toastify({
            text: "Icon deletion uncompletely",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ce5151",
          }).showToast();
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

  return (
    <>
        <Row>
                    <h1> Main Section</h1>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../../assets/img/home1.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>
                  
                  <Row className="mt-5">
                    <h2>Text's & Button Link</h2>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 1</label>
                        <Input value={text1} onChange={e => setText1(e.target.value)} type="text" />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 2</label>
                        <Input value={text2} onChange={e => setText2(e.target.value)} type="text" />

                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdateFixedData}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>


                  </Row>

                  <Row>
               
                    <Col className="px-1" md="3">
                    <FormGroup>
  <label>icon</label>
  {icon && <img src={`http://localhost:1010/${icon}`} alt="Icon" />}
  <Input
    type="file"
    accept="image/*,video/*"
    onChange={handleFileChange}
  />
</FormGroup>

                    </Col>
                   
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdateIcon}
                        >
                          Update
                        </Button>
                        {/* {feedback && <div>{feedback}</div>} */}

                    <Button
  className="btn-round"
  color="danger"
  type="button"
  onClick={DeleteIcon}
>
  Delete Icon
</Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    
                  <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 3 </label>
                        <Input
                          type="text"  value={text3} onChange={e => setText3(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdateFixedData}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    
                  <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Paragraph </label>
                        <Input
                          type="text" value={paragraph} onChange={e => setParagraph(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Button name </label>
                        <Input
                          type="text" value={buttonName} onChange={e => setButtonName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Button Link </label>
                        <Input
                          type="text"
                        placeholder="Type name of the page want to go to"
                        value={buttonLink} onChange={e => setButtonLink(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdateFixedData}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <h2>Social Media's</h2>
                  </Row>

                  {/* Social Media */}

                  <MainSecAddSocial/>


    </>
  )
}

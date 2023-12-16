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
import "toastify-js/src/toastify.css"; // Import the styles
import AddContent from "./AddContent";

export default function OurBeneftsSection() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [imgsection, setImgsection] = useState(""); // This will hold the file path, not the file itself
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');



  useEffect(() => {



    const fetchFixedData = async () => {
        try {
          const response = await axios.get("http://localhost:1010/ourbenfits/textourbenefits");
          const data = response.data[0];
          // Set the state with the fetched data
          setTitle(data.sectionTitile);
          setSubtitle(data.sectionSubtitile);
    
        } catch (error) {
          console.log(`Error fetching data: ${error}`);
        }
      };
  

      fetchFixedData();

  }, []);



  const AddPost = async () => {
    Toastify({
      text: "Added completely",
      duration: 3000, // Duration in milliseconds
      gravity: "top", // 'top' or 'bottom'
      position: "right", // 'left', 'center', 'right'
      backgroundColor: "#5EC693",
    }).showToast();
  };


  const UpdateFixedData = async () => {
    const payload = {
      sectionTitile: title,
      sectionSubtitile: subtitle,
       
      };
    try {
        const response = await axios.put('http://localhost:1010/ourbenfits/textourbenefits/1', payload);
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
  




  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const UpdateImg = async () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('imgourbenefits', selectedFile);
    } else {
      return; // Do nothing if no file is selected
    }
  
    try {
      const response = await axios.put('http://localhost:1010/ourbenfits/imgourbenefits/4', formData, {
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




 const DeleteImg = async () => {
        // Prepare the payload, setting the icon data to a null or empty state.
        const formData = new FormData();
        formData.append('imgourbenefits', '');
      
        try {
          const response = await axios.put('http://localhost:1010/ourbenfits/imgourbenefits/4', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200) {
            setFeedback('Img deleted successfully!');
            Toastify({
              text: "Img deleted completely",
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#ce5151",
            }).showToast();
          } else {
            setFeedback('Failed to delete icon.');
            Toastify({
              text: "Imag deletion uncompletely",
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
            text: "Img deletion uncompletely",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ce5151",
          }).showToast();
        }
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




  return (<>
    <Row>
    <Col className="px-1" md="3"></Col>
    <Col className="px-1" md="6">
      <img src={require("../../assets/img/home 2.png")} />
    </Col>
    <Col className="px-1" md="3"></Col>
  </Row>
        

  <Row className="mt-5">
    <h3>Title & Image Section "Update"</h3>
  </Row>


  <Row>
    <Col className="px-1" md="3">
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
        <Input
        value={subtitle}
          type="text"
          onChange={(e) => setSubtitle(e.target.value)}
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
                   <label>Image Section </label>
                   {imgsection && <img src={`http://localhost:1010/${imgsection}`} alt="Icon" />}

                   <Input
                     type="file"
                     accept="image/*"
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
                     onClick={UpdateImg}
                   >
                     Update
                   </Button>
                   {/* {feedback && <div>{feedback}</div>} */}

               <Button
className="btn-round"
color="danger"
type="button"
onClick={DeleteImg}
>
Delete Img
</Button>
                 </FormGroup>
               </Col>
             </Row>
    

   


  
  <Row className="mt-5">
    <h3>Add Content</h3>
  </Row>

  <Row>
    <Col>
      <AddContent />
    </Col>
  </Row>
  </>
  )
}

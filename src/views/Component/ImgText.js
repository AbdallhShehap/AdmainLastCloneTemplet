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

function YourComponent() {
  const [data, setData] = useState([]);
  const [smallText, setSmallText] = useState(""); // assuming title is a state used for Small Text and Big Text
  const [bigText, setBigText] = useState(""); // assuming title is a state used for Small Text and Big Text
  const [category, setCategory] = useState(""); // assuming title is a state used for Small Text and Big Text
  const [logo, setLogo] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [logoFile, setLogoFile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1010/categories/categories');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);



  const AddPost = async () => {

    if (!category || !selectedFile) {
      Toastify({
        text: "Category and image are required",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }



    const formData = new FormData();
    formData.append('toptext', smallText);
    formData.append('bottomtext', bigText);
    formData.append('category', category);
  
    if (selectedFile) {
      formData.append('imagecategory', selectedFile);
    }
  
    try {
      const response = await axios.post('http://localhost:1010/categories/addcategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Toastify({
        text: "Added successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
  
      // Update the data state with new item
      setData([...data, response.data]); // Assuming response.data is the new category object
  
      // Clear form fields
      setSmallText('');
      setBigText('');
      setCategory('');
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding category: ", error);
      Toastify({
        text: "Error adding category",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  



  const UpdatePost = async () => {
    if (!selectedOption) {
      Toastify({
        text: "Please select a category to update",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  


    if (!category || (!selectedFile && !selectedImage)) {
      Toastify({
        text: "Category and image are required",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }


    
    const formData = new FormData();
    formData.append('toptext', smallText);
    formData.append('bottomtext', bigText);
    formData.append('category', category);
  
    if (selectedFile) {
      formData.append('imagecategory', selectedFile); // New file selected
    } else if (selectedImage && !selectedFile) {
      formData.append('existingImagePath', selectedImage); // No new file, use existing image path
    }
  
    try {
      await axios.put(`http://localhost:1010/categories/categories/${selectedOption}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();
  
      // Update the data state to reflect the changes
      const updatedData = [...data];
      const index = updatedData.findIndex(item => item.id.toString() === selectedOption);
      if (index !== -1) {
        updatedData[index] = { ...updatedData[index], toptext: smallText, bottomtext: bigText, category, imageCategoryPath: selectedFile ? URL.createObjectURL(selectedFile) : selectedImage };
        setData(updatedData);
      }
      window.location.reload();

      // Optional: Clear form fields or reset states if needed
    } catch (error) {
      console.error("Error updating category: ", error);
      Toastify({
        text: "Error updating category",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };
  


  const DeletePost = async () => {
    if (selectedOption) {
      try {
        await axios.delete(`http://localhost:1010/categories/categories/${selectedOption}`);
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();
  
        // Update the local state to reflect the deletion
        const updatedData = data.filter(item => item.id.toString() !== selectedOption);
        setData(updatedData);
        setSelectedOption(""); // Reset the selected option
        setSmallText('');
        setBigText('');
        setCategory('');
        setSelectedImage('');
      } catch (error) {
        console.error("Error deleting post: ", error);
        Toastify({
          text: "Error deleting post",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();
      }
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
  
      // Update image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Invalid file type. Please select an image or video file.");
      e.target.value = ''; // Reset the file input
    }
  };
  

  const handleSelection = (e) => {
    const selectedId = e.target.value;
    const selectedItem = data.find(item => item["id"].toString() === selectedId);

    if (selectedItem) {
      setSelectedOption(selectedId);
      setSmallText(selectedItem.toptext);
      setBigText(selectedItem.bottomtext);
      setCategory(selectedItem.category);
      setSelectedImage(`http://localhost:1010/${selectedItem.imageCategoryPath}`);
    }
  };

  return (
    <>

<Row>
                    <h3>Add</h3>
                  </Row>
    
      <Row>
        <Col className="px-1" md="3">
          <FormGroup>
            <label>Small Text</label>
            <Input
              type="text"
              onChange={(e) => setSmallText(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Big Text</label>
            <Input
              type="text"
              onChange={(e) => setBigText(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Category</label>
            <Input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="3">
          <FormGroup>
            <label>Background Image</label>
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
              onClick={AddPost}
            >
              Add
            </Button>
          </FormGroup>
        </Col>
      </Row>

      
<Row>
                    <h3>Edit & Delete</h3>
                  </Row>
    

      <Row>
                  <Col className="px-2 mt-3" md="3">
        <FormGroup>
          <label>Select Our Services</label>
          <Input
            type="select"
            value={selectedOption}
            onChange={handleSelection}
          >
            <option value="" disabled>Our Services</option>
            {data.map((item) => (
                <option key={item["id"]} value={item["id"]}>
                  {item.category}
                </option>
              ))}
          </Input>
        </FormGroup>
      </Col>
    </Row>

    <Row>
    {selectedOption && (
        <>
      <Col className="px-1" md="3">
          <FormGroup>
            <label>Small Text</label>
            <Input
              value={smallText}
              type="text"
              onChange={(e) => setSmallText(e.target.value)}
            />
          </FormGroup>
        </Col>


        <Col className="px-1" md="3">
          <FormGroup>
            <label>Big Text</label>
            <Input
              value={bigText}
              type="text"
              onChange={(e) => setBigText(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="2">
          <FormGroup>
            <label>Category</label>
            <Input
              value={category}
              type="text"
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormGroup>
        </Col>

        <Col className="px-1" md="2">
              <FormGroup>
                <label>Background Image</label>
                <img src={selectedImage} alt="Selected Icon" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </FormGroup>
            </Col>


        <Col className="px-1" md="2">
          <FormGroup>
            <label> Background Image</label>
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
    </>
  );
}

export default YourComponent;

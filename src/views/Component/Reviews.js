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
import IconReviews from "./IconReviews";



export default function Reviews() {

    const [blogSlides, setBlogSlides] = useState([]);

    const [showBtn, setShowBtn] = useState(false);
    const [reviewsSelectedOption, setReviewsSelectedOption] = useState("");

    const [reviewsData, setReviewsData] = useState([]);

    const [name, setName] = useState("");
const [job, setJob] = useState("");
const [content, setContent] = useState("");
const [selectedImage, setSelectedImage] = useState("");
const [selectedFile, setSelectedFile] = useState(null);


const handleImageChange = (e) => {
  const file = e.target.files[0];
  const allowedFileTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
    'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
  ];

  if (file && allowedFileTypes.includes(file.type)) {
    setSelectedFile(file);
  } else {
    alert("Invalid file type. Please select a valid image file.");
    e.target.value = ''; // Reset the file input
  }
};



    useEffect(() => {
      const fetchReviewsData = async () => {
        try {
          const response = await axios.get('http://localhost:1010/reviews/reviewsslide');
          console.log(response.data)
          setReviewsData(response.data);
        } catch (error) {
          console.error("Error fetching reviews data: ", error);
        }
      };
    
      fetchReviewsData();
    }, []);


    const handleAddReviewSlide = () => {
        // Check if a slide is already being added
        if (showBtn) {
          // Prevent adding a new slide if one is already being added
          return;
        }
      
        setBlogSlides([
          ...blogSlides,
          {
            title: "",
            subtitle: "",
            content: "",
            imageType: "",
            image: [],
          },
        ]);
      
        setShowBtn(true);
      };
      
    
   

   


      const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedFileTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
          'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
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
          alert("Invalid file type. Please select a valid image file.");
          e.target.value = ''; // Reset the file input
        }
      };
      
      

      const AddPost = async () => {
        // Data to be sent
        const formData = new FormData();
        formData.append('name', name);
        formData.append('job', job);
        formData.append('content', content);
        formData.append('imgreviewsslide', selectedFile);
      
        try {
            // POST request to your API
            const response = await axios.post('http://localhost:1010/reviews/addreviewsslide', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            const newReview = response.data;

        if(newReview && newReview.id) {
            // Prepend the new review to the reviewsData array
            setReviewsData([newReview, ...reviewsData]);
        } else {
            // Handle the case where id is not present in the response
            console.error("New review added but no ID returned");
        }
            // Display success message
            Toastify({
                text: "Added completely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#5EC693",
            }).showToast();
    
            // Reset input fields after successful addition
            setName('');
            setJob('');
            setContent('');
            setSelectedFile(null);
            setSelectedImage('');
    
        } catch (error) {
            console.error("Error adding review: ", error);
            Toastify({
                text: "Error adding review",
                duration: 3000, // Duration in milliseconds
                gravity: "top", // 'top' or 'bottom'
                position: "right", // 'left', 'center', 'right'
                backgroundColor: "#ce5151",
              }).showToast();
        }
      };
      



      const UpdatePost = async () => {
        if (!reviewsSelectedOption) {
            alert("Please select a review to update.");
            return;
        }
    
        try {
            // Prepare the data to be sent
            const formData = new FormData();
            formData.append('name', name);
            formData.append('job', job);
            formData.append('content', content);
            if (selectedFile) {
                formData.append('imgreviewsslide', selectedFile);
            }
    
            // Send PUT request to your API
            const response = await axios.put(`http://localhost:1010/reviews/reviewsslide/${reviewsSelectedOption}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Update the review in the reviewsData state
            const updatedReviews = reviewsData.map(review => {
                if (review.id.toString() === reviewsSelectedOption) {
                    return { ...review, name, job, content, image: response.data.imagePath }; // Update with new values and imagePath
                }
                return review;
            });
            setReviewsData(updatedReviews);
    
            // Display success message
            Toastify({
                text: "Updated completely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#5EC693",
            }).showToast();
        } catch (error) {
            console.error("Error updating review: ", error);
            Toastify({
                text: "Error updating review",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ce5151",
            }).showToast();
        }
    };
    



  const DeletePost = async () => {
    if (!reviewsSelectedOption) {
        alert("Please select a review to delete.");
        return;
    }

    try {
        // Send DELETE request to your API
        await axios.delete(`http://localhost:1010/reviews/reviewsslide/${reviewsSelectedOption}`);

        // Remove the deleted review from the reviewsData state
        const updatedReviews = reviewsData.filter(review => review.id.toString() !== reviewsSelectedOption);
        setReviewsData(updatedReviews);

        // Reset the selected review
        setReviewsSelectedOption("");

        // Display success message
        Toastify({
            text: "Deleted completely",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ce5151",
        }).showToast();
    } catch (error) {
        console.error("Error deleting review: ", error);
        Toastify({
            text: "Error deleting review",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ce5151",
        }).showToast();
    }
};



const handleReviewSelection = (e) => {
    const selectedId = e.target.value;
    setReviewsSelectedOption(selectedId);
  
    const selectedReview = reviewsData.find(review => review.id.toString() === selectedId);
    if (selectedReview) {
      setName(selectedReview.name);
      setJob(selectedReview.job);
      setContent(selectedReview.content);
  
      // Assuming your server is correctly set up to serve images from a static path and
      // `selectedReview.image` contains the correct filename for the image
      // Update the URL to where your images are served from:
      setSelectedImage(`http://localhost:1010/${selectedReview.image}`);
    }
  };
  
  
  
  
  const allFieldsFilled = () => {
    return name !== "" && job !== "" && content !== "" && selectedFile !== null;
  };
  
  useEffect(() => {
    // This will run whenever name, job, content, or selectedFile changes
    // You can add any additional logic here if needed when these values change
  }, [name, job, content, selectedFile]);
  


  useEffect(() => {
    if (selectedImage) {
      console.log("Selected Image URL: ", selectedImage);
      // You can perform additional actions here if needed
    }
  }, [selectedImage]);

  

  return (
    <>
     <Row className="mt-5">
                    <h3>Add</h3>
                  </Row>

                
                    <Row >
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            type="text"
                            onChange={(e) => setName(e.target.value)}

                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Job</label>
                          <Input
                            type="text"
                            onChange={(e) => setJob(e.target.value)}

                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Content</label>
                          <Input
                            type="text"
                            onChange={(e) => setContent(e.target.value)}

                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-2 mt-3" md="3">
  <FormGroup>
    <label>Image</label>
    <Input
      type="file"
      onChange={handleImageChange}
      accept="image/jpeg, image/png, image/gif, image/bmp, image/tiff, image/svg+xml, image/x-icon, image/heic, image/avif"
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
                disabled={!allFieldsFilled()} // Disable button if not all fields are filled
            >
                Add
            </Button>

                    </FormGroup>
                </Col>
                    </Row>
               

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                     
                       
                        
                       
                   
                      
                        {/* <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={handleAddReviewSlide}
                        >
                          + Add Review slide
                        </Button> */}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <h3>Edit & Delete</h3>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                    <FormGroup>
  <label>Reviews</label>
  <Input type="select" value={reviewsSelectedOption} onChange={handleReviewSelection}>
    <option value="" disabled>Select Review</option>
    {reviewsData.map((review) => (
      <option key={review.id} value={review.id}>{review.name}</option>
    ))}
</Input>

</FormGroup>

                    </Col>
                  </Row>

                  <Row>
                    {reviewsSelectedOption && (
                      <>
                        <Col className="px-1" md="3">
                        <FormGroup>
  <label>Name</label>
  <Input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                      <FormGroup>
  <label>Job</label>
  <Input
    type="text"
    value={job}
    onChange={(e) => setJob(e.target.value)}
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
    <label>Image</label>
    {selectedImage && (
  <div>
    <img src={selectedImage} alt="Selected" style={{ width: '100px', height: '100px' }} />
  </div>
)}



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
                              className="btn-round btn-danger"
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
                    <h3>Icon's</h3>
                  </Row>

                  <IconReviews/>

    
    </>
  )
}
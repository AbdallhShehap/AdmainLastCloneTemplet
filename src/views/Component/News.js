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

export default function News() {
    const [feedback, setFeedback] = useState('');

    const [title, setTitle] = useState('');
    const [title1, setTitle1] = useState('');
    const [title2, setTitle2] = useState('');
    const [buttonName, setButtonName] = useState('');
    const [buttonLink, setButtonLink] = useState('');


    const [content, setContent] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const [slideData, setSlideData] = useState([]);

    const [newsData, setNewsData] = useState([]);


    const [newSlideDate, setNewSlideDate] = useState('');
const [newSlideTitle, setNewSlideTitle] = useState('');
const [newSlideLink, setNewSlideLink] = useState('');
const [newSlideImage, setNewSlideImage] = useState(null); // For file




    useEffect(() => {
      


        const fetchFixedData = async () => {
            try {
              const response = await axios.get("http://localhost:1010/newsslider/datafixednews");
              const data = response.data[0];
              // Set the state with the fetched data
              setTitle1(data.title1);
              setTitle2(data.title2);
            
              setButtonName(data.buttonName);
              setButtonLink(data.buttonLink);
            } catch (error) {
              console.log(`Error fetching data: ${error}`);
            }
          };
      


          const fetchNewsData = async () => {
            try {
                const response = await axios.get('http://localhost:1010/newsslider/newsslide');
                setNewsData(response.data);
            } catch (error) {
                console.error('Error fetching news data:', error);
                // Handle error appropriately
            }
        };
    
        fetchNewsData();
        
    
          fetchFixedData();

      }, []);

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        const allowedFileTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
          'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
        ];
      
        if (file && allowedFileTypes.includes(file.type)) {
          setNewSlideImage(file);
        } else {
          alert("Invalid file type. Please select a valid image file.");
          e.target.value = ''; // Reset the file input
        }
      };
      

      const handleSpecificImageChange = (e) => {
        const file = e.target.files[0];
        const allowedFileTypes = [
          'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
          'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif'
        ];
      
        if (file && allowedFileTypes.includes(file.type)) {
          // Handle the file (e.g., setting state or uploading)
          // Example: setLogoFile(file);
        } else {
          alert("Invalid file type. Please select a valid image file.");
          e.target.value = ''; // Reset the file input
        }
      };

      
      

      const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        setSelectedOption(selectedId);
    
        const selectedNews = newsData.find(news => news.id.toString() === selectedId);
        if (selectedNews) {
            // Assuming you want to update title, date, and link inputs
            setTitle(selectedNews.title);
            setNewSlideDate(selectedNews.date);
            setNewSlideLink(selectedNews.link);
            // For image, you might need to handle it differently since it's a file input
        }
    };

    


    const handleAddSlide = () => {
      setSlideData([...slideData, {}]);
    };
  
    const handleSlideChange = (e, index, field) => {
      const updatedSlides = [...slideData];
      updatedSlides[index][field] = e.target.value;
      setSlideData(updatedSlides);
    };

    
    const UpdateFixedData = async () => {
        const payload = {
            title1: title1,
            title2: title2,
            buttonName: buttonName,
            buttonLink: buttonLink,
          };
        try {
            const response = await axios.put('http://localhost:1010/newsslider/datafixednews/1', payload);
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


      const addNewSlide = async () => {
        const formData = new FormData();
        formData.append('date', newSlideDate);
        formData.append('title', newSlideTitle);
        formData.append('link', newSlideLink);
        formData.append('imgnewsslide', newSlideImage);
      
        try {
          const response = await axios.post('http://localhost:1010/newsslider/addnewsslide', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          if (response.status === 200) {
        
            Toastify({
                text: "Added completely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#ce5151",
              }).showToast();
          }
        } catch (error) {
          
            Toastify({
                text: "Added uncompletely",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
              }).showToast();
        }
      };
      

      const deleteNewsSlide = async () => {
        if (!selectedOption) {
            Toastify({
                text: "No news slide selected",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
            }).showToast();
            return;
        }
    
        try {
            const response = await axios.delete(`http://localhost:1010/newsslider/newsslide/${selectedOption}`);
            if (response.status === 200) {
                Toastify({
                    text: "News slide deleted successfully",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                }).showToast();
    
                // Update the local state to reflect the deletion
                setNewsData(newsData.filter(news => news.id.toString() !== selectedOption));
                setSelectedOption(""); // Reset the selection
            }
        } catch (error) {
            console.error('Error deleting news slide:', error);
            Toastify({
                text: "Error deleting news slide",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
            }).showToast();
        }
    };
    

  return (
    <>
        
        <Row className="mt-5">
                    <h3>Titles & Button Link</h3>
                  </Row>


                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title </label>
                        <Input
                          value={title1}
                          type="text"
                          onChange={(e) => setTitle1(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title 2</label>
                        <Input
                          type="text"
                          value={title2}
                          onChange={(e) => setTitle2(e.target.value)}
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
                        <label>Button </label>
                        <Input
                          value={buttonName}
                          type="text"
                          onChange={(e) => setButtonName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link</label>
                        <Input
                          type="text"
                          
                          value={buttonLink}

                          onChange={(e) => setButtonLink(e.target.value)}
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
                    <h3>Add News </h3>
                  </Row>




                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setNewSlideDate(e.target.value)}

                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title for one part of slide </label>
                        <Input
                          type="text"
                          onChange={(e) => setNewSlideTitle(e.target.value)}

                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="2">
                      <FormGroup>
                        <label>Link </label>
                        <Input
                          type="text"
                          onChange={(e) => setNewSlideLink(e.target.value)}

                          placeholder="Type name of the page want to go to"

                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="2">
                      <FormGroup>
                        <label>Image </label>
                        <Input
                          type="file"
                          onChange={handleImageChange}

                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="2">
                      <FormGroup>
                        
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={addNewSlide}
                          >
                          add
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* {slideData.map((slide, index) => (
                    <Row key={index}>
                       <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title for one part of slidet </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file

                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                          placeholder="Type name of the page want to go to"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Image </label>
                        <Input
                          type="file"
                        //   onChange={handleLogoChange}
                          accept="image/*"
                        />
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
                        //   onClick={AddPost}
                        >
                          add
                        </Button>

                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={handleAddSlide}
                        >
                          + Add more slide
                        </Button>
                       

                    
                       

                      </FormGroup>
                    </Col>
                  </Row> */}


                  
                  <Row className="mt-5">
                    <h3>Edit & Delete News </h3>
                  </Row>


                  <Row>
                    <Col className="px-2 mt-3" md="3">
                     <FormGroup>
    <label>Select One of News</label>
<Input
    type="select"
    value={selectedOption}
    onChange={handleSelectChange}
>
    <option value="" disabled>Choose News</option>
    {newsData.map((newsItem, index) => (
        <option key={index} value={newsItem.id}>
            {newsItem.title}
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
                            <label>Date</label>
                            <Input
    value={newSlideDate}
    type="text"
    onChange={(e) => setNewSlideDate(e.target.value)}
/>
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Title for one part of slide</label>
                            <Input
    value={newSlideTitle}
    type="text"
    onChange={(e) => setNewSlideTitle(e.target.value)}
/>
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label> Link</label>
                            <Input
    value={newSlideLink}
    type="text"
    onChange={(e) => setNewSlideLink(e.target.value)}
/>
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
  <FormGroup>
    <label> Image</label>
    <Input
      type="file"
      onChange={handleSpecificImageChange}
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
                            //   onClick={UpdatePost}
                            >
                              Update
                            </Button>
                            <Button
    className="btn-round btn-danger"
    color="primary"
    type="button"
    onClick={deleteNewsSlide}
>
    Delete
</Button>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>
    </>
  )
}

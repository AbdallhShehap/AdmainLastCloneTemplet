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
import Tables from "./Tables";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Import the styles
import AddContent from "./Component/AddContent";
import ImgText from "./Component/ImgText";
import Offer from "./Component/Offer";

function Home() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [video, setVideo] = useState("");
  const [social1, setSocial1] = useState("");
  const [social2, setSocial2] = useState("");
  const [social3, setSocial3] = useState("");
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateHomeId, setUpdateHomeId] = useState("");
  const [showAdditionalSocialMediaFields, setShowAdditionalSocialMediaFields] =
    useState(false);


    const [logoFiles, setLogoFiles] = useState([]);

    const handleLogoChange = (e) => {
      const selectedFiles = e.target.files;
  
      // Check if files are selected
      if (selectedFiles.length > 0) {
        // Check if the total number of selected files doesn't exceed 6
        if (logoFiles.length + selectedFiles.length <= 6) {
          // Check each selected file
          for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
  
            // Check if the selected file type is an image
            if (file.type.startsWith("image/")) {
              // Append the selected file to the logoFiles array
              setLogoFiles((prevFiles) => [...prevFiles, file]);
            } else {
              // Alert or handle the case when a selected file is not an image
              alert(`File ${file.name} is not an image. Please select image files.`);
            }
          }
        } else {
          // Alert or handle the case when the total number of selected files exceeds 6
          alert("You can't upload up to 6 images.");
        }
      }
    };

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOptionImg, setSelectedOptionImg] = useState("");
  const [selectedOptionIconRev, setSelectedOptionIconRev] = useState("");
  const [reviewsSelectedOption, setReviewsSelectedOption] = useState("");
  const [showBtn, setShowBtn] = useState(false);
  // const [title, setTitle] = useState("");
  const [logo, setLogo] = useState(null);

  const handleAdd = () => {
    // Handle the logic for adding based on the selected option, title, and logo
    console.log("Selected Option:", selectedOption);
    console.log("Title:", title);
    console.log("Logo:", logo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/home");
        const data = response.data;
        setAdd(data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();

    const dummyData = ["Facebook", "Twitter", "Instagram"];
    setSocialMediaNames(dummyData);
  }, []);

  const [socialMediaNames, setSocialMediaNames] = useState([]);

  // Fetch social media names from the database

  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");




  // Like Alert but smoothly Add Edit Delete 


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



  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateHomeId(id);
  };

  const handleUpdate = async (id) => {
    if (
      !title ||
      !subtitle ||
      !content ||
      !video ||
      !social1 ||
      !social2 ||
      !social3
    ) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      formData.append("video", video); // Append the selected image file
      formData.append("social1", social1); // Append the selected image file
      formData.append("social2", social2); // Append the selected image file
      formData.append("social3", social3); // Append the selected image file

      const response = await axios.put(
        `http://localhost:8080/home/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((data) => (data.id === id ? response.data : data))
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      window.location.reload();
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/home/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevData) => prevData.filter((data) => data.id !== id));

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  const [slideData, setSlideData] = useState([]);

  const handleAddSlide = () => {
    setSlideData([...slideData, {}]);
  };

  const handleSlideChange = (e, index, field) => {
    const updatedSlides = [...slideData];
    updatedSlides[index][field] = e.target.value;
    setSlideData(updatedSlides);
  };

  const [blogSlides, setBlogSlides] = useState([]);

  const handleAddReviewSlide = () => {
    setBlogSlides([
      ...blogSlides,
      {
        title: "",
        subtitle: "",
        content: "",
        imageType: "",
        images: [],
      },
    ]);

    setShowBtn(true)
    
  };

  const handleBlogSlideChange = (e, index, field) => {
    const updatedBlogSlides = [...blogSlides];

    if (field === "images") {
      // Handle file uploads for the "Image's" field
      updatedBlogSlides[index].images = Array.from(e.target.files);
    } else {
      // Handle other fields
      updatedBlogSlides[index][field] = e.target.value;
    }

    setBlogSlides(updatedBlogSlides);
  };

  // const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5"></CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <h2> Main Section</h2>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home1.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 1</label>
                        <Input value={title} type="text" />
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
                      </FormGroup>
                    </Col>


                  </Row>

                  <Row>
                  <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 2</label>
                        <Input
                          type="text"
                          onChange={(e) => setSubtitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon </label>
                        <Input
                          type="file"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
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
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    
                  <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text 3 </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
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
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    
                  <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Paragraph </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Button name </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Button Link </label>
                        <Input
                          type="text"
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
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
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row style={{ height: "150px" }}>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Social Media</label>
                        <Input
                          type="select"
                          value={selectedSocialMedia}
                          onChange={(e) =>
                            setSelectedSocialMedia(e.target.value)
                          }
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
                          onChange={(e) => setContent(e.target.value)} // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="6">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdatePost}
                        >
                          Update Link for Social Media
                        </Button>

                        <Button
                          className="btn-round  btn-danger"
                          color="primary"
                          type="button"
                          onClick={DeletePost}
                        >
                          Delete
                        </Button>

                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={() =>
                            setShowAdditionalSocialMediaFields(
                              !showAdditionalSocialMediaFields
                            )
                           
                          }
                        >
                          + Add more Social Media
                        </Button>
                      </FormGroup>
                    </Col>

                    <Col>
                      <Row>
                        {showAdditionalSocialMediaFields && (
                          <>
                            <Col className="px-1" md="3">
                              <FormGroup>
                                <label>Social name </label>
                                <Input type="text" />
                              </FormGroup>
                            </Col>
                            <Col className="px-1" md="3">
                              <FormGroup>
                                <label>Social Link</label>
                                <Input type="text" />
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
                                  Add Social Media
                                </Button>
                              </FormGroup>
                            </Col>
                          </>
                        )}
                      </Row>
                    </Col>
                  </Row>

          

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />
                      
                      {/* Our Benefts Section */}

                  <Row>
                    <h2> Our Benefts Section</h2>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home 2.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
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
                          onClick={UpdatePost}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <AddContent />
                    </Col>
                  </Row>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  <Row>
                    <h2>First Marquee</h2>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/marquee.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text</label>
                        <Input
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
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
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Marquee Word's</label>
                        <Input
                          type="select"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                            EST CASES 1LATEST CASES 1
                          </option>
                          <option value="option2">
                            LATEST CASES 2LATEST CASES 2
                          </option>
                          <option value="option3">
                            LATEST CASES 3LATEST CASES 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOption && (
                      <>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Text</label>
                            <Input
                              value={title}
                              type="text"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Icon</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* Our Services */}

                  <Row>
                    <h2>Our Services</h2>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>

                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home3.png")} />
                    </Col>

                    <Col className="px-1" md="3"></Col>
                  </Row>
                  <Row>
                    <Col className="px-1 ml-3" md="11">
                      <ImgText />
                    </Col>
                  </Row>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* About us */}

                     <Row>
                <h2>About us</h2>
                                </Row>

                  
                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home4.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>

               


                  <Offer/>








                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* Secound Marquee */}

                  <Row>
                    <h2>Secound Marquee</h2>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/marquee.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text</label>
                        <Input
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
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
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Marquee Word's</label>
                        <Input
                          type="select"
                          value={selectedOption2}
                          onChange={(e) => setSelectedOption2(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                            EST CASES 1LATEST CASES 1
                          </option>
                          <option value="option2">
                            LATEST CASES 2LATEST CASES 2
                          </option>
                          <option value="option3">
                            LATEST CASES 3LATEST CASES 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOption2 && (
                      <>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Text</label>
                            <Input
                              value={title}
                              type="text"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Icon</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* Reviews */}

                  <Row>
                    <h2>Reviews</h2>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home5.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>

                  {blogSlides.map((blogSlide, index) => (
                    <Row key={index}>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            value={blogSlide.title}
                            type="text"
                            onChange={(e) =>
                              handleBlogSlideChange(e, index, "title")
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Job</label>
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleBlogSlideChange(e, index, "subtitle")
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Content</label>
                          <Input
                            type="text"
                            onChange={(e) =>
                              handleBlogSlideChange(e, index, "content")
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-2 mt-3" md="3">
                        <FormGroup>
                          <label>Image's</label>
                          <Input
                            type="file"
                            // onChange={(e) => handleBlogSlideChange(e, index, "images")}
                            // multiple
                            onChange={handleLogoChange}
                            accept="image/*"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ))}

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                      {showBtn && (
                        <>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={AddPost}
                        >
                          Add
                        </Button>
                        
                        </>
                      )}
                      
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={handleAddReviewSlide}
                        >
                          + Add Review slide
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Reviews</label>
                        <Input
                          type="select"
                          value={reviewsSelectedOption}
                          onChange={(e) => setReviewsSelectedOption(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                            Johan
                          </option>
                          <option value="option2">
                           Jack
                          </option>
                          <option value="option3">
                            Tom
                          </option>
                          {/* Add more options as needed */}
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
                          
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Job</label>
                          <Input
                            type="text"
                         
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Content</label>
                          <Input
                            type="text"
                       
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-2 mt-3" md="3">
                        <FormGroup>
                          <label>Image</label>
                          <Input
                            type="file"
                            // onChange={(e) => handleBlogSlideChange(e, index, "images")}
                            multiple
                            onChange={handleLogoChange}
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

                  <Row>
                  <Col className="px-2 mt-3" md="3">
      <FormGroup>
        <label>Icon's</label>
        <Input
          type="file"
          multiple
          onChange={handleLogoChange}
          accept="image/*"
        />
      </FormGroup>
      {logoFiles.length > 0 && (
        <div>
          <p>Selected Images:</p>
          <ul>
            {logoFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
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
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Icon's</label>
                        <Input
                          type="select"
                          value={selectedOptionIconRev}
                          onChange={(e) => setSelectedOptionIconRev(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                          Icon 1
                          </option>
                          <option value="option2">
                          Icon 2
                          </option>
                          <option value="option3">
                          Icon 3
                          </option>
                          <option value="option4">
                          Icon 4
                          </option>
                          <option value="option5">
                          Icon 5
                          </option>
                          <option value="option5">
                          Icon 6
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOptionIconRev && (
                      <>
                       

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Icon</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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




                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* NEWS & LATEST UPDATES */}

                  <Row>
                    <h2>NEWS & LATEST UPDATES</h2>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home6.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>



                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title </label>
                        <Input
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title 2</label>
                        <Input
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
                          onClick={UpdatePost}
                        
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
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Link</label>
                        <Input
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
                          onClick={UpdatePost}
                        
                        >
                         Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>



                  <Row>
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
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Image </label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {slideData.map((slide, index) => (
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
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Image </label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
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
                          onClick={AddPost}
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
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Select One of News</label>
                        <Input
                          type="select"
                          value={selectedOption}
                          onChange={(e) => setSelectedOption(e.target.value)}
                        >
                          <option value="" disabled>
                           News
                          </option>
                          <option value="option1">
                            Does My Website Need a Blog?
                          </option>
                          <option value="option2">
                            A Simple Social Media Marketing Checklist
                          </option>
                          <option value="option3">
                            You’re Still Not Using Digital Tools?
                          </option>
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
                              value={title}
                              type="text"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Title for one part of slidet</label>
                            <Input
                              value={title}
                              type="text"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label> Link</label>
                            <Input
                            type="text"
                              
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label> Image</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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


                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  <Row>
                    <h2>Third Marquee</h2>
                  </Row>

                  <Row>
                    <Col className="px-1" md="12">
                      <img src={require("../assets/img/home7.png")} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text</label>
                        <Input
                          value={title}
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
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
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Marquee Word's</label>
                        <Input
                          type="select"
                          value={selectedOption3}
                          onChange={(e) => setSelectedOption3(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                            EST CASES 1LATEST CASES 1
                          </option>
                          <option value="option2">
                            LATEST CASES 2LATEST CASES 2
                          </option>
                          <option value="option3">
                            LATEST CASES 3LATEST CASES 3
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOption3 && (
                      <>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Text</label>
                            <Input
                              value={title}
                              type="text"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Icon</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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

                  <Row>
                    <Col className="px-1 ml-4" md="2">
                      <FormGroup>
                        <label>Imag1</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 ml-4" md="2">
                      <FormGroup>
                        <label>Imag2</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 ml-4" md="2">
                      <FormGroup>
                        <label>Imag3</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 ml-4" md="2">
                      <FormGroup>
                        <label>Imag4</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 ml-4" md="2">
                      <FormGroup>
                        <label>Imag5</label>
                        <Input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                        />
                      </FormGroup>
                    </Col>


                  </Row>
                  <Col className="px-2 mt-3" md="3">
                          <FormGroup>
                            <Button
                              className="btn-round"
                              color="primary"
                              type="button"
                              onClick={AddPost}
                            >
                              Add all
                            </Button>
                          </FormGroup>
                        </Col>


 <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Imag's</label>
                        <Input
                          type="select"
                          value={selectedOptionImg}
                          onChange={(e) => setSelectedOptionImg(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Text's
                          </option>
                          <option value="option1">
                            Image 1
                          </option>
                          <option value="option2">
                          Image 2
                          </option>
                          <option value="option3">
                          Image 3
                          </option>
                          <option value="option4">
                          Image 4
                          </option>
                          <option value="option5">
                          Image 5
                          </option>
                          {/* Add more options as needed */}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedOptionImg && (
                      <>
                       

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Image</label>
                            <Input
                              type="file"
                              onChange={handleLogoChange}
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




                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Blog Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>subtitle</th>
                      <th>content</th>
                      <th>video</th>
                      <th>social1</th>
                      <th>social2</th>
                      <th>social3</th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((blog, index) => (
                      <tbody key={blog.id}>
                        <tr key={blog.id}>
                          <td>{blog.title}</td>
                          <td>{blog.subtitle}</td>
                          <td>{blog.content}</td>
                          <td>
                            <video autoPlay muted loop height="600" width="200">
                              <source
                                src={`http://localhost:8080/` + blog.video}
                              />
                            </video>
                          </td>
                          <td>
                            <img
                              src={`http://localhost:8080/` + blog.social1}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <img
                              src={`http://localhost:8080/` + blog.social2}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <img
                              src={`http://localhost:8080/` + blog.social3}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <button
                              onClick={
                                () => handleDelete(blog.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </button>
                            <button onClick={() => openUpdateForm(blog.id)}>
                              update
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md="12">
          <Card className="card-user">
            {isUpdateFormVisible && (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Update Home</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Title</label>
                          <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>subtitle</label>
                          <Input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>content</label>
                          <Input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">video </label>
                          <input
                            type="file"
                            name="video"
                            onChange={handleLogoChange}
                            accept="vedeo/*"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">social1 </label>
                          <input
                            type="file"
                            name="social1"
                            onChange={(e) => setSocial1(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Social2 </label>
                          <input
                            type="file"
                            name="social2"
                            onChange={(e) => setSocial2(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">Social3 </label>
                          <input
                            type="file"
                            name="social3"
                            onChange={(e) => setSocial3(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={() => handleUpdate(updateHomeId)}
                        >
                          Update Home
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;

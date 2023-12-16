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
import ImgText from "./Component/ImgText";
import Offer from "./Component/Offer";
import MainSection from "./Component/MainSection";
import OurBeneftsSection from "./Component/OurBeneftsSection";
import FirstMarquee from "./Component/FirstMarquee";
import SecoundMarquee from "./Component/SecoundMarquee";
import ThirdMarquee from "./Component/ThirdMarquee";
import Reviews from "./Component/Reviews";
import News from "./Component/News";

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
        `http://reactaback.we-demo.xyz/home/update/${id}`,
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
        image: [],
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

                 {/* Main Section */}



                <MainSection/>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />
                      
                      {/* Our Benefts Section */}

                  <Row>
                    <h1> Our Benefts Section</h1>
                  </Row>
                 
                  <OurBeneftsSection/>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  <Row >
                    <h1>First Marquee</h1>
                  </Row>


                  <FirstMarquee/>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* Our Services */}

                  <Row>
                    <h1>Our Services</h1>
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
                <h1>About us</h1>
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
                    <h1>Secound Marquee</h1>
                  </Row>

                    <SecoundMarquee/>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* Reviews */}

                  <Row>
                    <h1>Reviews</h1>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home5.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>

                 <Reviews/>

                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  {/* NEWS & LATEST UPDATES */}

                  <Row>
                    <h1>NEWS & LATEST UPDATES</h1>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3"></Col>
                    <Col className="px-1" md="6">
                      <img src={require("../assets/img/home6.png")} />
                    </Col>
                    <Col className="px-1" md="3"></Col>
                  </Row>


                <News/>


                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />

                  <Row>
                    <h1>Third Marquee</h1>
                  </Row>

                  <Row>
                    <Col className="px-1" md="12">
                      <img src={require("../assets/img/home7.png")} />
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <h3>Text & Icon's</h3>
                  </Row>


                  <ThirdMarquee/>





                  <hr style={{ marginTop: "100px", marginBottom: "100px" }} />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      
      </div>
     
    </>
  );
}

export default Home;

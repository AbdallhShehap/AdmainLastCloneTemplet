import React, { useEffect, useState } from 'react'
import axios from 'axios';
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
} from "reactstrap";
import Tables from "./Tables";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Import the styles
import NavbarWhenScrollup from "./Component/NavbarWhenScrollup"
import NavbarStander from "./Component/NavbarStander"
import SideMenu from "./Component/SideMenu"



function About() {
  const [add, setAdd] = useState([]);
  const [title, setTitle] = useState("");
  const [paragraphleft, setParagraphleft] = useState("");
  const [paragraphright, setParagraphright] = useState("");
  const [imageleft, setImageleft] = useState("");
  const [imageright, setImageRight] = useState("")
 
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateAboutId, setUpdateAboutId] = useState("");

  




  
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







  const [logoFile, setLogoFile] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/about");
        const data = response.data;
        setAdd(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  
  const handlePost = async () => {
    if (!title || !paragraphleft || !paragraphright || !imageleft || !imageright ) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
              return;
    }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('paragraphleft', paragraphleft);
      formData.append('paragraphright', paragraphright);
      formData.append('imageleft', imageleft);
      formData.append('imageright', imageright);
   

      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/about/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAdd(response.data);
      Toastify({
        text: "Added completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
    } catch (error) {
      console.log(`Error fetching post data ${error}`);
    }
  };
  const openUpdateForm = (id) => {
    setIsUpdateFormVisible(true);
    setUpdateAboutId(id);
  };

  const handleUpdate = async (id) => {
    if (!title || !paragraphleft || !paragraphright || !imageleft || !imageright) {
      Toastify({
        text: "Please Fill All Field",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#CA1616",
      }).showToast();
              return;
      }
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('paragraphleft', paragraphleft);
      formData.append('paragraphright', paragraphright);
      formData.append('imageleft', imageleft); // Append the selected image file
      formData.append('imageright', imageright); // Append the selected image file
      
  
      const response = await axios.put(
        `http://localhost:8080/about/update/${id}`,
        formData, // Send the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((data) =>
          data.id === id ? response.data : data
        )
      );
      Toastify({
        text: "Updated completely",
        duration: 3000, // Duration in milliseconds
        gravity: "top", // 'top' or 'bottom'
        position: 'right', // 'left', 'center', 'right'
        backgroundColor: "#5EC693",
      }).showToast();
      
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/about/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevData) =>
        prevData.filter((data) => data.id !== id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Navber's</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>


                {/* Menu */}
                <Row>
                    <h2>
                    Navbar Stander
                    </h2>
                  </Row>
                  <Row>
                  <Col className="px-1" md="12">
                      <FormGroup>
                        <label>Simulation</label>
                        <img src={require("../assets/img/menu.png")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>


                    <NavbarStander/>
                    
               

              


              


{/*               
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add
                      </Button>
                    </div>
                  </Row> */}





                  <hr style={{marginBottom:"100px" , marginTop:"100px"}}/>







                   {/* Menu When Scrollup */}
                  <Row>
                    <h2>
                    Navbar at Scrollup
                    </h2>
                  </Row>

                  <Row>
                  <Col className="px-1" md="12">
                      <FormGroup>
                        <label>Simulation</label>
                        <img src={require("../assets/img/MenuWhenscrollup.png")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>


               
                    <NavbarWhenScrollup/>
                    
                

              



                  <hr style={{marginBottom:"100px" , marginTop:"100px"}}/>
                  
                   {/* Side Menu */}

                   <Row>
                    <h2>
                   Side menu
                    </h2>
                  </Row>

                   <Row >
                 
                    <Col>
                    <SideMenu/>
                    
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        
                        <img src={require("../assets/img/sidemenuWhenScrollup.png")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  
                  <Row>
                    
                    

                  </Row>

              


                  <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">image at the below </label>
                        <input
                          type="file"
                          name="imageleft"
                          onChange={handleLogoChange}
                          accept="image/*"
                         // Update state with the selected file
                        />
                      </FormGroup>
                    </Col>
              
                    <Col className="pl-1" md="4">
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


              
                

                  <hr style={{marginBottom:"100px" , marginTop:"100px"}}/>

                  

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>













        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">About Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Title</th>
                      <th>paragraph left</th>
                      <th>paragraph right</th>
                      <th>image left</th>
                      <th>image right</th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.title}</td>
                          <td>{data.paragraphleft}</td>
                          <td>{data.paragraphright}</td>
                        
                          <td>
                            <img src={`http://localhost:8080/` + data.imageleft} alt={`about`} height={"50%"} width={"50%"} />

                          </td>
                          <td>
                            <img src={`http://localhost:8080/` + data.imageright} alt={`about`} height={"50%"} width={"50%"} />

                          </td>
                          
                          <td>
                              <button
                                onClick={
                                  () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(data.id)}
                              >
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
                    <CardTitle tag="h5">Update About</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form >
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
                            <label>paragraph left</label>
                            <Input
                              type="text"
                              value={paragraphleft}
                              onChange={(e) => setParagraphleft(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3">
                          <FormGroup>
                            <label>paragraph right</label>
                            <Input
                              type="text"
                              value={paragraphright}
                              onChange={(e) => setParagraphright(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      
                        <Col className="pl-1" md="4">
                        <FormGroup>
                        <label htmlFor="exampleInputEmail1">image left </label>
                        <input
                          type="file"
                          name="image_data"
                          onChange={handleLogoChange}
                          accept="image/*"                        />
                      </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                        <FormGroup>
                        <label htmlFor="exampleInputEmail1">image right </label>
                        <input
                          type="file"
                          name="image_data"
                          onChange={handleLogoChange}
                          accept="image/*"                        />
                      </FormGroup>
                        </Col>
                        
                      </Row>
                  
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={() => handleUpdate(updateAboutId)}
                          >
                            Update About
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
  )
}

export default About
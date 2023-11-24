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

import AddSocial from './Component/AddSocial'


function Footer() {
  const [add, setAdd] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [extraContact, setExtraContact] = useState("");
  const [social1, setSocial1] = useState("")
  const [social2, setSocial2] = useState("")
  const [social3, setSocial3] = useState("")
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateFooterId, setUpdateFooterId] = useState("");


  const [contentFields, setContentFields] = useState([]);
  const [contentFields2, setContentFields2] = useState([]);

  const handleAddContent = () => {
    setContentFields((prevFields) => [
      ...prevFields,
      {
        content: "",
      },
    ]);
  };

  const handleAddContent2 = () => {
    setContentFields2((prevFields) => [
      ...prevFields,
      {
        content: "",
      },
    ]);
  };

  const handleContentChange = (index, value) => {
    const updatedFields = [...contentFields];
    updatedFields[index].content = value;
    setContentFields(updatedFields);
  };

  const handleAddTheContent = () => {
    // Handle the logic for adding the content as needed
    console.log("Content Fields:", contentFields);
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





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/footer");
        const data = response.data;
        setAdd(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  
  const handlePost = async () => {
    if (!phone || !email || !address  || !social1 || !social2 || !social3) {
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
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('extraContact', extraContact);
      formData.append('social1', social1);
      formData.append('social2', social2);
      formData.append('social3', social3);

      // Append each selected contact_video file individually

      const response = await axios.post(
        "http://localhost:8080/footer/post",
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
    setUpdateFooterId(id);
  };

  const handleUpdate = async (id) => {
    if (!phone || !email || !address  || !social1 || !social2 || !social3) {
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
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('extraContact', extraContact); // Append the selected image file
      formData.append('social1', social1); // Append the selected image file
      formData.append('social2', social2); // Append the selected image file
      formData.append('social3', social3); // Append the selected image file
  
      const response = await axios.put(
        `http://localhost:8080/footer/update/${id}`,
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
        `http://localhost:8080/footer/delete/${id}`
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
                <CardTitle tag="h5">Footer</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <img src={require("../assets/img/footer.png")} />
                    </Col>
                  </Row>
                
                    <Row className='mt-5'>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Logo</label>
                        <Input
                          type="file"
                          
                        />
                      </FormGroup>
                    </Col>


                    <Col className="px-1 mt-2" md="5">
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
                    <Col className="px-1" md="5">
                      <FormGroup>
                        <label>title</label>
                        <Input
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <label>title2</label>
                        <Input
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={handleAddContent}
                        >
                          + Add Content
                        </Button>
                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="3">
                     
                    </Col>

                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={handleAddContent2}
                        >
                          + Add Content
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 ml-3" md="6">

                    
                  {contentFields.map((field, index) => (
                    <Row key={index}>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Content</label>
                          <Input
                            type="text"
                            value={field.content}
                            onChange={(e) =>
                              handleContentChange(index, e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Link</label>
                          <Input
                            type="text"
                            value={field.content}
                            onChange={(e) =>
                              handleContentChange(index, e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>

                      <Col className="px-2 mt-3" md="5">
                        <FormGroup>
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={AddPost}
                          >
                            Add The Content
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  ))}

                    </Col>


                    <Col className="px-2" md="5">

                    
{contentFields2.map((field, index) => (
  <Row key={index}>
    <Col className="px-1" md="5">
      <FormGroup>
        <label>Content</label>
        <Input
          type="text"
          value={field.content}
          onChange={(e) =>
            handleContentChange(index, e.target.value)
          }
        />
      </FormGroup>
    </Col>
    <Col className="px-1" md="5">
                        <FormGroup>
                          <label>Link</label>
                          <Input
                            type="text"
                            value={field.content}
                            onChange={(e) =>
                              handleContentChange(index, e.target.value)
                            }
                          />
                        </FormGroup>
                      </Col>

    <Col className="px-2 mt-3" md="5">
      <FormGroup>
        <Button
          className="btn-round"
          color="primary"
          type="button"
          onClick={AddPost}
        >
          Add The Content
        </Button>
      </FormGroup>
    </Col>
  </Row>
))}

  </Col>
                  </Row>


                  <Row>
        <Col className="px-1" md="3">
            <FormGroup>
              <label> Title Subscribe Section </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>

        <Col className="px-1" md="3">
            <FormGroup>
              <label> Place holder for Subscribe input </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>


        <Col className="px-1" md="3">
            <FormGroup>
              <label> Text under the input </label>
              <Input
                type="text"
              
              />
            </FormGroup>
          </Col>

        </Row>


      <Row>
        <Col className="px-2 mt-3" md="12">
          <FormGroup>
           <AddSocial/>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col className="px-2 mt-3" md="12">
          <FormGroup>
          <label> Copy write text </label>
              <Input
                type="text"
              
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
                        onClick={handlePost}
                      >
                        Add
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Footer Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>phone</th>
                      <th>email</th>
                      <th>address</th>
                      <th>extraContact</th>
                      <th>social media</th>
                      <th>social media</th>
                      <th>social media</th>
                    </tr>
                  </thead>
                  {add &&
                    Array.isArray(add) &&
                    add.map((data, index) => (
                      <tbody key={data.id}>
                        <tr key={data.id}>
                          <td>{data.phone}</td>
                          <td>{data.email}</td>
                          <td>{data.address}</td>
                          <td>{data.extraContact}</td>

                          <td>
                            <img
                              src={`http://localhost:8080/` + data.social1}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <img
                              src={`http://localhost:8080/` + data.social2}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <img
                              src={`http://localhost:8080/` + data.social3}
                              alt={`Contact Video`}
                              height={"50%"}
                              width={"50%"}
                            />
                          </td>
                          <td>
                            <button
                              onClick={
                                () => handleDelete(data.id, index) // Calling handleDelete with the product's _id and index
                              }
                            >
                              delete
                            </button>
                            <button onClick={() => openUpdateForm(data.id)}>
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
                  <CardTitle tag="h5">Update Footer</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>phone</label>
                          <Input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>email</label>
                          <Input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <label>address</label>
                          <Input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Extra Contact</label>
                          <Input
                            placeholder="optional"
                            type="text"
                            onChange={(e) => setExtraContact(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            social media 1{" "}
                          </label>
                          <input
                            type="file"
                            name="image_data"
                            onChange={(e) => setSocial1(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            social media 2{" "}
                          </label>
                          <input
                            type="file"
                            name="image_data"
                            onChange={(e) => setSocial2(e.target.files[0])} // Update state with the selected file
                          />
                        </FormGroup>
                      </Col>

                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            social media 3{" "}
                          </label>
                          <input
                            type="file"
                            name="image_data"
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
                          onClick={() => handleUpdate(updateFooterId)}
                        >
                          Update Footer
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

export default Footer
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
} from "reactstrap";
import Tables from "./Tables";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Import the styles

import AddSocialFooter from "./Component/AddSocialFooter";

function Footer() {
  const [add, setAdd] = useState([]);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [copyWriteText, setCopyWriteText] = useState("");
  const [textUnderInput, setTextUnderInput] = useState("");

  const [address, setAddress] = useState("");
  const [extraContact, setExtraContact] = useState("");
  const [social1, setSocial1] = useState("");
  const [social2, setSocial2] = useState("");
  const [social3, setSocial3] = useState("");
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [del, setDel] = useState([]);
  const [updateFooterId, setUpdateFooterId] = useState("");

  const [contentFields, setContentFields] = useState([]);
  const [contentFields2, setContentFields2] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [selectedContent, setSelectedContent] = useState({
    id: "",
    name: "",
    path: "",
  });

  const [contents, setContents] = useState([]);

  const [selectedContent2, setSelectedContent2] = useState({
    id: "",
    name: "",
    path: "",
  });

  const [contents2, setContents2] = useState([]);

  const fetchContents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1010/footer/detailsfirstsectioncontent"
      );
      console.log({ first: response.data });
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };
  const fetchContents2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1010/footer/detailssecoundsecitoncontent"
      );
      console.log({ first: response.data });
      setContents2(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  useEffect(() => {
    const fetchFooterDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/footer/details"
        );
        if (response.data && response.data.length > 0) {
          const footerData = response.data[0];
          setTitle1(footerData.footerFirstTitle); // Assuming this represents the phone
          setTitle2(footerData.footerSecoundTitle); // Assuming this represents the email
          setTitle3(footerData.footerThirdTitle); // Assuming this represents the address
          setCopyWriteText(footerData.copyWriteText);
          setTextUnderInput(footerData.textUnderInput);
          // Add other fields if needed
        }
      } catch (error) {
        console.error("Error fetching footer details:", error);
        // Handle error appropriately
      }
    };

    fetchFooterDetails();
    fetchContents();
    fetchContents2();
  }, []);

  const UpdateContent = async () => {
    if (!selectedContent.id) {
      console.error("No content selected for updating");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:1010/footer/detailsfirstsectioncontent/${selectedContent.id}`,
        {
          name: selectedContent.name,
          path: selectedContent.path,
        }
      );
      console.log("Content updated successfully:", response.data);

      // Update the contents state with the updated content details
      const updatedContents = contents.map((content) =>
        content.id === selectedContent.id
          ? {
              ...content,
              name: selectedContent.name,
              path: selectedContent.path,
            }
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
      const response = await axios.delete(
        `http://localhost:1010/footer/detailsfirstsectioncontent/${selectedContent.id}`
      );
      console.log("Content deleted successfully:", response.data);

      // Remove the deleted content from the contents state
      setContents((prevContents) =>
        prevContents.filter((content) => content.id !== selectedContent.id)
      );

      // Reset the selected content
      setSelectedContent({ id: "", name: "" });

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

  const UpdateContent2 = async () => {
    if (!selectedContent2.id) {
      console.error("No content selected for updating");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:1010/footer/detailssecoundsecitoncontent/${selectedContent2.id}`,
        {
          name: selectedContent2.name,
          path: selectedContent2.path,
        }
      );
      console.log("Content updated successfully:", response.data);

      // Update the contents state with the updated content details
      const updatedContents = contents2.map((content) =>
        content.id === selectedContent2.id
          ? {
              ...content,
              name: selectedContent2.name,
              path: selectedContent2.path,
            }
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

  const DeleteContent2 = async () => {
    if (!selectedContent2.id) {
      console.error("No content selected for deletion");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:1010/footer/detailssecoundsecitoncontent/${selectedContent2.id}`
      );
      console.log("Content deleted successfully:", response.data);

      // Remove the deleted content from the contents state
      setContents2((prevContents) =>
        prevContents.filter((content) => content.id !== selectedContent2.id)
      );

      // Reset the selected content
      setSelectedContent2({ id: "", name: "" });

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/svg+xml",
      "image/x-icon",
      "image/heic",
      "image/avif",
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];

    if (file && allowedFileTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert("Invalid file type. Please select an image or video file.");
      e.target.value = ""; // Reset the file input
    }
  };

  const UpdatePostLogo = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("logoImg", selectedFile);

      try {
        const response = await axios.put(
          "http://localhost:1010/logo/logoimg/4",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          setFeedback("Update successful!");
          Toastify({
            text: "Updated completely",
            duration: 3000, // Duration in milliseconds
            gravity: "top", // 'top' or 'bottom'
            position: "right", // 'left', 'center', 'right'
            backgroundColor: "#5EC693",
          }).showToast();
        } else {
          setFeedback("Failed to update.");
        }
      } catch (error) {
        console.error("Error updating:", error);
        setFeedback("Error updating.");
      }
    } else {
      setFeedback("Please select a file to upload.");
    }
  };

  const handleAddContent = () => {
    setContentFields((prevFields) => [
      ...prevFields,
      { content: "", link: "" },
    ]);
  };

  const handleAddContent2 = () => {
    setContentFields2((prevFields) => [
      ...prevFields,
      { content2: "", link2: "" },
    ]);
  };

  const handleContentChange = (index, field, value) => {
    const updatedFields = [...contentFields];
    updatedFields[index][field] = value;
    setContentFields(updatedFields);
  };

  const handleContentChange2 = (index, field, value) => {
    const updatedFields = [...contentFields2];
    updatedFields[index][field] = value;
    setContentFields2(updatedFields);
  };

  const updateTitle1 = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1010/footer/details/2",
        {
          footerFirstTitle: title1,
          footerSecoundTitle: title2,
          footerThirdTitle: title3,
          copyWriteText: copyWriteText,
          textUnderInput: textUnderInput,
        }
      );
      if (response.status === 200) {
        Toastify({
          text: " updated successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
      }
    } catch (error) {
      console.error("Error updating title 1:", error);
      Toastify({
        text: "Failed to update title 1",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };

  const handleAddTheContent = async (index) => {
    const field = contentFields[index];
    if (!field.content || !field.link) {
      Toastify({
        text: "Please fill in both content and link",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1010/footer/addfirstsectioncontent",
        {
          name: field.content,
          path: field.link,
        }
      );

      if (response.status === 200) {
        Toastify({
          text: "Content First Section added successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
        // Optionally clear the fields or update the UI as needed
      }
    } catch (error) {
      console.error("Error adding content:", error);
      Toastify({
        text: "Failed to add content",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };

  const handleAddTheContent2 = async (index) => {
    const field = contentFields2[index];
    if (!field.content2) {
      Toastify({
        text: "Please fill  content",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1010/footer/addsecoundsectioncontent",
        {
          name: field.content2,
          // path: field.link2,
        }
      );

      if (response.status === 200) {
        Toastify({
          text: "Content secound Section added successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#5EC693",
        }).showToast();
        // Optionally clear the fields or update the UI as needed
      }
    } catch (error) {
      console.error("Error adding content:", error);
      Toastify({
        text: "Failed to add content",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "red",
      }).showToast();
    }
  };

  const handleSelectChange = (e) => {
    const selectedContentId = e.target.value;
    const content = contents.find((c) => c.id.toString() === selectedContentId);
    if (content) {
      setSelectedContent({
        id: content.id,
        name: content.name,
        path: content.path,
      });
    }
  };

  const handleSelectChange2 = (e) => {
    const selectedContentId2 = e.target.value;
    const content = contents2.find(
      (c) => c.id.toString() === selectedContentId2
    );
    if (content) {
      setSelectedContent2({
        id: content.id,
        name: content.name,
        path: content.path,
      });
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

                  <Row className="mt-5">
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

                    <Col className="px-1 mt-2" md="5">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={UpdatePostLogo}
                        >
                          Update
                        </Button>
                        {feedback && <div>{feedback}</div>}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1 mt-5" md="5">
                      <h2>First Section</h2>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>title1</label>
                        <Input
                          type="text"
                          value={title1} // This should be the state variable representing the corresponding data
                          onChange={(e) => setTitle1(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 mt-3" md="2">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={updateTitle1}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={handleAddContent}
                        >
                          + Add Content
                        </Button>
                      </FormGroup>
                    </Col>
                    <Col className="px-2 mt-3" md="2"></Col>
                  </Row>

                  <Row>
                    <Col className="px-2 ml-3" md="9">
                      {contentFields.map((field, index) => (
                        <Row key={index}>
                          <Col className="px-1" md="3">
                            <FormGroup>
                              <label>Content</label>
                              <Input
                                type="text"
                                value={field.content}
                                onChange={(e) =>
                                  handleContentChange(
                                    index,
                                    "content",
                                    e.target.value
                                  )
                                }
                              />
                            </FormGroup>
                          </Col>
                          <Col className="px-1" md="3">
                            <FormGroup>
                              <label>Link</label>
                              <Input
                                type="text"
                                value={field.link}
                                onChange={(e) =>
                                  handleContentChange(
                                    index,
                                    "link",
                                    e.target.value
                                  )
                                }
                              />
                            </FormGroup>
                          </Col>

                          <Col className="px-2 mt-3" md="3">
                            <FormGroup>
                              <Button
                                className="btn-round"
                                color="primary"
                                type="button"
                                onClick={() => handleAddTheContent(index)}
                              >
                                Add The Content
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      ))}
                    </Col>

                    <Row></Row>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>First Contents</label>
                        <Input
                          type="select"
                          value={selectedContent.id}
                          onChange={handleSelectChange}
                        >
                          <option value="" disabled>
                            Choose a Content
                          </option>
                          {contents.map((content) => (
                            <option key={content.id} value={content.id}>
                              {content.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="px-2 mt-3" md="2"></Col>
                  </Row>

                  <Row>
                    {selectedContent.id && (
                      <>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Content Details</label>
                            <Input
                              type="text"
                              value={selectedContent.name}
                              onChange={(e) =>
                                setSelectedContent({
                                  ...selectedContent,
                                  name: e.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>

                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Link Details</label>
                            <Input
                              type="text"
                              value={selectedContent.path}
                              onChange={(e) =>
                                setSelectedContent({
                                  ...selectedContent,
                                  path: e.target.value,
                                })
                              }
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

                  <Row style={{ marginTop: "100px" }}>
                    <Col className="px-1 ml-3 mt-5" md="6">
                      <h2>Secound Section</h2>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>title2</label>
                        <Input
                          type="text"
                          value={title2} // This should be the state variable representing the corresponding data
                          onChange={(e) => setTitle2(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={updateTitle1}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          onClick={handleAddContent2}
                        >
                          + Add Content2
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 ml-3" md="5">
                      {contentFields2.map((field, index) => (
                        <Row key={index}>
                          <Col className="px-1" md="5">
                            <FormGroup>
                              <label>Content2</label>
                              <Input
                                type="text"
                                value={field.content2}
                                onChange={(e) =>
                                  handleContentChange2(
                                    index,
                                    "content2",
                                    e.target.value
                                  )
                                }
                              />
                            </FormGroup>
                          </Col>
                          {/* <Col className="px-1" md="5">
                  <FormGroup>
                    <label>Link2</label>
                    <Input
                      type="text"
                      value={field.link2}
                      onChange={(e) => handleContentChange2(index, 'link2', e.target.value)}
                    />
                  </FormGroup>
                </Col> */}

                          <Col className="px-2 mt-3" md="5">
                            <FormGroup>
                              <Button
                                className="btn-round"
                                color="primary"
                                type="button"
                                onClick={() => handleAddTheContent2(index)}
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
                    <Col className="px-2 mt-3" md="3">
                      <FormGroup>
                        <label>Secound Contents</label>
                        <Input
                          type="select"
                          value={selectedContent2.id}
                          onChange={handleSelectChange2}
                        >
                          <option value="" disabled>
                            Choose a Content
                          </option>
                          {contents2.map((content) => (
                            <option key={content.id} value={content.id}>
                              {content.name}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    {selectedContent2.id && (
                      <>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Content Details</label>
                            <Input
                              type="text"
                              value={selectedContent2.name}
                              onChange={(e) =>
                                setSelectedContent2({
                                  ...selectedContent2,
                                  name: e.target.value,
                                })
                              }
                            />
                          </FormGroup>

                          <FormGroup>
                            <Button
                              className="btn-round"
                              color="primary"
                              type="button"
                              onClick={UpdateContent2}
                            >
                              Update
                            </Button>

                            <Button
                              className="btn-round btn-danger"
                              color="primary"
                              type="button"
                              onClick={DeleteContent2}
                            >
                              Delete
                            </Button>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                  </Row>

                  <Row>
                    <Col className="px-1 ml-1 mt-5" md="6">
                      <h2>Third Section "Subscribe"</h2>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label> Title Subscribe Section </label>
                        <Input
                          type="text"
                          value={title3} // This should be the state variable representing the corresponding data
                          onChange={(e) => setTitle3(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label> Text under the input </label>
                        <Input
                          type="text"
                          value={textUnderInput} // This should be the state variable representing the corresponding data
                          onChange={(e) => setTextUnderInput(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1 mt-3" md="3">
                      <FormGroup>
                        <Button
                          className="btn-round"
                          color="primary"
                          type="button"
                          onClick={updateTitle1}
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="12">
                      <FormGroup>
                        <AddSocialFooter />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-5" md="12">
                      <h2>Copy write text</h2>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-2 mt-3" md="12">
                      <FormGroup>
                        <label> Copy write text </label>
                        <Input
                          type="text"
                          value={copyWriteText} // This should be the state variable representing the corresponding data
                          onChange={(e) => setCopyWriteText(e.target.value)}
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
                        onClick={updateTitle1}
                      >
                        Update
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <Row></Row>
    </>
  );
}

export default Footer;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, FormGroup, Input, Row, Col } from "reactstrap";
// import Toastify from "toastify-js";
// import "toastify-js/src/toastify.css";


// export default function IconReviews() {
//   const [selectedOptionIconRev, setSelectedOptionIconRev] = useState("");
//   const [logoFiles, setLogoFiles] = useState([]);
//   const [icons, setIcons] = useState([]);
//   const [selectedIcon, setSelectedIcon] = useState(null);
//   const [name, setName] = useState('');
//   const [data, setData] = useState([]);
//   const [selectedIconData, setSelectedIconData] = useState(null);


//   useEffect(() => {
//     const fetchIcons = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:1010/iconunderreviews/reviewsicon"
//         );
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching icons: ", error);
//       }
//     };

//     fetchIcons();
//   }, []); // Empty dependency array means this effect runs once when the component mounts



//   const handleIconFileChange = (e) => {
//     const files = e.target.files; // Convert FileList to Array
//     const allowedFileTypes = [
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "image/bmp",
//       "image/tiff",
//       "image/svg+xml",
//       "image/x-icon",
//       "image/heic",
//       "image/avif",
//     ];

//     const allFilesValid = files.every((file) =>
//       allowedFileTypes.includes(file.type)
//     );

//     if (allFilesValid) {
//       setIcons(files);
//     } else {
//       alert(
//         "One or more files are not valid image types. Please select only image files."
//       );
//       e.target.value = ""; // Reset the file input
//     }
//   };

//   const deleteIcon = async () => {
//     // Check if there is a selected icon
//     if (!selectedIconData || !selectedIconData.id) {
//       alert("No icon selected.");
//       return;
//     }
  
//     try {
//       // Make the DELETE request
//       await axios.delete(
//         `http://localhost:1010/iconunderreviews/reviewsicon/${selectedIconData.id}`
//       );
  
//       Toastify({
//         text: "Deleted successfully",
//         duration: 3000,
//         gravity: "top",
//         position: "right",
//         backgroundColor: "#ce5151",
//       }).showToast();
  
//       // Update data to remove the deleted icon
//       const updatedData = data.filter(icon => icon.id !== selectedIconData.id);
//       setData(updatedData);
  
//       // Reset selected icon data
//       setSelectedIconData(null);
//       setSelectedOptionIconRev("");
  
//     } catch (error) {
//       Toastify({
//         text: "Error deleting post",
//         duration: 3000,
//         gravity: "top",
//         position: "right",
//         backgroundColor: "#ce5151",
//       }).showToast();
//     }
//   };
  


//   const handleSelectChange = async (e) => {
//     const selectedValue = e.target.value;
//     setSelectedOptionIconRev(selectedValue);

//     // Find the selected icon data from the 'data' array
//     const selectedData = data.find((icon) => icon.name === selectedValue);
//     setSelectedIconData(selectedData);
//   };


//   const handleAddIcon = async () => {
//     if (icons.length === 0) {
//       alert("Please select an image to upload.");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('iconunderreviews', icons);
//     formData.append('name', name);
  
//     // Log formData contents for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
  
//     try {
//       await axios.post(
//         'http://localhost:1010/iconunderreviews/addreviewsicon', 
//         formData, 
//         { headers: { 'Content-Type': 'multipart/form-data' }}
//       );
  
//       Toastify({
//         text: "Icon added successfully",
//         duration: 3000,
//         gravity: "top",
//         position: "right",
//         backgroundColor: "#4fbe87",
//       }).showToast();
//     } catch (error) {
//       console.error("Error adding icon: ", error);
//       Toastify({
//         text: "Error adding icon",
//         duration: 3000,
//         gravity: "top",
//         position: "right",
//         backgroundColor: "#ce5151",
//       }).showToast();
//     }
//   };
  




//   return (
//     <>
//       <Row>
//         <Col className="px-2 mt-3" md="3">
//           <FormGroup>
//             <label>Icon's</label>
//             <Input
//               type="file"
              

//               onChange={handleIconFileChange}
//               accept="image/*"
//             />
//           </FormGroup>
//           {logoFiles.length > 0 && (
//             <div>
//               <p>Selected Images:</p>
//               <ul>
//                 {logoFiles.map((file, index) => (
//                   <li key={index}>{file.name}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </Col>

//         <Col className="px-1" md="3">
//             <FormGroup>
//               <label>Name</label>
//               <Input
//                 type="text"
             
//               />
//             </FormGroup>
//           </Col>


//        <Col className="px-2 mt-3" md="3">
//   <FormGroup>
//     <Button
//       className="btn-round"
//       color="primary"
//       type="button"
//       onClick={handleAddIcon}
//     >
//       Add
//     </Button>
//   </FormGroup>
// </Col>
//       </Row>

//           <Row>
//         <Col className="px-2 mt-3" md="3">
//           <FormGroup>
//             <label>Icon's</label>
//             <Input type="select" onChange={handleSelectChange}>
//               <option value="" disabled>
//                 Select Icon
//               </option>
//               {data.map((icon) => (
//                 <option key={icon.id} value={icon.name}>
//                   {icon.name}
//                 </option>
//               ))}
//             </Input>
//           </FormGroup>
//         </Col>
//       </Row>

//       {selectedOptionIconRev && (
//         <Row>

// <Col md="3">
//             {selectedIconData && selectedIconData.icon && (
//               <img
//               src={`http://localhost:1010/${selectedIconData.icon}`} 
//               alt={selectedIconData.name}
//                 style={{ maxWidth: '100%', maxHeight: '200px' }}
//               />
//             )}
//           </Col>


//           <Col className="px-1" md="3">
//             <FormGroup>
//               <label>Icon</label>
//               <Input type="file" onChange={handleIconFileChange} accept="image/*" />
//             </FormGroup>
//           </Col>

//           <Col className="px-1" md="3">
//             <FormGroup>
//               <label>Name</label>
//               <Input
//                 type="text"
//                 value={selectedIconData ? selectedIconData.name : ''}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </FormGroup>
//           </Col>

//           <Col className="px-2 mt-3" md="3">
//             <FormGroup>
//               <Button className="btn-round" color="primary" type="button"      
// >
//                 Update
//               </Button>

//               <Button
//                 className="btn-round btn-danger"
//                 color="primary"
//                 type="button"
//                 onClick={deleteIcon}
//               >
//                 Delete
//               </Button>
//             </FormGroup>
//           </Col>
//         </Row>
//       )}
//     </>
//   );
// }










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
export default function FirstMarquee() {
    const [marqueeData, setMarqueeData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

      // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1010/iconunderreviews/reviewsicon');
        setMarqueeData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Handle option selection
  const handleSelection = (e) => {
    const selectedId = e.target.value;
    const selectedItem = marqueeData.find(item => item["id"].toString() === selectedId);

    if (selectedItem) {
      setSelectedOption(selectedId);
      setText(selectedItem.name);
      setSelectedImage(`http://localhost:1010/${selectedItem.icon}`);
    }
  };

  const DeletePost = async () => {
    if (selectedOption) {
      try {
        await axios.delete(`http://localhost:1010/iconunderreviews/reviewsicon/${selectedOption}`);
        Toastify({
          text: "Deleted successfully",
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#ce5151",
        }).showToast();

        // Update the local state to reflect the deletion
        setMarqueeData(marqueeData.filter(item => item["id"].toString() !== selectedOption));
        setSelectedOption(""); // Reset the selected option
        setText(""); // Reset the text
        setSelectedImage(""); // Reset the image
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
      e.target.value = null; // Reset the file input
    }
  };
  
  




  const UpdatePost = async () => {
    const formData = new FormData();
    formData.append('name', text);
    if (selectedFile) {
      formData.append('iconunderreviews', selectedFile);
    }

    try {
      await axios.put(`http://localhost:1010/iconunderreviews/reviewsicon/${selectedOption}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
           // Update the item in the state
    const updatedData = marqueeData.map(item => 
      item["id"].toString() === selectedOption
        ? { ...item, text: text, icon: selectedFile ? 'path/to/new/image' : item.icon }
        : item
    );
    setMarqueeData(updatedData);

    

      Toastify({
        text: "Updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#5EC693",
      }).showToast();

      // You may need to refetch or update marqueeData here to reflect the changes
    } catch (error) {
      console.error("Error updating post: ", error);
      Toastify({
        text: "Error updating post",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };



  const AddPost = async () => {
    if (!text && !selectedFile) {
      Toastify({
        text: "Please add text or select an image",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
      return;
    }
  
    const formData = new FormData();
    if (text) {
      formData.append('name', text);
    }
    if (selectedFile) {
      formData.append('iconunderreviews', selectedFile);
    }
  
    try {
      await axios.post('http://localhost:1010/iconunderreviews/addreviewsicon', formData, {
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
  
      // Handle successful addition (e.g., refresh the marqueeData or clear the form)
    } catch (error) {
      console.error("Error adding post: ", error);
      Toastify({
        text: "Error adding post",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#ce5151",
      }).showToast();
    }
  };

  
  

  return (
    <>
        
       


                  <Row className="mt-5">
                    <h3>Add</h3>
                  </Row>


                  <Row className="mt-5">
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Text</label>
                        <Input
                          type="text"
                          onChange={(e) => setText(e.target.value)}
                        />
                      </FormGroup>
                    </Col>

                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>icon</label>
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
                          onClick={AddPost}                        >
                          Add
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <h3>Edit & Delete</h3>
                  </Row>

                  <Row>
        <Col className="px-2 mt-3" md="3">
          <FormGroup>
            <label>Marquee Word's</label>
            <Input
              type="select"
              value={selectedOption}
              onChange={handleSelection}
            >
              <option value="" disabled>Select Text's</option>
              {marqueeData.map((item) => (
                <option key={item["id"]} value={item["id"]}>
                  {item.name}
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
                <label>Text</label>
                <Input
                  value={text}
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col className="px-1" md="3">
              <FormGroup>
                <label>Icon</label>
                <img src={selectedImage} alt="Selected Icon" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </FormGroup>
            </Col>

            <Col className="px-1" md="3">
  <FormGroup>
    <label>icon</label>
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
                  onClick={DeletePost} // Add onClick handler for Delete
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

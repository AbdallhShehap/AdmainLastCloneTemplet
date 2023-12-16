import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, FormGroup, Input, Row, Label } from "reactstrap";
import Toastify from "toastify-js";

function YourComponent() {
  const [socialMedia, setSocialMedia] = useState({ id: '', name: '', link: '', icon: null });
  const [iconFile, setIconFile] = useState(null);
  const [socialMedias, setSocialMedias] = useState([]);

  useEffect(() => {
    fetchSocialMedias();
  }, []);

  const fetchSocialMedias = async () => {
    try {
      const response = await axios.get('http://localhost:1010/menuicons/socialiconmenu');
      setSocialMedias(response.data.map(item => ({ ...item, icon: `http://localhost:1010/${item.icon}` })));
    } catch (error) {
      showToast('Error fetching social media icons', 'red');
    }
  };

  const handleInputChange = (e) => {
    setSocialMedia({ ...socialMedia, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFileTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff',
      'image/svg+xml', 'image/x-icon', 'image/heic', 'image/avif',
      'video/mp4', 'video/webm', 'video/ogg'
    ];
  
    if (file && allowedFileTypes.includes(file.type)) {
      setIconFile(file);
    } else {
      alert("Invalid file type. Please select an image or video file.");
      e.target.value = ''; // Reset the file input
    }
  };
  

  const handleSelectChange = (e) => {
    const selected = socialMedias.find(item => item.id.toString() === e.target.value);
    if (selected) {
      setSocialMedia(selected);
      setIconFile(null); // Reset the icon file state
    } else {
      setSocialMedia({ id: '', name: '', link: '', icon: null });
    }
  };

  const showToast = (message, color) => {
    Toastify({ text: message, duration: 3000, gravity: "top", position: "right", backgroundColor: color }).showToast();
  };

  const manageSocialMedia = async (action) => {
    if (action !== 'delete' && (!socialMedia.name || !socialMedia.link)) {
      showToast("Please fill in both name and link", "red");
      return;
    }

    try {
      let response;
      const formData = new FormData();
      formData.append('name', socialMedia.name);
      formData.append('link', socialMedia.link);
      if (iconFile) formData.append('socialiconmenu', iconFile);


      switch (action) {
        case 'add':
          response = await axios.post('http://localhost:1010/menuicons/addsocialiconmenu', formData);
          break;
        case 'update':
          response = await axios.put(`http://localhost:1010/menuicons/socialiconmenu/${socialMedia.id}`, formData);
          break;
        case 'delete':
          response = await axios.delete(`http://localhost:1010/menuicons/socialiconmenu/${socialMedia.id}`);
          break;
        default:
          return;
      }

      if (response.status === 200) {
        showToast(`Social media ${action === 'delete' ? 'deleted' : 'saved'} successfully`, "#5EC693");
        fetchSocialMedias();
        setSocialMedia({ id: '', name: '', link: '' });
      }
    } catch (error) {
      showToast(`Failed to ${action} social media`, "red");
    }
  };

  return (
    <>
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Social Name</Label>
            <Input type="text" name="name" value={socialMedia.name} onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Social Link</Label>
            <Input type="text" name="link" value={socialMedia.link} onChange={handleInputChange} />
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Icon</Label>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            {iconFile && <img src={URL.createObjectURL(iconFile)} alt="Preview" style={{ width: '100px', height: '100px' }} />}
            {!iconFile && socialMedia.icon && <img src={socialMedia.icon} alt="Stored Icon" style={{ width: '100px', height: '100px' }} />}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Button color="primary" onClick={() => manageSocialMedia('add')}>Add</Button>
            <Button color="primary" onClick={() => manageSocialMedia('update')}>Update</Button>
            <Button color="danger" onClick={() => manageSocialMedia('delete')}>Delete</Button>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md="3">
          <FormGroup>
            <label>Select Social Media</label>
            <Input type="select" value={socialMedia.id} onChange={handleSelectChange}>
              <option value="" disabled>Choose a social media</option>
              {socialMedias.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}

export default YourComponent;

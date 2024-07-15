import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from 'react-icons/fa';
import defaultPhoto from "../../assets/photo.png";
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';

function UpdateUser({ id }) {
    const [show, setShow] = useState(false);
    const [picture, setPicture] = useState(defaultPhoto);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isError, setIsError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            phone,
            picture,
        }
        axios.put(`https://dummyapi.io/data/v1/user/${id}`, user, { headers: { "app-id": '64fc4a747b1786417e354f31' } })
            .then(res => {
                if (res.status == 200) {
                    handleClose()
                }
            }).catch(err => {
                setIsError(err.response.data.error);
            })
    }

    return (
        <>
            <Button variant="light" className="m-3" onClick={handleShow}>
                <FaEdit color="#1BB0F0" size={'1.2em'} />
            </Button>

            <Modal centered size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Container>
                            <Row className="p-5 gy-5 position-relative">
                                <Col sm={12}>
                                    <Form.Group controlId="formFile" className="d-flex justify-content-center align-items-center flex-column">
                                        <img
                                            src={picture}
                                            alt="photo"
                                            loading="lazy"
                                            className="rounded-circle img-fluid"
                                            width={100}
                                            onClick={handleImageClick}
                                            style={{ cursor: "pointer" }}
                                        />
                                        <Form.Label className="mt-3">Upload Photo</Form.Label>
                                        <Form.Control
                                            type="file"
                                            style={{ display: "none" }}
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Control className="bg-dark-subtle" onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" placeholder="First Name" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formGridLastName">
                                        <Form.Control className="bg-dark-subtle" onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" placeholder="Last Name" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Control className="bg-dark-subtle" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formGridPhone">
                                        <Form.Control className="bg-dark-subtle" onChange={(e) => setPhone(e.target.value)} value={phone} type="phone" placeholder="Phone Number" required />
                                    </Form.Group>
                                </Col>

                                <Col sm={12}>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="light" type="button" className="py-2 px-5 rounded-4" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="info" type="submit" className="py-2 px-5 rounded-4 text-white">
                                            Save
                                        </Button>
                                    </div>
                                </Col>
                                <div className="position-absolute top-0 start-0 w-50 text-center">
                                    {isError ? <Alert variant='danger'>
                                        <h5>{isError}</h5>
                                    </Alert> : null}
                                </div>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UpdateUser
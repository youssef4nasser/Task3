import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import UpdateUser from "../UpdateUser/UpdateUser.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchUser() {

    const [users, setUsers] = useState(null);
    const [isError, setIsError] = useState(null);
    const [page, setPage] = useState(0);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["firstName", "lastName"]);

    const getUsers = async (currentPage) => {
        return axios.get("https://dummyapi.io/data/v1/user", {
            headers: { "app-id": '64fc4a747b1786417e354f31' },
            params: { limit: 5, page: currentPage }
        })
            .then(res => {
                console.log(res);
                setUsers(res.data.data);
                setIsError(null);
            }).catch(err => {
                setIsError(err.response.data.error);
            })
    }

    useEffect(() => {
        getUsers(page)
    }, [page])

    const handlePrevPage = () => {
        if (page > 0) setPage(page - 1);
        console.log(page);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleDelete = async (id) => {
        return axios.delete(`https://dummyapi.io/data/v1/user/${id}`, { headers: { "app-id": '64fc4a747b1786417e354f31' } })
            .then(res => {
                setUsers(users.filter(user => user.id !== id));
                setIsError(null);
            }).catch(err => {
                setIsError(err.response.data.error);
            })
    }

    const filteredUsers = users ? users.filter((item) => {
        return searchParam.some((param) => {
            return (
                item[param]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
    }) : [];

    return (
        <>
            <section>
                <Container>
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <Row className="border rounded-3 p-5 position-relative ">
                            <Col sm={12}>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search by Name"
                                        aria-label="Search"
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                    />
                                </Form>
                            </Col>

                            <Col sm={12}>
                                <div className="d-flex justify-content-end p-3">
                                    <Link to={'/add'}>
                                        <Button className="text-white rounded-4" variant="info"><IoIosAdd size={'1.5em'} /> Add New Contact</Button>
                                    </Link>
                                </div>
                            </Col>

                            {filteredUsers.length > 0 ? filteredUsers.map((user, index) => {
                                return <Col key={user.id} sm={12}>
                                    <div className={`d-flex justify-content-between align-items-center p-3 ${index !== filteredUsers.length - 1 ? 'user-item' : ''}`}>
                                        <div className="info d-flex text-white">
                                            <img src={user.picture} className="rounded-circle" alt="user photo" width="75" />
                                            <div className="ms-3 d-flex flex-column justify-content-center ">
                                                <span className="fw-bold">{user?.firstName} {user.lastName}</span>
                                                <span>01141955123</span>
                                            </div>
                                        </div>
                                        <div className="actions">
                                            <UpdateUser id={user.id} />
                                            <Button onClick={() => { handleDelete(user.id) }} variant="light"><RiDeleteBin5Fill color="red" size={'1.2em'} /></Button>
                                        </div>
                                    </div>
                                </Col>
                            }) : <h2 className="text-center">No users</h2>}

                            <Col sm={12}>
                                <div className="fs-5 text-white text-end position-absolute bottom-0 end-0 py-2 px-3">
                                    <Button variant="light" onClick={handlePrevPage} disabled={page === 0}><FaAngleLeft /></Button>
                                    <span> {page} </span>
                                    <Button variant="light" onClick={handleNextPage}><FaAngleRight /></Button>
                                </div>
                            </Col>

                            <Col sm={12}>
                                <div className="position-absolute bottom-0 start-0 w-25 text-center">
                                    {isError ? <Alert variant='danger'>
                                        <h5>{isError}</h5>
                                    </Alert> : null}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
}

export default SearchUser;

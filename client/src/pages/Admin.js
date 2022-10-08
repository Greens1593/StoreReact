import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminBar from "../components/AdminBar";
import AdminCreateItems from "../components/AdminCreate";


const Admin = () => 
    <Container>
        <Row className="mt-2">
                <Col md={3}>
                    <AdminBar/>
                </Col>
                <Col md={9}>
                    <AdminCreateItems/>
                </Col>
            </Row>
    </Container>
export default Admin
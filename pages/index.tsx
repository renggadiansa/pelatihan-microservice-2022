import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import Link from 'next/link';



export default function index() {
const [data, setData] = useState(null)
const [isLoading, setLoading] = useState(false)
useEffect(() => {
  setLoading(true)
  fetch('http://127.0.0.1:8000/api/test')
    .then((res) => res.json())
    .then((data) => {
      setData(data.data)
      setLoading(false)
      console.log(data)
    })
}, [])
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className='mt-5'>
      <Link href="/note">
        <Button className='mb-4'>
          Add
        </Button>
        </Link>
       <Row>
        {data && data.note.map((item, key)=>{
       return(
        <Col key={key} sm={12} md={6} lg={4} className='mb-4'>
            <Link href={"/note/"+item.id} >
          <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          {item.content}
        </Card.Text>
       {/* <Button variant="primary">Go somewhere</Button> */}
         </Card.Body>
         </Card>
         </Link>
        </Col>
       )
    })}
       </Row>
      </Container>
    </>
  );
}
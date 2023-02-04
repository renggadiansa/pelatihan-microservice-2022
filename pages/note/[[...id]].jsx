import React from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'




export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState({})

useEffect(() => {
 if (router.isReady) {
  if (id?.[0]) {
    setLoading(true);
    fetch('http://localhost:8000/api/test/' + id[0])
      .then((res) => res.json())
      .then((response) => {
        setData(response.data.note);
    })
    
  }
}
}, [router]);
const onSubmit = (e) => {
  e.preventDefault()
  const formdata = new FormData(e.target);

  let url = 'http://localhost:8000/api/test'
  if (id?.[0]) {
    url = 'http://localhost:8000/api/test/' + id[0]
    formdata.append('_method', 'PUT')
  }
    fetch(url, {
    method: 'POST',
    body: formdata,
    }).then ((res)=>{
      if (res.ok) {
        router.push('/')
      }
    })

}


  return (
    <Container>
      <Row>
        <Col>
        <Card className='mt-4'>
        <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Titel</Form.Label>
        <Form.Control type="name" name="title" placeholder="Input Title" defaultValue={data.title} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" name="content" placeholder="Input Content" defaultValue={data.content} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

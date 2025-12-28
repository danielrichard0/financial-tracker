import './App.css'
import { Button, Row, Col, Form } from 'react-bootstrap'
import Dashboard from './pages/Dashboard'

// making middleware on the express side is actually a mistake
// because you can basically run. . . . 
// maybe actually not a mistake

// problem now : it does run. but I need it to check before the page renders. coz it now renders before the checking done

function App() {
  return (
    <>
      <Row>
        <Col md={2}>
          <Form.Label htmlFor='trx-category' />
          <Form.Select />
        </Col>
        <Col md={6}>asd</Col>
      </Row>
    </>

  )
}

export default App

import { Form, Row, Col, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './loginform.css'

function LoginForm() {
    type FormState = {
        email: string | null;
        password: string | null;
    };
    const [form, setForm] = useState<FormState>({
        email: null,
        password: null
    });
    useEffect(() => {
        console.log("Form updated, : ", form)
    }, [form])

    async function HandleLogin(e: any) {
        e.preventDefault()
        console.log('handleLogin')
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email: form.email, password: form.password })
        })

        const data = await res.json()
        console.log("info data : ", data)
    }

    return (
        <Form className='w-75 m-auto' onSubmit={HandleLogin}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor='input-email'>Email</Form.Label>
                        <Form.Control onChange={e => { setForm({ email: e.target.value, password: form.password }) }} id="input-email" type="email" placeholder="Enter email" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor='input-pass'>Password</Form.Label>
                        <Form.Control onChange={e => { setForm({ email: form.email, password: e.target.value }) }} id='input-pass' type="password" placeholder="Enter password" />
                    </Form.Group>
                </Col>
            </Row>
            <div className='d-flex'>
                <Button className='mt-3 ms-auto' type='submit'>Submit</Button>
            </div>

        </Form>
    )
}

export default LoginForm
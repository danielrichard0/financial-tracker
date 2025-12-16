import { Form, Row, Col, Button } from 'react-bootstrap'
import './registerform.css'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

function RegisterForm() {
    type FormState = {
        email: string | null;
        password: string | null;
        firstName: string | null;
        lastName: string | null;
        phoneNumber: string | null;
    };
    const [form, setForm] = useState<FormState>({
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
    });

    useEffect(() => {
        console.log("Form updated, : ", form)
    }, [form])

    useEffect(() => {
        notify()
    }, [])

    async function handleRegister(e: any) {
        console.log("handle")
        e.preventDefault()
        toast.promise(
            fetch("/api/register", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    phoneNumber: form.phoneNumber
                })
            }).then((res) => {
                console.log(res.json())
            }),
            {
                loading: "Loading...",
                success: "Got the data",
                error: "Error when fetching"
            }
        );


        //const data = await res.json()
        // console.log("info data : ", data)
    }

    return (
        <Form className='w-75 m-auto' onSubmit={handleRegister}>
            <Row>
                <Col>
                    <Form.Label htmlFor='input-first-name'>First Name</Form.Label>
                    <Form.Control onChange={e => { setForm({ ...form, firstName: e.target.value }) }} id="input-first-name" type="text" placeholder="Daniel" />
                </Col>
                <Col>
                    <Form.Label htmlFor='input-last-name'>Last Name</Form.Label>
                    <Form.Control onChange={e => { setForm({ ...form, lastName: e.target.value }) }} id="input-last-name" type="text" placeholder="Richardo" />
                </Col>
            </Row>
            <Row>
                <Form.Group>
                    <Col>
                        <Form.Label htmlFor='input-phone'>Phone Number</Form.Label>
                        <Form.Control onChange={e => { setForm({ ...form, phoneNumber: e.target.value }) }} id="input-phone" type="tel" placeholder="+62" />
                    </Col>
                </Form.Group>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor='input-email'>Email</Form.Label>
                        <Form.Control onChange={e => { setForm({ ...form, email: e.target.value }) }} id="input-email" type="email" placeholder="danielrichardo@gmail.com" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label htmlFor='input-pass'>Password</Form.Label>
                        <Form.Control onChange={e => { setForm({ ...form, password: e.target.value }) }} id='input-pass' type="password" placeholder="Enter password" />
                    </Form.Group>
                </Col>
            </Row>
            <div className='d-flex'>
                <Button className='mt-3 ms-auto' type='submit'>Submit</Button>
            </div>

        </Form>
    )
}

export default RegisterForm

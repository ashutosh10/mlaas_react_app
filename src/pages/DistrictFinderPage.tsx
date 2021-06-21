import React, { Component } from 'react'
import { Form, Button, Card } from 'react-bootstrap';
import { FaSuperpowers } from 'react-icons/fa';
import './DistrictFinderPage.css'

interface IProps {
}

interface IState {
    address: string;
    isLoaded: boolean;
    result: any;
    district: string;
    state_s: string;
    correct_address: string
}

export default class DistrictFinderPage extends Component<IProps, IState> {
    readonly url = 'http://127.0.0.1:8000/'
    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            address: "",
            isLoaded: false,
            result: Object(),
            district: "",
            state_s: "",
            correct_address: ""
        }
    }

    showResultContainer = (show: boolean) => {
        let resultContainer = document.getElementById('ResultContainer');
        if (resultContainer != undefined) {
            if (show) {
                resultContainer.style.display = 'inline';
            }
            else {
                resultContainer.style.display = 'none';
            }
        }
    }

    getResult = (address: string) => {
        let url = this.url + 'districtfinder?address_str=' + address
        fetch(url)
            .then(res => res.json())
            .then(
                (response) => {
                    console.log(response);
                    this.setState({
                        isLoaded: true,
                        result: response
                    })

                    this.showResultContainer(true)
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                    });
                }
            );
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(this.state.address);
        this.showResultContainer(false);
        this.getResult(this.state.address);
    }

    render() {
        return (
            <div className="MainContainer">
                <h1><b>District predicting and address correcting app</b></h1>
                <br /><br />
                <h2>Find District and state for an incomplete adress</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Provide your incomplete address</Form.Label>
                        <Form.Control type="address" placeholder="Enter incomplete address" onChange={e => this.setState({ address: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                <div className="ResultContainer" id="ResultContainer">
                    <Card className="ResultCard">
                        <Card.Body>
                            <Card.Title><b>You Entered:</b> {this.state.address}</Card.Title>
                            <Card.Title><b>District:</b> {this.state.result.district}</Card.Title>
                            <Card.Title><b>State:</b> {this.state.result.state}</Card.Title>
                            <Card.Title><b>Correct Address:</b> {this.state.result.correct_add}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

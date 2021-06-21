import { isAnyTypeAnnotation, throwStatement } from '@babel/types';
import React, { Component } from 'react'
import { Form, Button, Card, Figure } from 'react-bootstrap';
import './ImageClassifierPage.css'

interface IProps {
}

interface IState {
    image: any;
    filename: string;
    isLoaded: boolean;
    result: any;
    fileDisplay: any;
    button_disabled: boolean;
}

export default class ImageClassifierPage extends Component<IProps, IState> {
    readonly url = 'http://127.0.0.1:8000/'
    constructor(props: any) {
        super(props);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            image: null,
            isLoaded: false,
            result: Object(),
            filename: "",
            fileDisplay: null,
            button_disabled: true
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

    showImageContainer = (show: boolean) => {
        let resultContainer = document.getElementById('ImageContainer');
        if (resultContainer != undefined) {
            if (show) {
                resultContainer.style.display = 'flex';
            }
            else {
                resultContainer.style.display = 'none';
            }
        }
    }

    getResult = (address: string) => {
        let url = this.url + '?address_str=' + address
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

    uploadImage = (image: any) => {
        let formData = new FormData();
        formData.append('file', image);
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        let url = this.url + 'imageclassifier/upload_image'
        fetch(url, requestOptions)
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

    handleUploadImage = (e: any) => {
        let file = e.target.files[0];
        if (file) {
            this.setState({
                filename: file.name,
                image: file,
                fileDisplay: URL.createObjectURL(file),
                button_disabled: false
            });
            this.showImageContainer(true);
        }
    }

    handleReset = () => {
        this.showResultContainer(false);
        this.showImageContainer(false);
        this.setState({
            image: null,
            isLoaded: false,
            result: Object(),
            filename: "",
            fileDisplay: null,
            button_disabled: true
        });
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.showResultContainer(false);
        this.uploadImage(this.state.image);
    }

    render() {
        return (
            <div className="MainContainer">
                <h1><b>Image Classifier App</b></h1>
                <br /><br />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.File
                            type="image"
                            label={this.state.filename}
                            onChange={this.handleUploadImage}
                            custom
                        />
                    </Form.Group>
                    <div className="Buttons">
                        <Button className="SubmitButton" disabled={this.state.button_disabled} variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        <Button className="ResetButton" variant="primary" onClick={this.handleReset}>
                            Reset
                        </Button>
                    </div>
                </Form>
                <div className="ImageContainer" id="ImageContainer">
                    <Figure>
                        <Figure.Image
                            width={500}
                            height={500}
                            alt="500x500"
                            src={this.state.fileDisplay}
                        />
                    </Figure>
                </div>
                <div className="ResultContainer" id="ResultContainer">
                    <Card className="ResultCard">
                        <Card.Body>
                            <Card.Title><b>Image Name:</b> {this.state.filename}</Card.Title>
                            <Card.Title><b>Class: </b> {this.state.result.label}</Card.Title>
                            <Card.Title><b>Accuracy: </b> {this.state.result.accuracy}%</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

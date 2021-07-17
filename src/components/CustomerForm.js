import React, { Component } from 'react';
var decrypt = require('../validate/decryptPassword')

class CustomerForm extends Component {

    state = {
        ...this.returnStateObject(),
       
    }


    returnStateObject() {
        //for adding make the form empty
        if (this.props.currentIndex == -1) {
            return {
                name: '',
                nic: '',
                contactnumber: '',
                password: '',
                buttonText:"Add Details"
            }
        } 
        //for editing make the form with the perticular customers values
        else {
            console.log(this.props.list[this.props.currentIndex]);
            return {
                _id: this.props.list[this.props.currentIndex]['_id'],
                name: this.props.list[this.props.currentIndex]['name'],
                nic: this.props.list[this.props.currentIndex]['nic'],
                contactnumber: this.props.list[this.props.currentIndex]['contactnumber'],
                password: decrypt.decryptPassword(this.props.list[this.props.currentIndex]['password']),
                buttonText:"Edit Details"
            }
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentIndex != this.props.currentIndex || prevProps.list != this.props.list) {
            this.setState({
                ...this.returnStateObject()

            })
            console.log(prevProps, this.props)
        }
    }

    //check input text field  changes
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }
        )
    }

    //submiting the form
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleCreateAndEdit(this.state)
        console.log(this.state)
    }


    render() {
        return (
            <div>

                <h1>Customer Registration</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <div class="form-group">
                        <label for="inputName">Enter Name</label>
                        <input name="name"  class="form-control" id="inputName"  placeholder="Enter Name......" onChange={this.handleInputChange} value={this.state.name} required/>
                        <div class="invalid-feedback">Please fill out Name field.</div>
                    </div>
                    <div class="form-group">
                        <label for="inputNic">Enter NIC</label>
                        <input name="nic"  class="form-control" id="inputNic"  placeholder="Enter NIC......" onChange={this.handleInputChange} value={this.state.nic} required />
                        <div class="invalid-feedback">Please fill out Nic field.</div>
                    </div>
                    <div class="form-group">
                        <label for="inputContactnumber">Enter Contactnumber</label>
                        <input type="number" name="contactnumber"  class="form-control" id="inputContactnumber"  placeholder="Enter Contactnumber......" onChange={this.handleInputChange} value={this.state.contactnumber} required/>
                        <div class="invalid-feedback">Please fill out Contactnumber field.</div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword">Enter Password</label>
                        <input type="password" name="password"  class="form-control" id="inputPassword"  placeholder="Enter Password......"  onChange={this.handleInputChange} value={this.state.password} required/>
                        <div class="invalid-feedback">Please fill out Password field.</div>
                    </div>
                    <button type="submit" class="btn btn-primary">{this.state.buttonText}</button>
                </form>
            </div>


        );
    }


}

export default CustomerForm;
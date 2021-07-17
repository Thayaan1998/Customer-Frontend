
import React, { Component } from 'react';
import CustomerForm from './CustomerForm';
import http from '../services/httpService'
import config from '../services/config.json'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
var validate = require('../validate/validate')


class CustomerTable extends Component {

    state = {
        currentIndex: -1,
        list: []
    }


    async componentDidMount() {
        let { data: list } = await http.get(config.apiEndpoint + config.get);
        console.log(list);
        this.setState({ list });
    }


    handleCreateAndEdit = async (datas) => {
        let { data: list } = await http.get(config.apiEndpoint + config.get);

        //Validate password
        const validateNic = validate.validateNic(datas['nic']);
        console.log(validateNic)
        if (!validateNic) {
            toast.error("Not Valid NIC")
            return
        }

        //create customer registration details
        if (this.state.currentIndex == -1) {
            try {
                list.push(datas)
                const { data: added } = await http.post(config.apiEndpoint + config.post, datas)
                console.log(added);
                let { data: newList } = await http.get(config.apiEndpoint + config.get);
                this.setState({ list: newList, currentIndex: -1 })
                toast.success(added)
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    const { data: errorMessage } = ex.response;
                    console.log(errorMessage);
                    toast.error(errorMessage)
                }
            }
        }
        //edit customer registration details
        else {
            try {
                list[this.state.currentIndex] = datas
                const { data: updated } = await http.put(config.apiEndpoint + config.put + datas['_id'], datas)
                console.log(updated);
                let { data: newList } = await http.get(config.apiEndpoint + config.get);
                this.setState({ list: newList, currentIndex: -1 })
                toast.success(updated)
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    const { data: errorMessage } = ex.response;
                    console.log(errorMessage);
                    toast.error(errorMessage)
                }
            }
        }
    }
    //get the perticular index of the customer
    handleEdit = (index) => {
        this.setState({ currentIndex: -1 })
        this.setState({
            currentIndex: index
        })
    }
    //delete customer registration details
    handleDelete = async (index) => {
        var { data: list } = await http.get(config.apiEndpoint + config.get);
        console.log(list)
        const { data: deleted } = await http.delete(config.apiEndpoint + config.delete + list[index]['_id'])
        list.splice(index, 1)
        console.log(deleted);
        this.setState({ list, currentIndex: -1 })
        toast.success(deleted)
    }


    render() {
        return (
            <div>
                <main className="container">
                    <ToastContainer />
                    <CustomerForm
                        handleCreateAndEdit={this.handleCreateAndEdit}
                        currentIndex={this.state.currentIndex}
                        list={this.state.list}
                    />
                    <br /><br />
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">NIC</th>
                                <th scope="col">Contactnumber</th>
                                <th scope="col">EDIT</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.nic}</td>
                                    <td>{item.contactnumber}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.handleEdit(index)}>Edit</button></td>
                                    <td><button type="button" class="btn btn-primary" onClick={() => this.handleDelete(index)}>Delete</button></td>
                                </tr>
                            })}
                        </tbody>

                    </table>
                </main>
            </div>
        );
    }
}

export default CustomerTable;
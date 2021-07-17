import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import CustomerTable from './components/CustomerTable';
import 'react-toastify/dist/ReactToastify.css'


class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <CustomerTable />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

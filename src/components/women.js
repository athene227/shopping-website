import React, { Component } from 'react';
import Store from '../store';
import SearchBar from './searchBar';
import ProductCard from './productCard';
import 'bootstrap/dist/css/bootstrap.min.css';

class Women extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {product} = Store.getState();
        const products = product.search_results
            .filter(item=>item.directory == "women")
            .map((item, index)=>(
                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 card-container" key={index}>
                    <ProductCard id={item.id} name={item.name} imgURL={item.imgUrl} directory="women"/>
                </div>)
            );

        return (
            <div className="container">
                <SearchBar directory="women"/>
                <div className="row">
                    {products}
                </div>
            </div>
        );
    }
}

export default Women;
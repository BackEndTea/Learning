import React from "react";

class ProductAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            stocked: false,
            category: '',
        };
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    };

    handlePriceChange = (event) => {
        this.setState({price: event.target.value});
    };

    handleInStockChange = (event) => {
        this.setState({stocked: event.target.checked});
    };

    handleCategoryChange = (event) => {
        this.setState({category: event.target.value});
    };

    handleSubmit = (event) => {
        this.props.onProductAdd(this.state);
        this.setState({
            name: '',
            price: '',
            stocked: false,
            category: '',
        });
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                />
                <input
                    type="text"
                    placeholder="price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                />
                <input
                    type="text"
                    placeholder="category"
                    value={this.state.category}
                    onChange={this.handleCategoryChange}
                />
                <input
                    type="checkbox"
                    checked={this.state.isInStock}
                    onChange={this.handleInStockChange}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default ProductAddForm;

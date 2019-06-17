import React from "react";
import ProductAddForm from "./ProductAddForm";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
            products: props.products
        };
    }

    handleFilterTextChange = (filterText) => {
        this.setState({
            filterText: filterText
        });
    };

    handleInStockChange = (inStockOnly) => {
        this.setState({
            inStockOnly: inStockOnly
        })
    };
    onProductAdd = (product) => {
        const oldState = this.state.products;
        this.setState({products: oldState.concat(product)});
        console.log(product);
    };

    render() {
        return (
            <div>
                <ProductAddForm
                    onProductAdd={this.onProductAdd}
                />
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable
                    products={this.state.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}
export default FilterableProductTable;

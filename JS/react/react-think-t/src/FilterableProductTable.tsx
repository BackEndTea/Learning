import React, {ReactNode} from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";
import ProductAddForm from "./ProductAddForm";

type FilterableProductTableProps = {
  products: Product[]
};


type FilterableProductTableState = {
    filterText: string,
    inStockOnly: boolean,
    products: Product[]
}

class FilterableProductTable extends React.Component<FilterableProductTableProps, FilterableProductTableState> {
    constructor(props: FilterableProductTableProps) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false,
            products: props.products
        };
    }

    handleFilterTextChange = (filterText: string): void => {
        this.setState({
            filterText: filterText
        });
    };

    handleInStockChange = (inStockOnly: boolean): void => {
        this.setState({
            inStockOnly: inStockOnly
        })
    };
    onProductAdd = (product: Product): void => {
        const oldState = this.state.products;
        this.setState({products: oldState.concat(product)});
        console.log(product);
    };

    render(): ReactNode {
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

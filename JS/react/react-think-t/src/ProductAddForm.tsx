import React, {ReactNode} from "react";

type ProductAddFormProps = {
    onProductAdd: (product: Product) => void;
}

class ProductAddForm extends React.Component<ProductAddFormProps, Product> {
    constructor(props: ProductAddFormProps) {
        super(props);
        this.state = {
            name: '',
            price: '',
            stocked: false,
            category: '',
        };
    }

    handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value});
    };

    handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({price: event.target.value});
    };

    handleInStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({stocked: event.target.checked});
    };

    handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({category: event.target.value});
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        this.props.onProductAdd(this.state);
        this.setState({
            name: '',
            price: '',
            stocked: false,
            category: '',
        });
        event.preventDefault();
    };

    render(): ReactNode {
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
                    checked={this.state.stocked}
                    onChange={this.handleInStockChange}
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default ProductAddForm;

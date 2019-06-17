import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

class SearchBar extends React.Component {
  handleFilterTextChange = (e) => {
    this.props.onFilterTextChange(e.target.value);
  };

  handleInStockChange = (e) => {
    this.props.onInStockChange(e.target.checked);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          Only show products in stock
        </p>
      </form>
    );
  }
}

function ProductCategoryRow(props){
  const category = props.category;
  return <tr className="category">
    <th colSpan="2">{category}</th>
  </tr>
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let lastCategory = null;
    console.log(this.props.products);
    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

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

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);

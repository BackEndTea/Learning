import React, {ReactNode} from "react";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

type ProductTableProps = {
    filterText: string,
    inStockOnly: boolean,
    products: Product[],
}
const ProductTable: React.FC<ProductTableProps> = (props: ProductTableProps) => {
    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;

    const rows: ReactNode[] = [];
    let lastCategory: string|null = null;
    console.log(props.products);
    props.products.forEach((product) => {
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
                    key={product.category}
                />
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

};
export default ProductTable;

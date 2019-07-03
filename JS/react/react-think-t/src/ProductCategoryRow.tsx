import React from "react";

type ProductCategoryRowProps = {
    category: string
};

const ProductCategoryRow: React.FC<ProductCategoryRowProps> = (props: ProductCategoryRowProps) => {
    const category = props.category;
    return <tr className="category">
        <th colSpan={2}>{category}</th>
    </tr>
};

export default ProductCategoryRow;

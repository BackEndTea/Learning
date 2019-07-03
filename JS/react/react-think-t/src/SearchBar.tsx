import React, {ReactElement} from "react";

type SearchBarProps = {
    filterText: string,
    inStockOnly: boolean,
    onFilterTextChange: (filterText: string) => void,
    onInStockChange: (inStockOnly: boolean) => void
}

const SearchBar: React.FC<SearchBarProps> = (props): ReactElement => {
    const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onFilterTextChange(e.target.value);
    };

    const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onInStockChange(e.target.checked);
    };

    return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={props.filterText}
                onChange={handleFilterTextChange}
            />
            <p>
                <input
                    type="checkbox"
                    checked={props.inStockOnly}
                    onChange={handleInStockChange}
                />
                Only show products in stock
            </p>
        </form>
    );
};

export default SearchBar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from 'lucide-react';
import type { FilterOption } from '../types';

type Filters = {
    brand?: string;
    priceRange?: [number, number];
    inStock?: boolean;
    rating?: string;
    [key: string]: any;
};

type FilterSidebarProps = {
    filters: Filters;
    onFilterChange: (updatedFilters: Filters) => void;
    availableBrands: string[];
    categorySpecificFilters?: FilterOption[];

    showCategoryFilter?: boolean;
};

const FilterSidebar = ({
    filters,
    onFilterChange,
    availableBrands,
    categorySpecificFilters = [],
    showCategoryFilter = true,
}: FilterSidebarProps) => {
    const handlePriceChange = (min: string, max: string) => {
        const minPrice = Number(min);
        const maxPrice = Number(max);
        onFilterChange({ ...filters, priceRange: [minPrice, maxPrice] });
    };

    const handleBrandChange = (brand: string) => {
        onFilterChange({ ...filters, brand });
    };

    const handleCategoryFilterChange = (
        filterKey: string,
        isChecked: boolean
    ) => {
        onFilterChange({ ...filters, [filterKey]: isChecked });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <Filter size={20} className="mr-2" /> Bộ lọc
            </h2>

            {/* Brand Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Thương hiệu</h3>
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="brand"
                        id="all-brands"
                        value=""
                        checked={!filters.brand}
                        onChange={() => handleBrandChange('')}
                        className="w-4 h-4 text-cyan-600 rounded"
                    />
                    <label htmlFor="all-brands" className="ml-2 text-gray-700">
                        Tất cả
                    </label>
                </div>
                {availableBrands.map((brand) => (
                    <div key={brand} className="flex items-center mb-2">
                        <input
                            type="radio"
                            name="brand"
                            id={brand}
                            value={brand}
                            checked={filters.brand === brand}
                            onChange={() => handleBrandChange(brand)}
                            className="w-4 h-4 text-cyan-600 rounded"
                        />
                        <label htmlFor={brand} className="ml-2 text-gray-700">
                            {brand}
                        </label>
                    </div>
                ))}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Khoảng giá</h3>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange?.[0] ?? ''}
                        onChange={(e) =>
                            handlePriceChange(
                                e.target.value,
                                filters.priceRange?.[1]?.toString() ?? ''
                            )
                        }
                        className="w-1/2 p-2 border rounded-md"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange?.[1] ?? ''}
                        onChange={(e) =>
                            handlePriceChange(
                                filters.priceRange?.[0]?.toString() ?? '',
                                e.target.value
                            )
                        }
                        className="w-1/2 p-2 border rounded-md"
                    />
                </div>
            </div>

            {/* Category-Specific Filters */}
            {showCategoryFilter && categorySpecificFilters.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">
                        Lọc theo danh mục
                    </h3>
                    {categorySpecificFilters.map(({ key, label }) => (
                        <div key={key} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={key}
                                checked={filters[key] === false}
                                onChange={(e) =>
                                    handleCategoryFilterChange(
                                        key,
                                        e.target.checked
                                    )
                                }
                                className="w-4 h-4 text-cyan-600 rounded"
                            />
                            <label htmlFor={key} className="ml-2 text-gray-700">
                                {label}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;

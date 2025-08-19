import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type Category = {
    name: string;
    slug: string;
    description?: string;
};

type CategoryHeroProps = {
    category: Category;
    parentCategory?: Category;
    totalProducts: number;
};

const CategoryHero = ({
    category,
    parentCategory,
    totalProducts,
}: CategoryHeroProps) => (
    <div className="bg-cyan-600 text-white py-16 px-4 rounded-b-xl shadow-lg">
        <div className="container mx-auto">
            {parentCategory && (
                <div className="flex items-center text-sm mb-2 opacity-80">
                    <Link
                        to={`/category/${parentCategory.slug}`}
                        className="hover:underline"
                    >
                        {parentCategory.name}
                    </Link>
                    <ChevronRight className="w-4 h-4 mx-1" />
                    <span>{category.name}</span>
                </div>
            )}
            <h1 className="text-4xl font-extrabold mb-2">{category.name}</h1>
            <p className="text-xl opacity-90">
                {category.description || 'Không có mô tả.'}
            </p>
            <p className="text-sm mt-4 opacity-70">{totalProducts} sản phẩm</p>
        </div>
    </div>
);

export default CategoryHero;

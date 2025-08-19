import { Link } from 'react-router-dom';
import type { Category } from '../types';

const SubcategoryNav = ({
    subcategories,
    parentSlug,
}: {
    subcategories: Category[];
    parentSlug: string;
}) => (
    <div className="bg-gray-100 py-4 px-4 shadow-sm">
        <div className="container mx-auto flex flex-wrap gap-4 justify-center">
            {subcategories.map((sub) => (
                <Link
                    key={sub.id}
                    to={`/category/${parentSlug}/${sub.slug}`}
                    className="bg-white rounded-full px-4 py-2 text-gray-800 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    {sub.name}
                </Link>
            ))}
        </div>
    </div>
);

export default SubcategoryNav;

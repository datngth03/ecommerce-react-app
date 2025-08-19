import React from 'react';

const Banner: React.FC = () => {
    return (
        <div
            className="relative bg-cover bg-center h-96 rounded-lg overflow-hidden my-8"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1732284081172-6d6eb8b6d6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjYyMDB8MHwxfHNlYXJjaHwxfHxQcm9tb3Rpb25hbCUyMGJhbm5lcnxlbnwwfHx8fDE3NTUwNzc4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080")',
            }}
        >
            {/* Overlay mờ */}
            <div className="absolute inset-0 w-1/2 m-auto h-[70%] bg-black opacity-50 rounded-[12px]"></div>

            {/* Nội dung */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <h1 className="text-2xl md:text-4xl font-bold leading-tight">
                    Summer Sale: Up to 50% Off!
                </h1>
                <p className="mt-3 text-sm md:text-lg max-w-xl">
                    Discover our exclusive summer collection and enjoy amazing
                    discounts on your favorite items. Don't miss out on the best
                    deals of the season!
                </p>
                <button className="mt-5 px-6 py-2 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors ">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Banner;

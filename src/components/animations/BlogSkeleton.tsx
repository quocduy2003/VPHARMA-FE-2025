export function HeroSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="w-full h-[260px] md:h-[420px] bg-gray-200 rounded-lg"></div>

            <div className="mt-5 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-4">
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}
export function BlogCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>
            <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-4/5 bg-gray-200 rounded"></div>
        </div>
    );
}
export function FeaturedNewsSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                    <div className="w-20 h-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}


import { Skeleton } from "../ui/skeleton";

export default function FeedSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <hr />
                <div className="flex space-x-4">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-6 w-[100px]" />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <Skeleton className="h-28 w-[500px]" />
                <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-5 w-[300px]" />
                    <Skeleton className="h-5 w-[200px]" />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <Skeleton className="h-28 w-[500px]" />
                <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-5 w-[300px]" />
                    <Skeleton className="h-5 w-[200px]" />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <Skeleton className="h-28 w-[500px]" />
                <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-5 w-[300px]" />
                    <Skeleton className="h-5 w-[200px]" />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <Skeleton className="h-28 w-[500px]" />
                <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-5 w-[300px]" />
                    <Skeleton className="h-5 w-[200px]" />
                </div>
            </div>

            <div className="flex flex-row space-x-4 items-center">
                <Skeleton className="h-28 w-[500px]" />
                <div className="flex flex-col max-w-[380px] self-start mt-2 space-y-1">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="h-5 w-[300px]" />
                    <Skeleton className="h-5 w-[200px]" />
                </div>
            </div>
        </div>
    );
}

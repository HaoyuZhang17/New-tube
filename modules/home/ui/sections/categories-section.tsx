//从后端拿到所有 categories，然后根据 categoryId 知道用户当前选中了哪个类别
"use client"
import { trpc } from "@/trpc/client"
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { FilterCarousel } from "@/components/filter-carousel";

interface CategorySectionProps {
    categoryId?: string;
};
export const CategoriesSection = ({ categoryId }: CategorySectionProps) => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ErrorBoundary fallback={<p>Error...</p>}>
                <CategoriesSectionSupense categoryId={categoryId} />
            </ErrorBoundary>
        </Suspense>
    )
}

const CategoriesSectionSupense = ({ categoryId }: CategorySectionProps) => {

    const [categories] = trpc.categories.getMany.useSuspenseQuery();
    //转换成UI组件需要的格式，详见FilterCarouselProps
    const data  = categories.map((category) => ({
        value: category.id,
        label: category.name,

    }))
    return (
        <FilterCarousel value={categoryId} data={data} />
    )
};

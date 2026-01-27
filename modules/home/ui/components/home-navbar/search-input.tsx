import { SearchIcon } from "lucide-react";

const SearchInput = () => {
    //TODO: add search functionality
    return (
        <form className="flex w-full max-w-[600px]">
            {/* relative: 将这个div作为坐标原点，里面的absolute/fixed元素只会在这个坐标系移动 */}
            <div className="relative w-full">
                <input 
                    type="text"
                    placeholder="Search"
                    // rounded-l-full: 左边圆角
                    // border: 显示默认边框
                    // focus:outline-none: 聚焦时去掉浏览器默认外框
                    className="w-full pl-4 py-2 pr-12 rounded-l-full border focus:outline-none focus:border-blue-500"
                />
                {/* TODO: add remove search button */}
            </div>
            {/* disabled: opacity-50: 不可用时，透明度百分之五十
                disabled: cursor-not-allowed: 不可用时鼠标移上去🚫 */}
            <button
                type="submit"
                className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled: opacity-50 disabled: cursor-not-allowed">
                <SearchIcon className="size-5" />
            </button>
        </form>
    )
}

export default SearchInput;
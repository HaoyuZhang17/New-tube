import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

const AuthButton = () => {
    //TODO: add different auth states
    return (
        <Button
            // 描边风格
            variant="outline"
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
            >
            <UserCircleIcon/>
            Sign in
        </Button>
    );
};

export default AuthButton;
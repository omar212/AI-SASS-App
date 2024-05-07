import Sidebar from "@/components/sidebar";

const AuthLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center h-full ">
            <Sidebar />
            {children}
        </div>
    );
}
 
export default AuthLayout;
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
    return ( 
        <div className="flex flex-col sm:flex-row bg-black h-full justify-center items-center m-auto">
            <div className="text-center">
                <h1 className="text-5xl text-white font-bold">Everything. <span className="text-violet-500"> <br /> Al.l in</span> One.</h1> 
            </div>
            <div className="flex flex-col gap-5 h-60 w-60 justify-around items-center xl:flex-col">
                <Link href="/sign-in">
                <Button className="bg-white text-black hover:bg-gray-200 hover:text-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2 px-4 rounded">
                    SIGN IN
                </Button>

                </Link>
                <Link href="/sign-up">
                    <Button className="bg-violet-500 text-white hover:bg-gray-100 hover:text-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 py-2 px-4 rounded">
                            SIGN UP
                    </Button>
                </Link>
            </div>
        </div>
     );
}
 
export default LandingPage;
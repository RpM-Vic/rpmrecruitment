import { Login } from "./Login"
import { Signup } from "./Signup"

export const Session = () => {
  return (
    <div className=" bg-black min-h-screen">
      <div>
      <div className="pt-8 pb-4 md:pt-12 md:pb-8">
      </div>
        <div className="flex flex-col md:flex-row p-4 gap-4 md:gap-8">
          <Login/>
          <Signup/>
        </div>
      </div>
    </div>
  );
}

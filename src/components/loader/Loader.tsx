import { IconLoader } from "./IconLoader"

interface LoaderProps{
  text?:string
}

export const Loader = ({text}:LoaderProps) => {
  return(
    <div className="">
      <span className="flex felx-row items-center">{text} <IconLoader/></span>
    </div>
  )  
}

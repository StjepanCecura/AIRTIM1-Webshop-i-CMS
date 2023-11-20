import { IHeader } from "../types/header.type"

const Header = ({ headerData }: { headerData: IHeader }) => {
  return (
    <div className="w-full bg-primary flex justify-center items-center flex-col">
      <h1>{headerData?.title}</h1>
      <img
        src={`https:${headerData?.image?.url}`}
        alt={headerData?.image?.description}
      />
    </div>
  )
}

export default Header

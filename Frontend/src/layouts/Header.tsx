import { IHeader } from "../types/header.type"

const Header = ({ headerData }: { headerData: IHeader }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center  bg-gradient-to-r from-slate-600 to-black gap-8">
      {/* <div className="bg-black opacity-60 absolute inset-0 flex justify-center items-center"></div> */}
      <div className="flex-1">
        <img
          src={`https:${headerData?.image?.url}`}
          alt={headerData?.image?.description}
        />
      </div>
      <div className="flex w-full justify-center items-center flex-col flex-1 gap-8 pb-12 px-10 md:pb-0">
        <h1 className=" text-white font-bold text-[48px] md:text-[64px] ">
          {headerData?.title}
        </h1>
        <p className="text-white text-center text-[18px]">
          {headerData?.description}
        </p>
      </div>
    </div>
  )
}

export default Header

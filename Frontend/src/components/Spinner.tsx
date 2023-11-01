import { Oval } from "react-loader-spinner"

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Oval
        height={30}
        width={30}
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={8}
        strokeWidthSecondary={8}
      />
    </div>
  )
}

export default Spinner

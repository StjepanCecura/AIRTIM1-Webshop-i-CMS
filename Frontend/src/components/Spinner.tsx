import { TailSpin } from "react-loader-spinner"

interface Props {
  onButton?: Boolean
}

const Spinner = ({ onButton = false }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        height={onButton ? "30" : "40"}
        width={onButton ? "30" : "40"}
        color={onButton ? "white" : "#5B6DF1"}
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        strokeWidth={3}
      />
    </div>
  )
}

export default Spinner

import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import axios from "axios"
import { API_URL } from "../constants"

const CustomerSupport = () => {
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [messageData, setMessageData] = useState({
    title: "",
    body: "",
  })

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const handleChange = (
    key: keyof typeof messageData,
    value: number | string | boolean
  ) => {
    setMessageData({
      ...messageData,
      [key]: value,
    })
  }

  const sendMessage = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/customer/support`, {
        title: messageData.title,
        body: messageData.body,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) toast("Message sent successfully.")
        }
        if (res?.data?.error) {
          toast.error("Error while sending message. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while sending message. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleSendClick = () => {
    if (messageData.title == "" || messageData.body == "") {
      toast("Please enter all data.")
    } else {
      //sendMessage()
    }
  }

  if (loadingStack.length > 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-8 gap-8 mb-8">
      <p className="text-center text-[36px] font-semibold pt-8">
        Customer support
      </p>
      <div className="flex flex-col gap-2 justify-center items-center md:px-96">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col justify-start w-full">
            <p>Title:</p>
            <Input
              type="text"
              placeholder="Title"
              onChange={(e) => handleChange("title", e.target.value)}
              value={messageData.title}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col justify-start w-full">
            <p>Message:</p>
            <textarea
              rows={10}
              onChange={(e) => handleChange("body", e.target.value)}
              value={messageData.body}
              placeholder="Message"
              className="bg-tetriary w-full p-3 rounded-lg border-2 focus:border-primary focus:shadow-sm focus:shadow-gray-500 border-tetriary"
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="w-[500px]">
            <Button text="Send" onClick={() => handleSendClick()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSupport

import { useEffect, useState } from "react"
import { ICustomer } from "../interfaces/customer.interface"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import SelectList from "../components/SelectList"
import { ISelect } from "../interfaces/select.interface"
import Input from "../components/Input"
import { Modal } from "flowbite-react"
import { setLoginStatus } from "../services/lsLoginStatus"

const countries = [{ value: "HR", label: "Croatia" }]

const Profile = () => {
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState<ICustomer>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addressId: "",
    city: "",
    country: "",
    postalCode: "",
    streetName: "",
    streetNumber: "",
  })
  const [country, setCountry] = useState<ISelect>()
  const [userHasAddress, setUserHasAddress] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCustomerData = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/customer`)
      .then((res) => {
        if (
          res?.data?.userData?.address === undefined ||
          res?.data?.userData?.address === null
        ) {
          setUserHasAddress(false)
        } else {
          setUserHasAddress(true)
        }
        const id = res?.data?.userData?.id ?? ""
        const firstName = res?.data?.userData?.firstName ?? ""
        const lastName = res?.data?.userData?.lastName ?? ""
        const email = res?.data?.userData?.email ?? ""
        const phoneNumber = res?.data?.userData?.phoneNumber ?? ""
        const addressId = res?.data?.userData?.address?.id ?? ""
        const city = res?.data?.userData?.address?.city ?? ""
        const country = res?.data?.userData?.address?.country ?? ""
        const postalCode = res?.data?.userData?.address?.postalCode ?? ""
        const streetName = res?.data?.userData?.address?.streetName ?? ""
        const streetNumber = res?.data?.userData?.address?.streetNumber ?? ""

        setProfileData({
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          addressId: addressId,
          city: city,
          country: country,
          postalCode: postalCode,
          streetName: streetName,
          streetNumber: streetNumber,
        })
        if (country != "") {
          let c = countries.find((c) => c.value == country)
          setCountry(c)
        }
      })
      .catch((err) => {
        console.log("ERR -> ", err)
        if (err?.response?.status != 403) {
          toast.error("Error loading profile. Please try again later.")
          navigate("/")
        }
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleChange = (
    key: keyof typeof profileData,
    value: number | string | boolean
  ) => {
    setProfileData({
      ...profileData,
      [key]: value,
    })
  }

  const updateCustomerData = async () => {
    startLoading()
    await axios
      .put(`${API_URL}/customer/changeCustomerAddress`, {
        addressId: profileData.addressId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        country: profileData.country,
        city: profileData.city,
        postalCode: profileData.postalCode,
        streetName: profileData.streetName,
        streetNumber: profileData.streetNumber,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) toast("Changes saved successfully.")
        }
        if (res?.data?.error) {
          toast.error("Error while saving changes. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while saving changes. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const addCustomerData = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/customer/addCustomerAddress`, {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        country: profileData.country,
        city: profileData.city,
        postalCode: profileData.postalCode,
        streetName: profileData.streetName,
        streetNumber: profileData.streetNumber,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) toast("Changes saved successfully.")
        }
        if (res?.data?.error) {
          toast.error("Error while saving changes. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while saving changes. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const deleteAccount = async () => {
    startLoading()
    await axios
      .delete(`${API_URL}/customer/deleteAccount`)
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) {
            toast("Account deleted successfully.")
            setOpenModal(false)
            setLoginStatus(false)
            navigate("/")
          } else {
            toast.error("Error while deleting account. Please try again later.")
          }
        }
        if (res?.data?.error) {
          toast.error("Error while deleting account. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while deleting account. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleSaveChangesClick = () => {
    if (userHasAddress) {
      updateCustomerData()
    } else {
      addCustomerData()
    }
  }

  const handleDeleteAccountClick = () => {
    setOpenModal(true)
  }

  useEffect(() => {
    getCustomerData()
    return () => {}
  }, [])

  useEffect(() => {
    if (country != undefined && country != null) {
      setProfileData({
        ...profileData,
        country: country.value,
      })
    }

    return () => {}
  }, [country])

  useEffect(() => {
    //console.log(profileData)

    return () => {}
  }, [profileData])

  if (loadingStack.length > 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-8 gap-8 mb-8">
      <p className="text-center text-[36px] font-semibold pt-8">Profile</p>
      <div className="flex flex-col gap-2 justify-center items-center md:px-[20%] lg:px-[20%]">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>First name:</p>
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => handleChange("firstName", e.target.value)}
                value={profileData.firstName}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Last name:</p>
              <Input
                type="text"
                placeholder="Last name"
                onChange={(e) => handleChange("lastName", e.target.value)}
                value={profileData.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p>Email:</p>
            <Input
              disabled
              type="text"
              placeholder="Email"
              // onChange={(e) => handleChange("email", e.target.value)}
              onChange={() => {}}
              value={profileData.email}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Phone:</p>
            <Input
              type="text"
              placeholder="Phone"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              value={profileData.phoneNumber}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Country:</p>
            <SelectList
              options={countries}
              placeholder="Country"
              setSelectedOption={setCountry}
              selectedOption={country}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Postal code:</p>
            <Input
              type="text"
              placeholder="Postal code"
              onChange={(e) => handleChange("postalCode", e.target.value)}
              value={profileData.postalCode}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>City:</p>
            <Input
              type="text"
              placeholder="City"
              onChange={(e) => handleChange("city", e.target.value)}
              value={profileData.city}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>Street name:</p>
              <Input
                type="text"
                placeholder="Street name"
                onChange={(e) => handleChange("streetName", e.target.value)}
                value={profileData.streetName}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Street number:</p>
              <Input
                type="text"
                placeholder="Street number"
                onChange={(e) => handleChange("streetNumber", e.target.value)}
                value={profileData.streetNumber}
              />
            </div>
          </div>
        </div>
        <div className="flex-col justify-center items-center mt-8 w-full">
          <div className="w-full">
            <Button
              text="Save changes"
              onClick={() => handleSaveChangesClick()}
            />
          </div>
          <div className="w-full mt-8">
            <Button
              danger
              text="Delete account"
              onClick={() => handleDeleteAccountClick()}
            />
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button danger text="Yes" onClick={() => deleteAccount()} />
              <Button text="No" onClick={() => setOpenModal(false)} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Profile

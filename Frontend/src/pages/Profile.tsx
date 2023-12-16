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
        if (err?.response?.status != 403) {
          toast.error("Error loading profile. Please try again later.")
          navigate("/")
        }
        // if (err?.response.status == 403) {
        //   navigate("/login")
        // } else {
        //   toast.error("Error loading profile. Please try again later.")
        //   navigate("/login")
        // }
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

  const handleSaveChangesClick = () => {}

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
      <div className="flex flex-col gap-2 justify-center items-center md:px-96">
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
        <div className="flex justify-center w-full mt-8">
          <div className="w-[500px]">
            <Button
              text="Save changes"
              onClick={() => handleSaveChangesClick()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

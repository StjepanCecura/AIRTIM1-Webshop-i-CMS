import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { IProduct } from "../interfaces/product.interface"
import ArrowLeftSVG from "../assets/arrow-left.svg"
import ArrowRightSVG from "../assets/arrow-right.svg"
import { IPagination } from "../interfaces/pagination.interface"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import SelectList from "../components/SelectList"
import { ISelect } from "../interfaces/select.interface"

const ProductsList = ({
  categoryId,
  hasTitle,
  productsPerPage,
}: {
  categoryId: string
  hasTitle: boolean
  productsPerPage?: number
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Array<IProduct>>()
  const [productsTitle, setProductsTitle] = useState("")
  const [pagination, setPagination] = useState<IPagination>()
  const [offset, setOffset] = useState(0)
  const [gender, setGender] = useState<ISelect>()

  const genderOptions = [
    { value: "cc5f4765-2fe1-4284-b70a-99953de2acc1", label: "Men" },
    { value: "c318d0ec-b658-4be2-bd28-d582e2bcee54", label: "Women" },
    { value: categoryId, label: "All" },
  ]

  const handleAddOffset = () => {
    if (
      pagination.offset / (productsPerPage ?? 12) + 1 !=
      Math.ceil(pagination.total / (productsPerPage ?? 12))
    ) {
      setOffset((prev) => prev + (productsPerPage ?? 12))
    }
  }

  const handleReduceOffset = () => {
    if (pagination.offset / (productsPerPage ?? 12) != 0)
      setOffset((prev) => prev - (productsPerPage ?? 12))
  }

  const getProductsByCategoryId = async (categoryId: string) => {
    setIsLoading(true)
    let GET_URL = ""
    if ((productsPerPage ?? "") != "") {
      GET_URL = `${API_URL}/product/getProductsByCategory?categoryId=${categoryId}&offset=${offset}&limit=${productsPerPage}`
    } else {
      GET_URL = `${API_URL}/product/getProductsByCategory?categoryId=${categoryId}&offset=${offset}`
    }
    await axios
      .get(GET_URL)
      .then((res) => {
        setPagination(res.data.pagination)
        setProducts(res.data.products)
        setProductsTitle(res.data.categoryName)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getProductsByCategories = async (
    categoryId1: string,
    categoryId2: string,
    resetOffset: boolean
  ) => {
    setIsLoading(true)
    let GET_URL = ""
    if ((productsPerPage ?? "") != "") {
      GET_URL = `${API_URL}/product/getProductsByCategories?categoryId1=${categoryId1}&categoryId2=${categoryId2}&offset=${
        resetOffset ? 0 : offset
      }&limit=${productsPerPage}`
    } else {
      GET_URL = `${API_URL}/product/getProductsByCategories?categoryId1=${categoryId}&categoryId2=${categoryId2}&offset=${
        resetOffset ? 0 : offset
      }`
    }
    await axios
      .get(GET_URL)
      .then((res) => {
        setPagination(res.data.pagination)
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if ((categoryId ?? "") != "") {
      getProductsByCategoryId(categoryId)
    }
    return () => {}
  }, [])

  useEffect(() => {
    if ((gender ?? "") != "" && gender.value != categoryId) {
      getProductsByCategories(categoryId, gender.value, false)
    } else if ((categoryId ?? "") != "") {
      getProductsByCategoryId(categoryId)
    }
    return () => {}
  }, [offset])

  useEffect(() => {
    if ((gender ?? "") != "") {
      getProductsByCategories(categoryId, gender.value, true)
    }
    return () => {
      setOffset(0)
    }
  }, [gender])

  if (isLoading) {
    return (
      <div className="flex-col justify-center items-center py-[200px]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {hasTitle ? (
        <div className="flex justify-center items-center">
          <div className="bg-black px-12 py-2 mb-8 min-w-[500px] rounded-lg">
            <p className="text-[36px] font-semibold text-white text-center">
              {productsTitle}
            </p>
          </div>
        </div>
      ) : null}

      {/* Filter */}
      <div className="mx-8 py-4 px-4 flex justify-end items-center gap-8 mb-8 bg-white">
        <SelectList
          options={genderOptions}
          placeholder="Gender"
          setSelectedOption={setGender}
          selectedOption={gender}
        />
      </div>

      {products?.length === 0 ? (
        <div className="flex justify-center items-center py-40">
          There are no matching products
        </div>
      ) : (
        <>
          <div className="w-full h-full px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products?.map((item, index) => {
              return <ProductCard key={index} productData={item} />
            })}
          </div>
          <div className="flex flex-row justify-center items-center px-8 py-4 gap-4 mt-4">
            <img
              onClick={handleReduceOffset}
              src={ArrowLeftSVG}
              alt=""
              className="h-5 hover:cursor-pointer"
            />
            <p>
              {pagination?.offset / (productsPerPage ?? 12) + 1} /{" "}
              {Math.ceil(pagination?.total / (productsPerPage ?? 12))}
            </p>
            <img
              onClick={handleAddOffset}
              src={ArrowRightSVG}
              alt=""
              className="h-5 hover:cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductsList

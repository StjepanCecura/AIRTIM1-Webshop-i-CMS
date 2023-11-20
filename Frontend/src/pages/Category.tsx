import Header from "../layouts/Header"
import Footer from "../layouts/Footer"

const Category = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-52px)]">
      <Header />
      <div className="flex flex-1 flex-col justify-center items-center">
        <p>Some category content</p>
      </div>
      <Footer />
    </div>
  )
}

export default Category

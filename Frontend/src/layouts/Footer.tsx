import { IFooter } from "../types/footer.type"

const Footer = ({ footerData }: { footerData: IFooter }) => {
  return (
    <div className="w-full bg-primary flex justify-center items-center flex-col">
      <p>
        <a href={footerData?.email}>{footerData?.email}</a>
      </p>
      <p>
        <a href={`tel:${footerData?.phoneNumber}`}>{footerData?.phoneNumber}</a>
      </p>
      <div dangerouslySetInnerHTML={{ __html: footerData?.longText }} />
      <img
        src={`https:${footerData?.image?.url}`}
        alt={footerData?.image?.description}
      />
    </div>
  )
}

export default Footer

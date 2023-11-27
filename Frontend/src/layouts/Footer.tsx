import { IFooter } from "../interfaces/footer.interface"

const Footer = ({ footerData }: { footerData: IFooter }) => {
  return (
    <div className="w-full bg-primary flex justify-center items-center flex-col px-8 md:px-40 py-8 text-slate-200">
      <img
        width={400}
        src={`https:${footerData?.image?.url}`}
        alt={footerData?.image?.description}
      />
      {footerData?.longText ? (
        <div
          className="text-center max-w-[700px] pb-5"
          dangerouslySetInnerHTML={{ __html: footerData?.longText }}
        />
      ) : null}

      <div className="flex flex-col gap-2 justify-center items-center">
        <p>
          <a href={`mailto:${footerData?.email}`}>{footerData?.email}</a>
        </p>
        <p>
          <a href={`tel:${footerData?.phoneNumber}`}>
            {footerData?.phoneNumber}
          </a>
        </p>
        <p>&copy; AiRExpress {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default Footer

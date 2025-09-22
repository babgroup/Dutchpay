type TitleProps = {
  mainTitle: string,
  subTitle: string
}

export default function Title({mainTitle, subTitle} : TitleProps) {

  return (
    <div className="w-full h-full flex flex-col justify-left items-left text-left py-12">
      <h2 className="text-2xl mb-1/10 text-gray-900">
        {mainTitle}
      </h2>
      <p className="text-md text-gray-800">
        {subTitle}
      </p>
    </div>
  )
}
type TitleProps = {
  mainTitle: string,
  subTitle: string
}

export default function Title({mainTitle, subTitle} : TitleProps) {

  return (
    <div className="w-full h-1/6 flex flex-col justify-left items-left text-left p-8">
      <h2 className="text-2xl mb-1/10 text-gray-900">
        {mainTitle}
      </h2>
      <p className="text-md text-gray-800">
        {subTitle}
      </p>
    </div>
  )
}
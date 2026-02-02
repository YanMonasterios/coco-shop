import { CustomJumbotron } from "@/shop/components/CustomJumbotron"

export const HomePage = () => {
  return (
    <div className="relative">
      <img
        src="/background.jpg"
        alt="Background Image"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
      <div className="relative z-10">
        <CustomJumbotron title="Cocos" subTitle="los mejores cocos de la ciudad " />
      </div>
    </div>
  )
}

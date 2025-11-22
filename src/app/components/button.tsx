export default function Button({ text }: { text: string }) {
  return (
    <div>
      <a className="group text-[18px] flex flex-col items-center mt-4 md:mt-8 gap-4 tcf-btn relative" href="#contact">
        <p className="relative flex flex-col items-center overflow-clip">
          <span className="group-hover:-translate-y-12 transition-all duration-[.4s]">{text}</span>
          <span className="group-hover:-translate-y-12 transition-all duration-[.4s] absolute top-12">{text}</span>
        </p>
      </a>
      <div className="italic text-center font-light flex items-center text-[14px] justify-center mt-2 gap-2 text-white/80">
        Maximo UN Lanzamiento Semanal
        <br />
        No te Quedes Sin el Tuyo
      </div>
    </div>
  )
}
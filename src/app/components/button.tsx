export default function Button() {
	return (
		<div>
			<a className="group flex flex-col items-center mt-8 gap-4 tcf-btn relative" href="#contact">
              <p className="relative flex flex-col items-center overflow-clip">
                <span className="group-hover:-translate-y-12 transition-all duration-[.4s]">QUIERO MI EMBUDO</span>
                <span className="group-hover:-translate-y-12 transition-all duration-[.4s] absolute top-12">QUIERO MI EMBUDO</span>
              </p>
            </a>
            <div className="flex items-center text-[14px] justify-center mt-2 gap-2 text-white/80">
              Cupos limitados
            </div>
		</div>
	)
}
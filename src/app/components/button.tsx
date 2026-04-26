export default function Button({ text }: { text: string }) {
  return (
    <div className="flex justify-center mt-8 md:mt-10">
      <a className="tcf-btn group" href="#contact">
        <span className="relative">{text}</span>
      </a>
    </div>
  )
}
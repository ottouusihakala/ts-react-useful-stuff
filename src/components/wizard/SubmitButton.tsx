const SubmitButton = ({children}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">{children}</button>
)

export default SubmitButton
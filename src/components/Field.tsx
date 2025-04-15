interface IField{
  question:string
  answer:string
  index:number
  setData: React.Dispatch<React.SetStateAction<{
    question: string;
    answer: string;
  }[]>>
  description:string|undefined
}

export const Field = ({question,answer,setData,index,description}:IField) => {

  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=> {
    const newValue = e.target.value;
    setData(prevData => {
      const newData = [...prevData]; // Create a new array
      newData[index] = { ...newData[index], answer: newValue }; // Update the specific item
      return newData;
    });
  }
  return(
    <div className="flex flex-col">
      <label className="font-bold" htmlFor={`id${question}`}>{question}</label>
      {description?<p>{description}</p>:""}
      <input type="text"  id={`id${question}`} className="bg-amber-50 p-1 rounded-sm border"
        onChange={handleInputChange}
      value={answer}
      >
      </input>

    </div>
  )
  
}

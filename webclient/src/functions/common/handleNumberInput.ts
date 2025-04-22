

export const handleNumberInput = (data: string, setData: React.Dispatch<React.SetStateAction<string | undefined>>)=>{
    const result = data.replace(/[^0-9.]/g, '')
    setData(result)
}

export const handleToggle = (access: boolean, setToggle:React.Dispatch<React.SetStateAction<boolean>>)=>{
    setToggle(!access);
}
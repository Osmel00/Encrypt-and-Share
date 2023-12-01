import  { FC,FormEvent,useState,useRef } from 'react'
import * as CryptoJS from 'crypto-js'
import { copyToClipboard } from '../util/copyToClipboard ';

 const queryPath= `http://localhost:5173/text/`;
 const secretKey = process.env.REACT_APP_SECRET_KEY ;

const Form:FC = () => {
 
    const inputRef= useRef<HTMLInputElement>(null)

    const [textTarea, setTextTarea] = useState<string>();
    const [input,setInput] = useState<string>('');

      const encrypt = (plainText: string) => {
         const cipherText = CryptoJS.AES.encrypt(plainText, secretKey as string).toString()
         return btoa(cipherText); 
    }
    


    const handleFormShare  = async (e:FormEvent)=>{
      e.preventDefault()
       //console.log(inputRef.current?.value )
      //console.log(formData.get('textArea'))
      //const formData = new FormData(e.currentTarget as HTMLFormElement) 
      
      //const rawData = Object.fromEntries(formData.entries())
      //const response = await fetch(`http://localhost:3000/link?query=U2FsdGVkX18zRtBA/x2pofqPHHGWiORRQvtovMjtPpg=`)
      const key = encrypt(textTarea as string)
      setInput(`${queryPath}${key}`)
      console.log({input:input})
       fetch(`http://localhost:3000/link`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({key:key})
      }).then(response => response.json()).then(data =>console.log(data)).catch(error => console.log(error));
   
       setTextTarea('')
    }


     const handleFormCopy = (e:FormEvent)=>{
        e.preventDefault();
        copyToClipboard(input)
        alert('link copied to clipboard')
     } 


  return (
    
    <div className=' m-auto md:w-[500px]'>

    <div className='Form-container text-slate-700  p-3  '>
     <h2 className='text-2xl md:text-4xl text-center font-bold'>Encrypt and Share</h2>
     <form onSubmit={handleFormShare} className='w-full'>
            <textarea onChange={(e) => setTextTarea(e.target.value )} placeholder='your text here ...' required value={textTarea}name="textArea" id="" cols={30} rows={5}  className='outline-none bg-transparent border  w-full p-3 my-5 rounded border-slate-300 bg-white' />
            <button className='w-full hover:bg-[#549E44] bg-green-500 text-slate-700 font-medium p-2 rounded-md'>Share</button>
     </form>
     
    </div>
     <div className='h-48   mt-20 p-6 flex flex-col justify-between text-slate-700 font-bold border rounded border-slate-300 bg-white md:p-3'>
       <h2 className='text-2xl md:text-4xl text-center '>Share this link with others</h2>
         <form onSubmit={handleFormCopy} className='w-full flex   '>
            <input ref={inputRef} required type="text" value={input} name='input' className='outline-none w-full bg-transparent px-4 border rounded border-slate-300'/>
            <button  className='py-2 px-6  font-medium  rounded-md hover:bg-[#549E44] bg-green-500 text-slate-700'>Copy</button>
         </form>
     </div>
    </div>
    
  )
}

export default Form

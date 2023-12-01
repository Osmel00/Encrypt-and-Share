import {  FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as CryptoJS from "crypto-js";
import { copyToClipboard } from "../util/copyToClipboard ";
const secretKey = process.env.REACT_APP_SECRET_KEY as string;

const ShowText = () => {
  const [input, setInput] = useState<string>("");
  const { key } = useParams();

  const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);

    return plainText;
  };

  const getData = async () => {
    console.log(key);
    const res = await fetch(`http://localhost:3000/link/${key}`);
    const { ok } = await res.json();

    if (ok) {
      setInput(decrypt(atob(key as string)));
    } else {
      alert(`link does not exist or has expired`);
    }
  };

  const handleFormCopy = (e:FormEvent)=>{
    e.preventDefault();
    copyToClipboard(input)
    alert('copied to clipboard')
 } 


  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="grid place-content-center">

    <form onSubmit={handleFormCopy} className=" border px-4 pt-5 pb-2 md:w-[500px] bg-white text-slate-700 mt-20  rounded border-slate-300 ">
      <input 
        type="text"
        name="input"
        value={input}
        
        className="w-full bg-transparent p-2 border outline-none"
      />
      <div className=" flex justify-end pt-3  gap-x-4  ">
        <Link to={'/'} className="py-1 rounded-md px-4 bg-transparent font-medium border border-green-500 hover:bg-[#549E44] hover:text-white  w-30 ">
          Share another
        </Link>
        <button className=" px-6 rounded-md  text-slate-700 font-medium w-28 hover:bg-[#549E44] bg-green-500">
          Copy
        </button>
      </div>
    </form>
    </div>
  );
};

export default ShowText;

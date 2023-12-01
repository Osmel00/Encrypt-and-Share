 import mongo from '../assets/mongodb.png'
  import node from '../assets/nodejs.png'
const Logo = () => {
  return (
    <div className="Logo-Container relative lg:w-[1000px]  md:w-[768px] mx-auto ">

         <div className='  h-24 flex justify-center items-center w-full '>
            <img className='lg:w-32 md:w-28 md:block hidden'  src={node} alt="node-img" />
            <h1 className='lg:text-8xl text-4xl font-archivo-black font-bold text-[#549E44] md:tracking-[4px] md:text-6xl'>Encrypt your <span className='md:pr-10 pr-7'>L</span>nk</h1>
            <img className='absolute mx-0 md:right-[80px] lg:w-32 md:w-28 w-16 right-[25px]' src={mongo} alt="mongo-img" />
           
         </div>
    </div>
  )
}

export default Logo
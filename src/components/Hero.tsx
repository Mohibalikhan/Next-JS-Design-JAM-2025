import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        
        <div>
        <div className='text-center bg-gray-100 py-2 '>
            <p className='text-lg'>Hello Nike App</p>
            <p className='text-gray-600 text-[11px]'>Download the app to access everything Nike. <span className='text-black underline cursor-pointer'>Get Your Great</span> </p>
        </div>

    <div className='flex justify-center px-10'>
    <Image
    className=''
    src={'/hero.png'}
    alt='shoes banner'
    width={1200}
    height={600}
    />
    </div>

    <div className="flex justify-center ">
  <div className="px-4 py-8 text-center items-center w-[1008px] h-[229px]">
    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
      First Look
    </h5>
    <h1 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
      NIKE AIR MAX PULSE
    </h1>
    <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
      Extreme comfort. Hyper durable. Max volume. Introducing the Air Max Pulse — designed to push you past your limits and help you go to the max.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex justify-center space-x-4">
      <button className="bg-black text-white px-6 py-2 text-sm md:text-base rounded-full hover:bg-gray-800">
        Notify Me
      </button>
      <button className="bg-black text-white px-6 py-2 text-sm md:text-base rounded-full hover:bg-gray-800">
        Shop Air Max
      </button>
    </div>
  </div>
</div>
<div>

<div className="container px-4 py-8">
  <p className="text-[23px] font-bold px-10 lg:px-12 mb-5 mt-10">Best of Air Max</p>
  <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-10">
    <div className="font-bold text-slate-600 text-center lg:text-left">
      <Image src={"/h1.png"} alt={"shoes"} width={400} height={300} />
      <p className="mt-2">Nike Air Max Plus</p>
      <p className="text-sm">Women's shoes</p>
      <p className="text-lg">₹ 13 995</p>
    </div>
    <div className="font-bold text-slate-600 text-center lg:text-left">
      <Image src={"/h2.png"} alt={"shoes"} width={400} height={300} />
      <p className="mt-2">Nike Air Max Plus</p>
      <p className="text-sm">Men's shoes</p>
      <p className="text-lg">₹ 13 995</p>
    </div>
    <div className="font-bold text-slate-600 text-center lg:text-left">
      <Image src={"/h3.png"} alt={"shoes"} width={400} height={300} />
      <p className="mt-2">Nike Air Max 97 SE</p>
      <p className="text-sm">Men's shoes</p>
      <p className="text-lg">₹ 13 995</p>
    </div>
  </div>
</div>


    <div>
   <span className='text-[23px] font-bold px-10 lg:px-16 mb-8'>Featured</span>
   <div className='flex justify-center px-10'>
    <Image
    className=''
    src={'/run.png'}
    alt='shoes banner'
    width={1200}
    height={600}
    />
    </div>

    <div className="flex justify-center ">
  <div className="px-4 py-8 text-center items-center w-[1008px] h-[229px]">
    <h1 className="text-2xl md:text-5xl font-medium mt-2 mb-4">
    STEP INTO WHAT FEELS GOOD
    </h1>
    <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
    Cause everyone should know the feeling of running in that perfect pair.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex justify-center space-x-4">
      <button className="bg-black text-white px-6 py-2 text-sm md:text-base rounded-full hover:bg-gray-800">
        Find Your Shoes
      </button>
    </div>
  </div>
</div>
    </div>
            </div>
            <div className="container p-10">
  <p className="text-xl font-semibold px-10 lg:px-6 uppercase text-start mb-8">Gear Up</p>
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8">
    <div className="font-sm  text-slate-600 text-center">
      <Image src={"/g1.png"} alt={"shirt"} width={300} height={200} />
      <p className="mt-2">Nike Dri-FIT ADV TechKnit Ultra</p>
      <p className="text-sm">Men's Short Sleeve</p>
      <p className="text-lg">₹ 3895</p>
    </div>
    <div className="font-bold text-slate-600 text-center">
      <Image src={"/g2.png"} alt={"shirt"} width={300} height={200} />
      <p className="mt-2">Nike Dri-FIT Challenger</p>
      <p className="text-sm">Men's 18cm approx</p>
      <p className="text-lg">₹ 2495</p>
    </div>
    <div className="font-bold text-slate-600 text-center">
      <Image src={"/g3.png"} alt={"shirt"} width={300} height={200} />
      <p className="mt-2">Nike Dri-FIT ADV Run Division</p>
      <p className="text-sm">Women's Long Sleeve</p>
      <p className="text-lg">₹ 5295</p>
    </div>
    <div className="font-bold text-slate-600 text-center">
      <Image src={"/g4.png"} alt={"leggings"} width={300} height={200} />
      <p className="mt-2">Women's Running Leggings with Pockets</p>
      <p className="text-lg">₹ 3795</p>
    </div>
  </div>
</div>



                            <div className='mt-28 mb-7'>
                <span className='text-xl font-semibold px-10 lg:px-16'>{`Don't`} Miss</span>
            </div>

            <div className='flex justify-center px-10'>
                <Image
                    className=''
                    src={'/person.png'}
                    alt='shoes banner'
                    width={1200}
                    height={600}
                />
            </div>


            <div className='text-center text-black mt-16'>
                <span className=' text-3xl lg:text-5xl font-semibold uppercase '>flight essentials</span><br /><br />

                <span>Your built-to-last, all-week wears—but with style only Jordan Brand can deliver.</span><br />

                <button className="bg-black text-white my-5 px-6 py-2 text-sm md:text-base rounded-full hover:bg-gray-800">
                    Shop
                </button>
                

            
            </div>
            <div className="contanier">
            <div className='mt-28 mb-0'>
        <span className='text-xl font-semibold px-10 lg:px-16'>The Essentials</span>
        </div>
        <div className='flex justify-center items-center mb-16 md:mb-28 flex-wrap'>
        
        <div className='w-96 h-[400px] px-2 overflow-hidden'>
            <Image
            className='hover:scale-105 duration-300'
               src={'/l1.png'}
               alt=''
               width={300}
               height={200}/>
            </div>
      <div className='w-96 h-[400px] px-2 overflow-hidden my-7 md:my0 '>
            <Image
            className='hover:scale-105 duration-300'
               src={'/l2.png'}
               alt=''
               width={300}
               height={500}/>
            </div>

<div className='w-96 h-[400px]  px-2 overflow-hidden mb-14 md:mb-0'>
            <Image
            className='hover:scale-105 duration-300'
               src={'/l3.png'}
               alt=''
               width={300}
               height={500}/>
            </div>
        </div>
        </div>
        

<div className="bg-white text-black">
      {/* Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between px-6 lg:px-25 py-8 lg:py-16 gap-10">
        {/* icons Section */}
        <div className="flex flex-col gap-3">
          <h3 className=" lg:text-xl font-bold">Icons</h3>
          
          <Link  href={''}>Air Force 1</Link>
          <Link  href={''}>Huarache</Link>
          <Link  href={''}>Air Max 90</Link>
          <Link  href={''}>Air Max 95</Link>
          
        </div>
         {/* shoes Section */}
         <div className="flex flex-col gap-3">
          <h3 className="text-lg lg:text-xl font-bold">Shoes</h3>
          <Link href={''}>All Shoes</Link>
          <Link href={''}>Custom Shoes</Link>
          <Link href={''}>Jordan Shoes</Link>
          <Link href={''}>Running Shoes</Link>
        </div>

       

        {/* Clothing */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg lg:text-xl font-bold">Clothing</h3>
          <Link href={''}>All Clothing</Link>
          <Link href={''}>Modest Wear</Link>
          <Link href={''}>Hoddies</Link>
          <Link href={''}>Shirt & Tops</Link>
          
        </div>

        {/* Kids Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg lg:text-xl font-bold">Kids</h3>
          <Link href={''}>Infant & Toddler Shoes</Link>
          <Link href={''}>Kids Shoes</Link>
          <Link href={''}>Kids Jordan Shoes</Link>
          <Link href={''}>Kids BasketBall Shoes</Link>
        </div>

        
        </div>
        </div>
        
        
    </div>
        

    
    );
}
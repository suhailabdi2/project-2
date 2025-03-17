import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets,  JobCategories, JobLocations } from '../assets/assets'
import InternshipCard from './InternshipCard'

const JobListing = () => {
    const {isSearched,searchFilter, setSearchFilter, internships} = useContext(AppContext)
    const [showFilter , setShowFilter] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredInternships, setFilteredInternships] = useState(internships)
    const handleCategoryChange = (category) =>{
        setSelectedCategories(
            prev => prev.includes(category) ?prev.filter (c => c !== category) : [...prev,category]
        )
    }
    const handleLocationChange = (location) =>{
        setSelectedLocations(
            prev => prev.includes(location) ?prev.filter (c => c !== location) : [...prev,location]
        )
    }

    useEffect(() =>{
        const matchesCategory = internships => selectedCategories.length ===0 || selectedCategories.includes(internships.category)
        const matchesLocation = internships => selectedLocations.length === 0 || selectedLocations.includes(internships.location)
        const matchesTitle = internships => searchFilter.title === "" || internships.title.toLowerCase().incudes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = internships => searchFilter.location ==="" || internship.title.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredInternships = internships.slice().reverse().filter(
            internships => matchesCategory(internships) && matchesLocation(internships) && matchesSearchLocation(internships) && matchesTitle(internships)
        )
        setFilteredInternships(newFilteredInternships)
        setCurrentPage(1)
    },[internships,selectedCategories,selectedLocations,searchFilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'> 
        {/* side bar */}
        <div className='w-full lg:w-1/4 bg-white px-4'>
         {/* filter */} 
         {
            isSearched &&(searchFilter.title !== "" || searchFilter.location !== "") &&(
                <>
                <h3 className='font-medium text-lg mb-4'>Current</h3>
                <div className='mb-4 text-gray-600'>
                    {searchFilter.title &&(
                        <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                            {searchFilter.title}
                            <img onClick={e =>(setSearchFilter(prev => ({...prev,title:""})))} className="cursor-pointer" src={assets.cross_icon}></img>
                        </span>
                    )}
                    {searchFilter.location &&(
                        <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                            {searchFilter.location}
                            <img onClick={e =>(setSearchFilter(prev => ({...prev,location:""})))} className="cursor-pointer" src={assets.cross_icon}></img>
                        </span>
                    )}

                    
                </div>
                </>
            )
        }
                
                    <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                        {showFilter ? "Close" :"Filters"} 
                    </button>
                    {/*Category Filter */}
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4'>Search by Category</h4>
                        <ul className ='space-y-4 text-gray-600'>
                        {
                            JobCategories.map((category,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox"  />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                    {/*Location Filter */}
                    <div className={showFilter ? "" : "max-lg:hidden"}>
                        <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                        <ul className ='space-y-4 text-gray-600'>
                        {
                            JobLocations.map((location,index)=>(
                                <li className='flex gap-3 items-center' key={index}>
                                    <input className='scale-125' type="checkbox"  />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                
               
                
            
            
            

           
        </div>
        {/*Internship Listing */}
        <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
            <h3 className='font-medium text-3xl py-2' id='intern-list'>Latest Internships</h3>
            <p className='mb-8'>Get your desired internships</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 '>
                {filteredInternships.slice((currentPage-1)*6,currentPage*6).map((internship,index) =>(
                    <InternshipCard key={index} internship={internship}/>
                ))}
            </div>
        </section>
        {/*Pagination*/}
        {internships.length > 0 &&(
            <div className='flex items-center justify-center space-x-2 mt-10'>
                <a href="#intern-list"><img onClick={()=> setCurrentPage(Math.max(currentPage-1))} src={assets.left_arrow_icon} alt="" /></a>
                {Array.from({length:Math.ceil(internships.length/6)}).map((__,index)=>(
                    <a href="#intern-list">
                        <button onClick={()=> setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}> {index+1}</button>
                    </a>
                ))}
                <a href="#intern-list">
                    <img onClick={()=> setCurrentPage(Math.min(currentPage+1,Math.ceil(internships.length/6)))} src={assets.right_arrow_icon} alt="" srcset="" />
                </a>
            </div>
        )}
    </div>
  )
}

export default JobListing
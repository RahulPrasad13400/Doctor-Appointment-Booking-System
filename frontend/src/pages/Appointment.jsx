import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

export default function Appointment() {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const [ docInfo, setDocInfo ] = useState(null)
  const [ docSlots, setDocSlots ] = useState()
  const [ slotIndex, setSlotIndex ] = useState(0)
  const [ slotTime, setSlotTime ] = useState('')

  useEffect(function(){
    fetchDocInfo()
  },[docId, doctors])

  useEffect(function(){
    getAvailableSlots()
  },[docInfo])

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc)=>doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    
    // gettings current Date
    let today = new Date()
    
    for(let i = 0; i < 7; i++){
      // getting date with index 
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+1)
      console.log(currentDate)

      //setting end time of the date with index 
      let endTime = new Date()
      endTime.setDate(today.getDate()+1)
      endTime.setHours(21,0,0,0)  
      console.log(endTime)   
    }
  }

  if(!docInfo) return null 

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>

        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='doctor image' />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="verified icon" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-sm rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt='info icon' /></p> 
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>  

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'> {currencySymbol}{docInfo.fees}</span>
          </p>

        </div>
      </div>
    </div>
  )
}


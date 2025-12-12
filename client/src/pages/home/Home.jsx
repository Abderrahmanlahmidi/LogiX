import { StorageLoading } from '../../constants/StorageLoading'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'



export default function Home() {

  StorageLoading();
  
  return (
    <div>
      <Navbar/>
      <Hero/>
    </div>
  )
}
  
import { StorageLoading } from '../../constants/StorageLoading'
import About from './sections/About';
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'



export default function Home() {

  StorageLoading();
  
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  )
}
  
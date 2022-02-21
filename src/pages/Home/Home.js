import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import RightBar from '../../components/RightBar/RightBar'
import Feed from '../..//components/Feed/Feed'
import './Home.css'

export default function Home() {
    return (
        <>
          <NavBar />
          <div className='homeContainer'>
            <SideBar />
            <Feed />
            <RightBar />
          </div>
        </>
    )
}

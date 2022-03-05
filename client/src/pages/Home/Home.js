import SideBar from '../../components/SideBar/SideBar'
import RightBar from '../../components/RightBar/RightBar'
import Feed from '../..//components/Feed/Feed'
import './Home.css'

export default function Home() {
    return (
        <>
          <div className='homeContainer'>
            <div className='sideBarContainer'>
              <SideBar />
            </div>
            <div className='feedContainer'>
              <Feed />
            </div>
            <div className='rightBarContainer'>
              <RightBar />
            </div>
          </div>
        </>
    )
}

import NavBar from '../../components/NavBar/NavBar'
import './profile.css'

export default function Profile() {
    return (
        <>
          <NavBar />
          <div className='profileContainer'>
            <div className='profileHeader'>
                <div className='profileHeaderPhoto' />
                <div className='profileInfo'>
                  <span className='profileHeaderName'>Profile Name</span>
                  <div className='profileCounts'>
                      <span className='profileMetric'>x followers</span>
                      <span className='profileMetric'>x posts</span>
                      <span className='profileMetric'>x following</span>
                  </div>
                  <span>A very brief little about moi</span>
                </div>
            </div>
            <div className='profileBody' />
          </div>
        </>
    )
}

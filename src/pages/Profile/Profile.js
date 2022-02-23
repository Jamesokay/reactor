import NavBar from '../../components/NavBar/NavBar'
import './profile.css'

export default function Profile() {
    return (
        <>
          <NavBar />
          <div className='profileContainer'>
            <div className='profileHeader'>
                <img className='profileHeaderPhoto'
                     src='../../assets/users/u1comp.jpg'
                     alt='' />
                <div className='profileInfo'>
                  <span className='profileHeaderName'>Benjamin Lawrence</span>
                  <div className='profileCounts'>
                      <span className='profileMetric'><b>247</b> followers</span>
                      <span className='profileMetric'><b>9</b> posts</span>
                      <span className='profileMetric'><b>112</b> following</span>
                  </div>
                  <span>I'm Ben, a completely fictional person.</span>
                </div>
            </div>
            <div className='profileBody'>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
              <div className='test'></div>
            </div>
          </div>
        </>
    )
}

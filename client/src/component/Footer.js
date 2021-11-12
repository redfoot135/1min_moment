import './Footer.css'

const Footer = () => {

  return (
    <div className="Footer-container col-12">
      <div className="Footer-in-box col-12 col-md-9">
        <div className="copyright">
        © 2021 1min-moment
        </div>
        <div className="member col-7 col-md-5">
          <div className="col-md-4 col-6">
            <div className="member-position">Front</div>
            <div className="person" >
              <div>정 구 민</div><img className="git-icon" src="https://i.ibb.co/Gt6y0Ss/Git-Hub-Mark-120px-plus.png" onClick={() => window.open('https://github.com/gj00770', '_blank')}/>
            </div>
            <div className="person" >
              <div>조 장 훈</div><img className="git-icon" src="https://i.ibb.co/Gt6y0Ss/Git-Hub-Mark-120px-plus.png" onClick={() => window.open('https://github.com/Cho-Janghoon', '_blank')}/>
            </div>
          </div>
          <div className="col-md-4 col-6">
            <div className="member-position">Full</div>
              <div className="person" >
                <div>박 성 근</div><img className="git-icon" src="https://i.ibb.co/Gt6y0Ss/Git-Hub-Mark-120px-plus.png" onClick={() => window.open('https://github.com/aom414', '_blank')}/>
              </div>
              <div className="person" >
                <div>신 재 훈</div><img className="git-icon" src="https://i.ibb.co/Gt6y0Ss/Git-Hub-Mark-120px-plus.png" onClick={() => window.open('https://github.com/redfoot135', '_blank')}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
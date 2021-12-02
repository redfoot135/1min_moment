import { Link } from 'react-router-dom';
import './video.css'

export default function Video({setClickMyVideoDataFunc,movieData}) {
    
    return(
       
        <div className="videocard col-lg-4 col-md-6 col-sm-12 p-0 my-2">
          <Link to={"/myvideopage"}>
            <img className="upload-videocard_thumbnail col-11" src={movieData.thumbnail} alt="" onClick={() => setClickMyVideoDataFunc(movieData.id)} />
          </Link>
          <div className="upload-videocard_info">
              <div className="upload-video_text col-11">
                  <h4 className="col-12">{movieData.title}</h4>
                  <p className="col-12 viewtxt">
                      조회수 {movieData.views}  ·  <img className="upload-video-like-icon" src="https://i.ibb.co/hgRgsrY/image.png" alt="" /> {movieData.likes}
                  </p>
              </div>
          </div>
        </div>
        
    )

}
import React from 'react'
import "./ChannelRow.css"
import Avatar from "@material-ui/core/Avatar";

function ChannelRow({image, channel, subs, uploadVideos, description}) {
    return (
        <div className="channelRow">
            <Avatar 
                  className="channelRow_avatar" 
                  alt={channel} 
                  src={image} 
            />
            <div className="channelRow-text">
                <h4>{channel}</h4>
                <p>
                    {subs} subscribers · {uploadVideos} videos
                </p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ChannelRow

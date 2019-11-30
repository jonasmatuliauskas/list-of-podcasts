import React from 'react';

const addPodcast = (props) => {
    return (
        <li className='mb-small'>{props.no + 1}. {props.name} - <a href={props.youtubeLink} target='_blank'>Youtube channel</a><button className='ml-small' onClick={props.delete}>Delete</button></li>
    )
}

export default addPodcast;
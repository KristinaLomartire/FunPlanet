import React, {useSatate} from 'react';
import {TagCloud} from "react-tagcloud";
import { Link } from "react-router-dom";

const TagCloudDisplay = ({posts, setSearch}) => {
  let tagCounter = [];
  const baseURL = /search/;
  if (posts) {
    posts.forEach(post => {
        post.tags.forEach(tag => {
          //console.log('tag: ', tag);
          // 1. kolla om taggen finns i tagCounter
          // 2. om ja, öka värdet på count
          // 3. om nej, lägg till nytt objekt
          let maybeTagObject = tagCounter.find(tagObject => tagObject.value === tag);
          if( maybeTagObject ) {
            maybeTagObject.count++;
          } else {
            tagCounter.push({value: tag, count: 1});
          }

              // tagCounter.forEach((tagCounterTag, i) => {
              //     if (tagCounterTag.value === tag) {
              //       tagCounter[i].count = tagCounter[i].count + 1
              //     } else {
              //       tagCounter.push({value: tag, count: 1});
              //     }
              //   });
              // //}
        });

           //console.log('tagCounter: ', tagCounter);
    });
  }

const customRenderer = (tag, size, color) => {
  return (<span
    key={tag.value + 'tagCloud'}
    style={{ 'fontSize': `${size}px`}}
    >
      <Link
        to={baseURL + tag.value}
        style={{ color }}
        onClick={(tag) => {
          console.log("inside onClick:", tag.value);
          //setSearch(tag.value);
        }}>
      {tag.value}
      </Link>
    < /span>);
};

const options = {
  luminosity: 'light',
  hue: 'blue'
};

return (

  <TagCloud
  tags={tagCounter}
  minSize={15}
  maxSize={45}
  colorOptions={options}
  renderer={customRenderer}
  />
);



}


export default TagCloudDisplay;

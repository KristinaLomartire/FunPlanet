import React from 'react';
import { TagCloud } from "react-tagcloud";
import { Link } from "react-router-dom";

const TagCloudDisplay = ({ posts }) => {
	let tagCounter = [];
	const baseURL = /search/;
	if (posts) {
		posts.forEach(post => {
			post.tags.forEach(tag => {
				let maybeTagObject = tagCounter.find(tagObject => tagObject.value === tag);
				if (maybeTagObject) {
					maybeTagObject.count++;
				} else {
					tagCounter.push({ value: tag, count: 1 });
				}
			});
		});
	}

	const customRenderer = (tag, size, color) => {
		return (
			<span
				key={tag.value + 'tagCloud'}
				style={{ 'fontSize': `${size}px` }}
			>
				<Link
					to={baseURL + tag.value}
					style={{ color }}
				>
					{tag.value}
				</Link>
			</span>
		);
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

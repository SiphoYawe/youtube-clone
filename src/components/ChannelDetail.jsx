import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromApI } from "../utils/fetchFromAPI";
const ChannelDetail = () => {
	const { id } = useParams();
	const [channelDetail, setChannelDetail] = useState(null);
	const [channelVideos, setChannelVideos] = useState([]);

	useEffect(() => {
		fetchFromApI(`channels?part="snippet"&id=${id}`).then((data) => {
			setChannelDetail(data?.items[0]);
		});
		fetchFromApI(`search?channelId=${id}&part=snippet&order=date`).then(
			(data) => {
				setChannelVideos(data?.items);
			}
		);
	}, [id]);

	return (
		<Box minHeight="95vh">
			<Box>
				<div
					style={{
						background: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
						zIndex: 10,
						height: "300px",
					}}
				/>
				<ChannelCard channelDetail={channelDetail} marginTop="-110px" />
			</Box>
			<Box display="flex" p="2">
				<Box sx={{ mr: { sm: "100px" } }} />
				<Videos videos={channelVideos} />
			</Box>
		</Box>
	);
};

export default ChannelDetail;

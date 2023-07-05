import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromApI } from "../utils/fetchFromAPI";
import { Videos } from "./index";

const SearchFeed = () => {
	const [videos, setVideos] = useState([]);
	const { searchTerm } = useParams();

	useEffect(() => {
		try {
			fetchFromApI(`search?&q=${searchTerm}&part=snippet`).then((data) =>
				setVideos(data.items)
			);
		} catch (error) {
			console.log(error.response.data);
		}
	}, [searchTerm]);

	return (
		<Box
			p={2}
			sx={{
				overflowY: "auto",
				height: "90vh",
				flex: 2,
			}}>
			<Typography
				variant="h4"
				fontWeight="bold"
				mb={2}
				sx={{
					color: "white",
				}}>
				Search Results for:
				<span style={{ color: "#F31503" }}>{searchTerm}</span>
			</Typography>
			<Videos videos={videos} />
		</Box>
	);
};

export default SearchFeed;

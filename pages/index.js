import React, { useState } from "react";
import {
	Grid,
	Typography,
	TextField,
	InputAdornment,
	Switch,
	FormGroup,
	FormControlLabel,
	useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ProjectManager() {
	const theme = useTheme();
	const [websiteChecked, setWebsiteChecked] = useState(false);
	const [iOSChecked, setiOSChecked] = useState(false);
	const [androidChecked, setAndroidChecked] = useState(false);
	const [softwareChecked, setSoftwareChecked] = useState(false);

	return (
		<Grid container direction="column">
			<Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
				<Typography variant="h1">Projects</Typography>
			</Grid>
			<Grid item>
				<TextField
					variant="standard"
					sx={{ width: "35em", marginLeft: "5em" }}
					placeholder="Search project details or create a new entry."
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<AddIcon color="primary" />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item sx={{ marginLeft: "5em", marginTop: "2em" }}>
				<FormGroup row>
					<FormControlLabel
						sx={{ marginRight: "5em" }}
						control={
							<Switch
								checked={websiteChecked}
								color="primary"
								onChange={() => setWebsiteChecked(!websiteChecked)}
							/>
						}
						label="Websites"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ marginRight: "5em" }}
						control={
							<Switch
								checked={iOSChecked}
								color="primary"
								onChange={() => setiOSChecked(!iOSChecked)}
							/>
						}
						label="iOS Apps"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ marginRight: "5em" }}
						control={
							<Switch
								checked={androidChecked}
								color="primary"
								onChange={() => setAndroidChecked(!androidChecked)}
							/>
						}
						label="Android Apps"
						labelPlacement="start"
					/>
					<FormControlLabel
						control={
							<Switch
								checked={softwareChecked}
								color="primary"
								onChange={() => setSoftwareChecked(!softwareChecked)}
							/>
						}
						label="Custom Software"
						labelPlacement="start"
					/>
				</FormGroup>
			</Grid>
		</Grid>
	);
}

import React, { useState } from "react";
import {
	Grid,
	Typography,
	TextField,
	InputAdornment,
	Switch,
	FormGroup,
	FormControlLabel,
	Table,
	TableBody,
	TableHead,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	Dialog,
	DialogContent,
	RadioGroup,
	Radio,
	Select,
	MenuItem,
	useTheme,
	IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

function createData(
	name,
	date,
	service,
	features,
	complexity,
	platforms,
	users,
	total
) {
	return {
		name,
		date,
		service,
		features,
		complexity,
		platforms,
		users,
		total,
	};
}

export default function ProjectManager() {
	const platformOptions = ["Web", "iOS", "Android"];

	const theme = useTheme();
	const [websiteChecked, setWebsiteChecked] = useState(false);
	const [iOSChecked, setiOSChecked] = useState(false);
	const [androidChecked, setAndroidChecked] = useState(false);
	const [softwareChecked, setSoftwareChecked] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [service, setService] = useState("");
	const [name, setName] = useState("");
	const [date, setDate] = useState(new Date());
	const [total, setTotal] = useState("");
	const [complexity, setComplexity] = useState("");
	const [users, setUsers] = useState("");
	const [platforms, setPlatforms] = useState([]);
	const [features, setFeatures] = useState([]);
	const [rows, setRows] = useState([
		createData(
			"Prathamesh Chavan",
			"20/08/2022",
			"Website",
			"E-commerce",
			"N/A",
			"N/A",
			"N/A",
			"$4000"
		),
		createData(
			"Elon Musk",
			"11/02/2019",
			"Website",
			"E-commerce",
			"N/A",
			"N/A",
			"N/A",
			"$1500"
		),
		createData(
			"Bill Gates",
			"10/07/2019",
			"Custom Software",
			"GPS, Push Notifications, Users/Authentication, File Transfer",
			"Medium",
			"Web Application",
			"0-10",
			"$1600"
		),
		createData(
			"Elon Musk",
			"11/02/2019",
			"Custom Software",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Web Application",
			"10-100",
			"$1250"
		),
	]);

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
							<InputAdornment
								position="end"
								sx={{ cursor: "pointer" }}
								onClick={() => setDialogOpen(true)}
							>
								<AddIcon color="primary" sx={{ fontSize: 30 }} />
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
			<Grid item container justifyContent="flex-end" sx={{ marginTop: "5em" }}>
				<Grid item sx={{ marginRight: "75px" }}>
					<FilterListIcon color="secondary" sx={{ fontSize: 50 }} />
				</Grid>
			</Grid>
			<Grid item sx={{ marginBottom: "15em" }}>
				<TableContainer component={Paper} elevation={0}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Service</TableCell>
								<TableCell>Features</TableCell>
								<TableCell>Complexity</TableCell>
								<TableCell>Platforms</TableCell>
								<TableCell>Users</TableCell>
								<TableCell>Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, index) => (
								<TableRow key={index}>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.date}</TableCell>
									<TableCell>{row.service}</TableCell>
									<TableCell sx={{ maxWidth: "5em" }}>{row.features}</TableCell>
									<TableCell>{row.complexity}</TableCell>
									<TableCell>{row.platforms}</TableCell>
									<TableCell>{row.users}</TableCell>
									<TableCell>{row.total}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Dialog
				fullWidth
				maxWidth="lg"
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			>
				<Grid container justifyContent="center">
					<Grid item>
						<Typography variant="h1" gutterBottom>
							Add a new project
						</Typography>
					</Grid>
				</Grid>
				<DialogContent>
					<Grid container justifyContent="space-between">
						{/* -----Name & Service----- */}
						<Grid item>
							<Grid item container direction="column" sm>
								{/* -----Name TextField----- */}
								<Grid item>
									<TextField
										variant="standard"
										fullWidth
										label="Name"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>
								{/* -----Service----- */}
								<Grid
									item
									container
									direction="column"
									sx={{ marginTop: "5em" }}
								>
									<Grid item>
										<Typography variant="h4">Service</Typography>
									</Grid>
									<Grid item>
										<RadioGroup
											aria-label="service"
											name="service"
											value={service}
											onChange={(e) => setService(e.target.value)}
										>
											<FormControlLabel
												value="Website"
												label="Website"
												control={<Radio color="secondary" />}
											/>
											<FormControlLabel
												value="Mobile App"
												label="Mobile App"
												control={<Radio color="secondary" />}
											/>
											<FormControlLabel
												value="Custom Software"
												label="Custom Software"
												control={<Radio color="secondary" />}
											/>
										</RadioGroup>
									</Grid>
									<Grid item>
										<Select
											labelId="platforms"
											id="platform"
											multiple
											value={platforms}
											onChange={(e) => setPlatforms(e.target.value)}
										>
											{platformOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{/* -----Date & Complexity----- */}
						<Grid item>
							<Grid
								item
								container
								sx={{ marginTop: "16px" }}
								direction="column"
								alignItems="center"
								sm
							>
								{/* -----Date Picker----- */}
								<Grid item>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<MobileDatePicker
											value={date}
											onChange={(newValue) => setDate(newValue)}
											renderInput={({ inputRef, inputProps }) => (
												<TextField
													variant="standard"
													ref={inputRef}
													{...inputProps}
													InputProps={{
														endAdornment: (
															<InputAdornment
																position="end"
																sx={{ cursor: "pointer" }}
															>
																<IconButton>
																	<InsertInvitationIcon sx={{ fontSize: 30 }} />
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											)}
										/>
									</LocalizationProvider>
								</Grid>
								{/* -----Complexity----- */}
								<Grid item>
									<Grid
										item
										container
										direction="column"
										sx={{ marginTop: "5em" }}
									>
										<Grid item>
											<Typography variant="h4">Complexity</Typography>
										</Grid>
										<Grid item>
											<RadioGroup
												aria-label="complexity"
												name="complexity"
												value={complexity}
												onChange={(e) => setComplexity(e.target.value)}
											>
												<FormControlLabel
													value="Low"
													label="Low"
													control={<Radio color="secondary" />}
												/>
												<FormControlLabel
													value="Medium"
													label="Medium"
													control={<Radio color="secondary" />}
												/>
												<FormControlLabel
													value="High"
													label="High"
													control={<Radio color="secondary" />}
												/>
											</RadioGroup>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{/* -----Total & Users----- */}
						<Grid item>
							<Grid item container direction="column" alignItems="flex-end" sm>
								{/* -----Total TextField----- */}
								<Grid item>
									<TextField
										variant="standard"
										value={total}
										id="total"
										label="Total"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">$</InputAdornment>
											),
										}}
										onChange={(e) => setTotal(e.target.value)}
									/>
								</Grid>
								{/* -----Users----- */}
								<Grid item>
									<Grid
										item
										container
										direction="column"
										sx={{ marginTop: "5em" }}
									>
										<Grid item>
											<Typography variant="h4">Users</Typography>
										</Grid>
										<Grid item>
											<RadioGroup
												aria-label="users"
												name="users"
												value={users}
												onChange={(e) => setUsers(e.target.value)}
											>
												<FormControlLabel
													value="0-10"
													label="0-10"
													control={<Radio color="secondary" />}
												/>
												<FormControlLabel
													value="10-100"
													label="10-100"
													control={<Radio color="secondary" />}
												/>
												<FormControlLabel
													value="100+"
													label="100+"
													control={<Radio color="secondary" />}
												/>
											</RadioGroup>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</Grid>
	);
}

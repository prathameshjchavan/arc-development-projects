// Module Imports
import React, { useState, useRef } from "react";
import {
	Grid,
	Typography,
	TextField,
	InputAdornment,
	Switch,
	FormGroup,
	FormControl,
	FormControlLabel,
	Dialog,
	DialogContent,
	RadioGroup,
	Radio,
	Select,
	MenuItem,
	Button,
	useTheme,
	IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddIcon from "@mui/icons-material/Add";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import { format } from "date-fns";

// Local Imports
import EnhancedTable from "../src/ui/enhancedTable";

function createData(
	id,
	name,
	date,
	service,
	features,
	complexity,
	platforms,
	users,
	total,
	search
) {
	return {
		id,
		name,
		date,
		service,
		features,
		complexity,
		platforms,
		users,
		total,
		search,
	};
}

export default function ProjectManager() {
	const platformOptions = ["Web", "iOS", "Android"];
	const softwareOptions = [
		"Photo/Video",
		"GPS",
		"File Transfer",
		"Users/Authentication",
		"Biometrics",
		"Push Notifications",
	];
	const websiteOptions = ["Basic", "Interactive", "E-Commerce"];

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
	const [website, setWebsite] = useState("");
	const [search, setSearch] = useState("");
	const [rows, setRows] = useState([
		createData(
			1,
			"Prathamesh Chavan",
			"20/08/2022",
			"Website",
			"E-commerce",
			"N/A",
			"N/A",
			"N/A",
			"$4000",
			true
		),
		createData(
			2,
			"Elon Musk",
			"02/11/2019",
			"Website",
			"E-commerce",
			"N/A",
			"N/A",
			"N/A",
			"$1500",
			true
		),
		createData(
			3,
			"Bill Gates",
			"07/10/2019",
			"Custom Software",
			"GPS, Push Notifications, Users/Authentication, File Transfer",
			"Medium",
			"Web Application",
			"0-10",
			"$1600",
			true
		),
		createData(
			4,
			"Elon Musk",
			"02/11/2019",
			"Custom Software",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Web Application",
			"10-100",
			"$1250",
			true
		),
		createData(
			5,
			"Mark Zuckerburg",
			"02/11/2019",
			"Custom Software",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Web Application",
			"10-100",
			"$1250",
			true
		),
		createData(
			6,
			"Gaurav Chaudhary",
			"02/11/2019",
			"Custom Software",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Web Application",
			"10-100",
			"$1250",
			true
		),
		createData(
			7,
			"Marques Brownlee",
			"02/11/2019",
			"Custom Software",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Web Application",
			"10-100",
			"$1250",
			true
		),
	]);
	const isWebsiteSelected = service === "Website";
	const featureOptions = isWebsiteSelected ? websiteOptions : softwareOptions;

	// sx props
	const sx = {
		button: {
			color: "#fff",
			backgroundColor: theme.palette.secondary.main,
			borderRadius: 50,
			textTransform: "none",
			"&:hover": {
				backgroundColor: theme.palette.secondary.light,
			},
		},
	};

	// functions
	const clearFormData = () => {
		setName("");
		setDate(new Date());
		setTotal("");
		setService("");
		setComplexity("");
		setUsers("");
		setPlatforms([]);
		setFeatures([]);
		setWebsite("");
	};

	const addProject = () => {
		setRows([
			...rows,
			createData(
				rows[rows.length - 1].id + 1,
				name,
				format(date, "dd/MM/yyyy"),
				service,
				features.join(", "),
				isWebsiteSelected ? "N/A" : complexity,
				isWebsiteSelected ? "N/A" : platforms.join(", "),
				isWebsiteSelected ? "N/A" : users,
				`$${total}`,
				true
			),
		]);
		clearFormData();
		setDialogOpen(false);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);

		const rowData = rows.map((row) =>
			Object.values(row).filter(
				(option) =>
					option !== true && option !== false && typeof option !== "number"
			)
		);

		const matches = rowData.map((row) =>
			row.map((option) =>
				option.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);

		const newRows = [...rows];
		matches.map((row, index) =>
			row.includes(true)
				? (newRows[index].search = true)
				: (newRows[index].search = false)
		);

		setRows(newRows);
	};

	return (
		<Grid container direction="column">
			<Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
				<Typography variant="h1">Projects</Typography>
			</Grid>
			<Grid item>
				<TextField
					variant="standard"
					sx={{ width: "35em", marginLeft: "5em" }}
					value={search}
					onChange={handleSearch}
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
			<Grid item sx={{ marginBottom: "15em" }}>
				{/* <TableContainer component={Paper} elevation={0}>
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
							{rows
								.filter((row) => row.search)
								.map((row, index) => (
									<TableRow key={index}>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.date}</TableCell>
										<TableCell>{row.service}</TableCell>
										<TableCell sx={{ maxWidth: "5em" }}>
											{row.features}
										</TableCell>
										<TableCell>{row.complexity}</TableCell>
										<TableCell>{row.platforms}</TableCell>
										<TableCell>{row.users}</TableCell>
										<TableCell>{row.total}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer> */}
				<EnhancedTable rows={rows} />
			</Grid>
			<Dialog
				fullWidth
				maxWidth="lg"
				sx={{ zIndex: theme.zIndex.modal + 1 }}
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
							<Grid item container direction="column">
								{/* -----Name TextField----- */}
								<Grid item>
									<TextField
										variant="standard"
										value={name}
										onChange={(e) => setName(e.target.value)}
										fullWidth
										label="Name"
										id="name"
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
									{/* -----Radio Inputs----- */}
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
								</Grid>
								{/* -----Select Platforms----- */}
								<Grid item sx={{ marginTop: "5em" }}>
									<Select
										variant="standard"
										sx={{ width: "12em" }}
										disabled={isWebsiteSelected}
										MenuProps={{ sx: { zIndex: theme.zIndex.modal + 2 } }}
										labelId="platforms"
										id="platform"
										displayEmpty
										renderValue={
											platforms.length > 0 ? undefined : () => "Platforms"
										}
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
						{/* -----Date & Complexity----- */}
						<Grid item>
							<Grid
								item
								container
								sx={{ marginTop: "16px" }}
								direction="column"
								alignItems="center"
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
											<FormControl disabled={isWebsiteSelected}>
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
											</FormControl>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{/* -----Total & Users----- */}
						<Grid item>
							<Grid item container direction="column" alignItems="flex-end">
								{/* -----Total TextField----- */}
								<Grid item>
									<TextField
										variant="standard"
										value={total}
										onChange={(e) => setTotal(e.target.value)}
										id="total"
										label="Total"
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">$</InputAdornment>
											),
										}}
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
										<Grid item container direction="column">
											<Grid item>
												<Typography variant="h4">Users</Typography>
											</Grid>
											{/* -----Radio Inputs----- */}
											<Grid item>
												<FormControl disabled={isWebsiteSelected}>
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
												</FormControl>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
								{/* -----Select Features----- */}
								<Grid item sx={{ marginTop: "5em" }}>
									<Select
										variant="standard"
										sx={{ width: "12em" }}
										MenuProps={{ sx: { zIndex: theme.zIndex.modal + 2 } }}
										labelId="features"
										id="feature"
										displayEmpty
										renderValue={
											isWebsiteSelected
												? website.length > 0
													? undefined
													: () => "Website"
												: features.length > 0
												? undefined
												: () => "Features"
										}
										value={isWebsiteSelected ? website : features}
										multiple={isWebsiteSelected ? false : true}
										onChange={(e) =>
											isWebsiteSelected
												? setWebsite(e.target.value)
												: setFeatures(e.target.value)
										}
									>
										{featureOptions.map((option) => (
											<MenuItem key={option} value={option}>
												{option}
											</MenuItem>
										))}
									</Select>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container justifyContent="center" sx={{ marginTop: "3em" }}>
						<Grid item>
							<Button
								onClick={() => {
									setDialogOpen(false);
									clearFormData();
								}}
								sx={{ fontWeight: 300 }}
							>
								Cancel
							</Button>
						</Grid>
						<Grid item>
							<Button
								disabled={
									isWebsiteSelected
										? name.length === 0 ||
										  total.length === 0 ||
										  website.length === 0
										: name.length === 0 ||
										  total.length === 0 ||
										  features.length === 0 ||
										  users.length === 0 ||
										  complexity.length === 0 ||
										  platforms.length === 0 ||
										  service.length === 0
								}
								onClick={addProject}
								variant="contained"
								sx={sx.button}
							>
								Add Project +
							</Button>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</Grid>
	);
}

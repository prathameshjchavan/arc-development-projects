// Module Imports
import React, { useState, useRef, Fragment } from "react";
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
	Box,
	useTheme,
	IconButton,
	useMediaQuery,
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
			"Mobile App",
			"GPS, Push Notifications, Users/Authentication, File Transfer",
			"Medium",
			"iOS, Android",
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
			"Mobile App",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"Android",
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
			"Mobile App",
			"Photo/Video, File Transfer, Users/Authentication",
			"Low",
			"iOS",
			"10-100",
			"$1250",
			true
		),
	]);
	const isWebsiteSelected = service === "Website";
	const featureOptions = isWebsiteSelected ? websiteOptions : softwareOptions;
	const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
	const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

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

	const serviceQuestions = (
		<Grid
			item
			container
			direction="column"
			sx={{
				marginTop: matchesMD ? undefined : "5em",
			}}
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
	);

	const usersQuestions = (
		<Grid item>
			<Grid
				item
				container
				direction="column"
				sx={{
					marginTop: matchesMD ? "50px" : "5em",
				}}
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
	);

	const complexityQuestions = (
		<Grid item sx={{ marginBottom: matchesMD ? "50px" : undefined }}>
			<Grid
				item
				container
				direction="column"
				sx={{
					marginTop: matchesMD ? "50px" : "5em",
				}}
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
	);

	return (
		<Grid
			container
			direction="column"
			alignItems={matchesMD ? "center" : undefined}
		>
			<Grid
				item
				style={{ marginTop: "2em", marginLeft: matchesMD ? 0 : "5em" }}
			>
				<Typography variant="h1">Projects</Typography>
			</Grid>
			<Grid item>
				<TextField
					variant="standard"
					sx={{
						width: matchesSM ? "18em" : matchesMD ? "25em" : "35em",
						marginLeft: matchesMD ? 0 : "5em",
					}}
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
			<Grid item sx={{ marginLeft: matchesMD ? 0 : "5em", marginTop: "2em" }}>
				<FormGroup row>
					<Grid
						container
						direction={matchesMD ? "column" : "row"}
						justifyContent={matchesMD ? "center" : undefined}
					>
						<Grid item>
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
								labelPlacement={matchesMD ? "end" : "start"}
							/>
						</Grid>
						<Grid item>
							<FormControlLabel
								sx={{ marginRight: matchesMD ? 0 : "5em" }}
								control={
									<Switch
										checked={iOSChecked}
										color="primary"
										onChange={() => setiOSChecked(!iOSChecked)}
									/>
								}
								label="iOS Apps"
								labelPlacement={matchesMD ? "end" : "start"}
							/>
						</Grid>
						<Grid item>
							<FormControlLabel
								sx={{ marginRight: matchesMD ? 0 : "5em" }}
								control={
									<Switch
										checked={androidChecked}
										color="primary"
										onChange={() => setAndroidChecked(!androidChecked)}
									/>
								}
								label="Android Apps"
								labelPlacement={matchesMD ? "end" : "start"}
							/>
						</Grid>
						<Grid item>
							<FormControlLabel
								control={
									<Switch
										checked={softwareChecked}
										color="primary"
										onChange={() => setSoftwareChecked(!softwareChecked)}
									/>
								}
								label="Custom Software"
								labelPlacement={matchesMD ? "end" : "start"}
							/>
						</Grid>
					</Grid>
				</FormGroup>
			</Grid>
			<Grid item sx={{ marginBottom: "15em", maxWidth: "100% !important" }}>
				<EnhancedTable
					rows={rows}
					setRows={setRows}
					softwareChecked={softwareChecked}
					androidChecked={androidChecked}
					iOSChecked={iOSChecked}
					websiteChecked={websiteChecked}
				/>
			</Grid>
			<Dialog
				fullWidth
				fullScreen={matchesMD}
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
					<Grid
						container
						justifyContent="space-between"
						direction={matchesMD ? "column" : "row"}
					>
						{/* -----Name & Service----- */}
						<Grid item>
							<Grid
								item
								container
								direction="column"
								alignItems={matchesMD ? "center" : undefined}
							>
								<Grid item container direction="column" alignItems="center">
									<Grid item>
										<Grid item sx={{ display: { xs: "block", md: "none" } }}>
											{serviceQuestions}
										</Grid>
										<Grid item sx={{ display: { xs: "block", md: "none" } }}>
											{usersQuestions}
										</Grid>
										<Grid item sx={{ display: { xs: "block", md: "none" } }}>
											{complexityQuestions}
										</Grid>
									</Grid>
								</Grid>

								{/* -----Name TextField----- */}
								<Grid item>
									<TextField
										variant="standard"
										sx={{ width: matchesMD ? "250px" : undefined }}
										value={name}
										onChange={(e) => setName(e.target.value)}
										fullWidth={!matchesMD}
										label="Name"
										id="name"
									/>
								</Grid>
								{/* -----Service----- */}
								<Box sx={{ display: { xs: "none", md: "block" } }}>
									{serviceQuestions}
								</Box>

								{/* -----Select Platforms----- */}
								<Grid item sx={{ marginTop: matchesMD ? "50px" : "5em" }}>
									<Select
										variant="standard"
										sx={{ width: matchesMD ? "250px" : "12em" }}
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
								<Grid item sx={{ marginTop: matchesMD ? "50px" : undefined }}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<MobileDatePicker
											value={date}
											onChange={(newValue) => setDate(newValue)}
											renderInput={({ inputRef, inputProps }) => (
												<TextField
													variant="standard"
													sx={{ width: matchesMD ? "250px" : undefined }}
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
								<Box sx={{ display: { xs: "none", md: "block" } }}>
									{complexityQuestions}
								</Box>
							</Grid>
						</Grid>
						{/* -----Total & Users----- */}
						<Grid item>
							<Grid
								item
								container
								direction="column"
								alignItems={matchesMD ? "center" : "flex-end"}
							>
								{/* -----Total TextField----- */}
								<Grid item sx={{ marginTop: matchesMD ? "50px" : undefined }}>
									<TextField
										variant="standard"
										sx={{ width: matchesMD ? "250px" : undefined }}
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
								<Box sx={{ display: { xs: "none", md: "block" } }}>
									{usersQuestions}
								</Box>
								{/* -----Select Features----- */}
								<Grid item sx={{ marginTop: matchesMD ? "50px" : "5em" }}>
									<Select
										variant="standard"
										sx={{ width: matchesMD ? "250px" : "12em" }}
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

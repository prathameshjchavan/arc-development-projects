import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const headCells = [
	{
		id: "name",
		label: "Name",
	},
	{
		id: "date",
		label: "Date",
	},
	{
		id: "service",
		label: "Service",
	},
	{
		id: "fetures",
		label: "Features",
	},
	{
		id: "complexity",
		label: "Complexity",
	},
	{
		id: "platforms",
		label: "Platforms",
	},
	{
		id: "users",
		label: "Users",
	},
	{
		id: "total",
		label: "Total",
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="secondary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all desserts",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align="center"
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							hideSortIcon
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
	const { numSelected } = props;
	const [alert, setAlert] = useState({
		open: false,
		background: "#FF3232",
		message: "",
	});
	const [undo, setUndo] = useState([]);

	const onDelete = () => {
		const newRows = [...props.rows];
		const selectedRows = newRows.filter((row) =>
			props.selected.includes(row.id)
		);
		selectedRows.forEach((row) => {
			row.search = false;
		});
		props.setRows(newRows);

		setUndo(selectedRows);
		props.setSelected([]);
		setAlert({
			...alert,
			open: true,
			message: selectedRows.length === 1 ? "Row deleted!" : "Rows deleted!",
		});
	};

	const onUndo = () => {
		setAlert({ ...alert, open: false });
		const newRows = [...props.rows];
		const redo = [...undo];
		redo.forEach((row) => {
			row.search = true;
		});
		Array.prototype.push.apply(newRows, ...redo);
		props.setRows(newRows);
	};

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.secondary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%", fontWeight: "400" }}
					color="secondary"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography sx={{ flex: "1 1 100%" }}>{null}</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete" onClick={onDelete}>
						<DeleteIcon sx={{ fontSize: 30 }} color="primary" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon sx={{ fontSize: 50 }} color="secondary" />
					</IconButton>
				</Tooltip>
			)}
			<Snackbar
				open={alert.open}
				ContentProps={{
					style: {
						background: alert.background,
					},
				}}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				message={alert.message}
				onClose={(event, reason) => {
					if (reason === "clickaway") {
						setAlert({ ...alert, open: false });
						const newRows = [...props.rows];
						const ids = [...undo.map((row) => row.id)];
						props.setRows(newRows.filter((row) => !ids.includes(row.id)));
					}
				}}
				action={
					<Button sx={{ color: "#fff" }} onClick={onUndo}>
						Undo
					</Button>
				}
			/>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("name");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = props.rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (id) => selected.indexOf(id) !== -1;

	const switchFilters = () => {
		const { websiteChecked, androidChecked, iOSChecked, softwareChecked } =
			props;

		const websites = props.rows.filter((row) =>
			websiteChecked ? row.service === "Website" : null
		);
		const iOSApps = props.rows.filter((row) =>
			iOSChecked ? row.platforms.includes("iOS") : null
		);
		const androidApps = props.rows.filter((row) =>
			androidChecked ? row.platforms.includes("Android") : null
		);
		const softwareApps = props.rows.filter((row) =>
			softwareChecked ? row.service === "Custom Software" : null
		);

		if (!websiteChecked && !iOSChecked && !androidChecked && !softwareChecked) {
			return props.rows;
		} else {
			let filteredRowIds = [];
			const rows = [...websites, ...iOSApps, ...androidApps, ...softwareApps];
			const uniqueRows = rows.filter((row) => {
				const toAddRow = !filteredRowIds.includes(row.id);
				if (toAddRow) filteredRowIds.push(row.id);
				return toAddRow;
			});
			return uniqueRows;
		}
	};

	const filteredRows = switchFilters().filter((row) => row.search);

	useEffect(() => {
		setPage(0);
	}, [props.rows]);

	return (
		<Box sx={{ width: "100%" }}>
			<Paper elevation={0} sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar
					rows={props.rows}
					setRows={props.setRows}
					selected={selected}
					setSelected={setSelected}
					numSelected={selected.length}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size="medium"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={props.rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
							{stableSort(filteredRows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="secondary"
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId,
													}}
												/>
											</TableCell>
											<TableCell
												align="center"
												component="th"
												id={labelId}
												scope="row"
												padding="none"
											>
												{row.name}
											</TableCell>
											<TableCell align="center">{row.date}</TableCell>
											<TableCell align="center">{row.service}</TableCell>
											<TableCell align="center" sx={{ maxWidth: "5em" }}>
												{row.features}
											</TableCell>
											<TableCell align="center">{row.complexity}</TableCell>
											<TableCell align="center">{row.platforms}</TableCell>
											<TableCell align="center">{row.users}</TableCell>
											<TableCell align="center">{row.total}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredRows.length}
					rowsPerPage={rowsPerPage}
					page={filteredRows.length <= rowsPerPage ? 0 : page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

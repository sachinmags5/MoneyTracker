// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   IconButton,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Box,
//   Chip
// } from "@mui/material";
// import { Add, Edit, Delete } from "@mui/icons-material";
// import {
//  fetchTransaction,
//  createTransaction,
//  editTransaction,
//  deleteTransaction
// } from "./transactionApi.js";
// import { fetchCategory } from "../category/categoryApi.js";

// export function TransactionList() {
//   const transactions = useSelector((state) => state.transaction);
//   const categories = useSelector((state) => state.category);
//   const dispatch = useDispatch();

//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedTransaction, setselectedTransaction] = useState(null);

//   const [form, setForm] = useState({
//     amount: "",
//     type: "expense",
//     note: "",
//     categoryId:""
//   });

//   const resetForm = () => {
//     setForm({ amount: "", type: "expense", note: "", categoryId:"" });
//     setselectedTransaction(null);
//     setEditMode(false);
//   };

//   const handleOpenAdd = () => {
//     resetForm();
//     setOpen(true);
//   };

//   const handleOpenEdit = (transaction) => {
//     setEditMode(true);
//     setselectedTransaction(transaction);
//     setForm({
//       amount: transaction.amount,
//       type: transaction.type,
//       note: transaction.note || "",
//       categoryId: transaction.categoryId || "",
//     });
//     setOpen(true);
//   };

//   const handleSave = () => {
//     if (!form.amount.trim()) return;

//     if (editMode) {
//       dispatch(
//         editTransaction({
//           id: selectedTransaction._id,
//           payload: form,
//         })
//       );
//     } else {
//       dispatch(createTransaction(form));
//     }

//     setOpen(false);
//     resetForm();
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this transaction?")) {
//       dispatch(deleteTransaction(id));
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchTransaction());
//   }, [dispatch]);

//    useEffect(() => {
//     dispatch(fetchCategory());
//   }, []);

//   return (
//     <div>
//       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//         <Button variant="contained" startIcon={<Add />}
//           sx={{ m: 1 }}
//           onClick={handleOpenAdd}
//         >
//           Add Transaction
//         </Button>
//       </Box>


//       <TableContainer component={Paper} sx={{ mt: 2 }}>
//         <Table size="small" stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Amount</strong></TableCell>
//               <TableCell><strong>Type</strong></TableCell>
//               <TableCell><strong>CategoryId</strong></TableCell>
//               <TableCell><strong>Note</strong></TableCell>
//               <TableCell><strong>Date</strong></TableCell>
//               <TableCell align="right"><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {transactions?.Transaction?.items?.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   <Typography color="text.secondary">
//                     No transactions found
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             )}

//             {transactions?.Transaction?.items?.map((cat) => (
//               <TableRow key={cat._id} hover  sx={{ height: 56 }}>
//                 <TableCell>{cat.amount}</TableCell>
//                 <TableCell sx={{ textTransform: "capitalize" }}>
//                   <Chip
//                     label={cat.type}
//                     size="small"
//                     color={cat.type === "income" ? "success" : "warning"}
//                     sx={{ textTransform: "capitalize" }}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   {
//                     categories?.Category?.items?.find(c => c._id === cat.categoryId)?.name || "-"
//                   }
//                 </TableCell>

//                 <TableCell>
//                   {cat.note || "-"}
//                 </TableCell>
//                 <TableCell>
//                   {cat.date || "-"}
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton
//                     size="small"
//                     onClick={() => handleOpenEdit(cat)}
//                   >
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(cat._id)}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add/Edit Modal */}
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>
//           {editMode ? "Edit Transaction" : "Add Transaction"}
//         </DialogTitle>

//         <DialogContent>
//           <Stack spacing={2} mt={1}>
//             <TextField
//               label="Transaction Amount"
//               fullWidth
//               value={form.amount}
//               onChange={(e) =>
//                 setForm({ ...form, amount: e.target.value })
//               }
//             />

//             <TextField
//               select
//               label="Type"
//               fullWidth
//               value={form.type}
//               onChange={(e) =>
//                 setForm({ ...form, type: e.target.value })
//               }
//             >
//               <MenuItem value="income">Income</MenuItem>
//               <MenuItem value="expense">Expense</MenuItem>
//             </TextField>

//             <TextField
//               select
//               label="Category"
//               fullWidth
//               value={form.categoryId}
//               onChange={(e) =>
//                 setForm({ ...form, categoryId: e.target.value })
//               }
//             >
//               {categories?.Category?.items?.map( (cat) => {
//                 return <MenuItem value={cat._id}>{cat.name}</MenuItem>
//               } )}
              
//             </TextField>

//             <TextField
//               label="Note"
//               fullWidth
//               multiline
//               rows={3}
//               value={form.note}
//               onChange={(e) =>
//                 setForm({ ...form, note: e.target.value })
//               }
//             />
//           </Stack>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             {editMode ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  CardActions,
  Grid
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  fetchTransaction,
  createTransaction,
  editTransaction,
  deleteTransaction
} from "./transactionApi.js";
import { fetchCategory } from "../category/categoryApi.js";

export function TransactionList() {
  const transactions = useSelector((state) => state.transaction);
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTransaction, setselectedTransaction] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    note: "",
    categoryId: ""
  });

  const resetForm = () => {
    setForm({ amount: "", type: "expense", note: "", categoryId: "" });
    setselectedTransaction(null);
    setEditMode(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditMode(true);
    setselectedTransaction(transaction);
    setForm({
      amount: transaction.amount,
      type: transaction.type,
      note: transaction.note || "",
      categoryId: transaction.categoryId || "",
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form?.amount?.trim()) return;

    if (editMode) {
      dispatch(
        editTransaction({
          id: selectedTransaction._id,
          payload: form,
        })
      );
    } else {
      dispatch(createTransaction(form));
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ m: 1 }}
          onClick={handleOpenAdd}
        >
          Add Transaction
        </Button>
      </Box>
       <Box sx={{m:5}} >
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {transactions?.Transaction?.items?.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary" align="center">
              No transactions found
            </Typography>
          </Grid>
        )}
     
        {transactions?.Transaction?.items?.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">₹{cat.amount}</Typography>
                <Chip
                  label={cat.type}
                  size="small"
                  color={cat.type === "income" ? "success" : "warning"}
                  sx={{ textTransform: "capitalize", mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Category:</strong>{" "}
                  {categories?.Category?.items?.find(c => c._id === cat.categoryId)?.name || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>Note:</strong> {cat.note || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {cat.date || "-"}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenEdit(cat)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      
      </Grid>
        </Box>
      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editMode ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Transaction Amount"
              type="number"
              fullWidth
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              //didnt worked
              // slotProps={{ input: { min: 1, max: 100000, }, }}
              // error={Number(form.amount) <= 0}
              // helperText={Number(form.amount) <= 0 ? "Amount must be greater than 0" : ""}
            />

            <TextField
              select
              label="Type"
              fullWidth
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>

            <TextField
              select
              label="Category"
              fullWidth
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            >
              {categories?.Category?.items?.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Note"
              fullWidth
              multiline
              rows={3}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

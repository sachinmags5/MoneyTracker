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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  fetchCategory,
  createCategory,
  editCategory,
  deleteCategory,
} from "./categoryApi.js";

export function CategoryList() {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "expense",
    description: "",
  });

  const resetForm = () => {
    setForm({ name: "", type: "expense", description: "" });
    setSelectedCategory(null);
    setEditMode(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditMode(true);
    setSelectedCategory(cat);
    setForm({
      name: cat.name,
      type: cat.type,
      description: cat.description || "",
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editMode) {
      dispatch(
        editCategory({
          id: selectedCategory._id,
          payload: form,
        })
      );
    } else {
      dispatch(createCategory(form));
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" startIcon={<Add />}
          sx={{ m: 1 }}
          onClick={handleOpenAdd}
        >
          Add Category
        </Button>
      </Box>


      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories?.Category?.items?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No categories found
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {categories?.Category?.items?.map((cat) => (
              <TableRow key={cat._id} hover  sx={{ height: 56 }}>
                <TableCell>{cat.name}</TableCell>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  <Chip
                    label={cat.type}
                    size="small"
                    color={cat.type === "income" ? "success" : "warning"}
                    sx={{ textTransform: "capitalize" }}
                  />
                </TableCell>
                <TableCell>
                  {cat.description || "-"}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenEdit(cat)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editMode ? "Edit Category" : "Add Category"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Category Name"
              fullWidth
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <TextField
              select
              label="Type"
              fullWidth
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
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

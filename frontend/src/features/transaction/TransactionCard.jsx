import React, { memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Grid
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export const TransactionCard = memo(function TransactionCard({
  transaction,
  categories,
  onEdit,
  onDelete
}) {

  const categoryName = useMemo(() => {
    return categories?.find(
      c => c._id === transaction.categoryId
    )?.name || "-";
  }, [categories, transaction.categoryId]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined">

        <CardContent>

          <Typography variant="h6">
            ₹{transaction.amount}
          </Typography>

          <Chip
            label={transaction.type}
            size="small"
            color={transaction.type === "income" ? "success" : "warning"}
            sx={{ mt: 1 }}
          />

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Category:</strong> {categoryName}
          </Typography>

          <Typography variant="body2">
            <strong>Note:</strong> {transaction.note || "-"}
          </Typography>

        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end" }}>

          <Button
            size="small"
            startIcon={<Edit />}
            onClick={() => onEdit(transaction)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={() => onDelete(transaction._id)}
          >
            Delete
          </Button>

        </CardActions>

      </Card>
    </Grid>
  );
});
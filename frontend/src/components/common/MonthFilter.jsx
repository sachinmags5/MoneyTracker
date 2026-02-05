import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

export default function MonthFilter({ value, onChange }) {
  return (
    <Box mb={3} width={200}>
      <FormControl fullWidth size="small">
        <InputLabel>Month</InputLabel>
        <Select
          label="Month"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {months.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

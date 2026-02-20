// Dashboard.jsx
import React, { useEffect , useState} from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // react-router-dom, not react-router
import { useSelector ,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchSummary } from "./dashboardApi.js";
import { LineChart, Line, CartesianGrid, XAxis, YAxis ,Tooltip } from 'recharts';
import MonthFilter from '../../components/common/MonthFilter.jsx';

export const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();
  const {Summary} = useSelector((state) => state.summary);
  const { loading, isAuthenticated, user } = useSelector((s) => s.auth);
  const [month, setMonth] = useState(2); // default current month
  const [year, setYear] = useState(2026); // default current year

  useEffect(() => {
    dispatch(fetchSummary({year, month }));
  }, [year,month]);
  console.log(Summary,'SUMMary')
  // useEffect(() => {
  //     dispatch(fetchSummary());
  // }, []);

  useEffect(() => {
    // Wait until loading finishes; only redirect if not authenticated
    if (!loading && !user && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, user, isAuthenticated, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
      <Box p={3}>
        <Grid container rowSpacing={3}>
          <MonthFilter value={month} onChange={setMonth} />
        </Grid>
        <Grid container spacing={3}>
          {/* LEFT SECTION */}
          <Grid item xs={12} md={8}>
            {/* Summary Cards */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Income
                    </Typography>
                    <Typography variant="h5" color="success.main"> 
                      ₹ {Summary?.totalsByType.find(item => item._id === "income")?.totalAmount || 0} 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Expense
                    </Typography>
                    <Typography variant="h5" color="error.main">
                      ₹ {Summary?.totalsByType.find(item => item._id === "expense")?.totalAmount || 0} 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
  
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Transactions Amount
                    </Typography>
                    <Typography variant="h5">
                      ₹ {Summary?.totalAmount[0]?.total || 0} 
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
  
            {/* Category-wise Totals */}
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6">Category-wise Total</Typography>
                <Divider sx={{ my: 1 }} />
                <List dense>
                  {Summary?.totalsByCategory?.map((item) => (
                    <ListItem
                      key={item.categoryId}
                      secondaryAction={
                        <Typography fontWeight={600}>
                          ₹ {item.totalAmount}
                        </Typography>
                      }
                    >
                      <ListItemText primary={item.categoryName} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* RIGHT SECTION */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Analytics</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography color="text.secondary">
                  Note: Transaction Graph per month !
                </Typography>
                {Summary?.totalsByCategory.length == 0  ? <Typography width={900} height={250} color="text.secondary">
                  No Transactions data found
                </Typography> :
                <LineChart width={900} height={250} data={Summary?.totalsByCategory} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="categoryName" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
};

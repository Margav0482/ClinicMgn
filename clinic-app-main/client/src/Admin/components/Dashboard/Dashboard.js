import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { getMedicines } from '../../Redux/Action/medicineActions';
import { getPatient } from '../../Redux/Action/patientActions';
import { getTreatment } from '../../Redux/Action/treatmentAction';
import { getAppoinments, appoveAppoinmet } from '../../Redux/Action/generalAction';

import FilterUser from './FilterUser/FilterUser';
import ApprovalTable from './ApprovalTable/ApprovalTable';
import Card from '../../../UI/Card/Card';

import './Dashboard.css';
import Header from "../Header/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {

  const dispatch = useDispatch();

  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [data, setData] = useState([]);

  const { medicines } = useSelector((state) => state.medicine);
  const { patients } = useSelector((state) => state.patientStore);
  const { treatmentsDetails } = useSelector((state) => state.treatmentStore);
  const { appoinments } = useSelector((state) => state.allDetailStore);

  const handleChange = (e) => {
    setDate(e.target.value);
  }

  const handleApprove = (id) => {
    if (id !== "") {
      dispatch(appoveAppoinmet(id));
      message.success("Approve Appoinment");
    }
  }

  useEffect(() => {
    dispatch(getMedicines());
    dispatch(getPatient());
    dispatch(getTreatment());
    dispatch(getAppoinments());
  }, [dispatch])

  useEffect(() => {
    const filterData = treatmentsDetails.filter((item) => {
      return moment(item.due_date).format('L') === moment(date).format('L');
    })
    setData(filterData);
  }, [date, treatmentsDetails]);

  return (
      <div>
        <Header headerPages={["dashboard", "patient", "medicine", "treatment", "appoinment"]} />
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <Card title="Total Patient"
                      value={patients.length}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Card title="Total Medicines"
                      value={medicines.length}
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <Card title="Total Treatments"
                      value={treatmentsDetails.length}
                />
              </Item>
            </Grid>

            <Grid item xs={5} className="grid-top-margin">
              <Item>
                <div className='input-margin'>
                  <TextField
                      id="date"
                      label="Date"
                      type="date"
                      value={date}
                      sx={{ width: 220 }}
                      onChange={(e) => handleChange(e)}
                  />
                </div>
                <FilterUser data={data} />
              </Item>
            </Grid>
            <Grid item xs={7}>
              <h4>Pending Appoinment List </h4>
              <Item>
                <ApprovalTable data={appoinments} handleApprove={handleApprove} />
              </Item>
            </Grid>
          </Grid>
        </Container>
      </div>
  );
}

export default Dashboard;
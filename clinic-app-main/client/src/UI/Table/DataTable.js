import { useState } from 'react';

import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';

const DataTable = (props) => {
    const [pageSize, setPageSize] = useState(10);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    return (
        // maxWidth="xl"
        // container justifyContent="center"
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item><h3>{props.title}</h3></Item>
                </Grid>
                {props?.buttonName !== "" &&
                    <Grid item xs={4}>
                        <Item>
                            <Button color="primary" size="large" startIcon={<AddIcon />} onClick={props?.handleAddOpen}>
                                {props?.buttonName}
                            </Button>
                        </Item>
                    </Grid>}
                <Grid item xs={12}>
                    <Item>
                        <div style={{ height: 650, width: '100%' }}>
                            <DataGrid
                                loading={props.loading}
                                // disableDensitySelector
                                // disableSelectionOnClick={true}
                                // disableVirtualization={true}
                                // isRowSelectable={(params)=> false} 
                                getRowId={(row) => row?._id}
                                rows={props?.mainData}
                                columns={props?.columns}
                                autoPageSize={true}
                                //onRowDoubleClick={props?.onRowDoubleClick ? ((e) => { props.handleShowDetails(e); }) : ''}
                                pageSize={pageSize}
                                onPageSizeChange={(newPage) => setPageSize(newPage)}
                                pagination
                                // rowsPerPageOptions={[10]}
                                density={"standard"}
                            // checkboxSelection
                            />
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </Container>
    )
}

export default DataTable;
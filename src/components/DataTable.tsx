import React, { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'vin', headerName: 'VIN', flex: 1 },
  { field: 'make', headerName: 'Make', flex: 1},
  { field: 'model', headerName: 'Model', flex: 1},
  { field: 'year', headerName: 'Year', flex: 1},
  { field: 'color', headerName: 'Color', flex: 1},
]

function DataTable() {
  const [open, setOpen] = useState(false);
  const { carData, getData } = useGetData();
  const [selectionModel, setSelectionModel] = useState<string[]>([])
  const handleCreate = () => {
    setOpen(true);
  }
  const handleUpdate = () => {
    if (selectionModel?.length > 0) {
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  const deleteData = async () => {
    console.log(selectionModel, "selectionModel");
    if (selectionModel?.length > 0) {
      await server_calls.delete(selectionModel[0]);
      // Remove the deleted item from the selection model
      setSelectionModel(prevState => prevState.filter(item => item !== selectionModel[0]));
      await getData();
    }
  }
  
  return (
    <>
        <Modal 
            id={selectionModel[0]}
            open={open}
            onClose={handleClose}/>
        <div className="flex flex-row p-3 justify-items-center bg-slate-300 m-3 rounded hover:bg-slate-700 hover:text-white">
            <div className="flex flex-row">
                <button
                    className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"
                    onClick={() => handleCreate()}
                >
                  Create New Car
                </button>
            </div>
            <Button onClick={handleUpdate} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-500 hover:text-white" >Update</Button>
            <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-500 hover:text-white" >Delete</Button>
        </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"}
          style={{ height: 500, width: '100%' }}
          >
            <h2 className="flex p-3 bg-slate-300 justify-items-center items-center h-auto w-auto  my-2 rounded">My Cars</h2>
            <DataGrid autoHeight {...carData}
              rows={carData} 
              columns={columns}  
              checkboxSelection={true}
              getRowId={(row) => row.vin}
              onRowSelectionModelChange={ (item:any) => {
                setSelectionModel(item)
              }
              }
            />
        </div>
    </>
  )
}

export default DataTable;
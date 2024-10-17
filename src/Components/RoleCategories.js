import React from "react";

import { Toolbar } from 'primereact/toolbar';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState,useEffect } from "react"
import roleCategories from "../Data/roleCategory";

import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
        
const RoleCategories=()=>{
    const [code, setCode] = useState('');
    const[mode,setMode]=useState("Add")
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [roleCategory,setRoleCategory]=useState([])
    const [totalRecords, setTotalRecords] = useState(0);
    const[selectedRoleCategory,setSelectedRoleCategory]=useState(null);
    const[id,setId]=useState(null)
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
       
    });


    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);

       setTimeout(()=>{
        setRoleCategory(roleCategories);
        setTotalRecords(roleCategories.length)
        setLoading(false)

       },3000)

    }

    const onPage = (event) => {
        setlazyState(event);
    };

    const onSort = (event) => {
        setlazyState(event);
    };

    const startContent=()=>(
        <h2>Role Categories</h2>
    )

    const editRoleCategory=(rowData)=>{
        setMode('Edit');
        setCode(rowData.code);
        setName(rowData.name)
        setId (rowData.id)

    }

    const actionBodyTemplate=(rowData)=>(
        <Button icon="pi pi-pencil" rounded outlined className="mr-2"    onClick={() => editRoleCategory(rowData)} />
    )
const onHandleSave=(e)=>{
    e.preventDefault()
    setRoleCategory((p)=>{
        console.log([...p,{id :1,code:code,name:name}])
       return [...p,{id :1,code:code,name:name}]
    
    });
    setTotalRecords(roleCategory.length)
   
}

const onHandleEdit=(e)=>{
    e.preventDefault();
    const indexById = roleCategories.findIndex(item => item.id === id);
    const duplicateRole=[...roleCategory]
    duplicateRole[indexById]={id:indexById,code:code,name:name}

    setRoleCategory(duplicateRole);

    setCode("");
    setMode('Add');
    setName("");
    
    
    


}

    const endContent=()=>(
        <form className="formgroup-inline gap-3 "  onSubmit={mode==="Add"?onHandleSave:onHandleEdit}>
            <div class="field">
             <input id="firstname2" type="text" className="text-base mt-1 text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter Code....." style={{height:"40px",width:"250px"}}/>
             </div>
             <div class="field">
             <input id="firstname2" type="text" className="text-base mt-1 text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary " value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name....."     style={{height:"40px",width:"250px"}}/>
             </div>
            <Button label="Add "  icon="pi pi-plus" type="submit" />

        </form>

    )




    return(


        <div className="grid">
            <div className="col-12"> 
             <Card>
                <Toolbar start={startContent} end={endContent}  className="mb-2" />

                <DataTable paginator value={roleCategory}
                    first={lazyState.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                   loading={loading}  selection={selectedRoleCategory} onSelectionChange={(e) => setSelectedRoleCategory(e.value)} >
                     <Column selectionMode="multiple" exportable={false}></Column>
                     <Column field="code" header="Code" sortable ></Column>
                      <Column field="name" header="Name" sortable ></Column>
                      <Column header="Actions" body={actionBodyTemplate}/>

                </DataTable>
                

             </Card>

            </div>
        </div>
    )

}

export default RoleCategories
import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";

import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { Sidebar } from "primereact/sidebar";
import { Dropdown } from "primereact/dropdown";

import citiesData from "../Data/cities";

const Cities = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedCities, setSelectedCities] = useState(null);
  const [visible, setVisible] = useState(false);

  const [city, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
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

    //imitate delay of a backend call
    setTimeout(() => {
      setTotalRecords(citiesData.length);
      setCities(citiesData);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  const editBodyTemplate = () => (
    <Button icon="pi pi-pencil" border-round outlined />
  );

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };


  const onSubmitHandler=(e)=>{
    e.preventDefault();
    setVisible(false);
  }

  const startContent = () => <h1>Cities</h1>;
  const endContent = () => <Button label="Add Cities" icon="pi pi-plus" onClick={()=>(setVisible(true))} />;
  const actionBodyTemplate = () => {
    <Button icon="pi pi-pencil" rounded outlined className="mr-2" />;
  };

  return (
    <div className="grid ">
      <div className="col-12">
        <Card  class="over">
          <Toolbar start={startContent} end={endContent} className="tool" />
          <DataTable
            value={city}
            selection={selectedCities}
            onSelectionChange={(e) => setSelectedCities(e.value)}
            totalRecords={totalRecords}
            paginator
            rows={5}
            onPage={onPage}
            selectionMode="single"
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            onSort={onSort}
            sortField={lazyState.sortField}
            sortOrder={lazyState.sortOrder}
            loading={loading}
          >
            <Column
              field="name"
              header="City"
              sortable
              style={{ minWidth: "16rem" }}
            ></Column>

            <Column field="stateName" header="State" sortable></Column>
            <Column body={actionBodyTemplate} exportable={false}></Column>
            <Column exportable={false} body={editBodyTemplate} />
          </DataTable>
        </Card>
      </div>
      <div className="col-12">
        <Sidebar
        visible={visible}
          position="right"
          onHide={() => setVisible(false)}
       className="w-4 md:w-50" >
            <form onSubmit={onSubmitHandler} className="shadow-2 formgrid grid p-2 md:p-4 col surface-card">
            
            <h2>Add City</h2>
           
           
            <div className="field col-12 md:col-10 mb-2">
              <label htmlFor="firstname6">city</label>
              <input
                id="firstname6"
                type="text"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" placeholder="Enter City Name"
              />
            </div>
            <div class="field col-12 md:col-10">
            <label htmlFor="firstname6">State</label>
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a State" className="w-full" />
                      
            </div>

  <div className='field flex gap-3'>
    <Button label='Save' type="submit" />
    <Button label='Cancel' severity="secondary" onClick={()=>(setVisible(false))}/>

  </div>
          
          </form>
        </Sidebar>
      </div>
    </div>
  );
};

export default Cities;

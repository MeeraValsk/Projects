import React from "react";
import { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toolbar } from "primereact/toolbar";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

import areaData from "../Data/areaData";

const Areas = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [areas, setAreas] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(null);
  const [visible, setVisible] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
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
setLoading(true)

    setTimeout(() => {
      setTotalRecords(areaData.length);
      setAreas(areaData);
      setLoading(false);
    }, 3000);

  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const startContent = () => <h2>Areas</h2>;

  const endContent = () => (
    <Button
      label="Add Areas"
      icon="pi pi-plus"
      onClick={() => setVisible(true)}
    />
  );

  const actionBodyTemplate = () => (
    <div>
      <Button icon="pi pi-pencil" onClick={() => setVisible(true)} />
    </div>
  );

  return (
    <div className="grid">
      <div className="col-12">
        <Card>
          <Toolbar start={startContent} end={endContent} />
          <DataTable
            value={areas}
            
            paginator
            first={lazyState.first}
            rows={10}
            totalRecords={totalRecords}
            onPage={onPage}
            onSort={onSort}
            sortField={lazyState.sortField}
            sortOrder={lazyState.sortOrder}
            loading={loading}
            selection={selectedAreas}
            onSelectionChange={(e) => setSelectedAreas(e.value)}
            selectionMode="single"
          >
            <Column header="AreaName" field="area" sortable />
            <Column header="City" field="city" sortable />
            <Column
              header="Actions"
              body={actionBodyTemplate}
              exportable={false}
            />
          </DataTable>
        </Card>
      </div>
      <div className="col-12">
        <Sidebar
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
        >
          <div className="formgrid grid shadow-2 p-2 md:p-4">
            <h2>Add Areas</h2>
            <div className="field col-12 md:col-10">
              <label htmlFor="firstname6">Name</label>
              <input
                id="firstname6"
                type="text"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary "
              />
            </div>
            <div className="field col-12 md:col-10">
              <label htmlFor="city">Cities</label>
              <Dropdown
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="field grid gap-3">
              <Button label="Save" />
              <Button label="Cancel" severity="secondary" />
            </div>
          </div>
        </Sidebar>
      </div>
    </div>
  );
};

export default Areas;

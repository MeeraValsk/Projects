import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import stateData from "../Data/stateData";
import { Sidebar } from "primereact/sidebar";

const States = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedState, setSelectedState] = useState(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState(null);
  const [value, setValue] = useState("");
  const [states, setStates] = useState([]);
  const [lazyState, setlazyState] = useState({
    first: 0, //index of first row of current page
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
  });

  useEffect(() => {
    loadLazyData();
  }, [lazyState]);

  const fetchStateData = async () => {
    const url = "http://localhost:3000/api/v1/states";
    const token = localStorage.getItem("jwt_token");
    console.log(token);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 200) {
        const { data, totatalCount } = data;
        console.log(data);
        setStates(data);
        setTotalRecords(totatalCount);
      }
    } catch (e) {
      console.log("unable to get statse Data Error" + e);
    }
  };

  const loadLazyData = () => {
    setLoading(true);

    //imitate delay of a backend call

    setTimeout(() => {
      fetchStateData();
      setLoading(false);
    }, 3000);
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  const onSort = (event) => {
    setlazyState(event);
  };

  const startContent = () => (
    <div>
      <h1>States</h1>
    </div>
  );

  const onAddState = (e) => {
    //iam opening sidebar and making mode as add
    setVisible(true);
    setMode("Add");
  };

  const editState = (rowData) => {
    setVisible(true);
    setMode("Add");
    console.log(rowData);
  };

  const actionBodyTemplate = (rowData) => (
    <Button
      icon="pi pi-pencil"
      rounded
      outlined
      className="mr-2"
      onClick={() => editState(rowData)}
    />
  );

  const endContent = () => (
    <Button label="Add State" icon="pi pi-plus" onClick={onAddState} />
  );

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <Card className="mt-0">
          <Toolbar
            start={startContent}
            end={endContent}
            className="mb-3 mt-0"
          />
          <DataTable
            value={states}
            paginator
            first={lazyState.first}
            rowsPerPageOptions={[5, 10, 25]}
            rows={lazyState.rows}
            totalRecords={totalRecords}
            onSort={onSort}
            sortField={lazyState.sortField}
            sortOrder={lazyState.sortOrder}
            onPage={onPage}
            paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
            selectionMode="single"
            selection={selectedState}
            onSelectionChange={(e) => setSelectedState(e.value)}
            loading={loading}
            style={{ width: "100%" }}
            className="custom-table"
          >
            <Column
              field="code"
              header="Code"
              sortable
              style={{ width: "33%" }}
            />
            <Column
              field="name"
              header="stateName"
              sortable
              style={{ width: "33%" }}
            />
            <Column
              header="Actions"
              body={actionBodyTemplate}
              exportable={false}
              style={{ width: "33%" }}
            />
          </DataTable>
        </Card>
      </div>
      <div className="col-12">
        <Sidebar
          position="right"
          visible={visible}
          onHide={() => setVisible(false)}
          className="p-sidebar-custom"
        >
          <form
            className="formgrid grid shadow-2 border-round p-1 md:p-4"
            onSubmit={onHandleSubmit}
          >
            <div className="field col-12">
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  marginBottom: "3px",
                }}
              >
                {mode} States
              </h1>
            </div>

            <div class="field col-12 md:col-10">
              <label for="firstname6">Code:</label>
              <input
                id="firstname6"
                type="text"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full "
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-10">
              <label for="firstname6">Name:</label>
              <input
                id="firstname6"
                type="text"
                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-10">
              <div className="flex gap-3">
                <Button label="Save" type="submit" />
                <Button
                  label="Cancel"
                  severity="secondary"
                  onClick={() => setVisible(false)}
                />
              </div>
            </div>
          </form>
        </Sidebar>
      </div>
    </div>
  );
};

export default States;

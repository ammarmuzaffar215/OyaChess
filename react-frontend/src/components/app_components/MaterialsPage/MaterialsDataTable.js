import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import client from "../../../services/restClient";

const MaterialsDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
  selectedDelete,
  setSelectedDelete,
  onCreateResult,
  fetchMaterials,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.title}</p>;
  const dropdownTemplate1 = (rowData, { rowIndex }) => (
    <p>{rowData.packageId?.title}</p>
  );
  const file_uploadTemplate3 = (rowData) => {
    const fileUrl = rowData.files;

    if (!fileUrl) return <small>No file uploaded</small>;

    const filename = fileUrl.split("/").pop();

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          title="Download Material"
          style={{
            color: "#2A4454",
            fontWeight: "bold",
            textDecoration: "none",
            wordBreak: "break-all",
          }}
        >
          📎 {filename}
        </a>
      </div>
    );
  };
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );

  const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;
    try {
      await Promise.all(
        selectedItems.map(async (item) => {
          try {
            await client.service("materials").remove(item._id);
          } catch (error) {
            if (error.name === "NotFound") {
              console.warn(`Materials ${item._id} already deleted.`);
            } else {
              throw error;
            }
          }
        })
      );
      fetchMaterials?.();
      setSelectedItems([]);
      setSelectedDelete([]);
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };

  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

  return (
    <>
      <DataTable
        value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
        <Column
          field="title"
          header="Title"
          body={pTemplate0}
          filter={selectedFilterFields.includes("title")}
          hidden={selectedHideFields?.includes("title")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="packageId"
          header="Package"
          body={dropdownTemplate1}
          filter={selectedFilterFields.includes("packageId")}
          hidden={selectedHideFields?.includes("packageId")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="description"
          header="Description"
          body={(rowData) => (
            <p style={{ fontStyle: "italic", color: "#444", margin: 0 }}>
              {rowData.description || "No description"}
            </p>
          )}
          filter={selectedFilterFields.includes("description")}
          hidden={selectedHideFields?.includes("description")}
          sortable
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="videoUrl"
          header="Video Link"
          body={(rowData) => {
            const rawUrl = rowData.videoUrl;
            const isValidUrl = rawUrl && /^https?:\/\//i.test(rawUrl);
            const finalUrl = isValidUrl ? rawUrl : `https://${rawUrl}`;

            return rawUrl ? (
              <a
                href={finalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pi pi-link"
                title="Open video link"
                style={{ fontSize: "1.2rem", color: "#007ad9" }}
              ></a>
            ) : (
              <span style={{ color: "#999" }}>N/A</span>
            );
          }}
          sortable
          style={{ minWidth: "6rem", textAlign: "center" }}
        />

        <Column
          field="materials"
          header="Materials"
          body={file_uploadTemplate3}
          filter={selectedFilterFields.includes("files")}
          hidden={selectedHideFields?.includes("files")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column header="Edit" body={editTemplate} />
        <Column header="Delete" body={deleteTemplate} />
      </DataTable>

      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              label="Delete"
              labelposition="right"
              icon="pi pi-trash"
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}

      <Dialog
        header="Upload Materials Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="materials"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Materials"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
        Search
      </Dialog>
      <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false);
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default MaterialsDataTable;

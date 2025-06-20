import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { useParams } from "react-router-dom";
import UploadService from "../../../services/UploadService";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import client from "../../../services/restClient";

const ItemsDataTable = ({
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
  fetchItems,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

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

  const imageTemplate = (rowData) =>
    rowData.imageUrl ? (
      <img
        src={rowData.imageUrl}
        alt="Item"
        style={{ width: "50px", height: "auto", borderRadius: "4px" }}
      />
    ) : (
      <span style={{ color: "#ccc", fontStyle: "italic" }}>No image</span>
    );

  const deleteTemplate = (rowData) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );

  const editTemplate = (rowData) => (
    <Button
      onClick={() => onEditRow(rowData)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;
    try {
      await Promise.all(
        selectedItems.map(async (item) => {
          try {
            await client.service("items").remove(item._id);
          } catch (error) {
            if (error.name === "NotFound") {
              console.warn(`Items ${item._id} already deleted.`);
            } else {
              throw error;
            }
          }
        })
      );
      fetchItems?.();
      setSelectedItems([]);
      setSelectedDelete([]);
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };

  const handleMessage = () => {
    setShowDialog(true);
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  const deselectAllRows = () => setSelectedItems([]);

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
        size="small"
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
          field="imageUrl"
          header="Image"
          body={imageTemplate}
          style={{ minWidth: "6rem" }}
        />
        <Column
          field="title"
          header="Title"
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="type"
          header="Type"
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="description"
          header="Description"
          sortable
          style={{ minWidth: "12rem", maxWidth: "20rem", whiteSpace: "normal" }}
        />
        <Column
          field="qty"
          header="Qty"
          sortable
          style={{ minWidth: "6rem", maxWidth: "8rem" }}
        />
        <Column
          field="price"
          header="Price"
          body={(rowData) => (
            <InputNumber
              value={rowData.price}
              mode="currency"
              currency="MYR"
              locale="en-US"
              disabled
              useGrouping={false}
            />
          )}
          sortable
          style={{ minWidth: "6rem" }}
        />
        <Column
          field="discount"
          header="Discount"
          body={(rowData) => (
            <InputNumber
              value={rowData.discount}
              mode="currency"
              currency="MYR"
              locale="en-US"
              disabled
              useGrouping={false}
            />
          )}
          sortable
          style={{ minWidth: "6rem" }}
        />
        <Column
          field="productLink"
          header="Product Link"
          body={(rowData) =>
            rowData.productLink ? (
              <a
                href={rowData.productLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pi pi-link"
                title="Open link"
                style={{ fontSize: "1.2rem", color: "#007ad9" }}
              ></a>
            ) : (
              <span style={{ color: "#999" }}>N/A</span>
            )
          }
          sortable
          style={{ minWidth: "6rem", textAlign: "center" }}
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
        header="Upload Items Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="items"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Items"
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

export default ItemsDataTable;

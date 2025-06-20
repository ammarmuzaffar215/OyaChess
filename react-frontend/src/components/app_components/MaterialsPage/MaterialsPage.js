// MaterialsPage.js (Student + Admin View)
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { classNames } from "primereact/utils";
import DownloadCSV from "../../../utils/DownloadCSV";
import AreYouSureDialog from "../../common/AreYouSureDialog";
import MaterialsDatatable from "./MaterialsDataTable";
import MaterialsEditDialogComponent from "./MaterialsEditDialogComponent";
import MaterialsCreateDialogComponent from "./MaterialsCreateDialogComponent";
import MaterialsFakerDialogComponent from "./MaterialsFakerDialogComponent";
import MaterialsSeederDialogComponent from "./MaterialsSeederDialogComponent";
import StudentMaterialsList from "./StudentMaterialsList";
import SortIcon from "../../../assets/media/Sort.png";
import FilterIcon from "../../../assets/media/Filter.png";

const MaterialsPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEntityIndex, setSelectedEntityIndex] = useState(null);
  const [newRecord, setRecord] = useState({});

  const fetchMaterials = async () => {
    try {
      const res = await client.service("materials").find({
        query: {
          $limit: 10000,
          $populate: [
            { path: "packageId", service: "packages", select: ["title"] },
            { path: "createdBy", service: "users", select: ["name"] },
            { path: "updatedBy", service: "users", select: ["name"] },
          ],
        },
      });
      setData(res.data || []);
    } catch (err) {
      console.error("Failed to fetch materials", err);
      props.alert({ title: "Materials", type: "error", message: err.message });
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const onEditRow = (rowData) => {
    setSelectedEntityIndex(rowData._id);
    setShowEditDialog(true);
  };

  const onEditResult = (updatedItem) => {
    const newData = data.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setData(newData);
  };

  const onCreateResult = (createdItem) => {
    setData([...data, createdItem]);
  };

  const [selectedFilterFields, setSelectedFilterFields] = useState([]);
  const [selectedHideFields, setSelectedHideFields] = useState([]);

  return (
    <div className="mt-5">
      <div className="grid">
        <div className="col-6 flex align-items-center justify-content-start">
          <h4 className="mb-0 ml-2">
            <span>OyaChess / </span>
            <strong>Lesson Materials</strong>
          </h4>
        </div>
        <div className="col-6 flex justify-content-end">
          {props.user?.role !== "Student" && (
            <Button
              label="Add"
              icon="pi pi-plus"
              onClick={() => setShowCreateDialog(true)}
              loading={loading}
              rounded
              style={{ height: "30px" }}
            />
          )}
        </div>
      </div>

      {props.user?.role === "Student" ? (
        <StudentMaterialsList materials={data} user={props.user} />
      ) : (
        <MaterialsDatatable
          items={data}
          onEditRow={onEditRow}
          onCreateResult={onCreateResult}
          onEditResult={onEditResult}
          fetchMaterials={fetchMaterials}
          user={props.user}
          selectedFilterFields={selectedFilterFields}
          setSelectedFilterFields={setSelectedFilterFields}
          selectedHideFields={selectedHideFields}
          setSelectedHideFields={setSelectedHideFields}
        />
      )}

      <MaterialsEditDialogComponent
        entity={_.find(data, { _id: selectedEntityIndex })}
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        onEditResult={onEditResult}
      />

      <MaterialsCreateDialogComponent
        entity={newRecord}
        show={showCreateDialog}
        onHide={() => setShowCreateDialog(false)}
        onCreateResult={onCreateResult}
      />
    </div>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};

const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(MaterialsPage);

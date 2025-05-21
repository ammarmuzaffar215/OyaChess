import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import UploadFilesToS3 from "../../../services/UploadFilesToS3";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const MaterialsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [packageId, setPackageId] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [packageId],
        setError,
      );
    }
    set_entity({ ...init });
    setError({});
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.title)) {
      error["title"] = `Title field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.videoUrl)) {
      error["videoUrl"] = `VideoUrl field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.materials)) {
      error["materials"] = `Materials field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      title: _entity?.title,
      packageId: _entity?.packageId?._id,
      videoUrl: _entity?.videoUrl,
      materials: _entity?.materials,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("materials").create(_data);
      const eagerResult = await client.service("materials").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "packageId",
              service: "packages",
              select: ["title"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Materials updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Materials",
      });
    }
    setLoading(false);
  };

  const onFileLoaded = (file, status) => {
    if (status)
      props.alert({
        title: "file uploader",
        type: "success",
        message: "file uploaded" + file.name,
      });
    else
      props.alert({
        title: "file uploader",
        type: "error",
        message: "file uploader failed" + file.name,
      });
  };

  const setId = (id) => {
    setValByKey("materials", id);
  };

  useEffect(() => {
    // on mount packages
    client
      .service("packages")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singlePackagesId,
        },
      })
      .then((res) => {
        setPackageId(
          res.data.map((e) => {
            return { name: e["title"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Packages",
          type: "error",
          message: error.message || "Failed get packages",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const packageIdOptions = packageId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Materials"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max scalein animation-ease-in-out animation-duration-1000"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="materials-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="title">Title:</label>
            <InputText
              id="title"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.title}
              onChange={(e) => setValByKey("title", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["title"]) ? (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="packageId">PackageId:</label>
            <Dropdown
              id="packageId"
              value={_entity?.packageId?._id}
              optionLabel="name"
              optionValue="value"
              options={packageIdOptions}
              onChange={(e) => setValByKey("packageId", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["packageId"]) ? (
              <p className="m-0" key="error-packageId">
                {error["packageId"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="videoUrl">VideoUrl:</label>
            <InputText
              id="videoUrl"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.videoUrl}
              onChange={(e) => setValByKey("videoUrl", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["videoUrl"]) ? (
              <p className="m-0" key="error-videoUrl">
                {error["videoUrl"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 field">
          <span className="align-items-center">
            <label htmlFor="materials">Materials:</label>
            <UploadFilesToS3
              type={"create"}
              user={props.user}
              id={urlParams.id}
              serviceName="materials"
              onUploadComplete={setId}
              onFileLoaded={onFileLoaded}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["materials"]) ? (
              <p className="m-0" key="error-materials">
                {error["materials"]}
              </p>
            ) : null}
          </small>
        </div>
        <small className="p-error">
          {Array.isArray(Object.keys(error))
            ? Object.keys(error).map((e, i) => (
                <p className="m-0" key={i}>
                  {e}: {error[e]}
                </p>
              ))
            : error}
        </small>
      </div>
    </Dialog>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(MaterialsCreateDialogComponent);

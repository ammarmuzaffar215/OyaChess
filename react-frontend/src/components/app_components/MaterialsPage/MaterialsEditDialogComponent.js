import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

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
  return Object.keys(errMsg).length ? errMsg : errorObj.message || null;
};

const MaterialsEditDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [packageId, setPackageId] = useState([]);

  useEffect(() => {
    set_entity(props.entity);
    setError({});
  }, [props.entity, props.show]);

  useEffect(() => {
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
          res.data.map((e) => ({ name: e["title"], value: e._id }))
        );
      })
      .catch((error) => {
        props.alert({
          title: "Packages",
          type: "error",
          message: error.message || "Failed to get packages",
        });
      });
  }, []);

  const setValByKey = (key, val) => {
    set_entity({ ..._entity, [key]: val });
    setError({});
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (
      !file ||
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ].includes(file.type)
    ) {
      props.alert({
        title: "Upload Error",
        type: "warn",
        message: "Only PDF and PPTX files are allowed.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oyachess_unsigned");
    formData.append("folder", "oyachess/items");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwfqzyxsy/raw/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data?.secure_url) {
        setValByKey("files", data.secure_url);
        props.alert({
          title: "Upload Success",
          type: "success",
          message: `${file.name} uploaded.`,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      props.alert({
        title: "Upload Error",
        type: "error",
        message: "Failed to upload file.",
      });
    }
  };

  const onSave = async () => {
    const payload = {
      title: _entity?.title,
      description: _entity?.description,
      packageId: _entity?.packageId?._id,
      videoUrl: _entity?.videoUrl,
      files: _entity?.files,
    };

    setLoading(true);
    try {
      await client.service("materials").patch(_entity._id, payload);
      const eagerResult = await client.service("materials").find({
        query: {
          $limit: 10000,
          _id: { $in: [_entity._id] },
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
        title: "Edit Material",
        message: "Material updated successfully",
      });
      props.onEditResult(eagerResult.data[0]);
    } catch (error) {
      console.error("Error updating material:", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update material"
      );
      props.alert({
        type: "error",
        title: "Edit Material",
        message: "Failed to update material",
      });
    }
    setLoading(false);
  };

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

  const packageIdOptions = packageId.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Edit Materials"
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
        role="materials-edit-dialog-component"
      >
        {/* Title */}
        <div className="col-12 md:col-6 field">
          <label htmlFor="title">Title:</label>
          <InputText
            id="title"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.title}
            onChange={(e) => setValByKey("title", e.target.value)}
          />
          <small className="p-error">
            {error["title"] && <p className="m-0">{error["title"]}</p>}
          </small>
        </div>

        {/* Package */}
        <div className="col-12 md:col-6 field">
          <label htmlFor="packageId">Package:</label>
          <Dropdown
            id="packageId"
            value={_entity?.packageId?._id}
            optionLabel="name"
            optionValue="value"
            options={packageIdOptions}
            onChange={(e) => setValByKey("packageId", { _id: e.value })}
          />
          <small className="p-error">
            {error["packageId"] && <p className="m-0">{error["packageId"]}</p>}
          </small>
        </div>

        {/* Description */}
        <div className="col-12 field">
          <label htmlFor="description">Description:</label>
          <InputTextarea
            id="description"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.description}
            onChange={(e) => setValByKey("description", e.target.value)}
          />
          <small className="p-error">
            {error["description"] && (
              <p className="m-0">{error["description"]}</p>
            )}
          </small>
        </div>

        {/* Video URL */}
        <div className="col-12 md:col-6 field">
          <label htmlFor="videoUrl">Video URL:</label>
          <InputText
            id="videoUrl"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.videoUrl}
            onChange={(e) => setValByKey("videoUrl", e.target.value)}
          />
          <small className="p-error">
            {error["videoUrl"] && <p className="m-0">{error["videoUrl"]}</p>}
          </small>
        </div>

        {/* File Upload */}
        <div className="col-12 md:col-6 field">
          <label htmlFor="files">Upload File (PDF/PPTX):</label>
          <input
            type="file"
            accept=".pdf,.pptx"
            onChange={handleFileUpload}
            className="mt-2"
          />
          {typeof _entity?.files === "string" && (
            <a
              href={_entity.files}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", marginTop: "5px", color: "#2A4454" }}
            >
              📎 View current file
            </a>
          )}
          <small className="p-error">
            {error["files"] && <p className="m-0">{error["files"]}</p>}
          </small>
        </div>
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

export default connect(mapState, mapDispatch)(MaterialsEditDialogComponent);

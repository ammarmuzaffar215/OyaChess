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
  return Object.keys(errMsg).length
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
        setError
      );
    }

    const fullInit = { ...init };
    set_entity(fullInit);
    setError({});
    console.log("✅ Initialized entity:", fullInit); // 🧪 Log entity init
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.title)) {
      error["title"] = `Title field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.description)) {
      error["description"] = `Description field is required`;
      ret = false;
    }

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;

    const payload = {
      title: _entity?.title,
      packageId: _entity?.packageId?._id,
      description: _entity?.description,
      videoUrl: _entity?.videoUrl,
      files: _entity?.files,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    console.log("📦 Payload to submit:", payload); // 🧪 Log payload

    setLoading(true);

    try {
      const result = await client.service("materials").create(payload);
      console.log("✅ Server response:", result); // 🧪 Log server response

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
        message: "Material created successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.error("❌ Error saving material:", error); // 🧪 Log error
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create material",
      });
    }
    setLoading(false);
  };

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
    console.log(`📝 Field set — ${key}:`, val); // 🧪 Log value change
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
        console.log("✅ File uploaded, Cloudinary URL:", data.secure_url); // 🧪 Log file URL
        props.alert({
          title: "Upload Success",
          type: "success",
          message: `${file.name} uploaded.`,
        });
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("❌ Cloudinary Upload Error:", err); // 🧪
      props.alert({
        title: "Upload Error",
        type: "error",
        message: "Failed to upload file.",
      });
    }
  };

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
          res.data.map((e) => {
            return { name: e["title"], value: e._id };
          })
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Packages",
          type: "error",
          message: error.message || "Failed to get packages",
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
          <label htmlFor="title">Title:</label>
          <InputText
            id="title"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.title}
            onChange={(e) => setValByKey("title", e.target.value)}
            required
          />
          <small className="p-error">
            {error["title"] && <p className="m-0">{error["title"]}</p>}
          </small>
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="packageId">PackageId:</label>
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

        <div className="col-12 md:col-6 field">
          <label htmlFor="videoUrl">VideoUrl:</label>
          <InputText
            id="videoUrl"
            className="w-full mb-3 p-inputtext-sm"
            value={_entity?.videoUrl}
            onChange={(e) => setValByKey("videoUrl", e.target.value)}
            required
          />
          <small className="p-error">
            {error["videoUrl"] && <p className="m-0">{error["videoUrl"]}</p>}
          </small>
        </div>

        <div className="col-12 md:col-6 field">
          <label htmlFor="files">Upload PDF or PPTX:</label>
          <br />
          <input
            type="file"
            accept=".pdf,.pptx"
            onChange={handleFileUpload}
            className="mt-2"
          />
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

export default connect(mapState, mapDispatch)(MaterialsCreateDialogComponent);

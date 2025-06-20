import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import moment from "moment";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg.push(element.message);
      }
    }
  }
  return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ItemsCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    set_entity(props.entity);
  }, [props.entity, props.show]);

  const onSave = async () => {
    let _data = {
      title: _entity?.title,
      type: _entity?.type,
      qty: _entity?.qty,
      price: _entity?.price,
      discount: _entity?.discount,
      imageUrl: _entity?.imageUrl,
      description: _entity?.description,
      productLink: _entity?.productLink,
    };

    setLoading(true);
    try {
      const result = await client.service("items").patch(_entity._id, _data);
      props.onHide();
      props.alert({
        type: "success",
        title: "Edit info",
        message: "Info items updated successfully",
      });
      props.onEditResult(result);
    } catch (error) {
      console.log("error", error);
      setError(
        getSchemaValidationErrorsStrings(error) || "Failed to update info"
      );
      props.alert({
        type: "error",
        title: "Edit info",
        message: "Failed to update info",
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

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      props.alert({
        type: "error",
        title: "Upload Failed",
        message: "Only PNG or JPG files are allowed.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "oyachess_unsigned");
    formData.append("folder", "oyachess/items");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwfqzyxsy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data?.secure_url) {
        set_entity((prev) => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        props.alert({
          type: "error",
          title: "Upload Failed",
          message: "Upload succeeded but no image URL was returned.",
        });
      }
    } catch (err) {
      console.error("Upload error", err);
      props.alert({
        type: "error",
        title: "Upload Failed",
        message: "Something went wrong uploading the image.",
      });
    }
  };

  return (
    <Dialog
      header="Edit Items"
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
        role="items-edit-dialog-component"
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
            {!_.isEmpty(error["title"]) && (
              <p className="m-0" key="error-title">
                {error["title"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="type">Type:</label>
            <InputText
              id="type"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.type}
              onChange={(e) => setValByKey("type", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["type"]) && (
              <p className="m-0" key="error-type">
                {error["type"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 field">
          <label htmlFor="description">Description:</label>
          <InputTextarea
            id="description"
            className="w-full mb-3"
            autoResize
            rows={3}
            value={_entity?.description}
            onChange={(e) => setValByKey("description", e.target.value)}
          />
          <small className="p-error">
            {!_.isEmpty(error["description"]) && (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 field">
          <label htmlFor="productLink">Product Link:</label>
          <InputText
            id="productLink"
            className="w-full mb-3"
            value={_entity?.productLink}
            onChange={(e) => setValByKey("productLink", e.target.value)}
            placeholder="https://example.com/product"
          />
          <small className="p-error">
            {!_.isEmpty(error["productLink"]) && (
              <p className="m-0" key="error-productLink">
                {error["productLink"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="qty">Qty:</label>
            <InputNumber
              id="qty"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.qty}
              onChange={(e) => setValByKey("qty", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["qty"]) && (
              <p className="m-0" key="error-qty">
                {error["qty"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="price">Price:</label>
            <InputNumber
              id="price"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.price}
              onValueChange={(e) => setValByKey("price", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["price"]) && (
              <p className="m-0" key="error-price">
                {error["price"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="discount">Discount:</label>
            <InputNumber
              id="discount"
              className="w-full mb-3"
              mode="currency"
              currency="MYR"
              locale="en-US"
              value={_entity?.discount}
              onValueChange={(e) => setValByKey("discount", e.value)}
              useGrouping={false}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["discount"]) && (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            )}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <label htmlFor="imageFile">Image (PNG or JPG):</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="w-full mb-2"
          />
          <small className="text-sm text-muted">
            {_entity?.imageUrl
              ? `Current image: ${_entity.imageUrl.split("/").pop().split("?")[0]}`
              : "No image uploaded yet."}
          </small>
        </div>
        <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(ItemsCreateDialogComponent);

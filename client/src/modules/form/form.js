import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { uploadImage } from "../../serviceApi/uploadImage";
import { createPost } from "../../serviceApi/createPost";
const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export default function FormComponent() {
  const [imageUrl, setimageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const [email, setEmail] = useState("");
  console.log(imageUrl);
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const normFile = async (e) => {
    console.log("Upload event:", e.target.files[0]);
    console.log(e);
    // const { file } = e.target;
    let formDate = new FormData();
    formDate.append("photo", e.target.files[0]);
    try {
      const response = await uploadImage(formDate);
      console.log(response.data);
      setimageUrl(response.data.file.filename);
      message("file uploaded");
    } catch (err) {
      console.log(err);
    }
  };
  const onsubmitForm = async (e) => {
    // e.preventDefault();
    // console.log(email, description, title, imageUrl);
    if (email && description && title && imageUrl && emailPattern.test(email)) {
      try {
        const reponse = await createPost({
          email,
          description,
          title,
          imageUrl,
        });
        console.log(reponse.data);
        message.success("post created");
      } catch (err) {
        if (err.response) {
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
      }

      form.resetFields();
      document.getElementById("photo").value = null;
    } else {
      message.warn("validation missing");
    }
    // setEmail("");
    // setTitle("");
    // setimageUrl("");
    // setDesciption("");
  };
  const imageChage = (e) => {
    console.log(e);
  };
  return (
    <Row gutter={[16, 16]} align="middle" justify="center">
      <Col style={{ padding: "50px" }} xs={24} sm={18} md={16} lg={12}>
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onsubmitForm={onsubmitForm}
        >
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            // getValueFromEvent={normFile}

            // extra="longgggggggggggggggggggggggggggggggggg"
          >
            <input
              name="photo"
              required
              id="photo"
              type="file"
              onChange={normFile}
              accept="image/*"
            ></input>
          </Form.Item>
          <Form.Item name="title" label="Title" required>
            <Input
              name="title"
              rules={[
                {
                  type: "text",
                  message: "Please input your title!",
                },
              ]}
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            clear
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" required>
            <Input
              name="description"
              rules={[
                {
                  type: "text",
                  message: "Please input your description!",
                },
              ]}
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
              required
            />
          </Form.Item>
          <Row
            align="middle"
            justify="space-around"
            // style={{ backgroundColor: 'red' }}
          >
            <Col>
              <Form.Item {...tailLayout}>
                <Button onClick={onsubmitForm} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            <Link to="/gallery">
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Gallery
                </Button>
              </Form.Item>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

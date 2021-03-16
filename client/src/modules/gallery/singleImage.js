import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPostOne } from "../../redux/ActionCreaters/postRequets";
import { BaseUrl } from "../../serviceApi/baseUrl";

export default function SingleImage(props) {
  const { id } = useParams();
  const { loading, posts, singlePost } = useSelector(
    (state) => state.postReducer
  );
  // const [single, setSingle] = useState({});
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getPostOne({ id }, props.history));
  }, [id]);

  return (
    <Row justify="center" align="middle">
      <Col span={20}>
        {loading ? (
          <Row style={{ height: "500px" }} justify="center" align="middle">
            <h1> loading Post</h1>
          </Row>
        ) : (
          <Row justify="center" align="middle">
            {singlePost.hasOwnProperty("title") && (
              <Col
                span={24}
                style={{
                  margin: "10px",
                }}
              >
                {
                  <img
                    width="70%"
                    height="40%"
                    src={
                      singlePost.imageUrl
                        ? singlePost.imageUrl.startsWith("http")
                          ? singlePost.imageUrl
                          : BaseUrl + singlePost.imageUrl
                        : "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg"
                    }
                    alt={singlePost.title}
                  />
                }
                <br />
                <p>title: {singlePost.title ? singlePost.title : ""}</p>
                <p>email: {singlePost.email ? singlePost.email : ""}</p>

                <p>
                  Desc: {singlePost.description ? singlePost.description : ""}
                </p>
              </Col>
            )}
          </Row>
        )}
      </Col>
    </Row>
  );
}

import React, { useEffect, useState } from "react";
import { Row, Col, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { getPostFromBackend } from "../../redux/ActionCreaters/postRequets";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../../serviceApi/baseUrl";

export default function Gallery() {
  const [runApi, setrunApi] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.postReducer);
  console.log(posts, "backedn post");
  useEffect(() => {
    dispatch(getPostFromBackend({ page, limit }));
  }, [runApi]);
  const getData = () => {
    dispatch(getPostFromBackend({ page, limit }));
  };
  return (
    <div>
      Gallery Component
      <Row>
        <Col span={24}>
          <Col span={12}>
            {" "}
            <Col span={6}>
              page{" "}
              <Input
                type="number"
                onChange={(e) => setPage(e.target.value)}
                value={page}
                placeholder={"pages"}
              />
            </Col>
            <Col span={6}>
              limit:{" "}
              <Input
                type="number"
                onChange={(e) => setLimit(e.target.value)}
                value={limit}
                placeholder={"limit"}
              />
            </Col>
            <Col span={6}>
              <Button onClick={getData}>Apply pagination</Button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={12}>
          {loading ? (
            <Row style={{ height: "500px" }} justify="center" align="middle">
              <h1> loading Post</h1>
            </Row>
          ) : (
            <Row justify="center" align="middle">
              {posts.map((el) => {
                return (
                  <Col
                    span={7}
                    style={{
                      margin: "10px",
                    }}
                    key={el._id}
                  >
                    <Link to={`/gallery/${el._id}`}>
                      {
                        <img
                          width="100%"
                          height="100%"
                          src={
                            el.imageUrl
                              ? el.imageUrl.startsWith("http")
                                ? el.imageUrl
                                : BaseUrl + el.imageUrl
                              : "https://www.thedome.org/wp-content/uploads/2019/06/300x300-Placeholder-Image.jpg"
                          }
                          // alt={el.title}
                        />
                      }
                    </Link>
                  </Col>
                );
              })}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

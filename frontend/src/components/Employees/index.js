import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../EmployeeForm";
import "./Employees.css";

const Index = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editColumn, setEditColumnId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await (
        await fetch("http://localhost:5000/employees")
      ).json();
      return response;
    };
    fetchData().then((response) => setData(response));
  }, [isModalOpen]);

  const deleteHandler = async (value) => {
    await fetch("http://localhost:5000/new-employees-list", {
      method: "POST",
      body: JSON.stringify({ _id: value }),
      headers: { "Content-Type": "application/json" },
    });
    setData(data.filter((item) => item._id !== value));
  };

  const editHandler = (value) => {
    setIsModalOpen(true);
    setEditColumnId(value);
  };
  const EmployeesEditdetailsHandler = () => {
    navigate("/");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      id: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      id: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      id: "phone",
    },
    {
      title: "Department",
      dataIndex: "department",
      id: "department",
    },
    {
      title: "Address",
      dataIndex: "address",
      id: "address",
    },
    {
      render: (record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              editHandler(record._id);
            }}
            style={{
              minWidth: "7rem",
              fontWeight: "600",
              borderRadius: "0px",
            }}
          >
            Edit
          </Button>
          {record?._id === editColumn && (
            <Modal open={isModalOpen}>
              <EmployeeForm
                value={record}
                isModalOpen={isModalOpen}
                modalClose={() => {
                  setIsModalOpen(false);
                }}
              />
            </Modal>
          )}
        </>
      ),
    },
    {
      render: (record) => (
        <Button
          type="primary"
          danger
          onClick={() => {
            deleteHandler(record._id);
          }}
          style={{
            minWidth: "7rem",
            fontWeight: "600",
            borderRadius: "0px",
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="employee-list-container">
      {data?.length ? (
        <div>
          <div className="heading-wrapper">
            <h3> Edit Employee Details</h3>
            <Button type="primary" onClick={EmployeesEditdetailsHandler}>
              View Employee Edit Section
            </Button>
          </div>
          <Table dataSource={data} columns={columns} pagination={false}></Table>
        </div>
      ) : (
        <div className="heading-wrapper">
          <h3> No Employees are in the List....</h3>
          <Button type="primary" onClick={EmployeesEditdetailsHandler}>
            View Employee Edit Section
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;

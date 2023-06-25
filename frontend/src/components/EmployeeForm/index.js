import { Button, Form, Input, notification, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeForm.css";
const { TextArea } = Input;

const EmployeeForm = (props) => {
  const { value, isModalOpen, modalClose } = props;
  const [formValue, setFormValue] = useState({
    name: value?.name || "",
    email: value?.email || "",
    phone: value?.phone || "",
    address: value?.address || "",
    department: value?.department || "",
  });
  const changeHandler = (value, name) => {
    setFormValue({ ...formValue, [name]: value });
  };

  const navigate = useNavigate();
  const submitHandler = async (e) => {
    if (isModalOpen) {
      e.preventDefault();
      await fetch(`http://localhost:5000/employee-update/${value?._id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...formValue,
        }),
        headers: { "Content-Type": "application/json" },
      });
      modalClose();
      notification.success({
        description: (
          <h3 style={{ color: "#1677ff", fontWeight: "700", fontSize: "20px" }}>
            details updated sucessfully
          </h3>
        ),
      });
    } else {
      e.preventDefault();
      await fetch("http://localhost:5000/employee-registration", {
        method: "POST",
        body: JSON.stringify(formValue),
        headers: { "Content-Type": "application/json" },
      });
      notification.success({
        description: (
          <h3 style={{ color: "#1677ff", fontWeight: "700", fontSize: "20px" }}>
            details saved sucessfully
          </h3>
        ),
        message: (
          <h3 style={{ color: "#1677ff", fontWeight: "600", fontSize: "14px" }}>
            Please check Employees Section
          </h3>
        ),
      });
      setFormValue({
        name: "",
        email: "",
        phone: "",
        address: "",
        department: "",
      });
    }
  };
  const EmployeesdetailsHandler = () => {
    navigate("/employees");
  };
  return (
    <div className="employee-container">
      <div className="heading-wrapper">
        {!isModalOpen ? (
          <h3> Add Employee Details</h3>
        ) : (
          <h3> Edit Employee Details</h3>
        )}
        {!isModalOpen && (
          <Button type="primary" onClick={EmployeesdetailsHandler}>
            View Employees
          </Button>
        )}
      </div>

      <div>
        <Form
          style={{
            maxWidth: 600,
            margin: " 5rem auto",
          }}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
        >
          <Form.Item label="Name">
            <Input
              style={{ padding: "10px" }}
              value={formValue.name}
              onChange={(e) => {
                changeHandler(e.target.value, "name");
              }}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              style={{ padding: "10px" }}
              value={formValue.email}
              onChange={(e) => {
                changeHandler(e.target.value, "email");
              }}
            />
          </Form.Item>

          <Form.Item label="Phone">
            <Input
              style={{ padding: "10px" }}
              type="number"
              value={formValue.phone}
              name="phone"
              onChange={(e) => {
                changeHandler(e.target.value, "phone");
              }}
            />
          </Form.Item>
          <Form.Item label="Department">
            <Select
              value={formValue.department}
              onChange={(e) => {
                changeHandler(e, "department");
              }}
              size={"large"}
              options={[
                {
                  value: "Information Technology",
                  label: "Information Technology",
                },
                {
                  value: "Administrator",
                  label: "Administrator",
                },
                {
                  value: "Human Resource",
                  label: "Human Resource",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Address">
            <TextArea
              style={{ padding: "10px" }}
              rows={4}
              name="address"
              value={formValue.address}
              onChange={(e) => {
                changeHandler(e.target.value, "address");
              }}
            />
          </Form.Item>

          <div className="btn-wrapper">
            <Button type="primary" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EmployeeForm;

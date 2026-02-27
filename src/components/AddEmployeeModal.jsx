import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Field, Input, Select, Button } from "./UI";
import { IcPlus } from "./Icons";
import { DEPARTMENTS, emailRe, errMsg } from "../utils";
import api from "../api";
import { toast } from "./Toast";

export default function AddEmployeeModal({ open, onClose, onSuccess }) {
  const [form, setForm]     = useState({ id: "", name: "", email: "", department: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setForm({ id: "", name: "", email: "", department: "" });
      setErrors({});
    }
  }, [open]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.id.trim())             e.id         = "Employee ID is required";
    if (!form.name.trim())           e.name       = "Full name is required";
    if (!form.email.trim())          e.email      = "Email is required";
    else if (!emailRe.test(form.email)) e.email   = "Invalid email format";
    if (!form.department)            e.department = "Department is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const employee = await api.addEmployee({
        ...form,
        email: form.email.toLowerCase(),
      });
      toast(`${employee.name} added successfully`, "success");
      onSuccess(employee);
      onClose();
    } catch (err) {
      toast(errMsg(err), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Employee">
      <div className="form-grid-2">
        <Field label="Employee ID" error={errors.id}>
          <Input
            value={form.id}
            onChange={(e) => setField("id", e.target.value)}
            placeholder="e.g. EMP005"
            error={errors.id}
          />
        </Field>
        <Field label="Full Name" error={errors.name}>
          <Input
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="e.g. Jane Smith"
            error={errors.name}
          />
        </Field>
      </div>

      <Field label="Email Address" error={errors.email}>
        <Input
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="jane@company.com"
          type="email"
          error={errors.email}
        />
      </Field>

      <Field label="Department" error={errors.department}>
        <Select
          value={form.department}
          onChange={(e) => setField("department", e.target.value)}
          error={errors.department}
        >
          <option value="">Select department…</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </Select>
      </Field>

      <div className="modal-footer">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>
          <IcPlus sz={14} />
          Add Employee
        </Button>
      </div>
    </Modal>
  );
}

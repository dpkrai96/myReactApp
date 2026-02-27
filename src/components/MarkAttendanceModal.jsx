import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { Field, Select, Input, Button } from "./UI";
import { IcCheck } from "./Icons";
import { today, errMsg } from "../utils";
import api from "../api";
import { toast } from "./Toast";

export default function MarkAttendanceModal({
  open,
  onClose,
  onSuccess,
  employees,
}) {
  const [form, setForm]     = useState({ employee_id: "", date: today(), status: "Present" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setForm({ employee_id: "", date: today(), status: "Present" });
      setErrors({});
    }
  }, [open]);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.employee_id) e.employee_id = "Select an employee";
    if (!form.date)        e.date        = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const record = await api.markAttendance(form);
      toast("Attendance marked successfully", "success");
      onSuccess(record);
      onClose();
    } catch (err) {
      toast(errMsg(err), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Mark Attendance">
      <Field label="Employee" error={errors.employee_id}>
        <Select
          value={form.employee_id}
          onChange={(e) => setField("employee_id", e.target.value)}
          error={errors.employee_id}
        >
          <option value="">Select employee…</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.id})
            </option>
          ))}
        </Select>
      </Field>

      <div className="form-grid-2">
        <Field label="Date" error={errors.date}>
          <Input
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            type="date"
            error={errors.date}
          />
        </Field>
        <Field label="Status">
          <Select
            value={form.status}
            onChange={(e) => setField("status", e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </Select>
        </Field>
      </div>

      <div className="modal-footer">
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>
          <IcCheck sz={14} />
          Mark Attendance
        </Button>
      </div>
    </Modal>
  );
}

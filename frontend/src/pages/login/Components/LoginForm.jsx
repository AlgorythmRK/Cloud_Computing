import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { API_BASE_URL } from "../../../config/api";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password?.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, general: "" }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors((prev) => ({
          ...prev,
          general: data?.error || "Login failed. Please try again.",
        }));
        return;
      }

      // Save auth info
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          className={`input-premium w-full ${
            errors?.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : ""
          }`}
          disabled={loading}
        />
        {errors?.email && (
          <p className="mt-2 text-sm text-red-600">{errors?.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-foreground mb-2"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          className={`input-premium w-full ${
            errors?.password
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : ""
          }`}
          disabled={loading}
        />
        {errors?.password && (
          <p className="mt-2 text-sm text-red-600">{errors?.password}</p>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        className="btn-primary w-full text-lg py-4"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In to Dashboard"}
      </Button>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Use the same email and password you registered with on FinMitra.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

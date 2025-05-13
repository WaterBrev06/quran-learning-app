import React, { useState } from 'react';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);

      alert('✅ تم تسجيل الدخول بنجاح');
      window.location.href = `/${data.role}-dashboard`; // e.g. /mother-dashboard

    } catch (err) {
      alert('❌ خطأ في تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen bg-lightgray flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-right">
        <h2 className="text-2xl font-bold mb-6 text-olive">تسجيل الدخول</h2>
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />
        <button type="submit" className="w-full bg-yellow text-white py-2 rounded-lg hover:bg-yellow/80">
          دخول
        </button>
        <p className="mt-4 text-sm">
             ليس لديك حساب؟ <a href="/register" className="text-peach underline">سجل هنا</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

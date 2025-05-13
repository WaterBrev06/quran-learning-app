import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'mother' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert('✅ تم إنشاء الحساب بنجاح! الرجاء تسجيل الدخول.');
      navigate('/register-success');
    } catch (err) {
      console.error('Registration error:', err);
      alert('❌ فشل في التسجيل. تأكد من البيانات.');
    }
  };

  return (
    <div className="min-h-screen bg-lightgray flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-right">
        <h2 className="text-2xl font-bold mb-6 text-olive">إنشاء حساب</h2>

        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

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

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        >
          <option value="mother">أم</option>
          <option value="student">طالب</option>
          <option value="teacher">معلم</option>
          <option value="admin">مشرف</option>
        </select>

        <button type="submit" className="w-full bg-yellow text-white py-2 rounded-lg hover:bg-yellow/80">
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default Register;

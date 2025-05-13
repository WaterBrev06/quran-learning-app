import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen bg-lightgray flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-olive mb-4">🎉 تم إنشاء الحساب بنجاح</h2>
        <p className="text-base text-gray-700 mb-6">الآن يمكنك تسجيل الدخول باستخدام بريدك الإلكتروني وكلمة المرور.</p>
        <Link to="/" className="inline-block bg-yellow text-white px-6 py-2 rounded-lg hover:bg-yellow/80">
          الانتقال إلى تسجيل الدخول
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
